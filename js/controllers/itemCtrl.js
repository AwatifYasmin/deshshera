myApp.controller('itemCtrl', function($scope, baseSvc, $rootScope, $stateParams, $state) {
    $scope.items = [];
    var id = $stateParams.id;
    $scope.fbLink = window.location.href;
    console.log($scope.fbLink);
    baseSvc.get("item/"+id)
        .then(function(response){
            $scope.item = response;
        });
    
    $scope.goToDetails = function(item, serial, option){
        $state.go("option", {
            id: option.id,
            item: item,
            serial: serial,
            option: option
        })
    }
});


myApp.controller('optionCtrl', function($scope, baseSvc, $rootScope, $stateParams, $state) {
    $scope.items = [];
    if(!$stateParams.id || !$stateParams.item || $stateParams.option || $stateParams.serial){
        $state.go('index');     
    }
    $scope.id = $stateParams.id;
    $scope.item = $stateParams.item;
    $scope.option = $stateParams.option;
    $scope.serial = $stateParams.serial;
    $scope.fbLink = window.location.href+"/option/"+$scope.id;
});