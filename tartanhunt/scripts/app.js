(function() {
  var imageCaptureSupported = false; // Browser supports mediaCaptuer?
  $(document).bind("mobileinit", function() {
    // Turn off page transitions for performance
    $.extend($.mobile, { defaultPageTransition: 'none' });
    // Add back button to nested sub-list headers
    $.mobile.page.prototype.options.addBackBtn = true;
  });

  var initPhoneGap = function() {
    if (!navigator.device || !navigator.device.capture) { return; }
    imageCaptureSupported = true;
    // Hide back button on native Android via CSS class
    if (device.platform && device.platform == 'Android') {
      $('body').addClass('android'); // Will hide back button
    }
  };
  
  var initDevice = function() {
    // If browser supports localStorage
    if (typeof(window.localStorage) == 'object') {
      // Add click handler for "I found it!" button
      $('.foundTartan').click(tartanFound);
      refreshTartans();
      addResetButton();
    }
    // Listen for phonegap readiness (only fired in native versions)
    document.addEventListener('deviceready', initPhoneGap, false);
  };
  $(document).ready(initDevice);

  // Refresh the interface to reflect the current state of tartans-found
  // Uses localStorage
  var refreshTartans = function() {
    // Refresh tartans display; check every nested list for changes
    $('ul.details').each(function() {
      var myID         = $(this).attr('id');
      var tartanKey    = 'found-' + myID;
      // Has this tartan been found?
      var foundValue   = localStorage.getItem(tartanKey);
      var isFound      = Boolean (foundValue);
      // Set some classes to indicate found-ness
      $('#vendor-'+ myID).toggleClass('found', isFound);
      $('[data-url*="'+ myID +'"]').toggleClass('found', isFound);
      $('#'+tartanKey).closest('li').toggle(!isFound);
      // If this tartan has a value in local storage, and that value
      // is not 'true', it is likely a path to a photo!
      var hasPhoto     = (isFound && foundValue != 'true') || false;
      if (hasPhoto) {
        // Show the photo on the appropriate sub-list "page"
        if (!$(this).find('.tartanImage').length) {
          var $tartanHolder = $('<p></p>').append($('<img>').attr({
            'src'     : foundValue,
            'class'   : 'tartanImage'
          })); 
          $(this).append('<li data-role="list-divider">My Photo of the Tartan!</li>');
          $('<li></li>').append($tartanHolder).appendTo($(this));
        }
      }
    });
    // Refresh the updated listviews
    $('ul').each(function() {
      if ($(this).data('listview')) { $(this).listview('refresh'); }
    });
  };
  
  // Click handler for "I found it!" button
  var tartanFound = function(event) {
    var tartanKey = $(event.currentTarget).attr('id');
    if(imageCaptureSupported) {
      // Go off and take a photo in supported browsers (hah) or
      // PhoneGap native apps
      navigator.device.capture.captureImage(function(mediaFiles) {
        localStorage.setItem(tartanKey, mediaFiles[0].fullPath);
        refreshTartans();
      }, captureError, {limit:1});
    }
    else { // Otherwise, add an entry to local storage
      localStorage.setItem(tartanKey, 'true');
      refreshTartans(); 
    }
  };
  // Error callback for captureImage
  var captureError = function(error) { console.log(error);  }

  // Add a reset button so the user can start the hunt all over!
  var addResetButton = function() {
    var $resetButton = $('<a></a>').attr('data-role','button').html('Start Over!');
    $resetButton.click(function() {
      localStorage.clear();
      refreshTartans();
    });
    $resetButton.appendTo($('#booths'));
  };
})();