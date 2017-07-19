/**
 * Created by IMichael on 17.07.2017.
 */

$(function() {
  // Show/hide menu
  $('.header__button-menu').click(function() {
    $('.window-menu').show();
  });

  $('.column-menu__button-close').click(function() {
    $('.window-menu').hide();
  });

  $('.column-menu__link').click(function() {
    setTimeout(function() {
      $('.window-menu').hide();
    }, 1000);
  });


  // Smooth scroll
  $('.column-menu__link, .banner__button-go-down').click(function(e) {
    e.preventDefault();

    var target = $(this.hash);
    $('html, body').stop().animate({
      'scrollTop': target.offset().top
    }, 1000);
  });
});