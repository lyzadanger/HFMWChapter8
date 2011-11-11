$(document).bind("mobileinit", function() {
  $.extend($.mobile, {
    defaultPageTransition: 'none'
  });
});

$(document).ready(function() {
  document.addEventListener("deviceready", function() {
    
    var captureSuccess = function(mediaFiles) {
      var path = mediaFiles[0].fullPath;
    }

    var captureError = function(error) {
      console.log(error);
    };

    var captureImage = function() {
      navigator.device.capture.captureImage(captureSuccess, captureError, {limit: 1});
    };

    $('#camera').on('click', captureImage);

  }, false);
});
