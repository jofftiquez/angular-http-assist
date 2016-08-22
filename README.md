#angular-http-assist

Perform REST call via angularjs' `$http` with angular-http-assist without hassle on setting up services or factory to handle requests.

##Installation

**Run** `bower install angular-http-assist`

**index.html** `<script src="bower_components/angular-http-assist/angular-http-assist.js"></script>`

##Setup

**app.js**

On your `app.js` inject the module `angular-http-assist`

```javascript
var app = angular.module('yourApp', ['angular-http-assist'])
```

**.config()** 

Initialize the provider.

```javascript
app.config(['$httpAssistProvider' function($httpAssistProvider){
	
	// Initialize with config
	$httpAssistProvider.config({
        url:'https://some-web.com/api', // you api url.
        printRequest: true // print every request on console for dev purposes.
    });

}])
```

##Usage

**.controller()**

Inject the `$httpAssist` provider on your controller.

```javascript
app.controller('yourController', ['$httpAssist' function($httpAssist){
	
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

##Functions

**.config(config)**

Has an object parameter config. 

```javascript
{
    url:'https://foo.com/api', // you api url.
    printRequest: true // print every request on console for dev purposes.
}
```

**.request(method, endpoint, options)**

*method* - the HTTP methods (GET, POST, PUT, DELETE)

*endpoint* - the route endpoint from 'the' API you are connecting to. Normally an API exposes a url where you will be performing your REST calls. E.g. `https://foo.com/api/users`, `https://foo.com/api/students`. The endpoint in case will be `/users` and `/students`.

*options* -  
```javascript
{
    params:['id', 'some-param'], // If your request doesnt require any params, leave the array empty.
    queries:['foo=bar', 'baz=lol'], // Same with queries leave empty if not needed.
    data:{foo:'bar'} // not required when doing GET request.
}
```

##Sample

```javascript
...
.config({
    url:'https://foo.com/api',
    printRequest: true
})
...

...
var options = {
	params:['param1'],
	queries:['type=0'],
	data:{
		name:'John Doe'
	}
}

.request('POST', '/user', options)
...
```

This sample will construct an http request like this. 

```javascript
{
	method: "POST", 
	url: "https://foo.com/api/param1?type=0"
	data: {
		"name":"John Doe"
	}
}
```

##Notes

Every request returns a promise by the way, so it's "**thenable**".