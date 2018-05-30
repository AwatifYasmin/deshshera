myApp.controller('itemCtrl', function($scope, baseSvc, $rootScope, $stateParams, $state) {
    $scope.items = [];
    $scope.title = "";
    $scope.description = "";
    var id = $stateParams.id;
    $scope.fbLink = window.location.href;
    
    $scope.getItem = function(){
        baseSvc.get("item/"+id)
        .then(function(response){
            $scope.item = response;
        });
    }

    $scope.getItem ()

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
                    $scope.title = "";
                    $scope.description = "";
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
                    $scope.getItem();
                }
                else {
                    alert("Error occured.");
                }
            })
    }
});


myApp.controller('optionCtrl', function($scope, baseSvc, $rootScope, $stateParams, $state) {
    var id = $stateParams.id;

    $scope.getOption = function(){
        baseSvc.get("item/option/"+id)
        .then(function(response){
            $scope.item = response.item;
            $scope.option = response.option;
        });
    }

    $scope.getOption();

    $scope.fbLink = window.location.href;
});