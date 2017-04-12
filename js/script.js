/* COUNTERS */
function counter() {
    $('.count').each(function () {
        $(this).prop('Counter', 0).animate({
            Counter: $(this).text()
        }, {
            duration: 6000,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
    });
}

var blockScrollActive = false;

function activeElementMenu() {
    /* SKRYPT SLEDZACY SCROLL, DODANIE KLASY ACTIVE*/
    var positionsElementsHeight = [];
    var positionsElementsId = [];
    var offsetHeight = $(window).height() - 180;
    $(".section").each(function () {
        var positionsElement = $(this).position();
        positionsElementsHeight.push(parseInt(positionsElement.top));

        positionsElementsId.push($(this).attr('id'));
    });

    var activeElementMenu = null;

    for (var i in positionsElementsHeight) {
        var scrollTop = $(window).scrollTop();

        if (activeElementMenu != positionsElementsId[i]) {
            if (scrollTop >= (positionsElementsHeight[i] - offsetHeight)) {

                if (!$("#" + positionsElementsId[i]).hasClass('start-effects')) {

                    $("#" + positionsElementsId[i]).addClass('start-effects');
                }
            }

            if (scrollTop >= (positionsElementsHeight[i] - 180)) {

                $(".navbar-top .nav a.active").removeClass('active');

                $(".navbar-top .nav a[href='#" + positionsElementsId[i] + "']").addClass('active');

                activeElementMenu = positionsElementsId[i];
            }
        }
    }
}


less.pageLoadFinished.then(function () {

    /* COUNTERS - POBRANIE WYSOKOSCI ELEMENTOW*/
    var positionsCounters = $("#counters").position();
    var positionsCountersTop = 10 + parseInt(positionsCounters.top) - parseInt($(window).height());
    /* WYSOKOSC INTRO*/
    var heightMenu = parseInt($("#intro").outerHeight()) - parseInt($(".navbar-top").outerHeight());

    $(window).scroll(function () {
        var scrollTop = parseInt($(window).scrollTop());

        if (scrollTop >= heightMenu) {
            if (!$(".navbar-top").hasClass('navbar-black')) {
                $(".navbar-top").addClass('navbar-black');
            }
        } else if ($(".navbar-top").hasClass('navbar-black')) {
            $(".navbar-top").removeClass('navbar-black');
        }

        /*COUNTERS START*/
        if (!$("#counters").hasClass('animated')) {
            if (scrollTop >= positionsCountersTop) {
                $("#counters").addClass('animated');
                counter();
            }
        }
        /* DODANIE KLASY ANIMUJACEJ */
        if (!blockScrollActive) {
            activeElementMenu();
        }
        /* DODANIE KLASY ANIMUJACEJ - KONIEC */
    });

    /* SCROLLOWANIE DO SEKCJI PO KLIKNIECIU W LINK MENU */
    $(".navbar-top .nav a").click(function () {
        var selector = $(this).attr('href');

        if ($(selector).length > 0) {
            blockScrollActive = true;
            $(".navbar-top .nav a.active").removeClass('active');
            $(this).addClass('active');

            var positions = $(selector).position();

            $("html, body").stop().animate({
                scrollTop: positions.top
            }, '500', 'swing', function () {
                activeElementMenu();
                blockScrollActive = false;
            });
        }
        return false;
    });

});
