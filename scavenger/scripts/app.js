$(document).bind("mobileinit", function() {
  $.extend($.mobile, {
    defaultPageTransition: 'none'
  });
});

$(document).ready(function() {
  document.addEventListener("deviceready", function() {
    
    var captureSuccess = function(mediaFiles) {
      navigator.notification.alert('Success!', null, 'Success');
    }

    var captureError = function(error) {
      var msg = 'An error occurred during capture: ' + error.code;
      navigator.notification.alert(msg, null, 'Error'); 
    };

    var captureImage = function() {
      navigator.device.capture.captureImage(captureSuccess, captureError, {limit: 1});
    };

    $('#camera').click(captureImage);

  }, false);
});
