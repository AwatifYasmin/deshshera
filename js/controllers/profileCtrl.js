myApp.controller('profileCtrl', function ($scope, baseSvc, $rootScope, $stateParams, $state) {
    $scope.old = "";
    $scope.pass = "";
    $scope.confirm = "";

    baseSvc.get("following/items")
      .then(function (response) {
        $scope.followingItems = response.items;
        $scope.followingItems.forEach(function (item) {
          item.photo = "http://soft360d.com/topten/images/" + item.photo;
        });

        console.log($rootScope.newItems);
      });

    baseSvc.get("my/items")
      .then(function (response) {
        $scope.myItems = response.items;
        $scope.myItems.forEach(function (item) {
          item.photo = "http://soft360d.com/topten/images/" + item.photo;
        });
        console.log($rootScope.newItems);
      });

    $scope.changeName = function (name) {
        baseSvc.post({
            name: name
        }, "user/update/name").then(function (response) {
            if(response.success==true){
                $('#myModal').modal('hide');
                alert("Your name is successfully updated.");
                $rootScope.user = response.user;
                localStorage.setItem('user-info', JSON.stringify(response.user));
                //$state.reload();
            }
            else {
                alert("Error occured");
            }
        })
    }

    $scope.changePassword = function (old, pass, confirm) {
        if(pass!=confirm){
            alert("Confirm password doesnot match.");
            return;
        }
        baseSvc.post({
            old: old,
            new: pass
        }, "user/change/password").then(function (response) {
            if(response.success==true){
                $('#myModal4').modal('hide');
                alert("Your password is successfully changed.");
                //$state.reload();
            }
            else {
                alert("Your current password is incorrect.");
            }
        })
    }
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

    $scope.remove = function(index){
        $scope.idea.options.splice(index, 1);
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