console.log("Running service worker");

self.addEventListener('paymentrequest', function(event) {
    
    alert("PaymentRequest: " + JSON.stringify(event.data));
    
    event.respondWith(new Promise(function(resolve, reject) {
        self.addEventListener('message', function(event) {
            var response = event.data;
            alert("PaymentResponse: " + JSON.stringify(response));
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
        clients.openWindow("index.html").then(function(windowClient) {
            alert("window opened!");
            windowClient.postMessage(event.data);
        })
        .catch(function(error) {
            alert(error);
            reject(error);
        });
    }));
});

