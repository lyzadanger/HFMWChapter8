(function() {
  $(document).bind("mobileinit", function() {
    $.extend($.mobile, { defaultPageTransition: 'none' });
    $.mobile.page.prototype.options.addBackBtn = true;
  });
  
  var initDevice = function() {
    if (typeof(window.localStorage) == 'object') {
      $('.foundTartan').click(tartanFound);
      addResetButton();
    }
  };
  $(document).ready(initDevice);
  
  var tartanFound = function(event) {
    var tartanKey = $(event.currentTarget).attr('id');
    localStorage.setItem(tartanKey, 'true');
  };

  var addResetButton = function() {
    var $resetButton = $('<a></a>').attr('data-role','button').html('Start Over!');
    $resetButton.click(function() {
      localStorage.clear();
    });
    $resetButton.appendTo($('#booths'));
  };
})();