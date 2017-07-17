/**
 * Created by IMichael on 17.07.2017.
 */

$(function() {
  $('.header__button-menu').click(function() {
    $('.window-menu').show();
  });

  $('.column-menu__button-close').click(function() {
    $('.window-menu').hide();
  });
});