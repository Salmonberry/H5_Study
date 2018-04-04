/**
 * Created by andy on 2015/12/8.
 */
function $(id) {
   return document.getElementById(id);
}
function show(id) {
    $(id).style.display="block";
}

function hide(id) {
    $(id).style.display="none";
}
function scroll() {  // 开始封装自己的scrollTop
    if(window.pageYOffset != null) {  // ie9+ 高版本浏览器
        // 因为 window.pageYOffset 默认的是  0  所以这里需要判断
        return {
            left: window.pageXOffset,
            top: window.pageYOffset
        }
    }
    else if(document.compatMode === "CSS1Compat") {    // 标准浏览器   来判断有没有声明DTD
        return {
            left: document.documentElement.scrollLeft,
            top: document.documentElement.scrollTop
        }
    }
    return {   // 未声明 DTD,谷歌浏览器
        left: document.body.scrollLeft,
        top: document.body.scrollTop
    }
}