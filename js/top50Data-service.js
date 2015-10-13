(function () {
  'use strict';

  angular.module('imdb.service', [])
    .factory('top50DataService', ['$http', function ($http) {

      function getData() {
        return $http.get('imdb_top_50.json')
          .then(function (top50) {
            return top50.data;
          });
      }

      return {
        getData: getData
      };
    }]);
}());