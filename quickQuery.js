/*

REQUIRES jQUERY
INCLUDE jQUERY BEFORE THIS FILE IN <HEAD>

"element" parameter: an HTML element (e.g. "#myId" or "h1")
"speed" parameter: "slow", "normal", "fast", 1000, 2000, etc. (in milliseconds)

*/


// clicking an element will initiate scroll to top of page
// style: if false, will not reformat CSS cursor
function scrollToTop(element, speed, style) {
    if (style != false)
        $(element).css("cursor", "pointer");
    $(element).on("click", function() {
        $("html, body").animate({scrollTop: 0}, speed);
    });
};


// clicking on start element will initiate scroll to destination element
// offset: +/- to move destination position down/up
// style: if false, will not reformat CSS cursor
function scrollTo(start, destination, speed, offset, style) {
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
// opacity: 0 to 1
function appear(element, speed, opacity) {
    var finalOpacity = 1;
    if (opacity)
        finalOpacity = opacity; 
    $(element).css('opacity', '0');
    $(element).fadeTo(speed, finalOpacity); 
}


// fade in an element (e.g on page load) after a certain period of time
// opacity: 0 to 1
// time: in milliseconds
function timedAppear(element, speed, opacity, time) {
    $(element).css('opacity', '0');
    setTimeout(function() {   
        appear(element, speed, opacity);
    }, time);
}


// fade in an element (e.g on page load) ONLY when you scroll to it
// works well with imgs
// opacity: 0 to 1
function lazyAppear(element, speed, opacity) {
    var appearFlag = 0; 
    $(element).css('opacity', '0');
    $(window).scroll(function() {
        if (appearFlag == 0) {
            var elemOffset = $(element).offset().top + $(element).outerHeight();
            var windowOffset = $(this).scrollTop() + $(this).height(); 
            if (windowOffset > elemOffset){            
                appear(element, speed, opacity);
                appearFlag = 1; 
            }
        }
        return false;
    });
}


// fade out element after a certain time
// there is the option to have it reappear, also after a certain time
// exitTime: the time after which the element should dissapear (default: 5 sec) 
// exitSpeed: the time it takes for the element to dissapear (default .4 sec)
// arriveTime: the time after which the element should reappear
// arriveSpeed: the time it takes for the element to reappear (default .4 sec) 
// arriveOpacity: the opacity which the element reappears at (default: 1)
// **if arriveTime is not provided the element will not reappear**
function dissapear(element, exitTime, exitSpeed, arriveTime, arriveSpeed, arriveOpacity) {
    var leaveTime = 5000; 
    var leaveSpeed = "normal"; 
    if(exitTime)
        leaveTime = exitTime;
    if(exitSpeed)
        leaveSpeed = exitSpeed; 
        
    setTimeout(function() {   
        $(element).fadeTo(leaveSpeed, 0);
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


// fade out header as you scroll down
// fade in header as you scroll up
function ghostHeader(element) {
    $(window).scroll(function(){  
        var scrollDistance = $(this).scrollTop(); 
        var bottomOfElement = $(element).offset().top + $(element).outerHeight(); 

        var opacity = 1 - (scrollDistance/(bottomOfElement)) 
        $(element).css("opacity", opacity);
    });
}


// fade out footer as you scroll up
// fade in footer as you scroll down
function ghostFooter(element) {
    $(window).scroll(function(){  
        var scrollDistance = $(this).height() + $(this).scrollTop(); 
        var startOfElement = $(element).offset().top; 
        var bottomOfElement = $(element).offset().top + $(element).outerHeight(); 
        var opacity = (scrollDistance - startOfElement)/(bottomOfElement - startOfElement);

        $(element).css("opacity", opacity);
    });
}


// change the CSS property of elementTwo by hovering over elementOne
// elementOne and elementTwo can be the same
// cssProperty: a string with a CSS property 
// cssValueOne: a string with a CSS value (will show on mouseenter)
// cssValueTwo: a string with a CSS value (will show on mouseleave)
// transition: "slow", "normal", "fast", 1000, 2000, etc.
function cssHover(elementOne, elementTwo, cssProperty, cssValueOne, cssValueTwo, transition) {
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
        $(elementTwo).css({
            transition : cssProperty + ' ' + transition + "ms " + "ease-in-out",
            WebkitTransition : cssProperty + ' ' + transition + "ms " + "ease-in-out",
            MozTransition :  cssProperty + ' ' + transition + "ms " + "ease-in-out",
            MsTransition : cssProperty + ' ' + transition + "ms " + "ease-in-out",
            OTransition : cssProperty + ' ' + transition + "ms " + "ease-in-out",

        });
    }
    $(elementOne).hover(
        function() {
            $(elementTwo).css(cssProperty, cssValueOne); 
        }, function() {
            $(elementTwo).css(cssProperty, cssValueTwo);
        }
    );
    
}
