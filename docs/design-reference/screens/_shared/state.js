// Design files only: show one state at a time. ?state=wrong or <body data-state="wrong">.
(function () {
  var s = new URLSearchParams(location.search).get('state') || document.body.dataset.state || 'default';
  document.body.dataset.state = s;
  document.querySelectorAll('[data-only]').forEach(function (el) {
    el.hidden = el.dataset.only.split(' ').indexOf(s) === -1;
  });
})();
