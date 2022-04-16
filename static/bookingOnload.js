"use strict"

const bookingApiUrl = 'http://44.199.90.64:3000/api/booking';

let greetings = document.querySelector(".greetings");

let bookingInfo = document.getElementById("bookingInfo");
let attractionInfo = document.getElementById("attractionInfo");
let contactInfo = document.getElementById("contactInfo");
let cardInfo = document.getElementById("cardInfo");
let paymentInfo = document.getElementById("paymentInfo");
let bookingDelete = document.querySelector(".delete");
let hrLine = document.getElementsByTagName('hr');

let wrapper = document.querySelector('.wrapper')
let withoutBooking = document.getElementById("withoutBooking");

let attractionPic = document.getElementById("attractionPic");
let attractionName = document.getElementById("attractionName");
let attractionDate = document.getElementById("date");
let attractionTime = document.getElementById("time");
let attractionPrice = document.getElementById("price");
let attractionAddress = document.getElementById("address");
let contactName = document.getElementById("contactName");
let contactEmail = document.getElementById("contactEmail");
let phoneNums = document.getElementById('phoneNums')
let totalPrice = document.getElementById("totalPrice");

let navHeight = document.querySelector('.nav').clientHeight;
let wrapperHeight = document.querySelector('.wrapper').clientHeight;
let footer = document.getElementById("footer");

let greetingsUsername;
let attrResId;
let attrResName;
let attrResAddress;
let attrResImage;
let attrResDate;
let attrResTime;
let attrResPrice;
let attrResConvertTime;

// 載入頁面get booking data
async function getUser(){
    const response = await fetch('http://44.199.90.64:3000/api/user',{
        method:"GET",
    })
    return await response.json()
};

getUser()
.then((response)=>{
    let error = response.error
    if (error){
        window.location.href = "/";
    } else{
        let name = response.data.name;
        let email = response.data.email;
        greetingsUsername = name;
        contactName.value = name;
        contactEmail.value = email;
    };
});

async function getBookingData(bookingApiUrl){
    const response = await fetch(bookingApiUrl,{
        method:"GET",
    })
    return await response.json();
};

getBookingData(bookingApiUrl)
.then((response)=>{

    if (response.data === null){
        greetings.innerHTML = "您好，"+ greetingsUsername +"，待預定的行程如下：";
        bookingInfo.style.display = "none";
        attractionInfo.style.display = "none";
        contactInfo.style.display = "none";
        cardInfo.style.display = "none";
        paymentInfo.style.display = "none";
        bookingDelete.style.display = "none";
        hrLine['0'].style.display = "none";
        hrLine['1'].style.display = "none";
        hrLine['2'].style.display = "none";

        withoutBooking.style.display = "block";
        wrapper.style.display = "grid";

        let footerHeight = String(window.innerHeight - navHeight - document.querySelector('.wrapper').clientHeight) + "px"
        footer.style.height = footerHeight ;
        footer.style.padding = "10px 0 0 0" ;
    }else if (response.data !== null){
        
        attrResId = response.data.attraction.id
        attrResName = response.data.attraction.name;
        attrResAddress = response.data.attraction.address;
        attrResImage = response.data.attraction.image;
        attrResDate = response.date;
        attrResTime = response.time;
        attrResPrice = response.price;
    
        if (attrResTime === "forenoon"){
            attrResConvertTime = "上午 9 點到下午 4 點";
        } else{
            attrResConvertTime = "下午 4 點到下午 11 點";
        };
    
        if (response.data){
            greetings.innerHTML = "您好，"+ greetingsUsername +"，待預定的行程如下：";
            bookingInfo.style.display = "block";
            attractionInfo.style.display = "block";
            contactInfo.style.display = "block";
            cardInfo.style.display = "block";
            paymentInfo.style.display = "block";
            bookingDelete.style.display = "block";
            hrLine['0'].style.display = "block";
            hrLine['1'].style.display = "block";
            hrLine['2'].style.display = "block";

            withoutBooking.style.display = "none";
            wrapper.style.display = "grid";
    
            attractionPic.src = attrResImage;
            attractionName.innerHTML = attrResName;
            attractionDate.innerHTML = attrResDate;
            attractionTime.innerHTML = attrResConvertTime;
            attractionPrice.innerHTML = attrResPrice;
            attractionAddress.innerHTML = attrResAddress;
            totalPrice.innerHTML = attrResPrice;
        }
    }else{
        window.location.href = "/";
    }
});