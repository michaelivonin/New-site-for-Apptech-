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


  // Switch images
  $('.studio__city-button').click(function() {
    if ( $(this).attr('id') === 'Omsk' ) {

      $('.studio__image_visible').hide();
      $('.studio__image_hidden').show();

      $('#SP').removeAttr('disabled');
      $('#SP').removeClass('studio__city-button_active');
      $('#SP').siblings('.studio__indicator').removeClass('studio__indicator_active');
      $('#SP').siblings('.studio__connector').removeClass('studio__connector_active');

      $(this).attr('disabled', 'disabled');
      $(this).addClass('studio__city-button_active');
      $(this).siblings('.studio__indicator').addClass('studio__indicator_active');
      $(this).siblings('.studio__connector').addClass('studio__connector_active');
    }

    if ( $(this).attr('id') === 'SP' ) {

      $('.studio__image_hidden').hide();
      $('.studio__image_visible').show();

      $('#Omsk').removeAttr('disabled');
      $('#Omsk').removeClass('studio__city-button_active');
      $('#Omsk').siblings('.studio__indicator').removeClass('studio__indicator_active');
      $('#Omsk').siblings('.studio__connector').removeClass('studio__connector_active');

      $(this).attr('disabled', 'disabled');
      $(this).addClass('studio__city-button_active');
      $(this).siblings('.studio__indicator').addClass('studio__indicator_active');
      $(this).siblings('.studio__connector').addClass('studio__connector_active');
    }
  });
});