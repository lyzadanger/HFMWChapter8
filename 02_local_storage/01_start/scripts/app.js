(function() {
  $(document).bind("mobileinit", function() { // no transitions: for performance
    $.extend($.mobile, { defaultPageTransition: 'none' });
  });
  // START HERE //
  goTartans = function() {
    if (typeof(window.localStorage == 'object')) { // Browser supports localStorage
      addResetButton();
      $('#booths').live('pageshow', function() {
        refreshTartans();
      }).trigger('pageshow'); // Trigger once now...
    }
  };
  
  refreshTartans = function() {
    $('ul.details').each(function() {
      var el_id     = $(this).attr('id');
      var tartanKey = 'found-' + el_id;
      if (!isFound(tartanKey) && !($('#' + tartanKey).length)) {
        var $tartanButton = $('<a></a>').attr({
          'data-role'   : 'button',
          'id'          : tartanKey
        }).html('I found it!').click(tartanFound); // I found it button
        var $buttonHolder = $('<li></li>').append($tartanButton).appendTo($(this)); 
      } else if (isFound(tartanKey)) {
        $('#vendor-' + el_id).addClass('found');
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
    addFound($(event.currentTarget).attr('id'));
    $(event.target).closest('li').remove(); // Bye-bye button
  };

  addFound = function(tartanKey) {
    localStorage.setItem(tartanKey, 'true');
    $.mobile.changePage(''); // Go back to the landing "page"
  }

  isFound = function(tartanKey) { return localStorage.getItem(tartanKey) || false; };
  
  resetTartans = function() {
    localStorage.clear();
    window.location.reload();
  };
  $(document).ready(goTartans);
})();