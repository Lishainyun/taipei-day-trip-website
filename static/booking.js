"use strict"

const bookingApiUrl = 'http://44.199.90.64:3000/api/booking';
let bookingBtn = document.getElementById("bookingBtn");
let bookingAttractionId = window.location.pathname.split('/')[2];
let bookingDate = document.getElementById("bookingDate");
let bookingTime;
let bookingCharge = document.getElementById("charge");

// 預定行程
function postBookingData(){

    let forenoon = document.getElementById("forenoon");
    let afternoon = document.getElementById("afternoon");

    if (forenoon.checked === true){
        bookingTime = forenoon.value
    } else {
        bookingTime = afternoon.value
    };

    let headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
    };
    let body = {
        "userId" : userId,
        "attractionId" : bookingAttractionId,
        "date" : bookingDate.value,
        "time" : bookingTime,
        "price" : bookingCharge.textContent.split(' ')[1]
    };
    
    if (userId){
        fetch(bookingApiUrl,{
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body),
        })
        .then(response=>{
            window.location.href = "/booking";
        })
        .catch(console.log("post booking info error"))
    } else {
        overlay.style.display = 'block';
        loginDiv.setAttribute('style','transform: translate(-50%, 80px);opacity:1;transition: transform 0.5s, opacity 0.5s;')
    }
}

bookingBtn.addEventListener("click", debounce(postBookingData,500));