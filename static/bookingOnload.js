"use strict"

const bookingApiUrl = 'http://44.199.90.64:3000/api/booking';

let bookingInfo = document.getElementById("bookingInfo");
let attractionInfo = document.getElementById("attractionInfo");
let contactInfo = document.getElementById("contactInfo");
let cardInfo = document.getElementById("cardInfo");
let paymentInfo = document.getElementById("paymentInfo");
let bookingDelete = document.querySelector(".delete");
let hrLine = document.getElementsByTagName('hr');

let withoutBooking = document.getElementById("withoutBooking");

let attractionPic = document.getElementById("attractionPic");
let attractionName = document.getElementById("attractionName");
let attractionDate = document.getElementById("date");
let attractionTime = document.getElementById("time");
let attractionPrice = document.getElementById("price");
let attractionAddress = document.getElementById("address");

let contactInputArea = document.querySelectorAll('.contactInputArea')
let contactName = document.getElementById("contactName");
let contactEmail = document.getElementById("contactEmail");
let phoneNums = document.getElementById('phoneNums')
let totalPrice = document.getElementById("totalPrice");

let navHeight = document.querySelector('.nav').clientHeight;
let wrapperHeight = document.querySelector('.wrapper').clientHeight;
let wrapper = document.querySelector('.wrapper')
let footer = document.getElementById("footer");

let attrResId;
let attrResName;
let attrResAddress;
let attrResImage;
let attrResDate;
let attrResTime;
let attrResPrice;
let attrResConvertTime;

async function getBookingData(bookingApiUrl){
    const response = await fetch(bookingApiUrl,{
        method:"GET",
    })
    return await response.json();
};

getBookingData(bookingApiUrl)
.then((response)=>{

    if (response.data === null){
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
        
        let footerHeight = String(window.innerHeight - navHeight - document.querySelector('.wrapper').clientHeight) + "px"
        footer.style.height = footerHeight ;
        footer.style.padding = "10px 0 0 0" ;
        wrapper.style.display = "grid";
        footer.style.display = "block";
    }else{
        
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
    
        bookingInfo.style.display = "block";
        attractionInfo.style.display = "block";
        contactName.value = username;
        contactEmail.value = userEmail;
        contactInfo.style.display = "block";
        cardInfo.style.display = "block";
        paymentInfo.style.display = "block";
        bookingDelete.style.display = "block";
        hrLine['0'].style.display = "block";
        hrLine['1'].style.display = "block";
        hrLine['2'].style.display = "block";

        withoutBooking.style.display = "none";
    
        attractionPic.src = attrResImage;
        attractionName.innerHTML = attrResName;
        attractionDate.innerHTML = attrResDate;
        attractionTime.innerHTML = attrResConvertTime;
        attractionPrice.innerHTML = attrResPrice;
        attractionAddress.innerHTML = attrResAddress;
        totalPrice.innerHTML = attrResPrice;

    }

    wrapper.style.display = "grid";
    footer.style.display = "block";
});

// 驗證聯絡資料是否填寫
contactInputArea.forEach(contactInput=>{
    contactInput.addEventListener('input',()=>{
        if (contactInput.checkValidity()){
            contactInput.classList.add('has-success')
            contactInput.classList.remove('has-error')
        } else {
            contactInput.classList.remove('has-success')
            contactInput.classList.add('has-error')

            contactInput.setCustomValidity("請填寫聯絡資訊")
        }
    })
})