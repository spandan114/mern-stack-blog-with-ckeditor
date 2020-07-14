//===== FOR NAV ============//
import $ from'jquery';

$(document).ready(function() {
    $(".navbar-toggler, .overlay").on("click", function() {
      $(".mobilemenu, .overlay").toggleClass("open");
    });
  });