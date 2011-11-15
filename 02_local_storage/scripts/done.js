(function() {
  $(document).bind("mobileinit", function() {
    $.extend($.mobile, { defaultPageTransition: 'none' });
    $.mobile.page.prototype.options.addBackBtn = true;
  });
  
  initDevice = function() {
    if (typeof(window.localStorage == 'object')) {
      $('.foundTartan').click(tartanFound);
      refreshTartans();
      addResetButton();
    }
  };
  $(document).ready(initDevice);

  refreshTartans = function() {
    $('ul.details').each(function() {
      var myID      = $(this).attr('id');
      var tartanKey = 'found-' + myID;
      var isFound   = localStorage.getItem(tartanKey);
      if (isFound) {
        $('#vendor-'+ myID).add($('[data-url*="'+ myID +'"]')).addClass('found');
        $('#' + tartanKey).closest('li').hide();
      }
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
      window.location.reload();
    });
    $resetButton.appendTo($('#booths'));
  };
})();