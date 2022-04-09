"use strict"

// const orderApiUrl = 'http://44.199.90.64:3000/api/orders';
// let contactNameValue = document.getElementById('contactName').value
// let contactEmailValue = document.getElementById('contactEmail').value
// let phoneNums = document.getElementById('phoneNums').value
// let confirmOrder = document.getElementById('confirmOrder')
// let primeCode;


// 訂購
// function postOrderData(){
//     // fix keyboard issue in iOS device
//     forceBlurIos()
            
//     const tappayStatus = TPDirect.card.getTappayFieldsStatus()
//     console.log(tappayStatus)

//     // Check TPDirect.card.getTappayFieldsStatus().canGetPrime before TPDirect.card.getPrime
//     if (tappayStatus.canGetPrime === false) {
//         alert('can not get prime')
//         return
//     }

//     // Get prime
//     TPDirect.card.getPrime(function (result) {
//         if (result.status !== 0) {
//             alert('get prime error ' + result.msg)
//             return
//         } else{
//             primeCode = result.card.prime
//             alert('get prime 成功，prime: ' + result.card.prime)
//         }
//     })

//     let headers = {
//         "Content-Type": "application/json",
//         "Accept": "application/json",
//     };
//     let body = {
//         "prime" : primeCode,
//         "order" : {
//             "price":attrResPrice,
//             "trip":{
//                 "attraction":{
//                     "id":attrResId,
//                     "name":attrResName,
//                     "address":attrResAddress,
//                     "image":attrResImage
//                 },
//                 "date":attrResDate,
//                 "time":attrResTime
//             },
//             "contact":{
//                 "name":contactNameValue,
//                 "email":contactEmailValue,
//                 "phone":phoneNums
//             }
//         }
//     };

//     if(primeCode){
//         fetch(orderApiUrl,{
//             method:"POST",
//             headers:headers,
//             body: JSON.stringify(body)
//         })
//         .then(res=>{
//             window.location.href = "/thankyou.html";
//         })
//         .catch(console.log("postOrder failed"))
//     } else{
//         console.log("No primeCode be found")
//     }
// }

// confirmOrder.addEventListener("click", debounce(postOrderData,500));