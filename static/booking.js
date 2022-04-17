"use strict"

const bookingApiUrl = 'http://44.199.90.64:3000/api/booking';
let bookingBtn = document.getElementById("bookingBtn");
let bookingAttractionId = window.location.pathname.split('/')[2];
let bookingDate = document.getElementById("bookingDate");
let bookingTime;
let bookingCharge = document.getElementById("charge");
let bookingErrorMessage = document.getElementById('bookingErrorMessage')

// 預定行程
function postBookingData(){
    
    bookingErrorMessage.style.display = "none";
    bookingErrorMessage.innerHTML = "";

    let hasSelectedDate = document.querySelector('.bookingDate.has-selected')

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
    
    let currentDate = new Date().toLocaleDateString('en-CA');

    if (userId && hasSelectedDate && bookingDate.value > currentDate){
        fetch(bookingApiUrl,{
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body),
        })
        .then(response=>{
            window.location.href = "/booking";
        })
        .catch(console.log("post booking info error"))
    }else if(!hasSelectedDate && bookingDate.value && bookingDate.value < currentDate){
        let bookingErrorMessageText = document.createTextNode("您選擇了過去的日期，請重新選擇")
        bookingErrorMessage.appendChild(bookingErrorMessageText)
        bookingErrorMessage.style.display = 'block'; 
    } else if(!hasSelectedDate) {
        let bookingErrorMessageText = document.createTextNode("請選擇日期")
        bookingErrorMessage.appendChild(bookingErrorMessageText)
        bookingErrorMessage.style.display = 'block';
    } else {
        overlay.style.display = 'block';
        loginDiv.setAttribute('style','transform: translate(-50%, 80px);opacity:1;transition: transform 0.5s, opacity 0.5s;')
    }
}

bookingBtn.addEventListener("click", debounce(postBookingData,500));