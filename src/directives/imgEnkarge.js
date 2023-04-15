import $ from 'jquery';
let isHandleClose = true;
export default {
    bind: function (el) {
        if ($("#enlargeWrap").length === 0) {
            $('body').append('<div id="enlargeWrap"><div class="enlarge-layer"></div><div class="enlargeImgBox"></div></div>');
            $('body').append(`<style>
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
                width: 100%;
                height: 100%;
                pointer-events: none;
              }
              #enlargeWrap .enlargeImgBox img {
                position: absolute;
                pointer-events: auto;
              }              
            </style>`);
        }

        $("#enlargeWrap").on('click', '.enlarge-layer', function () {
            if (!isHandleClose) return;
            const enlargeWrap = $("#enlargeWrap");
            enlargeWrap.find('.enlargeImgBox>img').animate({
                width: 0,
                height: 0,
                left: '50%',
                top: '50%',
                transform: 'translate(-50%,-50%)',
            }, 500);
            enlargeWrap.find('.enlarge-layer').fadeOut(500);

            setTimeout(() => {
                enlargeWrap.find('.enlargeImgBox').html('');
                enlargeWrap.hide();
                isHandleClose = false;
            }, 800)
        })

        $(el).on('click', function () {
            const enlargeWrap = $("#enlargeWrap");
            const self = $(el);
            let src = $(this).attr('src');
            let img = new Image();
            img.id = 'bigImg';
            img.src = src;
            enlargeWrap.find('.enlargeImgBox').html(img);
            const bigImg = $('#bigImg');
            bigImg.css({
                width: self.width(),
                height: self.height(),
                left: self.offset().left,
                top: self.offset().top - $(window).scrollTop()
            })

            let winWidth = document.documentElement.clientWidth,
                winHeight = document.documentElement.clientHeight;

            let bigImgWidth = 0;
            let bigImgHeight = 0;
            if (img.width >= img.height) {
                bigImgWidth = winWidth * 0.8;
                bigImgWidth = bigImgWidth < 375 ? 375 : bigImgWidth;
                bigImgHeight = bigImgWidth / bigImg.width() * bigImg.height();
            } else {
                bigImgHeight = winHeight * 0.8;
                bigImgWidth = bigImgHeight / bigImg.height() * bigImg.width();
            }
            enlargeWrap.show();

            // 等待主线任务完成再修改位置和宽高
            setTimeout(() => {
                enlargeWrap.find('.enlarge-layer').fadeIn(800);

                let left = bigImg.parent().width() / 2 - bigImgWidth / 2;
                let top = bigImg.parent().height() / 2 - bigImgHeight / 2;

                bigImg.animate({
                    width: bigImgWidth,
                    height: bigImgHeight,
                    left,
                    top,
                }, 600, function () {
                    isHandleClose = true;
                })
            })
        })
    },
}