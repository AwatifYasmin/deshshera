myApp.controller('loginCtrl', function ($scope, baseSvc, $rootScope, facebookService, $stateParams, $state) {
    $scope.email = "";
    $scope.password = "";

    $scope.fblogin = function () {
        var FB = window.FB;
        var scopes = 'public_profile,email';

        var that = this;

        FB.login(function (res) {
            if (res.status === 'connected') {
                facebookService.getInfo()
                    .then(function (response) {
                        baseSvc.post({
                            name: response.first_name + " " + response.last_name,
                            email: response.email ? response.email : response.id,
                            password: response.id
                        }, "login/fb").then(function (loginresponse) {
                            $scope.processLoginResponse(loginresponse);
                            if (loginresponse.success == true) {
                                $scope.processLoginResponse(loginresponse);
                            }
                            else {
                                $scope.errorMessage = "This email is already taken";
                            }
                        })
                    }
                    );
            }
            else {

            }
        });
    }

    $scope.login = function () {
        baseSvc.post({
            email: $scope.email,
            password: $scope.password
        }, "login").then(function (loginresponse) {
            if (loginresponse.success == true) {
                $scope.processLoginResponse(loginresponse);
            }
            else if (loginresponse.success === false) {
                $scope.errorMessage = "Wrong email or password.";
            }
            else {
                $scope.errorMessage = "Invalid email.";
            }

        })
    }

    $scope.processLoginResponse = function (response) {
        localStorage.setItem("auth-token", response.api_token);
        localStorage.setItem("user-info", JSON.stringify(response.message));
        $rootScope.user = response.message;
        $rootScope.token = response.api_token;
        $state.go("profile");
    }
});


myApp.controller('signupCtrl', function ($scope, baseSvc, $rootScope, $stateParams, $state) {
    $scope.email = "";
    $scope.name = "";
    $scope.password = "";
    $scope.confirmPassword = "";
    $scope.termsAgree = false;
    $scope.errorMessage = "";

    $scope.register = function () {
        $scope.error = "";
        if ($scope.password.length < 8) {
            $scope.errorMessage = "Password must be minimum 8 characters.";
            //console.log($scope.errorMessage);
            return;
        }
        if ($scope.password != $scope.confirmPassword) {
            $scope.errorMessage = "Confirm password doesnot match";
            //console.log($scope.errorMessage);
            return;
        }
        baseSvc.post({
            name: $scope.name,
            email: $scope.email,
            password: $scope.password
        }, "register").then(function (response) {
            if (response.success == true) {
                localStorage.setItem("auth-token", response.api_token);
                localStorage.setItem("user-info", JSON.stringify(response.message));
                $rootScope.user = response.message;
                $rootScope.token = response.api_token;
                $state.go("profile");
            }
            else {
                $scope.errorMessage = "This email is already taken";
            }
        })
    }
});