"use strict"

const getOrderUrl = 'http://44.199.90.64:3000/api/order/';
let paramNums = new URLSearchParams(window.location.search).get('number')
let orderStatus = document.getElementById('orderStatus')
let orderNums = document.getElementById('orderNums')
let footer = document.getElementById("footer");

// 載入頁面get order data
async function getOrder(){
    const response = await fetch(getOrderUrl+paramNums,{
        method:"GET",
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
    })
    return await response.json()
};

getOrder()
.then((response)=>{
    let contactName = response['data']['contact']['name']
    let status = response['data']['status']
    let orderId = response['data']['number']
    if (status == 0){
        status = "已訂購行程並付款成功，感謝您的購買，期待與您相見！"
    } else {
        status = "已訂購行程但付款失敗，很抱歉，請聯繫客服人員為您處理！"
    }
    let orderStatusText = document.createTextNode(contactName+" 您好，"+status)
    let orderIdText = document.createTextNode("您的訂單編號為： "+orderId)
    let footerHeight = String(window.innerHeight - navHeight - document.querySelector('.wrapper').clientHeight) + "px"
    
    footer.style.height = footerHeight ;
    footer.style.padding = "10px 0 0 0" ;
    orderStatus.appendChild(orderStatusText)
    orderNums.appendChild(orderIdText)
});