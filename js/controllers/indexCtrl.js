myApp.controller('indexCtrl', function($scope, baseSvc, $rootScope) {
    $scope.items = [];

    baseSvc.get("home/new/items")
        .then(function(response){
            $rootScope.newItems = response.items;
            $rootScope.newItems.forEach(function(item) {
                item.photo = "http://soft360d.com/topten/images/" + item.photo;
            });
            if($rootScope.newItems.length>3){
                $scope.newIndexItems = $rootScope.newItems.slice(0,3);
            }
            else {
                $scope.newIndexItems = $rootScope.newItems;
            }
        });
});


myApp.controller('popularCtrl', function($scope, baseSvc) {
    $scope.items = [];

    baseSvc.get("popular/items")
        .then(function(response){
            $scope.items = response.items;
            $scope.items.forEach(function(item) {
                item.photo = "http://soft360d.com/topten/images/" + item.photo;
            });
        });
});


myApp.controller('newCtrl', function($scope, baseSvc) {
    $scope.items = [];

    baseSvc.get("new/items")
        .then(function(response){
            $scope.items = response.items;
            $scope.items.forEach(function(item) {
                item.photo = "http://soft360d.com/topten/images/" + item.photo;
            });
        });
});

myApp.controller('categoryWiseCtrl', function($scope, baseSvc, $stateParams) {
    $scope.items = [];
    var id = $stateParams.id;
    baseSvc.get("/category/"+id+"/items")
        .then(function(response){
            $scope.items = response.items;
            $scope.items.forEach(function(item) {
                item.photo = "http://soft360d.com/topten/images/" + item.photo;
            });
        });
});

myApp.controller('tagWiseCtrl', function($scope, baseSvc, $stateParams) {
    $scope.items = [];
    var id = $stateParams.id;
    baseSvc.get("/tag/"+id+"/items")
        .then(function(response){
            $scope.items = response.items;
            $scope.items.forEach(function(item) {
                item.photo = "http://soft360d.com/topten/images/" + item.photo;
            });
        });
});