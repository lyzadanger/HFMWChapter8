(function() {
  var imageCaptureSupported = false;
  $(document).bind("mobileinit", function() { // no transitions: for performance
    $.extend($.mobile, { defaultPageTransition: 'none' });
    $.mobile.page.prototype.options.addBackBtn = true;
  });
  
  goTartans = function() {
    if (typeof(window.localStorage == 'object')) { // Browser supports localStorage
      addResetButton();
      $('#booths').live('pageshow', function() {
        refreshTartans();
      }).trigger('pageshow'); // Trigger once now...
    }
  };

  initDevice = function() {
    goTartans();
    document.addEventListener('deviceready', initImageCapture, false);
    //initImageCapture(); // TURN ME OFF WHEN BUILDING!!!!!!!!
  };

  function initImageCapture() {
    imageCaptureSupported = true;
    $('.foundTartan').html('Snap Photo of Tartan!');
  }

  refreshTartans = function() {
    $('ul.details').each(function() {
      var el_id     = $(this).attr('id');
      var tartanKey = 'found-' + el_id;
      if (!isFound(tartanKey) && !($('#' + tartanKey).length)) {
        var $tartanButton = $('<a></a>').attr({
          'data-role'   : 'button',
          'id'          : tartanKey,
          'class'       : 'foundTartan'
        }).html('I found it!').click(tartanFound); // I found it button
        var $buttonHolder = $('<li></li>').append($tartanButton).appendTo($(this)); 
      } else if (isFound(tartanKey)) {
        $('#vendor-' + el_id).addClass('found');
        showTartanImage(tartanKey, $(this));
      }
    });
  };
  
  addResetButton = function() {
    var $resetButton = $('<a></a>').attr({
      'id'        : 'resetButton',
      'data-role' : 'button'
    }).html('Start Over!').click(resetTartans);
    $('#booths').append($resetButton);
  };
  
  tartanFound = function(event) { // Click handler for 'found it' button
    var $tartanButton = $(event.currentTarget);
    var tartanKey = $tartanButton.attr('id');
    var $tartanList = $tartanButton.closest('ul');
    
    if(imageCaptureSupported) {
      navigator.device.capture.captureImage(function(mediaFiles) {
        var path = mediaFiles[0].fullPath;
        localStorage.setItem(tartanKey, path);
        showTartanImage(tartanKey, $tartanList);
        $tartanList.listview('refresh');
      }, captureError, {limit:1});
    } else {
      localStorage.setItem(tartanKey, 'true');
    }
    
    $(event.target).closest('li').remove(); // Bye-bye button
  };
  
  showTartanImage = function(tartanKey, $listElement) {
    var path = localStorage.getItem(tartanKey);
    if ($listElement.find('.tartanImage').length || !path || path == 'true') { return; };
    var $tartanHolder = $('<p></p>').append($('<img>').attr({
      'src'     : path,
      'class'   : 'tartanImage'
    })); 
    var $tartanElement = $('<li></li>').append($tartanHolder);
    $listElement.append('<li data-role="list-divider">My Photo of the Tartan!</li>');
    $listElement.append($tartanElement);
  };

  captureError = function(error) {
    console.log(error);
  }

  isFound = function(tartanKey) { return localStorage.getItem(tartanKey) || false; };
  
  resetTartans = function() {
    localStorage.clear();
    window.location.reload();
  };
  $(document).ready(initDevice);
})();