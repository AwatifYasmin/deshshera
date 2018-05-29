myApp.service('baseSvc', function($http, $q) {
    var baseUrl = "http://soft360d.com/topten/";
    function getToken () {
        var token = localStorage.getItem('auth-token');
        var guest = localStorage.getItem('guest-token');
        if(token){
            return token;
        }
        else {
            return guest;
        }
    }

    function get(endPoint) {
        var deferred = $q.defer();
        $http({
            url: baseUrl + endPoint,
            method: "GET",
            headers: {
                "api-token": getToken(),
                "content-Type": "application/json"
            }
        }).then(function(success) {
            deferred.resolve(success.data);
        }, function(error) {
            deferred.resolve(error);
        });
        return deferred.promise;
    }

    function post(data, endPoint) {
        var deferred = $q.defer();
        $http({
            url: baseUrl + endPoint,
            method: "POST",
            headers: {
                "api-token": getToken(),
                "content-Type": "application/json"
            },
            data: JSON.stringify(data)
        }).then(function(success) {
            deferred.resolve(success.data);
        }, function(error) {
            deferred.resolve(error);
        });
        return deferred.promise;
    }

    return {
        get : get,
        post : post
    }
});


myApp.factory('facebookService', function($q) {
    return {
        getInfo: function() {
            var deferred = $q.defer();
            FB.api('/me', {
              fields: 'first_name, last_name, email, id'
            }, function(response) {
                if (!response || response.error) {
                    deferred.reject('Error occured');
                } else {
                    deferred.resolve(response);
                }
            });
            return deferred.promise;
        }
    }
  });