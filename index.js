var PaymentSDK = require('first-data-payment-sdk');
var express = require('express');
var http = require ('http');
var bodyParser = require('body-parser');
var ejs = require('ejs');

var app = express();

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded());

// mock orders
const orders = [
    { id: '20190315' + Date.now() + '1', amount: 13, title: 'Food' },
    { id: '20190315' + Date.now() + '2', amount: 31.1, title: 'Hat' },
    { id: '20190315' + Date.now() + '3', amount: 1131.22, title: 'Sun glass' }
]

app.get('/', function(req, res){
	res.render('orders.ejs', {
	    orders: orders
    })
});

app.get('/pay', function(req, res){
	const orderId = req.query.orderId
    if (!orderId) {
        res.end('missing order id')
    } else {
        // TODO:: get order info by orderId from db
        // TODO:: validate order status
        const order = orders.find((o) => o.id == orderId)
        if (order) {
            // init paysdk
            // TODO:: get storeId & sharedSecret from DB or config
            var paysdk = PaymentSDK({
                storeId: "4500000106",
                sharedSecret: "tS2fhLk5nq",
                currency: "702",
                successURL: "http://127.0.0.1:3000/pay-success",
                failURL: "http://127.0.0.1:3000/pay-fail",
                test: true
            })

            // TODO:: get chargetotal to pay from order info
            res.send(paysdk.pay({
                oid: order.id,
                chargetotal: order.amount
            }))
        } else {
            res.end('order no exist')
        }
    }

});



app.post('/pay-success', function(req, res){
    console.log('pay-success')
    console.log(req.body)

    var paysdk = PaymentSDK({
        storeId: "4500000106",
        sharedSecret: "tS2fhLk5nq"
    })

    // verify the request data
    const verify = paysdk.verifyRequest(req.body)
    console.log(verify)
    res.json({
        verify: verify,
        data: req.body
    })
})
app.post('/pay-fail', function(req, res){
    console.log('pay-fail')
    console.log(req.body)

    var paysdk = PaymentSDK({
        storeId: "4500000106",
        sharedSecret: "tS2fhLk5nq"
    })

    // verify the request data
    const verify = paysdk.verifyRequest(req.body)
    console.log(verify)
    res.json({
        verify: verify,
        data: req.body
    })
})

app.listen(3000, function(){
	console.log('running');
})
http.createServer(app).listen(app.get('port'), function(){
	console.log('Your node server is now up and running on http://127.0.0.1:3000');
});
