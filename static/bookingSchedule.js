"use strict"

let navBooking = document.getElementById("navBooking");

// 查看行程
function checkSchedule(){
    if (userId){
        window.location.href = "/booking"
    } else {
        overlay.style.display = 'block';
        loginDiv.setAttribute('style','transform: translate(-50%, 80px);opacity:1;transition: transform 0.5s, opacity 0.5s;')
    }
}

navBooking.addEventListener("click", debounce(checkSchedule,500));