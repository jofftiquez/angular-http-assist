/* Angular HTTP Assist by Jofferson Ramirez Tiquez Aug 22, 2016
* 
* gmail - jofftiquez@gmail.com
* fb - /jofftiquez
* twitter - @jrtiquez
* www - www.greenfox.me
*
*/

angular.module('angular-http-assist', []) .provider('$httpAssist', function () {
    var config = {
        api:'http://foo.com/api',
        printRequest:false,
    };

    this.config = function(options){
        config.api = options.url || config.api;
        config.printRequest = options.printRequest || config.printRequest;
        return config;
    }

    this.$get = ['$q', '$http', '$log', function($q, $http, $log){
        var $httpAssist=$q.defer();

        $httpAssist.request = function(method, endpoint, options){

            var req = {};
            req.method = method;
            req.url = config.api+endpoint;

            if(!method || !endpoint || !options){
                $log.error('MISSING ARGUMENT ERROR: Arguments (method, endpoint, options) are required.');
                return { ErrorMsg:'Make sure that you are passing all required arguments.' };
            }

            if(options.params.length){
                options.params.forEach(function(param) {
                    req.url += '/'+param    
                }, this);
            }
            
            if(options.queries.length){
                req.url += '?';
                options.queries.forEach(function(query, index) {
                    req.url += query+(options.queries.length-1 == index ? '' : '&');
                }, this); 
            }

            if(method == 'POST' || method == 'PUT'){
                if(options.data){
                    if(!(typeof options.data === 'object')){
                        $log.error('INVALID TYPE ERROR: "data" should be and object, you passed a/an '+typeof options.data);
                        return $q.reject({ ErrorMsg:'Make sure that you are passing the data as an object.' });
                    }
                }else{
                    $log.error('MISSING ARGUMENT ERROR: "data" is required for '+method+' method, you passed '+options.data);
                    return $q.reject({ ErrorMsg:'Make sure that you are passing the data option when doing a ' +method+ ' request.' });
                }
                req.data = options.data;
            }

            config.printRequest ? console.log(req) : '';

            return $http(req)
                .then(function(response) {
                    if (typeof response.data === 'object') {
                        return response;
                    } else {
                        return $q.reject(response.data);
                    }
                }, function(response) {
                    return $q.reject(response.data);
                });
        }

        return $httpAssist;

    }];
});
