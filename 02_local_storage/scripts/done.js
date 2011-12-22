(function() {
  $(document).bind("mobileinit", function() {
    $.extend($.mobile, { defaultPageTransition: 'none' });
    $.mobile.page.prototype.options.addBackBtn = true;
  });
  
  initDevice = function() {
    if (typeof(window.localStorage) == 'object') {
      $('.foundTartan').click(tartanFound);
      refreshTartans();
      addResetButton();
    }
  };
  $(document).ready(initDevice);

  refreshTartans = function() {
    $('ul.details').each(function() {
      var myID         = $(this).attr('id');
      var tartanKey    = 'found-' + myID;
      var foundValue   = localStorage.getItem(tartanKey);
      var isFound      = Boolean (foundValue);
      $('#vendor-'+ myID).toggleClass('found', isFound);
      $('[data-url*="'+ myID +'"]').toggleClass('found', isFound);
      $('#'+tartanKey).closest('li').toggle(!isFound);
    });
    $('ul').each(function() {
      if ($(this).data('listview')) { $(this).listview('refresh'); }
    });
  };
  
  tartanFound = function(event) {
    var tartanKey = $(event.currentTarget).attr('id');
    localStorage.setItem(tartanKey, 'true');
    refreshTartans(); 
  };

  addResetButton = function() {
    var $resetButton = $('<a></a>').attr('data-role','button').html('Start Over!');
    $resetButton.click(function() {
      localStorage.clear();
      refreshTartans();
    });
    $resetButton.appendTo($('#booths'));
  };
})();