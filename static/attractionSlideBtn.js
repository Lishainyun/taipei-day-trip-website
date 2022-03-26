"use strict"

const debounce = function(func, delay){
    let timer;
    return function(){     
        const context = this; 
        const args = arguments;

        clearTimeout(timer); 

        timer = setTimeout(()=> {
        func.apply(context, args)
        },delay);
    };
};

// 下一張
function nextPic(){

    picId++;

    if( picId < fetchPicsLength){
        let currentPicStyle = document.getElementById("pic"+picId);
        let previousPicStyle = document.getElementById("pic"+(picId-1));
        let currentDot = document.getElementById("dot"+picId);
        currentPicStyle.style.zIndex = 99;
        currentPicStyle.style.opacity = 1;
        previousPicStyle.style.zIndex = 98;
        previousPicStyle.style.opacity = 0;
        currentDot.checked = true;
    } else{
        picId = 0;
        let currentPicStyle = document.getElementById("pic"+picId);
        let previousPicStyle = document.getElementById("pic"+(fetchPicsLength-1));
        let currentDot = document.getElementById("dot"+picId);
        currentPicStyle.style.zIndex = 99;
        currentPicStyle.style.opacity = 1;
        previousPicStyle.style.zIndex = 98;
        previousPicStyle.style.opacity = 0;
        currentDot.checked = true;
    } ;


}
document.getElementById('rightArrowBtn').addEventListener("click", debounce(nextPic,600))

// 上一張
function previousPic(){

    picId--;

    if( picId < fetchPicsLength && picId >= 0){
        let currentPicStyle = document.getElementById("pic"+picId);
        let previousPicStyle = document.getElementById("pic"+(picId+1));
        let currentDot = document.getElementById("dot"+picId);
        currentPicStyle.style.zIndex = 99;
        currentPicStyle.style.opacity = 1;
        previousPicStyle.style.zIndex = 98;
        previousPicStyle.style.opacity = 0;
        currentDot.checked = true;
    } else{
        picId = fetchPicsLength-1;
        let currentPicStyle = document.getElementById("pic"+picId);
        let previousPicStyle = document.getElementById("pic0");
        let currentDot = document.getElementById("dot"+picId);
        currentPicStyle.style.zIndex = 99;
        currentPicStyle.style.opacity = 1;
        previousPicStyle.style.zIndex = 98;
        previousPicStyle.style.opacity = 0;
        currentDot.checked = true;
    } ;
    
}
document.getElementById('leftArrowBtn').addEventListener("click", debounce(previousPic,600))