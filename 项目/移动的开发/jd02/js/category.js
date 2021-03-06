
window.load=function(){

};
/*
* 1.菜单滑动起来
* 2.当滑动到一定的距离的时候不能滑动  滑动区间
* 3.当触摸结束的时候 需要判断是否在定位区间内 否则吸附回去 定位回去
* 4.点击菜单的时候 改变当前的样式
* 5.点击菜单的时候 定位到当前的那个菜单到最顶部
*   如果不满足定位区间就不做定位
*   */

/*获取父容器*/
var parentBox=document.querySelector('.jd_category_left');
var childBox=parentBox.querySelector('ul');
var parentHeight=parentBox.offsetHeight;
var childHeight=childBox.offsetHeight;

/*translateY 初始的定位 其实就是最大定位*/
var maxY=0;
/*translateY 滑动到最下面的定位 其实就是最小定位 父容器高度-子容器高度*/
var minY=parentHeight-childHeight;
/*
自己定义的缓冲的距离*/
var distance=100;

/*translateY 最大滑动定位*/
var maxSwipe=maxY+100;

/*translateY 最小滑动定位*/
var maxSwipe=minY-100;

/*第一步 1.菜单滑动起来*/
var startY=0;
var moveY=0;
var distanceY=0;
var isMove=false;

var curry=0;/*记录当前的定位 全局 相当于轮播图中的index*/

/*定义公用的方法*/
var addTransition=function () {
    childBox.style.webkitTransition="all .2s";
    childBox.style.transition="all .2s";
}

var removeTransition=function () {
    childBox.style.webkitTransition="none";
    childBox.style.transition="none";
}

var setTranslateY=function(y){
    childBox.style.webkitTransform="translateY("+y+"px)";
    childBox.style.transform="translateY("+y+"px)";
}


/*绑定事件*/
childBox.addEventListener('touchstart',function(e){
    startY=e.touches[0].clientY
});

childBox.addEventListener('touchmove',function(e){
    moveY=e.touches[0].clientY;
    distanceY=moveY-startY;
    // console.log(distanceY);
    /*清除过度*/
    removeTransition();
    /*设置定位*/
    /*第二步 2.当滑动到一定的距离的时候不能滑动 滑动区间
    * 当前要做定位的位置需要在滑动区间内*/
    if((curry+distanceY)<maxSwipe&&(curry+distanceY)>minSwipe)
    setTranslateY(distanceY);
});

childBox.addEventListener('touchend',function(e){

    /*第二步 3.当触摸结束的时候 需要判断是否在定位区间内  否则吸附*/

    /*当往下滑的时候 大于 最大定位*/
    if((curry+distanceY)>maxY){
        curry=maxY;
        addTransition();
        setTranslateY(curry);
    }
    /*当往上滑的时候 小于 最小定位*/
    else if((curry+distanceY)<minY){
        curry=minY;
        addTransition();
        setTranslateY(curry);
    }
    else{
        /*记录当前的定位  上一次当前的定位+这一次改变的定位*/
        curry=curry+distanceY;
        // console.log("数值："+curry);
    }

    /*重置所有的参数 不重置currY*/
    startY=0;
    moveY=0;
    distanceY=0;
    isMove=0;
});

/*绑定tap*/
/*所有的li*/
var lis=childBox.querySelectorAll('li');

itcast.tap(childBox,function(e){
    /*找到事件触发源,然后找到点击的那个li元素*/
    // console.log(e.target);
    var li=e.target.parentNode;
    for(var i=0;i<lis.length;i++){
        lis[i].className=" ";
    }
    /*4.点击菜单的时候 改变当前的样式*/
    li.className="now";
    /*
    * 5.点击菜单的时候 定位到当前的那个菜单到最顶部
    * 如果不满足定位区间就不做定位*/
    /*
    需要知道 将要定位的位置*/
    var translateY=-li.index*50;/*通过索引来计算*/

    /*判断当前的定位要大于 定位区间的 最小定位*/
    if(translateY>minY){
        currY=translateY;
        addTransition();
        setTranslateY(currY);
    }
    else{
        currY=minY;
        addTransition();
        setTranslateY(currY);
    }
})