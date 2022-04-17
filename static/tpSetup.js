"use strict"

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
            placeholder: 'CVV'
        }
    },
    styles: {
        'input': {
            'color': '#757575',
            'height': '38px',
            'width': '200px',
            'border': '1px solid #E8E8E8',
            'border-radius': '5px',
            'display': 'inline-block',
            'font-size': '16px'
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
        // $('#confirmOrder').attr("id","canClick");
    } else {
        // submitButton.setAttribute('disabled', true)
        $('button[type="submit"]').attr('disabled', true)
        // $('#confirmOrder').attr("id","notClick");
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

$('form').on('submit', function (event) {
    event.preventDefault()
    
    // fix keyboard issue in iOS device
    forceBlurIos()

    const tappayStatus = TPDirect.card.getTappayFieldsStatus()

    // Check TPDirect.card.getTappayFieldsStatus().canGetPrime before TPDirect.card.getPrime
    if (tappayStatus.canGetPrime === false) {
        console.log('can not get prime')
        return
    }

    // Get prime
    TPDirect.card.getPrime(function (result) {
        if (result.status !== 0) {
            console.log('get prime error ' + result.msg)
            return
        }
        primeCode = result.card.prime
        console.log('get prime 成功')
        
        // post data
        postOrderData()
    })


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