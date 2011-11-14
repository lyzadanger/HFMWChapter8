(function() {

  goTartans = function() {
    if (typeof(window.localStorage == 'object')) {
      addResetButton();
      $('#booths').live('pageshow', function() {
        refreshTartans();
      }).trigger('pageshow');
    }
  };
  
  initDevice = function() {
    goTartans();
  };
  $(document).ready(initDevice);

  refreshTartans = function() {
    $('ul.details').each(function() {
      var el_id     = $(this).attr('id');
      var tartanKey = 'found-' + el_id;
      if (!isFound(tartanKey) && !($('#' + tartanKey).length)) {
        var $tartanButton = $('<a></a>').attr({
          'data-role'   : 'button',
          'id'          : tartanKey,
          'class'       : 'foundTartan'
        }).html('I found it!').click(tartanFound);
        var $buttonHolder = $('<li></li>').append($tartanButton).appendTo($(this)); 
      } else if (isFound(tartanKey)) {
        $('#vendor-' + el_id).addClass('found');
        $('[data-url*="' + el_id + '"]').addClass('found');
      }
    });
  };
  
  tartanFound = function(event) {
    var $tartanButton = $(event.currentTarget);
    var tartanKey = $tartanButton.attr('id');
    localStorage.setItem(tartanKey, 'true');
    $(event.target).closest('li').remove();
  };

  isFound = function(tartanKey) { return localStorage.getItem(tartanKey) || false; };
  
  addResetButton = function() {
    var $resetButton = $('<a></a>').attr({
      'id'        : 'resetButton',
      'data-role' : 'button'
    }).html('Start Over!').click(resetTartans);
    $('#booths').append($resetButton);
  };
  
  resetTartans = function() {
    localStorage.clear();
    window.location.reload();
  };
})();