$(document).bind("mobileinit", function() {
  $.extend($.mobile, {
    defaultPageTransition: 'none'
  });
});

$(document).ready(function() {
  document.addEventListener("deviceready", function() {

    $('#camera').click(function() {
      navigator.camera.getPicture(
        function(imageURI) {
          alert(imageURI);
        },
        function (message) {
          alert(message);
        },
        {
          quality: 50,
          destinationType: Camera.DestinationType.FILE_URI
        }
      );
    });

  }, false);
});
