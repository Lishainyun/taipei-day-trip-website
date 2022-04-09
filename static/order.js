"use strict"

const orderApiUrl = 'http://44.199.90.64:3000/api/orders';
let contactName = document.getElementById('contactName').value
let contactEmail = document.getElementById('contactEmail').value
let phoneNums = document.getElementById('phoneNums').value
let primeCode;


// 訂購
function postOrderData(){
    getPrimeFunc()

    let headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
    };
    let body = {
        "prime" : primeCode,
        "order" : {
            "price":attrResPrice,
            "trip":{
                "attraction":{
                    "id":attrResId,
                    "name":attrResName,
                    "address":attrResAddress,
                    "image":attrResImage
                },
                "date":attrResDate,
                "time":attrResTime
            },
            "contact":{
                "name":contactName,
                "email":contactEmail,
                "phone":phoneNums
            }
        }
    };

    if(primeCode){
        fetch(orderApiUrl,{
            method:"POST",
            headers:headers,
            body: JSON.stringify(body)
        })
        .then(res=>{
            window.location.href = "/thankyou.html";
        })
        .catch(console.log("postOrder failed"))
    } else{
        console.log("No primeCode be found")
    }
}

confirmOrder.addEventListener("click", debounce(postBookingData,500));