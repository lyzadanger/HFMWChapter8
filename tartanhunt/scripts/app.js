(function() {
  var imageCaptureSupported = false;
  $(document).bind("mobileinit", function() { // no transitions: for performance
    $.extend($.mobile, { defaultPageTransition: 'none' });
    $.mobile.page.prototype.options.addBackBtn = true;
  });

  function initPhoneGap() {
    if (!navigator.device || !navigator.device.capture) { return; }
    if (device.platform && device.platform == 'Android') {
      $('[data-rel="back"]').hide();
    }
    imageCaptureSupported = true;
    $('.foundTartan').html('Snap Photo of Tartan!');
  }

  initDevice = function() {
    if (typeof(window.localStorage == 'object')) { // Browser supports localStorage
      $('.foundTartan').click(tartanFound);
      $('#booths').live('pageshow', function() { refreshTartans(); });
      refreshTartans(); // Trigger once now...
      addResetButton();
    }
    document.addEventListener('deviceready', initPhoneGap, false);
  };
  $(document).ready(initDevice);

  refreshTartans = function() {
    $('ul.details').each(function() {
      var el_id     = $(this).attr('id');
      var tartanKey = 'found-' + el_id;
      if (isFound(tartanKey)) {
        $('#vendor-' + el_id).addClass('found');
        $('[data-url*="' + el_id + '"]').addClass('found');
        showTartanImage(tartanKey, $(this));
        $('#' + tartanKey).closest('li').hide();
      }
    });
    $('ul').each(function() {
      if ($(this).data('listview')) {
        $(this).listview('refresh');
      }
    });
  };
  
  tartanFound = function(event) { // Click handler for 'found it' button
    var $tartanButton = $(event.currentTarget);
    var tartanKey     = $tartanButton.attr('id');
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
  
  showTartanImage = function(tartanKey, $listElement) {
    var path      = localStorage.getItem(tartanKey);
    if ($listElement.find('.tartanImage').length || !path || path == 'true') { return; };
    var $tartanHolder = $('<p></p>').append($('<img>').attr({
      'src'     : path,
      'class'   : 'tartanImage'
    })); 
    var $tartanElement = $('<li></li>').append($tartanHolder);
    $listElement.append('<li data-role="list-divider">My Photo of the Tartan!</li>');
    $listElement.append($tartanElement);
  };

  captureError = function(error) { console.log(error);  }
  isFound = function(tartanKey) { return localStorage.getItem(tartanKey) || false; };

  addResetButton = function() {
    var $resetButton = $('<a></a>').attr('data-role','button').html('Start Over!');
    $resetButton.click(resetTartans).appendTo($('#booths'));
  };
  
  resetTartans = function() {
    localStorage.clear();
    window.location.reload();
  };
})();