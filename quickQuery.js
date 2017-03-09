/*REQUIRE jQUERY
INCLUDE jQUERY BEFORE THIS FILE IN <HEAD>*/

// Clicking on handle will scroll to top of webpage
// handle: an HTML element (e.g. "#myId" or "h1")
// speed: "slow", "normal", "fast", 1000, 2000, etc.
// style: if false, will not reformat CSS cursor
function scrollToTop (handle, speed, style) {
    if (style != false)
        $(handle).css("cursor", "pointer");
    $(handle).on("click", function() {
        $("html, body").animate({scrollTop: 0}, speed);
    });
};


// clicking on handle will scroll to a defined element
// start/destination: HTML elements (e.g. "#myId" or "h1")
// speed: "slow", "normal", "fast", 1000, 2000, etc.
// offset: +/- to move position down/up
// style: if false, will not reformat CSS cursor
function scrollTo (start, destination, speed, offset, style) {
    var end = $(destination);
    var position = 0;
    if (offset)
        position = offset;
    if (style != false)
        $(start).css("cursor", "pointer");
    $(start).on("click", function() {
        $("html, body").animate({scrollTop: end.offset().top + position}, speed);
    });
};


// fade in an element (e.g on page load)
// element: HTML elements (e.g. "#myId" or "h1")
// speed: "slow", "normal", "fast", 1000, 2000, etc.
// opacity: 0 to 1
function appear (element, speed, opacity) {
    var finalOpacity = 1;
    if (opacity)
        finalOpacity = opacity; 
    $(element).css('opacity', '0');
    $(element).fadeTo(speed, finalOpacity); 
}


// fade in an element (e.g on page load) ONLY when you scroll to it
// element: HTML elements (e.g. "#myId" or "h1")
// speed: "slow", "normal", "fast", 1000, 2000, etc.
// opacity: 0 to 1
function lazyAppear(element, speed, opacity) {
    $(element).css('opacity', '0');
    $(window).scroll(function() {
        var elemOffset = $(element).offset().top;
        var elemHeight = $(element).outerHeight();
        var windowScroll = $(this).scrollTop();
        var windowHeight = $(this).height();
        if (windowScroll + windowHeight > elemOffset + elemHeight){
            appear(element, speed, opacity);
            return;
        }
    });
}


// fade out element after a certain time
// there is the option to have it reappear, also after a certain time
// element: HTML elements (e.g. "#myId" or "h1")
// exitTime: the time after which the element should dissapear (default: 5 sec) 
// exitSpeed: the time it takes for the element to dissapear (default .4 sec)
// arriveTime: the time after which the element should reappear
// arriveSpeed: the time it takes for the element to reappear (default .4 sec) 
// arriveOpacity: the opacity which the element reappears at (default: 1)
// **if arriveTime is not provided the element will not reappear**
function dissapear (element, exitTime, exitSpeed, arriveTime, arriveSpeed, arriveOpacity) {
    var leaveTime = 5000; 
    var leaveSpeed = "normal"; 
    if(exitTime)
        leaveTime = exitTime;
    if(exitSpeed)
        leaveSpeed = exitSpeed; 
        
    setTimeout(function() {   
        $(element).fadeTo(exitTime, 0);
        if(arriveTime) {
            var enterSpeed = "normal";
            var enterOpacity = 1; 
            var enterTime = arriveTime; 
            if (arriveSpeed)
                enterSpeed = arriveSpeed; 
            if (arriveOpacity)
                enterOpacity = arriveOpacity; 
            setTimeout(function() {   
                $(element).fadeTo(enterSpeed, enterOpacity); 
            }, enterTime);
        }
    }, leaveTime);
}


// element: HTML elements (e.g. "#myId" or "h1")
// cssProperty: a string with a CSS property 
// cssValueOne: a string with a CSS value (will show on mouseenter)
// cssValueTwo: a string with a CSS value (will show on mouseleave)
// transition: "slow", "normal", "fast", 1000, 2000, etc.
function cssHover (element, cssProperty, cssValueOne, cssValueTwo, transition) {
    if (transition) {
        if (transition == "fast") {
            transition = 200; 
        }
        else if (transition == "normal") {
            transition = 400; 
        }
        else if (transition == "slow") {
            transition = 600; 
        }
        $(element).css({
            transition : cssProperty + ' ' + transition + "ms " + "ease-in-out",
            WebkitTransition : cssProperty + ' ' + transition + "ms " + "ease-in-out",
            MozTransition :  cssProperty + ' ' + transition + "ms " + "ease-in-out",
            MsTransition : cssProperty + ' ' + transition + "ms " + "ease-in-out",
            OTransition : cssProperty + ' ' + transition + "ms " + "ease-in-out",

        });
    }
    
    $(element).hover(
        function() {
            $(this).css(cssProperty, cssValueOne); 
        }, function() {
            $(this).css(cssProperty, cssValueTwo);
        }
    );
} 



