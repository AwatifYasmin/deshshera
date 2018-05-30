myApp.controller('profileCtrl', function ($scope, baseSvc, $rootScope, $stateParams, $state) {
    baseSvc.get("following/items")
      .then(function (response) {
        $scope.followingItems = response.items;
        $scope.followingItems.forEach(function (item) {
          item.photo = "http://soft360d.com/topten/images/" + item.photo;
        });
      });

    baseSvc.get("my/items")
      .then(function (response) {
        $scope.myItems = response.items;
        $scope.myItems.forEach(function (item) {
          item.photo = "http://soft360d.com/topten/images/" + item.photo;
        });
        //console.log($rootScope.newItems);
      });
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