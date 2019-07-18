/**
 * Created by IMichael on 17.07.2017.
 */

$(function() {
  // Show/hide menu
  $('.header__button-menu').click(function() {
    $('.window-menu').show();
    $('body').addClass('fixed');
  });

  $('.column-menu__button-close').click(function() {
    $('.window-menu').hide();
    $('body').removeClass('fixed');
  });

  $('.column-menu__link').click(function() {
    setTimeout(function() {
      $('body').removeClass('fixed');
    }, 750);

    setTimeout(function() {
      $('.window-menu').hide();
    }, 1000);
  });


  // Smooth scroll
  $('.column-menu__link, .banner__button-go-down').click(function(e) {
    e.preventDefault();

    var delay = 1000;

    switch ($(this).parent().index('li')) {
      case 1:
        delay += 250;
        break;

      case 2:
        delay += 500;
        break;

      case 3:
        delay += 750;
        break;

      case 4:
        delay += 1000;
        break;

      case 5:
        delay += 1125;
        break;

      case 6:
        delay += 1200;
        break;
    }

    var target = $(this.hash);
    $('html, body').stop().animate({
      'scrollTop': target.offset().top
    }, delay);
  });


  // Switch images
  $('.studio__city-button').click(function() {
    if ( $(this).attr('id') === 'SP' ) {

      $('.studio__image_visible').hide();
      $('.studio__image_hidden').show();

      $('#Omsk').removeAttr('disabled');
      $('#Omsk').removeClass('studio__city-button_active');
      $('#Omsk').siblings('.studio__indicator').removeClass('studio__indicator_active');
      $('#Omsk').siblings('.studio__connector').removeClass('studio__connector_active');

      $(this).attr('disabled', 'disabled');
      $(this).addClass('studio__city-button_active');
      $(this).siblings('.studio__indicator').addClass('studio__indicator_active');
      $(this).siblings('.studio__connector').addClass('studio__connector_active');
    }

    if ( $(this).attr('id') === 'Omsk' ) {

      $('.studio__image_hidden').hide();
      $('.studio__image_visible').show();

      $('#SP').removeAttr('disabled');
      $('#SP').removeClass('studio__city-button_active');
      $('#SP').siblings('.studio__indicator').removeClass('studio__indicator_active');
      $('#SP').siblings('.studio__connector').removeClass('studio__connector_active');

      $(this).attr('disabled', 'disabled');
      $(this).addClass('studio__city-button_active');
      $(this).siblings('.studio__indicator').addClass('studio__indicator_active');
      $(this).siblings('.studio__connector').addClass('studio__connector_active');
    }
  });
});