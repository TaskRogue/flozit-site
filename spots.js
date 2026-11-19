/* The live beta spots counter beside every Request beta access button (Claude Design 20-website;
   Chris, 2026-11-12 and 2026-11-18). It asks the app once per page view for
   {"cap": C, "remaining": n} (GET https://app.flozit.com/beta/spots: public, read-only, no names or
   addresses, cached a minute) and sets html[data-beta]:
     open  more than 3 spots left: "n of C beta spots left"
     last  1 to 3 spots left: the same line in the accent tint
     full  0 left: the button reads Beta is full and links to support@flozit.com
   A failed, slow (over 3 seconds) or malformed answer sets nothing, so the page keeps its
   Request beta access button and line with no count, never a placeholder number.
   No cookies (credentials: omit), no tracking, nothing stored. */
(function () {
  var URL = "https://app.flozit.com/beta/spots";
  var WAIT_MS = 3000;
  var done = false;

  function whole(n) {
    return typeof n === "number" && isFinite(n) && Math.floor(n) === n;
  }

  function show(answer) {
    if (done || !answer || !whole(answer.cap) || !whole(answer.remaining)) return;
    var cap = answer.cap;
    var left = answer.remaining;
    if (cap < 1 || left < 0 || left > cap) return;
    done = true;
    var state = left === 0 ? "full" : left <= 3 ? "last" : "open";
    var text = left === 0
      ? "All " + cap + " beta spots are taken"
      : left + " of " + cap + " beta spots left";
    var chips = document.querySelectorAll("[data-spots]");
    for (var i = 0; i < chips.length; i++) chips[i].textContent = text;
    document.documentElement.setAttribute("data-beta", state);
  }

  if (!window.fetch || !document.querySelector("[data-spots]")) return;
  var controller = window.AbortController ? new AbortController() : null;
  var timer = setTimeout(function () {
    done = true;
    if (controller) controller.abort();
  }, WAIT_MS);
  fetch(URL, {
    method: "GET",
    mode: "cors",
    credentials: "omit",
    signal: controller ? controller.signal : undefined
  })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (answer) { clearTimeout(timer); show(answer); })
    .catch(function () { clearTimeout(timer); });
})();
