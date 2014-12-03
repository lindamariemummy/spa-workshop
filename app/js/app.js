angular.module('services', []);
angular.module('controllers', []);
angular.module('directives', []);


(function() {
  angular.module('spaWorkshop', ['ngRoute', 'Aerobatic', 'services', 'controllers', 'directives', 'templates'])
  .config(function ($routeProvider, $locationProvider, $sceDelegateProvider, aerobaticProvider) {
    // Use html5 pushState for route navigation
    $locationProvider.html5Mode(true);

    // $sceDelegateProvider.resourceUrlWhitelist([
    //   // Allow same origin resource loads.
    //   'self',
    //   // Allow loading from our assets domain.  Notice the difference between * and **.
    //   'http://localhost:3000/partials/**'
    // ]);

    // In release mode templates should be compiled to JavaScript and added to the $templateCache. In
    // this case we refer to the templates simply by their relative path, i.e. 'partials/index.html'.
    // But in debug mode it's simpler to load the templates on demand via absolute URL. This avoids
    // having to configure a watch task to continously re-generated the compiled template script
    // everytime one is changed.

    // The html2js grunt task or gulp-angular-templatecache can be used to compile the templates
    // into a module called 'templates' which is injected into this app.
    function templateUrl(path) {
      if (aerobaticProvider.config.buildType === 'debug')
        return aerobaticProvider.config.cdnUrl + '/' + path;
      else
        return path;
    }

    $routeProvider
      .when('/', {
        controller: 'IndexCtrl',
        controllerAs: 'this',
        templateUrl: templateUrl('partials/index.html')
      })
      .when('/cities/:city', {
        controller: 'CityCtrl',
        controllerAs: 'this',
        templateUrl: templateUrl('partials/city.html')
      })
      .otherwise({redirectTo: '/'});
  });
})();
