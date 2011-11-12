(function() {
  $(document).bind("mobileinit", function() { // no transitions: for performance
    $.extend($.mobile, { defaultPageTransition: 'none' });
  });
})();