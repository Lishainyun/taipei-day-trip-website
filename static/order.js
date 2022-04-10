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

    if(primeCode){
        fetch(orderApiUrl,{
            method:"POST",
            headers:headers,
            body: JSON.stringify(body)
        })
        .then((response)=>{
            return response.json()
        })
        .then((res)=>{
            orderNums = res['data']['number']
            window.location.href = "/thankyou?number="+orderNums;
        })
        .catch(console.log("postOrder failed"))
    } else{
        console.log("No primeCode be found")
    }
}
