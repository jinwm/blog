/**
 * 标准宽度1920
 * 1rem = 100px
 */
function myResize() {
    let viewW = document.documentElement.clientWidth;
    let fontSize = viewW / 1920 * 100;
    fontSize = fontSize > 55.2 ? fontSize : 55.2;
    document.getElementsByTagName('html')[0].style.fontSize = fontSize.toFixed(2) + 'px';
}

myResize();
window.addEventListener('resize', myResize);