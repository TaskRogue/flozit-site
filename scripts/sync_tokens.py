"""Keep the site's tokens.css in step with the Flozit app's design tokens.

The app's tokens.css lives in a private repo, so the site holds a copy and a lock:

  python scripts/sync_tokens.py [SOURCE]    copy SOURCE to tokens.css and write tokens.lock
  python scripts/sync_tokens.py --check     verify, change nothing

tokens.lock records the source path, the source's git commit and the SHA-256 of the copy.
--check fails when tokens.css no longer matches the lock (someone edited the copy), and,
when the source file exists on this machine, when the source has drifted from the copy.
On GitHub the source does not exist, so only the lock is checked there.

Standard library only.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TOKENS = ROOT / "tokens.css"
LOCK = ROOT / "tokens.lock"
DEFAULT_SOURCE = Path(
    r"C:\Users\csimo\github\flozit-worktrees\slice1a\flozit\web\static\tokens.css"
)


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def git(source: Path, *args: str) -> str:
    try:
        out = subprocess.run(
            ["git", "-C", str(source.parent), *args],
            capture_output=True, text=True, check=True,
        )
    except (OSError, subprocess.CalledProcessError):
        return ""
    return out.stdout.strip()


def sync(source: Path) -> int:
    if not source.is_file():
        print(f"Source not found: {source}", file=sys.stderr)
        return 1
    TOKENS.write_bytes(source.read_bytes())
    commit = git(source, "rev-parse", "HEAD") or "unknown"
    uncommitted = bool(git(source, "status", "--porcelain", "--", source.name))
    lock = {
        "source_path": str(source),
        "source_commit": commit,
        "source_uncommitted_changes": uncommitted,
        "sha256": sha256(TOKENS),
    }
    LOCK.write_text(json.dumps(lock, indent=2) + "\n", encoding="utf-8", newline="\n")
    note = " (the source file has uncommitted changes)" if uncommitted else ""
    print(f"Copied {source}\ncommit {commit}{note}\nsha256 {lock['sha256']}")
    return 0


def check(source: Path | None) -> int:
    problems: list[str] = []
    if not LOCK.is_file():
        print("tokens.lock is missing. Run scripts/sync_tokens.py.", file=sys.stderr)
        return 1
    if not TOKENS.is_file():
        print("tokens.css is missing. Run scripts/sync_tokens.py.", file=sys.stderr)
        return 1
    lock = json.loads(LOCK.read_text(encoding="utf-8"))
    mine = sha256(TOKENS)
    if mine != lock["sha256"]:
        problems.append(
            "tokens.css does not match tokens.lock. It was edited by hand; "
            "run scripts/sync_tokens.py to restore it."
        )
    src = source or DEFAULT_SOURCE
    if src.is_file():
        if sha256(src) != mine:
            problems.append(
                f"The app's tokens have changed since the last sync ({src}). "
                "Run scripts/sync_tokens.py and commit tokens.css and tokens.lock."
            )
        where = f"source checked: {src}"
    else:
        where = "source not on this machine, lock only"
    if problems:
        for p in problems:
            print("FAIL:", p, file=sys.stderr)
        return 1
    print(f"OK: tokens.css matches tokens.lock ({where}).")
    return 0


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("source", nargs="?", type=Path, help="path to the app's tokens.css")
    ap.add_argument("--check", action="store_true", help="verify only")
    args = ap.parse_args()
    if args.check:
        return check(args.source)
    return sync(args.source or DEFAULT_SOURCE)


if __name__ == "__main__":
    sys.exit(main())
