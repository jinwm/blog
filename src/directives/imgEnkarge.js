/**
 * 自定义单击查看大图指令
 */
import $ from 'jquery';

if ($("#enlargeWrap").length === 0) {
    $('body').append(`
    <div id="enlargeWrap"><div class="enlarge-layer"></div></div>
    <style>
    #enlargeWrap {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 100000;
        display: none;
      }
      #enlargeWrap .enlarge-layer {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        position: absolute;
        left: 0;
        top: 0;
        display: none;
      }
      #enlargeWrap .enlargeImgBox {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
        width: fit-content;
        height: fit-content;
        max-width: 100vw;
        max-height: 100vh;
        pointer-events: none;
        opacity: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      #enlargeWrap .enlargeImgBox img {
        display: block;
        pointer-events: auto;
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
      }
    </style>
    `);
}
const enlargeWrap = $("#enlargeWrap");
let isHandleClose = true;
let resizeTimer = null;
let attrs = null;

$(window).on('resize', function () {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
        bigImgToMiddle();
    }, 50)
})

function bigImgToMiddle(duration = 300, callback) {
    const enlargeImgBox = enlargeWrap.find('.enlargeImgBox')

    let winWidth = document.documentElement.clientWidth,
        winHeight = document.documentElement.clientHeight,
        bigImgWidth = winWidth * 0.85,
        bigImgHeight = winHeight * 0.85;

    let left = winWidth / 2 - bigImgWidth / 2;
    let top = winHeight / 2 - bigImgHeight / 2;

    enlargeImgBox.animate({
        width: bigImgWidth,
        height: bigImgHeight,
        left,
        top,
    }, duration, function () {
        typeof callback === 'function' && callback();
    })
}

export default {
    bind: function (el) {
        $("#enlargeWrap").on('click', '.enlarge-layer', function () {
            if (!isHandleClose) return;
            enlargeWrap.find('.enlarge-layer').fadeOut(300);
            enlargeWrap.find('.enlargeImgBox').animate({
                ...attrs,
                opacity: 0.5
            }, 300, () => {
                attrs = null;
                enlargeWrap.hide().find('.enlargeImgBox').remove();
                $('body').css('overflow', 'initial');

                setTimeout(() => isHandleClose = false, 100);
            });
        })

        $(el).on('click', function () {
            const self = $(el);
            let src = $(this).attr('src');
            let img = new Image();
            img.src = src;
            attrs = {
                width: self.width(),
                height: self.height(),
                left: self.offset().left,
                top: self.offset().top - $(window).scrollTop(),
            }
            enlargeWrap.append('<div class="enlargeImgBox"></div>');
            enlargeWrap.find('.enlargeImgBox').css({
                ...attrs,
                opacity: 1
            }).html(img);
            $('body').css('overflow', 'hidden');
            enlargeWrap.show();
            enlargeWrap.find('.enlarge-layer').fadeIn(600);
            bigImgToMiddle(600, () => isHandleClose = true);
        })
    },
}