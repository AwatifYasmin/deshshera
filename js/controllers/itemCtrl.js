myApp.controller('itemCtrl', function ($scope, $timeout, baseSvc, $rootScope, $stateParams, $state) {
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
                $scope.total = $scope.item.options.length;
                $scope.loading = false;
                $scope.getOptions(1,0);
            });
    }

    $scope.getItem();

    $scope.getOptions = function (page, take) {
        if($scope.loading){
            return;
        }
        $scope.page = page;
        var start = (page-1)*10;
        var end = start+9;
        console.log(page+" "+start);
        if(end>=$scope.total){
            end = $scope.total-1;
        }
        $scope.options = [];
        for(var i=start;i<=end;i++){
            $scope.options.push($scope.item.options[i]);
        }
        console.log($scope.options);
    }

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