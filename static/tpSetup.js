"use strict"
const orderApiUrl = 'http://44.199.90.64:3000/api/orders';
let contactNameValue = document.getElementById('contactName').value
let contactEmailValue = document.getElementById('contactEmail').value
let phoneNums = document.getElementById('phoneNums').value
let primeCode;

// SetupSDK
TPDirect.setupSDK(124101, 'app_eb3EyBJM1eSr5JGWJ7PgmGxEWZ34ZVWyhfsnN24D2Dcvn9pnOz2PUEvD2uan', 'sandbox');

// SetupCard
TPDirect.card.setup({
    fields: {
        number: {
            element: '.form-control.card-number',
            placeholder: '**** **** **** ****'
        },
        expirationDate: {
            element: document.getElementById('tappay-expiration-date'),
            placeholder: 'MM / YY'
        },
        ccv: {
            element: $('.form-control.cvc')[0],
            placeholder: '後三碼'
        }
    },
    styles: {
        'input': {
            'color': 'gray'
        },
        'input.ccv': {
            // 'font-size': '16px'
        },
        ':focus': {
            'color': 'black'
        },
        '.valid': {
            'color': 'green'
        },
        '.invalid': {
            'color': 'red'
        },
        '@media screen and (max-width: 400px)': {
            'input': {
                'color': 'orange'
            }
        }
    }
})

// listen for TapPay Field
TPDirect.card.onUpdate(function (update) {
    /* Disable / enable submit button depend on update.canGetPrime  */
    /* ============================================================ */

    // update.canGetPrime === true
    //     --> you can call TPDirect.card.getPrime()
    // const submitButton = document.querySelector('button[type="submit"]')
    if (update.canGetPrime) {
        // submitButton.removeAttribute('disabled')
        $('button[type="submit"]').removeAttr('disabled')
    } else {
        // submitButton.setAttribute('disabled', true)
        $('button[type="submit"]').attr('disabled', true)
    }

    /* Change card type display when card type change */
    /* ============================================== */

    // cardTypes = ['visa', 'mastercard', ...]
    var newType = update.cardType === 'unknown' ? '' : update.cardType
    $('#cardtype').text(newType)

    /* Change form-group style when tappay field status change */
    /* ======================================================= */

    // number 欄位是錯誤的
    if (update.status.number === 2) {
        setNumberFormGroupToError('.card-number-group')
    } else if (update.status.number === 0) {
        setNumberFormGroupToSuccess('.card-number-group')
    } else {
        setNumberFormGroupToNormal('.card-number-group')
    }

    if (update.status.expiry === 2) {
        setNumberFormGroupToError('.expiration-date-group')
    } else if (update.status.expiry === 0) {
        setNumberFormGroupToSuccess('.expiration-date-group')
    } else {
        setNumberFormGroupToNormal('.expiration-date-group')
    }

    if (update.status.cvc === 2) {
        setNumberFormGroupToError('.cvc-group')
    } else if (update.status.cvc === 0) {
        setNumberFormGroupToSuccess('.cvc-group')
    } else {
        setNumberFormGroupToNormal('.cvc-group')
    }
})

// get prime and post data to server
$('form').on('submit', function (event) {
    event.preventDefault()
    
    // fix keyboard issue in iOS device
    forceBlurIos()
    
    const tappayStatus = TPDirect.card.getTappayFieldsStatus()
    console.log(tappayStatus)

    // Check TPDirect.card.getTappayFieldsStatus().canGetPrime before TPDirect.card.getPrime
    if (tappayStatus.canGetPrime === false) {
        alert('can not get prime')
        return
    }

    // Get prime
    TPDirect.card.getPrime(function (result) {
        if (result.status !== 0) {
            alert('get prime error ' + result.msg)
            return
        }
        primeCode = result.card.prime
        alert('get prime 成功，prime: ' + result.card.prime)
    })

    // Post data
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
                "name":contactNameValue,
                "email":contactEmailValue,
                "phone":phoneNums
            }
        }
    };
    fetch(orderApiUrl,{
        method:"POST",
        headers:headers,
        body: JSON.stringify(body)
    })
    .then(res=>{
        window.location.href = "/thankyou.html";
    })
    .catch(console.log("postOrder failed"))

})

function setNumberFormGroupToError(selector) {
    $(selector).addClass('has-error')
    $(selector).removeClass('has-success')
}

function setNumberFormGroupToSuccess(selector) {
    $(selector).removeClass('has-error')
    $(selector).addClass('has-success')
}

function setNumberFormGroupToNormal(selector) {
    $(selector).removeClass('has-error')
    $(selector).removeClass('has-success')
}

function forceBlurIos() {
    if (!isIos()) {
        return
    }
    var input = document.createElement('input')
    input.setAttribute('type', 'text')
    // Insert to active element to ensure scroll lands somewhere relevant
    document.activeElement.prepend(input)
    input.focus()
    input.parentNode.removeChild(input)
}

function isIos() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

// function getPrimeFunc(){
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
// }