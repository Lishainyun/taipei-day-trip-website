"use strict"

const userApiUrl = 'http://44.199.90.64:3000/api/user'
let greetings = document.querySelector(".greetings");

let navInUp = document.getElementById('navInUp');
let navOut = document.getElementById('navOut');

let userId;
let username;
let userEmail;

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
        userId = response.data.id
        username = response.data.name
        userEmail = response.data.email
        
        greetings.innerHTML = "您好，"+ username +"，待預定的行程如下：";
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