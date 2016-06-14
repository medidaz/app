'use strict';

angular.module('medidaz', ['medidaz.controllers', 'medidaz.services','ngRoute', 'ngAnimate'])
  .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', {
        templateUrl: 'views/index.html',
        controller: 'ConsultaCtrl'
      })
      .when('/sugestao', {
        templateUrl: 'views/sugestao.html',
        controller: 'ConsultaCtrl'
      })
      .when('/alimento/:idAlimento', {
        templateUrl: 'views/detalhes.html',
        controller: 'AlimentosCtrl'
      })
      .otherwise({ redirectTo: '/' });
  }])