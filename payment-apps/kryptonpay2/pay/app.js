self.addEventListener('paymentrequest', function(event) {
    event.respondWith(new Promise(function(resolve, reject) {
        var response = {
            methodName: "https://kryptonpay.no/pay",
            details: {
                test: event.data
            }
        };
        if (response) {
            response.complete = function() {
                return Promise.resolve();
            }
            try {
                resolve(response);
            } catch(error) {
                alert(error);
                reject(error);
            }
        } else {
            reject();
        }
    }));
});