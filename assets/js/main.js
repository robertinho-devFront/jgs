$(document).ready(function() {
    // INITIALIZE ANIMSITION
    if ($(".animsition").length) {
        $(".animsition").animsition({
            inClass: 'fade-in-up-sm',
            outClass: 'fade-out-up-sm',
            inDuration: 1100,
            outDuration: 800,
            linkElement: '.animsition-link',
            loading: true,
            loadingParentElement: 'body',
            unSupportCss: ['animation-duration', '-webkit-animation-duration', '-o-animation-duration'],
            overlay: false,
            overlayClass: 'animsition-overlay-slie',
            overlayParentElement: 'body'
        });
    }

    // INPUTS EVENTS
    $('.input_1 input, .textarea_1 textarea').on('focus', function() {
        $(this).next("span").addClass("active");
    }).on('blur', function() {
        if ($(this).val() === "") {
            $(this).next("span").removeClass("active");
        }
    });

    // TABS
    $(".bottom-line").css({
        width: $(".tab nav a").first().width() + 20 + "px" // 20 = element's padding * 2
    });
    var _current_index = 0;
    $(".tab nav a").on('click', function(e) {
        e.preventDefault(); // Ajoutez cette ligne pour éviter le comportement par défaut du lien
        var _this = $(this);
        var _index = _this.index();
        if (_current_index !== _index) {
            $(".tab nav a").each(function() {
                if ($(this).hasClass("current")) $(this).removeClass("current");
            });
            _this.addClass("current");
            $(".bottom-line").css({
                left: _this.offset().left - _this.parent().offset().left + "px",
                width: _this.width() + 20 + "px" // 20 = element's padding * 2
            });
            $(".tab_single.shown").fadeOut(200);
            setTimeout(function() {
                $(".tab_single").eq(_index).fadeIn(200).addClass("shown");
            }, 200);
            _current_index = _index;
        }
    });

    // NAVBAR
    var _link = $("nav.desktop-nav ul.first-level").children("li");
    var shown = false;
    $(".menu-icon").on('click', function() {
        var _this = $(this);
        $("nav.mobile-nav").slideToggle(200);
        if (!shown) {
            _this.children("div").css("width", "30px");
            shown = true;
        } else {
            _this.children("div").first().css("width", "30px");
            _this.children("div").eq(1).css("width", "15px");
            _this.children("div").eq(2).css("width", "20px");
            shown = false;
        }
    });

// Gestionnaire de formulaire de contact
$(document).ready(function() {
    $('#main-contact-form').submit(function(e) {
        e.preventDefault(); // Empêche l'envoi du formulaire par défaut

        var formData = $(this).serialize(); // Récupérer les données du formulaire

        $.ajax({
            type: 'POST',
            url: 'sendemail.php',
            data: formData,
            success: function(response) {
                console.log(response);
                if (response.trim() === 'success') {
                    alert('Votre message a été envoyé avec succès !');
                } else {
                    alert('Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer plus tard.');
                }
            },
            error: function(xhr, status, error) {
                console.error('Erreur AJAX:', xhr.responseText, status, error);
                alert('Une erreur technique est survenue lors de l\'envoi du message. Veuillez réessayer plus tard.');
            }
        });
    });
});


    // Dropdown - desktop
    _link.hover(function(e) {
        e.preventDefault();
        var _this = $(this);
        if (_this.children("ul.second-level").html() !== undefined) {
            if (e.type === "mouseenter") {
                _this.children("ul.second-level").slideDown(200);
            } else {
                _this.children("ul.second-level").slideUp(200);
            }
        }
    });

    // Carousel
    $("#owl-demo").owlCarousel({
        autoPlay: 3000,
        items: 4,
        itemsDesktop: [1199, 5],
        itemsDesktopSmall: [979, 3]
    });

    // Dropdown - mobile
    $("nav.mobile-nav").html($("nav.desktop-nav").html());
    var mobile_link = $("nav.mobile-nav ul.first-level").children("li");
    mobile_link.children("a").on('click', function(e) {
        var _this = $(this);
        var submenu_exists = (_this.next("ul.second-level").html() === undefined) ? false : true;
        if (submenu_exists) {
            e.preventDefault();
            $(".down").slideUp(200);
            if (_this.next("ul.second-level").hasClass("down")) {
                _this.next("ul.second-level").removeClass("down");
            } else {
                $(".down").removeClass("down");
                _this.next("ul.second-level").slideDown(200);
                _this.next("ul.second-level").addClass("down");
            }
        }
    });
});