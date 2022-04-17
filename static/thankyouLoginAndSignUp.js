"use strict"

const userApiUrl = 'http://44.199.90.64:3000/api/user'

let navInUp = document.getElementById('navInUp');
let navOut = document.getElementById('navOut');

let overlay = document.getElementById('overlay');
let loginDiv = document.getElementById('loginDiv');
let signupDiv = document.getElementById('signupDiv');

let signupName = document.getElementById('signupName');
let signupEmail = document.getElementById('signupEmail');
let signupPassword = document.getElementById('signupPassword');
let signupPasswordCheck = document.getElementById('signupPasswordCheck');
let signupMessage = document.getElementById('signupMessage');

let loginEmail = document.getElementById('loginEmail');
let loginPassword = document.getElementById('loginPassword');
let loginMessage = document.getElementById('loginMessage');

let userId;

// 載入頁面確認登入狀態
async function checkUserStatus(userApiUrl){
    const response = await fetch(userApiUrl,{
        method:"GET"
    })
    return await response.json()
};

checkUserStatus(userApiUrl)
.then((response)=>{
    let res = response.error
    if (res === true){
        window.location.href = "/";
    } else{
        navInUp.id="navOut"
        navInUp.innerHTML="登出系統"
        document.querySelector('.nav').style.display = 'block'
    }
});


//登出帳戶
function logout(){
    fetch(userApiUrl,{
            method:'DELETE',
        })
    .then(res=>{
        window.location.href = "/";
    })
}

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