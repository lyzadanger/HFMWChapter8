$(document).bind("mobileinit", function() {
  $.extend($.mobile, {
    defaultPageTransition: 'none'
  });
});

$(document).ready(function() {
  document.addEventListener("deviceready", function() {
    alert(device.platform);
  }, false);
});
