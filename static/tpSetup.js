"use strict"

let getSubmitBtn = document.querySelector('.submitBtn')

// SetupSDK
TPDirect.setupSDK(124101, 'app_eb3EyBJM1eSr5JGWJ7PgmGxEWZ34ZVWyhfsnN24D2Dcvn9pnOz2PUEvD2uan', 'sandbox');

// listen for TapPay Field
TPDirect.card.onUpdate(function (update) {
    // update.canGetPrime === true
    // --> you can call TPDirect.card.getPrime()
    if (update.canGetPrime) {
        // Enable submit Button to get prime.
        // submitButton.removeAttribute('disabled')
        getSubmitBtn.id = 'confirmOrder'
    } else {
        // Disable submit Button to get prime.
        // submitButton.setAttribute('disabled', true)
        getSubmitBtn.id = ''
    }

    // number 欄位是錯誤的
    if (update.status.number === 2) {
        setNumberFormGroupToError('.cardNumsGroup')
    } else if (update.status.number === 0) {
        setNumberFormGroupToSuccess('.cardNumsGroup')
    } else {
        setNumberFormGroupToNormal('.cardNumsGroup')
    }

    if (update.status.expiry === 2) {
        setNumberFormGroupToError('.expDateGroup')
    } else if (update.status.expiry === 0) {
        setNumberFormGroupToSuccess('.expDateGroup')
    } else {
        setNumberFormGroupToNormal('.expDateGroup')
    }

    if (update.status.ccv === 2) {
        setNumberFormGroupToError('.validationGroup')
    } else if (update.status.ccv === 0) {
        setNumberFormGroupToSuccess('.validationGroup')
    } else {
        setNumberFormGroupToNormal('.validationGroup')
    }
})

// get prime
function getPrimeFunc(){
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
        } else{
            primeCode = result.card.prime
            alert('get prime 成功，prime: ' + result.card.prime)
        }
    })
}

function setNumberFormGroupToError(selector) {
    document.querySelector(selector).class = ''
    document.querySelector(selector).class = 'has-error'
}

function setNumberFormGroupToSuccess(selector) {
    document.querySelector(selector).class = ''
    document.querySelector(selector).class = 'has-success'
}

function setNumberFormGroupToNormal(selector) {
    document.querySelector(selector).class = ''
    document.querySelector(selector).class = 'has-success'
}

function forceBlurIos() {
    if (!isIos()) {
        return
    }
    let input = document.createElement('input')
    input.setAttribute('type', 'text')
    // Insert to active element to ensure scroll lands somewhere relevant
    document.activeElement.prepend(input)
    input.focus()
    input.parentNode.removeChild(input)
}

function isIos() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}