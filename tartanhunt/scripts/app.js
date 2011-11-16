(function() {
  var imageCaptureSupported = false;
  $(document).bind("mobileinit", function() {
    $.extend($.mobile, { defaultPageTransition: 'none' });
    $.mobile.page.prototype.options.addBackBtn = true;
  });

  function initPhoneGap() {
    if (!navigator.device || !navigator.device.capture) { return; }
    if (device.platform && device.platform == 'Android') {
      $('body').addClass('android'); // Will hide back button
    }
    imageCaptureSupported = true;
  }

  initDevice = function() {
    if (typeof(window.localStorage == 'object')) {
      $('.foundTartan').click(tartanFound);
      refreshTartans();
      addResetButton();
    }
    document.addEventListener('deviceready', initPhoneGap, false);
  };
  $(document).ready(initDevice);

  refreshTartans = function() {
    $('ul.details').each(function() {
      var myID      = $(this).attr('id');
      var tartanKey = 'found-' + myID;
      var isFound   = localStorage.getItem(tartanKey);
      if (isFound) {
        $('#vendor-'+ myID).add($('[data-url*="'+ myID +'"]')).addClass('found');
        var hasPhoto = isFound != 'true' || false;
        if (hasPhoto && !$(this).find('.tartanImage').length) {
          var $tartanHolder = $('<p></p>').append($('<img>').attr({
            'src'     : isFound,
            'class'   : 'tartanImage'
          })); 
          $(this).append('<li data-role="list-divider">My Photo of the Tartan!</li>');
          $('<li></li>').append($tartanHolder).appendTo($(this));
        }
        $('#' + tartanKey).closest('li').hide();
      }
    });
    $('ul').each(function() {
      if ($(this).data('listview')) { $(this).listview('refresh'); }
    });
  };
  
  tartanFound = function(event) {
    var tartanKey = $(event.currentTarget).attr('id');
    if(imageCaptureSupported) {
      navigator.device.capture.captureImage(function(mediaFiles) {
        localStorage.setItem(tartanKey, mediaFiles[0].fullPath);
        refreshTartans();
      }, captureError, {limit:1});
    }
    else { 
      localStorage.setItem(tartanKey, 'true');
      refreshTartans(); 
    }
  };
  captureError = function(error) { console.log(error);  }

  addResetButton = function() {
    var $resetButton = $('<a></a>').attr('data-role','button').html('Start Over!');
    $resetButton.click(function() {
      localStorage.clear();
      window.location.reload();
    });
    $resetButton.appendTo($('#booths'));
  };
})();