(function ($) {
  init();
  function init() {
    hamburgerMenu();
  }

  function hamburgerMenu() {
    // メニュー展開時に背景を固定
    const backgroundFix = (bool) => {
      if (bool) {
        const scrollY = window.scrollY;
        $("body").css({
          position: "fixed",
          top: -scrollY,
          left: "0",
          right: "0",
        });
      } else {
        const scrollY = parseInt($("body").css("top") || "0");
        $("body").attr("style", "");
        window.scrollTo(0, scrollY * -1);
      }
    };

    // 変数定義
    const CLASS = "-active";
    let flg = false;

    const $hamburger = $("#js-hamburger");
    const $menu = $(".js-nav-area");

    // メニュー開閉制御
    $hamburger.on("click", function (e) {
      $(this).toggleClass(CLASS);
      $menu.toggleClass(CLASS);

      if (flg) {
        backgroundFix(false);
        $hamburger.attr("aria-expanded", "false").focus();
        flg = false;
      } else {
        backgroundFix(true);
        $hamburger.attr("aria-expanded", "true");
        flg = true;
      }
    });

    $(window).on("keydown", function (event) {
      if (event.key === "Escape") {
        $hamburger.removeClass(CLASS);
        $menu.removeClass(CLASS);

        backgroundFix(false);
        $hamburger.focus().attr("aria-expanded", "false");
        flg = false;
      }
    });

    // フォーカストラップ制御
    $("#js-focus-trap").on("focus", function () {
      $hamburger.focus();
    });
  }
})(jQuery);
