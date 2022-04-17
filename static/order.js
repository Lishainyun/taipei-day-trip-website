"use strict"

const orderApiUrl = 'http://44.199.90.64:3000/api/orders';

// post data
function postOrderData(){

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
                "name":contactName.value,
                "email":contactEmail.value,
                "phone":phoneNums.value
            }
        }
    };
    let contactEmailPattern = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    let phoneNumsPattern =  /^(09)[0-9]{8}$/;

    if(primeCode && contactName.value !== "" && contactEmail.value.search(contactEmailPattern) !== -1 && phoneNums.value.search(phoneNumsPattern) !== -1){
        fetch(orderApiUrl,{
            method:"POST",
            headers:headers,
            body: JSON.stringify(body)
        })
        .then((response)=>{
            return response.json()
        })
        .then((res)=>{
            let orderNums = res['data']['number']
            window.location.href = "/thankyou?number="+orderNums;
        })
        .catch(console.log("postOrder failed"))
    } else {
        let contactMessage = document.getElementById('contactMessage')
        contactMessage.innerHTML = ""
        contactMessage.innerHTML = "請輸入完整且正確的聯絡資訊"
        contactMessage.style.color = "#f54033"
        console.log("No primeCode be found")
    }
}
