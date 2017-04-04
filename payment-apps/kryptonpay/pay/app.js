alert("NNU : Running service worker");

self.addEventListener('paymentrequest', function(event) {
    
    console.log("NNU : PaymentRequest: " + JSON.stringify(event.data));

    event.respondWith(new Promise(function(resolve, reject) {
        alert("NNU : SW paymentrequest "+event.data);

        
        //self.addEventListener('message', function(event) {
            var response = event.data;
            console.log("NNU : PaymentResponse: " + JSON.stringify(response));
            
            if (response) {
                response.complete = function() {
                    console.log("NNU : PaymentResponse.complete()");
                    return Promise.resolve();
                }
                try {
                    resolve(response);
                } catch(error) {
                    console.log("NNU :  "+error);
                    reject(error);
                }
            } else {
                reject();
            }
       // });

        /*
        clients.openWindow("index.html").then(function(windowClient) {
            console.log("NNU : window opened!");
            windowClient.postMessage(event.data);
        })
        .catch(function(error) {
            console.log("NNU : Error "+error);
            reject(error);
        });
        */
    }));
});

