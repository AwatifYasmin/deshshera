myApp.controller('itemCtrl', function ($scope, baseSvc, ngMeta, $rootScope, $stateParams, $state) {
    $scope.items = [];
    $scope.title = "";
    $scope.description = "";
    var id = $stateParams.id;
    $scope.fbLink = window.location.href;
    $scope.loading = false;
    $scope.getItem = function () {
        $scope.loading = true;
        baseSvc.get("item/" + id)
            .then(function (response) {
                $scope.item = response;
                $scope.item.options.sort(function (a, b) {
                    return b.votes - a.votes;
                });
                $scope.loading = false;
                ngMeta.setTitle($scope.item.title, "");
                ngMeta.setTag('author', '360 Degree Software');
                ngMeta.setTag('image', "http://soft360d.com/topten/images/" + $scope.item.photo);
                ngMeta.setTag('description', $scope.item.description);

                ngMeta.setTag('og:title', $scope.item.title);
                ngMeta.setTag('og:description', $scope.item.description);
                ngMeta.setTag('og:url', $scope.fbLink);
                ngMeta.setTag('og:image', "http://soft360d.com/topten/images/" + $scope.item.photo);
                // $rootScope.title = $scope.item.title;
                // $rootScope.description = $scope.item.description;
                // $rootScope.url = $scope.fbLink;
                // $scope.loading = false;
                // $rootScope.image = "http://soft360d.com/topten/images/" + $scope.item.photo;
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
                }, "item/" + id + "/options")
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
    $scope.loading = false;
    $scope.getOption = function () {
        $scope.loading = true;
        baseSvc.get("options/" + id)
            .then(function (response) {
                $scope.option = response.option;
                $scope.loading = false;
            });
    }

    $scope.getOption();

    $scope.fbLink = window.location.href;
});