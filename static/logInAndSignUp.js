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
    document.querySelector('.nav').style.display = 'none'
    const response = await fetch(userApiUrl,{
        method:"GET"
    })
    return await response.json()
};

checkUserStatus(userApiUrl)
.then((response)=>{
    userId = response.data.id
    if (userId){
        navInUp.id="navOut"
        navInUp.innerHTML="登出系統"
        document.querySelector('.nav').style.display = 'block'
    } else{
        navInUp.id="navInUp"
        navInUp.innerHTML="登入/註冊"
        document.querySelector('.nav').style.display = 'block'

    }
});

// 點擊登入/註冊
function logInOrSignUp(){

    if(navInUp.textContent === "登入/註冊"){
        overlay.style.display = 'block';
        loginDiv.setAttribute('style','transform: translate(-50%, 80px);opacity:1;transition: transform 0.5s, opacity 0.5s;')
    } else{
        logout();
    }
};

// 關閉登入/註冊表單
function cancel(){
    fetch(userApiUrl)
    .then(response => response.json())
    .then((res)=>{
        userId = res.data.id
    })
    overlay.style.display = 'none';
    loginDiv.setAttribute('style','transform: translate(-50%, -275px);opacity:0;transition: transform 0.5s, opacity 0.5s;');
    signupDiv.setAttribute('style','transform: translate(-50%, -384px);opacity:0;transition: transform 0.5s, opacity 0.5s;');
    signupMessage.style.display = 'none';
    loginMessage.style.display = 'none';
    clearInput();
};


// 切換登入/註冊表單
function toSignupDiv(){
    if (loginDiv.style.display = 'block'){
        loginDiv.style.display = 'none';
        signupDiv.style.display = 'none';
        signupDiv.setAttribute('style','transform: translate(-50%, 80px);opacity:1;');
        loginMessage.style.display = 'none';
    }
    clearInput()
};

function toLoginDiv(){
    if (loginDiv.style.display = 'none'){
        loginDiv.style.display = 'block';
        signupDiv.style.display = 'none';
        signupMessage.style.display = 'none';
    }
    clearInput()
};

// 清空註冊/登入輸入框
function clearInput(){
    signupName.value="";
    signupEmail.value="";
    signupPassword.value="";
    signupPasswordCheck.value="";
    loginEmail.value="";
    loginPassword.value="";
};

// 註冊新帳戶
function signup(){

    let name = signupName.value;
    let email = signupEmail.value;
    let password = signupPassword.value;
    let passwordCheck = signupPasswordCheck.value;
    let emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    let headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
    };
    let body = {
        "signupName" : name,
        "signupEmail" : email,
        "signupPassword" : password,
    };

    if (name==='' || email==='' || password===''){
        signupMessage.innerHTML="請輸入完整資訊";
        signupMessage.style = "color:#f54033;display:block";
        clearInput();
    } else if (email.search(emailRule) === -1){
        signupMessage.innerHTML="email格式錯誤，請重新輸入";
        signupMessage.style = "color:#f54033;display:block";
        clearInput();
    } else if (password !== passwordCheck){
        signupMessage.innerHTML="密碼錯誤，請重新輸入";
        signupMessage.style = "color:#f54033;display:block";
        signupPassword.value="";
        signupPasswordCheck.value="";      
    } else {
        fetch(userApiUrl,{
            method:'POST',
            headers: headers,
            body: JSON.stringify(body),
        })
        .then(res=>{
            if(res.status === 200){
                signupMessage.innerHTML="註冊成功";
                signupMessage.style.color="#2245ba";
                signupMessage.style.display="block";
                clearInput();
            } else if (res.status == 400){
                signupMessage.innerHTML="註冊失敗，重複的Email";
                signupMessage.style = "color:#f54033;display:block";
                clearInput();
            }
        })
        .catch(res=>{
            signupMessage.innerHTML="伺服器內部錯誤，請稍後再試";
            signupMessage.style = "color:#f54033;display:block";
            clearInput();
        });
    }
}
document.getElementById('signupBtn').addEventListener('click',debounce(signup,600));

// 登入帳戶
function login(){
    let email = loginEmail.value;
    let password = loginPassword.value;
    let headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
    };
    let body = {
        "loginEmail" : email,
        "loginPassword" : password,
    };
    if (email==='' || password===''){
        loginMessage.innerHTML="請輸入完整資訊";
        loginMessage.style = "color:#f54033;display:block";
        clearInput();
    } else {
        fetch(userApiUrl,{
            method:'PATCH',
            headers: headers,
            body: JSON.stringify(body),
        })
        .then(res=>{
            if(res.status === 200){
                loginMessage.innerHTML="登入成功";
                loginMessage.style.color="#2245ba";
                loginMessage.style.display="block";
                navInUp.id="navOut";
                navInUp.innerHTML="登出系統";
                cancel();
            } else if (res.status == 400){
                loginMessage.innerHTML="登入失敗，帳號或密碼錯誤";
                loginMessage.style = "color:#f54033;display:block";
                clearInput();
            }
        })
        .catch(res=>{
            loginMessage.innerHTML="伺服器內部錯誤，請稍後再試";
            loginMessage.style = "color:#f54033;display:block";
            clearInput();
        });
    }
}
document.getElementById('loginBtn').addEventListener('click',debounce(login,600));

//登出帳戶
function logout(){
    fetch(userApiUrl,{
            method:'DELETE',
        })
    .then(res=>{
        let navOut = document.getElementById('navOut');
        navOut.id="navInUp";
        navOut.innerHTML="登入/註冊"; 
        userId = "";  
        window.location.href = "";
    })
}