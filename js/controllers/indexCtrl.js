myApp.controller('indexCtrl', function ($scope, baseSvc, $rootScope) {
    $scope.items = [];
    $scope.loading = true;

    baseSvc.get("home/new/items")
        .then(function (response) {
            $rootScope.newItems = response.items;
            $rootScope.newItems.forEach(function (item) {
                item.photo = "http://soft360d.com/topten/images/" + item.photo;
            });
            if ($rootScope.newItems.length > 3) {
                $scope.newIndexItems = $rootScope.newItems.slice(0, 3);
            }
            else {
                $scope.newIndexItems = $rootScope.newItems;
            }

            $scope.loading = false;
        });
    
    baseSvc.get("home/items")
        .then(function (response) {
            $scope.randomItems = response.items;
            $scope.randomItems.forEach(function (item) {
                item.photo = "http://soft360d.com/topten/images/" + item.photo;
            });

            $scope.loading = false;
        });
});


myApp.controller('popularCtrl', function ($scope, baseSvc) {
    $scope.items = [];
    $scope.loading = false;
    $scope.page = 0;

    $scope.getItems = function (page, take) {
        $scope.loading = true;
        $scope.page = page;

        baseSvc.get("popular/items?page=" + (page - 1))
            .then(function (response) {
                $scope.items = response.items;
                $scope.items.forEach(function (item) {
                    item.photo = "http://soft360d.com/topten/images/" + item.photo;
                });
                $scope.total = response.total;
                $scope.loading = false;
            });
    }
});


myApp.controller('newCtrl', function ($scope, baseSvc) {
    $scope.items = [];
    $scope.loading = false;
    $scope.page = 0;

    $scope.getItems = function (page, take) {
        $scope.loading = true;
        $scope.page = page;

        baseSvc.get("new/items?page=" + (page - 1))
            .then(function (response) {
                $scope.items = response.items;
                $scope.items.forEach(function (item) {
                    item.photo = "http://soft360d.com/topten/images/" + item.photo;
                });
                $scope.total = response.total;
                $scope.loading = false;
            });
    }
});

myApp.controller('categoryWiseCtrl', function ($scope, baseSvc, $stateParams) {
    $scope.items = [];
    var id = $stateParams.id;
    $scope.page = 0;
    $scope.total = 0;
    $scope.loading = false;
    console.log("category: " + id);
    $scope.getItems = function (page, take) {
        $scope.loading = true;
        $scope.page = page;

        baseSvc.get("category/" + id + "/items?page=" + (page - 1))
            .then(function (response) {
                $scope.category = response.category;
                $scope.items = response.items;
                $scope.items.forEach(function (item) {
                    item.photo = "http://soft360d.com/topten/images/" + item.photo;
                });
                $scope.total = response.total;
                $scope.loading = false;
            });
    }
});

myApp.controller('tagWiseCtrl', function ($scope, baseSvc, $stateParams) {
    $scope.items = [];
    var id = $stateParams.id;
    $scope.page = 0;
    $scope.loading = false;

    $scope.getItems = function (page, take) {
        $scope.loading = true;
        $scope.page = page;

        baseSvc.get("/tag/" + id + "/items?page=" + (page - 1))
            .then(function (response) {
                $scope.tag = response.tag;
                $scope.items = response.items;
                $scope.items.forEach(function (item) {
                    item.photo = "http://soft360d.com/topten/images/" + item.photo;
                });
                $scope.total = response.total;
                $scope.loading = false;
            });
    }
});

myApp.controller('searchCtrl', function ($scope, baseSvc, $stateParams) {
    $scope.items = [];
    $scope.searchText = $stateParams.text;
    $scope.loading = false;
    $scope.page = 0;
    $scope.getItems = function (page, take) {
        $scope.loading = true;
        $scope.page = page;
        baseSvc.post({
            text: $scope.searchText
        }, "search?page=" + (page - 1))
            .then(function (response) {
                $scope.items = response.items;
                $scope.items.forEach(function (item) {
                    item.photo = "http://soft360d.com/topten/images/" + item.photo;
                });
                $scope.total = response.total;
                $scope.loading = false;
            });
    }
});