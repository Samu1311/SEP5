$(document).ready(function() {
    $('#foundersCarousel').on('slid.bs.carousel', function (event) {
        var $next = $(event.relatedTarget);
        var nextId = $next.attr('id').replace('-img', '');

        // After the slide transition completes, hide all founder divs
        $('#founder1, #founder2, #founder3, #founder4').hide();

        // Fade in the corresponding founder div
        $('#' + nextId).fadeIn(500);
    });
});
