myApp.controller('itemCtrl', function ($scope, baseSvc, $rootScope, $stateParams, $state) {
    $scope.items = [];
    $scope.title = "";
    $scope.description = "";
    var id = $stateParams.id;
    $scope.fbLink = window.location.href;
    $scope.getItem = function () {
        baseSvc.get("item/" + id)
            .then(function (response) {
                $scope.item = response;
                $scope.item.options.sort(function (a, b) {
                    return b.votes - a.votes;
                });
                $rootScope.title = $scope.item.title;
                $rootScope.description = $scope.item.description;
                $rootScope.url = $scope.fbLink;
                $rootScope.image = "http://soft360d.com/topten/images/"+$scope.item.photo;
            });
    }

    $scope.getItem()

    $scope.addOption = function () {
        baseSvc.post({
            title: $scope.title,
            description: $scope.description
        }, "options")
            .then(function (response) {
                var options = [];
                options.push(response.id);
                baseSvc.post({
                    options: options
                }, "item/"+id+"/options")
                    .then(function (response) {

                        if (response.success == true) {
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
            })
    }

    $scope.vote = function (option) {
        baseSvc.get("item/" + id + "/vote/" + option)
            .then(function (response) {
                if (response.success == true) {
                    $scope.getItem();
                }
                else {
                    alert("Error occured.");
                }
            })
    }

    $scope.follow = function () {
        baseSvc.get("item/" + id + "/follow")
            .then(function (response) {
                if (response.success == true) {
                    $scope.getItem();
                }
                else {
                    alert("Error occured.");
                }
            })
    }
});


myApp.controller('optionCtrl', function ($scope, baseSvc, $rootScope, $stateParams, $state) {
    var id = $stateParams.id;

    $scope.getOption = function () {
        baseSvc.get("options/" + id)
            .then(function (response) {
                $scope.item = response.item;
                $scope.option = response.option;
                $scope.images = response.images;
            });
    }

    $scope.getOption();

    $scope.fbLink = window.location.href;
});