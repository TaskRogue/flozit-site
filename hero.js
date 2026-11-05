/* Starts the hero background video after the page has loaded. It never starts on a phone
   (560px and under), when the device asks for reduced motion, or when Save-Data is on; those
   visitors keep the still poster. The button pauses and plays it. No cookies, no tracking. */
(function () {
  var video = document.querySelector(".hero-video");
  var button = document.querySelector(".hero-pause");
  if (!video || !button) return;

  function allowed() {
    if (window.matchMedia("(max-width: 560px)").matches) return false;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    var c = navigator.connection;
    if (c && c.saveData) return false;
    return true;
  }

  function addSource(src, type) {
    var s = document.createElement("source");
    s.src = src;
    s.type = type;
    video.appendChild(s);
  }

  function start() {
    if (!allowed()) return;
    addSource(video.getAttribute("data-webm"), "video/webm");
    addSource(video.getAttribute("data-mp4"), "video/mp4");
    video.load();
    var played = video.play();
    var show = function () { button.hidden = false; };
    if (played && played.then) played.then(show, function () {});
    else show();
  }

  button.addEventListener("click", function () {
    var paused = button.classList.toggle("paused");
    if (paused) video.pause();
    else video.play();
    button.setAttribute("aria-label", paused ? "Play background video" : "Pause background video");
  });

  if (document.readyState === "complete") start();
  else window.addEventListener("load", start);
})();
