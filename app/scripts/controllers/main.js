'use strict';

/**
 * @ngdoc function
 * @name picnavApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the picnavApp
 */
angular.module('PicNavigatorApp')
  .controller('MainCtrl', function ($scope, $http, $location, picService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.search = function () {
      // single query first to create ajax session id
      $http.get('http://www.palm-search.com/service/view/image/terms/?&terms=' + $scope.query).
        success(function () {
          // fire cluster query
          $http.get('http://www.palm-search.com/service/view/cluster/?&clusterId=10000%3B30%3B' + $scope.query + '%2C%3B%3B').
            success(function (data) {
              $location.path('/picnav');
              picService.setData(data);
            }).
            error(function (data, status, headers, config) {
              console.log(data, status, headers, config);
            });
        }).
        error(function (status, headers, config) {
          console.log(status, headers, config);
        });
    };
  });