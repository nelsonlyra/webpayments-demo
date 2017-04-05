self.addEventListener('paymentrequest', function(e) {
    e.respondWith(new Promise(function(resolve, reject) {
        self.addEventListener('message', function(event) {
            var response = event.data;
            if (response) {
                response.complete = function() {
                    console.log("PaymentResponse.complete()");
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
        });
        e.openWindow("index.html").then(function(windowClient) {
            windowClient.postMessage(event.data);
        })
        .catch(function(error) {
            reject(error);
        });
    }));
});

