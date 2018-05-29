myApp.controller('itemCtrl', function($scope, baseSvc, $rootScope, $stateParams, $state) {
    $scope.items = [];
    $scope.title = "";
    $scope.description = "";
    var id = $stateParams.id;
    $scope.fbLink = window.location.href;
    //console.log($scope.fbLink);
    
    $scope.getItem = function(){
        baseSvc.get("item/"+id)
        .then(function(response){
            $scope.item = response;
        });
    }

    $scope.getItem();
    
    $scope.goToDetails = function(item, serial, option){
        $state.go("option", {
            id: option.id,
            item: item,
            serial: serial,
            option: option
        })
    }

    $scope.addOption = function(){
        baseSvc.post({
                title: $scope.title, 
                description: $scope.description
            }, "item/"+id+"/option")
            .then(function(response){
                if(response.success==true){
                    $('#myModal7').modal('hide');
                    alert("Option is successfully added.");
                    $scope.getItem();
                }
                else {
                    alert("Error occured.");
                }
            })
    }

    $scope.vote = function(option){
        baseSvc.get("item/"+id+"/vote/"+option)
            .then(function(response){
                if(response.success==true){
                    alert("Your vote is successfully added.");
                    $scope.getItem();
                }
                else {
                    alert("Error occured.");
                }
            })
    }

    $scope.follow = function(){
        baseSvc.get("item/"+id+"/follow")
            .then(function(response){
                if(response.success==true){
                    alert("You successfully followed this item.");
                    $scope.getItem();
                }
                else {
                    alert("Error occured.");
                }
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