#angular-http-assist

Perform http request using angular-http-assist without hassle on setting up services to handle requests.

##Installation

**Run** `bower install angular-http-assist`

**index.html** `<script src="bower_components/angular-http-assist/angular-http-assist.js"></script>`

##Setup

**app.js**

On your `app.js` inject the module `angular-http-assist`

```javascript
var app = angular.module('yourApp', ['angular-http-assist'])
```

---

**.config()** 

Initialize the provider.

```javascript
app.config(['$httpAssistProvider' function($httpAssistProvider){
	
	// Initialize with config
	$httpAssistProvider.config({
        url:'https://some-web.com/api',
        printRequest: true
    });

}])
```
---

##Usage

**.controller()**

Inject the `$httpAssist` provider on your controller.

```javascript
app.controller(['$httpAssistProvider' function($httpAssistProvider){
	
	// Perform an http request against the api url you provided in the config()

	var options = {
        params:[], // If your request doesnt require any params, leave the array empty.
        queries:[], // Same with queries leave empty if not needed.
        data:{foo:'bar'} // not required when doing GET request.
    }
 
    $httpAssist.request('GET', '/some-route-endpoint', options)
        .then(function(response){
            console.log('success', response);
        })
        .catch(function(error){
            console.log(error);
        })
}])
```





