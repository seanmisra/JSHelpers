/*REQUIRE jQUERY
INCLUDE jQUERY BEFORE THIS FILE IN <HEAD>*/

// Clicking on handle will scroll to top of webpage
// handle: an HTML element (e.g. "#myId" or "h1")
// speed: "slow", "normal", "fast", 1000, 2000, etc.
// pointer: if false, will not reformat CSS cursor
function scrollToTop (handle, speed, pointer) {
    if (pointer != false)
        $(handle).css("cursor", "pointer");
    $(handle).on("click", function() {
        $("html, body").animate({scrollTop: 0}, speed);
    });
};


// clicking on handle will scroll to a defined element
// start/destination: HTML elements (e.g. "#myId" or "h1")
// speed: "slow", "normal", "fast", 1000, 2000, etc.
// offset: +/- to move position down/up
// pointer: if false, will not reformat CSS cursor
function scrollTo (start, destination, speed, offset, pointer) {
    var end = $(destination);
    var position = 0;
    if (offset)
        position = offset;
    if (pointer != false)
        $(start).css("cursor", "pointer");
    $(start).on("click", function() {
        $("html, body").animate({scrollTop: end.offset().top + position}, speed);
    });
};