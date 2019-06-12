/* ---------------------------------------------------------
          Jquery easing page-scroll
------------------------------------------------------------ */
  $('a.page-scroll').bind('click', function (event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: $($anchor.attr('href')).offset().top - 0
    }, 1000, 'easeInOutExpo');
    event.preventDefault();
  });
  

/* ---------------------------------------------------------
        Back to Top Main
------------------------------------------------------------ */
    $("#back-top").hide();
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('#back-top').fadeIn();
        } else {
            $('#back-top').fadeOut();
        }
    });
    $("#back-top a").click(function(e) {
        e.preventDefault();
        $("html, body").animate({
            scrollTop: 0
        }, "slow");
        return false;
    });
