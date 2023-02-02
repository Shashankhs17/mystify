$(document).ready(function () {

    // AOS.init({
    //     offset: 200,
    //     duration: 400,
    //     easing: 'ease-in-sine',
    //     delay: 75,
    //     once: true,
    // });
    
    // Navigation bar
    // Toggling between top and side navigation based on screen width
    function toggleNav () {
        let nav = $('nav');
        if (window.matchMedia("(max-width : 600px)").matches) {
            nav.removeClass('side-nav');
            nav.removeClass('top-nav');
            nav.addClass('side-nav');
        } else {
            nav.removeClass('side-nav');
            nav.removeClass('top-nav');
            nav.addClass('top-nav');
        }
    }
    toggleNav();
    $(window).resize(toggleNav);


    // Hide Navbar on scroll 
    let prev = 0;
    let $window = $(window);
    let nav = $('.top-nav');

    $window.on('scroll', function() {
        var scrollTop = $window.scrollTop();
        nav.toggleClass('hidden', scrollTop > prev);
        prev = scrollTop;
    }); 

    // $window.on('scroll', function() {
    //     if ($window.scrollTop() > 100 && nav.hasClass('hidden')) {
    //         nav.removeClass('hidden');

    //         if ($window.scrollTop() > 150) {
    //             setTimeout(function() {
    //                 nav.addClass('hidden');
    //                 console.log('1', $window.scrollTop());
    //             }, 4000);
    //         }
    //     } else {
    //         if ($window.scrollTop() > 150) {
    //             setTimeout(function() {
    //                 nav.addClass('hidden');
    //                 console.log('2', $window.scrollTop());
    //             }, 4000);
    //         }
    //     }
    // });

    // Changing active tab
    function changeActiveTab (event) {
        if (event.currentTarget != undefined) {
            $('.top-nav .nav-items a').removeClass('active');
            $(event.currentTarget).addClass('active');
        } else {
            $('.top-nav .nav-items a').removeClass('active');
            $(event).addClass('active');
        }
    }

    $('.top-nav .nav-items a:not(.icon)').on('click', changeActiveTab);

    // Hamburger button action in sidebar
    $('nav .icon').on('click', function () {
        let bar = $('.side-nav');
        if (bar.hasClass('show')) {
            bar.removeClass('show');
        } else {
            bar.addClass('show');
        }
    });

    // Close sidebar on selection of a section
    $('.side-nav a').on('click', function () {
        let bar = $('.side-nav');
        if (bar.hasClass('show')) {
            bar.removeClass('show');
        } else {
            bar.addClass('show');
        }
    });

    // Scroll Spy to change active tab in navigation bar
    $(window).on('scroll', function () {
        let $window = $(window);
        let currentScroll = $window.scrollTop(), currentSection;
        let sections = $('a:not(.arrow-down)');
        for (section of sections) {
            if (section.hash !== "") {
                if ($(section.hash).offset().top <= currentScroll + $('nav').outerHeight()) {
                    currentSection = section;
                }
            }
        }
        // console.log(currentSection);
        changeActiveTab(currentSection);
    });
    // Navigation bar ends 

    // Smooth scroll effect
    $('a').on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
    
            $('html, body').animate({
            scrollTop: $(hash).offset().top
            }, 800, function(){
            return false;
            });
        }
    });

    // Accordion animation
    $('.accordion').click(function () {
        if ($(this).hasClass('active')) {
            $('.accordion').removeClass('active');
        } else {
            $('.accordion').removeClass('active');
            $(this).addClass('active');
        }

        $('.panel').slideUp(300);
        if ($(this).hasClass('active')) {
            $(this).siblings('.panel').slideDown(300);
        }
    });

    // Bottom to Top button
    let bottomToTop = $('.bottom-to-top');
    $window.on('scroll', function() {
        var scrollTop = $window.scrollTop();
        if (scrollTop > 100) {
            bottomToTop.fadeIn('slow');
        } else {
            bottomToTop.fadeOut('slow');
        }
    });

        $.fn.countTo = function(options) {
            // merge the default plugin settings with the custom options
            options = $.extend({}, $.fn.countTo.defaults, options || {});
            
            // how many times to update the value, and how much to increment the value on each update
            var loops = Math.ceil(options.speed / options.refreshInterval),
                increment = (options.to - options.from) / loops;
            
            return $(this).each(function() {
                var _this = this,
                    loopCount = 0,
                    value = options.from,
                    interval = setInterval(updateTimer, options.refreshInterval);
                
                function updateTimer() {
                    value += increment;
                    loopCount++;
                    $(_this).html(value.toFixed(options.decimals));
                    
                    if (typeof(options.onUpdate) == 'function') {
                        options.onUpdate.call(_this, value);
                    }
                    
                    if (loopCount >= loops) {
                        clearInterval(interval);
                        value = options.to;
                        
                        if (typeof(options.onComplete) == 'function') {
                            options.onComplete.call(_this, value);
                        }
                    }
                }
            });
        };
        
        $.fn.countTo.defaults = {
            from: 0,  // the number the element should start at
            to: 100,  // the number the element should end at
            speed: 1000,  // how long it should take to count between the target numbers
            refreshInterval: 100,  // how often the element should be updated
            decimals: 0,  // the number of decimal places to show
            onUpdate: null,  // callback method for every time the element is updated,
            onComplete: null,  // callback method for when the element finishes updating
        };

    // Prizes counter
    // $('.counter').countTo({
    //     from: 0,
    //     to: 1500,
    //     speed: 1000,
    //     refreshInterval: 50,
    //     onComplete: function(value) {
    //         console.debug(this);
    //     }
    // });

    // Randomly Scatter lottie files in the background
    function RandomlyScatterAnimation (width) {
        if (window.matchMedia(`(min-width : ${width})`).matches) {
            let lottieHtml = $('.lottie-animation').html();
            for (let i = 0; i < 100; i+=6) {
                for (let j = 0; j < 100; j+=25) {
                    lottieHtml += 
                    `
                    <lottie-player src="https://assets6.lottiefiles.com/packages/lf20_6ifezefg.json" background="transparent" speed="0.1" mode="bounce" loop autoplay style="top: ${i}%; left: ${j}%"></lottie-player>
                    `;
                }
            }
            $('.lottie-animation').html(lottieHtml);
        }
    }
    RandomlyScatterAnimation('800px');
});