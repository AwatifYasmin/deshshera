myApp.controller('profileCtrl', function ($scope, baseSvc, $rootScope, $stateParams, $state) {

});


myApp.controller('ideaCtrl', function ($scope, baseSvc, $rootScope, $stateParams, $state) {
    $scope.idea = {
        title: '',
        options: [{
            title: '',
            description: ''
        }]
    }

    $scope.addNewOption = function () {
        var option = {
            title: '',
            description: ''
        };

        $scope.idea.options.push(option);
    }

    $scope.submit = function () {
        baseSvc.post({
            json: JSON.stringify($scope.idea)
        }, "item/idea").then(function (response) {
            if(response.success==true){
                alert("Your idea is successfully submitted.");
                $state.go("profile");
            }
            else {
                alert("Error occured");
            }
        })
    }
});