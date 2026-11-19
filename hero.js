/* Starts the hero background video after the page has loaded. It never starts on a phone,
   upright (560px and under) or sideways (a touch screen, also tablets), when the device asks for
   reduced motion, or when Save-Data is on; those visitors keep the still poster (Chris, 2026-11-05).
   The button pauses and plays it and shows only once the video plays. No cookies, no tracking. */
(function () {
  var hero = document.querySelector(".hero");
  var video = document.querySelector(".hero-video");
  var button = document.querySelector(".pause");
  if (!hero || !video || !button) return;

  var phone = window.matchMedia("(max-width: 560px), (pointer: coarse)");

  function allowed() {
    if (phone.matches) return false;
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

  function stop() {
    video.pause();
    hero.classList.add("paused");
    button.setAttribute("aria-label", "Play the background video");
  }

  function go() {
    var played = video.play();
    hero.classList.remove("paused");
    button.setAttribute("aria-label", "Pause the background video");
    if (played && played.catch) played.catch(stop);
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

  /* A desktop window narrowed to phone size hides the video (site.css), so pause it too. */
  function onResize() {
    if (phone.matches && video.querySelector("source") && !hero.classList.contains("paused")) stop();
  }
  if (phone.addEventListener) phone.addEventListener("change", onResize);
  else if (phone.addListener) phone.addListener(onResize);

  button.addEventListener("click", function () {
    if (hero.classList.contains("paused")) go();
    else stop();
  });
  video.addEventListener("error", stop);

  if (document.readyState === "complete") start();
  else window.addEventListener("load", start);
})();
