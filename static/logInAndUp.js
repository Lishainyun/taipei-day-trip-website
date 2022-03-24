"use strict"

//點擊登入/註冊
function logInOrUp(){
    let overlay = document.getElementById('overlay');
    let loginForm = document.getElementById('loginForm');
    let logupForm = document.querySelector('#logupForm');
    overlay.style.display = 'block';
    loginForm.setAttribute('style','transform: translate(-50%, 80px);opacity:1;transition: transform 0.5s, opacity 0.5s;')
}


//取消登入/註冊
function closeForm(){
    let overlay = document.getElementById('overlay');
    let loginForm = document.querySelector('#loginForm');
    let logupForm = document.querySelector('#logupForm');
    overlay.style.display = 'none';
    loginForm.setAttribute('style','transform: translate(-50%, -275px);opacity:0;transition: transform 0.5s, opacity 0.5s;');
    logupForm.setAttribute('style','transform: translate(-50%, -332px);opacity:0;transition: transform 0.5s, opacity 0.5s;');
}


//變更登入/註冊表單
function toLogupForm(){
    let loginForm = document.querySelector('#loginForm');
    let logupForm = document.querySelector('#logupForm');
    if (loginForm.style.display = 'block'){
        loginForm.style.display = 'none';
        logupForm.setAttribute('style','transform: translate(-50%, 80px);opacity:1;')

    }
}

function toLoginForm(){
    let loginForm = document.querySelector('#loginForm');
    let logupForm = document.querySelector('#logupForm');
    if (loginForm.style.display = 'none'){
        loginForm.style.display = 'block';
        logupForm.style.display = 'none';
    }
}

