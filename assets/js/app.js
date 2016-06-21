'use strict';

angular.module('medidaz', ['medidaz.controllers', 'medidaz.services','ngRoute', 'ngAnimate', 'ngSanitize', 'ng-showdown'])
  .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', {
        templateUrl: 'views/index.html',
        controller: 'ConsultaCtrl'
      })
      .when('/sobre', {
        templateUrl: 'views/sobre.html',
        cache: false,
        controller: 'SobreCtrl'
      })
      .when('/sugestao', {
        templateUrl: 'views/sugestao.html',
        controller: 'ConsultaCtrl'
      })
      .when('/alimento/:idAlimento', {
        templateUrl: 'views/detalhes.html',
        controller: 'AlimentosCtrl'
      })
      .when('/fonte/:idFonte', {
        templateUrl: 'views/fonte.html',
        controller: 'FonteCtrl'
      })
      .otherwise({ redirectTo: '/' });
  }])

  