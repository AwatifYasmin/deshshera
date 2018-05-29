var myApp = angular.module('deshSera', ['ui.router']);

myApp.config(function ($stateProvider, $urlRouterProvider) {
  var index = {
    name: 'index',
    url: '/',
    templateUrl: 'templates/index/index.html',
    controller: 'indexCtrl'
  }

  $stateProvider.state(index);

  var newItem = {
    name: 'new',
    url: '/new',
    templateUrl: 'templates/new/index.html',
    controller: 'newCtrl'
  }

  $stateProvider.state(newItem);

  var popular = {
    name: 'popular',
    url: '/popular',
    templateUrl: 'templates/popular/index.html',
    controller: 'popularCtrl'
  }

  $stateProvider.state(popular);

  var categoryWise = {
    name: 'categoryWise',
    url: '/category/:id',
    templateUrl: 'templates/categoryWise/index.html',
    controller: 'categoryWiseCtrl'
  }

  $stateProvider.state(categoryWise);

  var item = {
    name: 'item',
    url: '/item/:id',
    templateUrl: 'templates/item/index.html',
    controller: 'itemCtrl'
  }

  $stateProvider.state(item);

  var option = {
    name: 'option',
    url: '/option/:id',
    templateUrl: 'templates/item/option.html',
    controller: 'optionCtrl',
    params: {
      id: null,
      item: null,
      serial: null,
      option: null
    }
  }

  $stateProvider.state(option);

  var idea = {
    name: 'idea',
    url: '/idea',
    templateUrl: 'templates/profile/idea.html',
    controller: 'ideaCtrl'
  }

  $stateProvider.state(idea);

  var profile = {
    name: 'profile',
    url: '/profile',
    templateUrl: 'templates/profile/index.html',
    controller: 'profileCtrl'
  }

  $stateProvider.state(profile );

  var login = {
    name: 'login',
    url: '/login',
    templateUrl: 'templates/auth/login.html',
    controller: 'loginCtrl'
  }

  $stateProvider.state(login);

  var signup = {
    name: 'signup',
    url: '/signup',
    templateUrl: 'templates/auth/signup.html',
    controller: 'signupCtrl'
  }

  $stateProvider.state(signup);

  $urlRouterProvider.otherwise('/');
});

myApp.run(function ($rootScope, $state, baseSvc, $window) {
  $window.fbAsyncInit = function() {
      FB.init({ 
        appId: '592139807817023',
        status: true, 
        cookie: true, 
        xfbml: true,
        version: 'v2.4'
      });
  };
  var token = localStorage.getItem("auth-token");
  var guest = localStorage.getItem("guest-token");

  if (token) {
    $rootScope.user = JSON.parse(localStorage.getItem("user-info"));
    $rootScope.token = token;
  }

  $rootScope.getInfo = function () {
    baseSvc.get("categories")
      .then(function (response) {
        $rootScope.categories = response;
      });

    baseSvc.get("home/popular/items")
      .then(function (response) {
        $rootScope.popularItems = response.items;
        $rootScope.popularItems.forEach(function (item) {
          item.photo = "http://soft360d.com/topten/images/" + item.photo;
        });
      });

    baseSvc.get("home/new/items")
      .then(function (response) {
        $rootScope.newItems = response.items;
        $rootScope.newItems.forEach(function (item) {
          item.photo = "http://soft360d.com/topten/images/" + item.photo;
        });
      });
  }

  if (!guest) {
    baseSvc.get("guest/login")
      .then(function (response) {
        localStorage.setItem("guest-token", response.api_token);
        $rootScope.getInfo();
      });
  }
  else {
    $rootScope.getInfo();
  }

  $rootScope.logout = function(){
    localStorage.removeItem("auth-token");
    localStorage.removeItem("user");
    $rootScope.token = "";
  }

  $rootScope.$on('$locationChangeStart', function (event, newUrl) {
    if (newUrl.charAt(newUrl.length - 1) == '/') {
      $rootScope.showBanner = true;
    }
    else {
      $rootScope.showBanner = false;
    }

    if (newUrl.indexOf("login") != -1 || newUrl.indexOf("signup") != -1) {
      $rootScope.showSideBar = false;
    }
    else {
      $rootScope.showSideBar = true;
    }

    if (newUrl.indexOf("idea") != -1 ) {
      if (!$rootScope.token) {
        window.location.href = '#!/login';
        $rootScope.message = "You have to log in first."
      }
    }
  });
});


myApp.directive('fbCommentBox', function () {
  function createHTML(href, numposts, colorscheme, width) {
    return '<div class="fb-comments" ' +
      'data-href="' + href + '" ' +
      'data-numposts="' + numposts + '" ' +
      'data-colorsheme="' + colorscheme + '" ' +
      'data-width="' + width + '">' +
      '</div>';
  }

  return {
    restrict: 'A',
    scope: {},
    link: function postLink(scope, elem, attrs) {
      attrs.$observe('pageHref', function (newValue) {
        var href = newValue;
        var numposts = attrs.numposts || 5;
        var colorscheme = attrs.colorscheme || 'light';
        var width = attrs.width || '100%';
        elem.html(createHTML(href, numposts, colorscheme, width));
        FB.XFBML.parse(elem[0]);
      });
    }
  };
});