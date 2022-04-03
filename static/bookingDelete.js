"use strict"

let deleteIcon = document.getElementById("deleteIcon");

// 刪除帳戶
function deleteBookingData(){
    fetch(bookingApiUrl,{
            method:'DELETE',
        })
    .then(res=>{
        window.location.href = ""
    })
}

deleteIcon.addEventListener("click", debounce(deleteBookingData,500));