var myApp = angular.module('deshSera', ['ui.router', '720kb.socialshare', 'ng-pagination']);

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

  var search = {
    name: 'search',
    url: '/search/{text}',
    templateUrl: 'templates/search/index.html',
    controller: 'searchCtrl',
    params: {
      text: ""
    }
  }

  $stateProvider.state(search);

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

  var tagWise = {
    name: 'tagWise',
    url: '/tag/:id',
    templateUrl: 'templates/tagWise/index.html',
    controller: 'tagWiseCtrl'
  }

  $stateProvider.state(tagWise);

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
      item: null,
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

  $stateProvider.state(profile);

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

  var banner = {
    name: 'banner',
    url: '/banner',
    templateUrl: 'templates/others/banner.html'
  }

  $stateProvider.state(banner);

  var contribute = {
    name: 'contribute',
    url: '/contribute',
    templateUrl: 'templates/others/contribute.html'
  }

  $stateProvider.state(contribute);

  var about = {
    name: 'about',
    url: '/about',
    templateUrl: 'templates/others/about.html'
  }

  $stateProvider.state(about);

  var terms = {
    name: 'terms',
    url: '/terms',
    templateUrl: 'templates/others/terms.html'
  }

  $stateProvider.state(terms);

  var privacy = {
    name: 'privacy',
    url: '/privacy',
    templateUrl: 'templates/others/privacy.html'
  }

  $stateProvider.state(privacy);

  var questions = {
    name: 'questions',
    url: '/questions',
    templateUrl: 'templates/others/questions.html'
  }

  $stateProvider.state(questions);

  var contact = {
    name: 'contact',
    url: '/contact',
    templateUrl: 'templates/others/contact.html'
  }

  $stateProvider.state(contact);

  $urlRouterProvider.otherwise('/');
});

myApp.run(function ($rootScope, $state, baseSvc, $window, $anchorScroll) {
  $window.fbAsyncInit = function () {
    FB.init({
      appId: '592139807817023',
      status: true,
      cookie: true,
      xfbml: true,
      version: 'v2.4'
    });
  };
  $rootScope.title = "Desh shera";
  $rootScope.description = "Desh shera";
  $rootScope.url = "http://deshshera.com";
  $rootScope.image = "";
  var token = localStorage.getItem("auth-token");
  var guest = localStorage.getItem("guest-token");
  $rootScope.tabOpen = "vote";
  if (token) {
    baseSvc.get("user/1")
      .then(function (response) {
        console.log(response);
        if (response.success) {
          $rootScope.user = JSON.parse(localStorage.getItem("user-info"));
          $rootScope.token = token;
        }
        else {
          $rootScope.logout();
        }
      });
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
        //console.log($rootScope.newItems);
      });

    baseSvc.get("home/voted/items")
      .then(function (response) {
        $rootScope.votedItems = response.items;
        $rootScope.votedItems.forEach(function (item) {
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

  $rootScope.logout = function () {
    localStorage.removeItem("auth-token");
    localStorage.removeItem("user");
    $rootScope.token = "";
    $state.go("index");
  }

  $rootScope.search = function (searchText) {
    $state.go("search", { text: searchText })
  }

  $rootScope.$on("$locationChangeSuccess", function () {
    $anchorScroll();
  });

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

    if (newUrl.indexOf("idea") != -1) {
      if (!$rootScope.token) {
        var token = localStorage.getItem("auth-token");
        if(!token){
          window.location.href = '#!/login';
          $rootScope.message = "You have to log in first.";
        }
      }
    }

    if (newUrl.indexOf("item") == -1) {
      $rootScope.title = "DeshShera";
      $rootScope.description = "Desh shera description";
      $rootScope.url = "http://deshshera.com";
      $rootScope.image = "";
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