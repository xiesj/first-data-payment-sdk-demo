# first-data-payment-sdk-demo

## import sdk

    var PaymentSDK = require('first-data-payment-sdk');

## Init pay

    var paysdk = PaymentSDK({
        storeId: "4500000106",
        sharedSecret: "tS2fhLk5nq",
        currency: "702",
        successURL: "http://127.0.0.1:3000/pay-success",
        failURL: "http://127.0.0.1:3000/pay-fail",
        test: true 
    })

## Run pay
    
    res.send(paysdk.pay({
        oid: "201903151010202030301",
        chargetotal: "13.00"
    }))

## Verify success & fail request

    paysdk.verifyRequest(req.body)
