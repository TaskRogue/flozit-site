/* The phone menu is a details element and works without this file. This only closes it when a
   link in it is tapped (the home page's links jump within the page, so nothing reloads), on
   Escape, and on a tap outside it. No cookies, no tracking. */
(function () {
  var menu = document.querySelector(".menu");
  if (!menu) return;
  function close() { menu.removeAttribute("open"); }
  menu.addEventListener("click", function (e) {
    if (e.target.closest && e.target.closest(".sheet a")) close();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && menu.open) { close(); menu.querySelector("summary").focus(); }
  });
  document.addEventListener("click", function (e) {
    if (menu.open && !menu.contains(e.target)) close();
  });
})();
