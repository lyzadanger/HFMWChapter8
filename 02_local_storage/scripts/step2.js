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

  };
  
  tartanFound = function(event) {
    var tartanKey = $(event.currentTarget).attr('id');
    localStorage.setItem(tartanKey, 'true');
    refreshTartans(); 
  };

  addResetButton = function() {

  };
})();