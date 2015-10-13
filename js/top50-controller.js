(function () {
  'use strict';

  angular.module('imdb.top50', [])
    .controller('Top50Ctrl', ['top50DataService', function (top50DataService) {
      var self = this;

      top50DataService.getData()
        .then(function (data) {
          self.data = data;
        });
    }]);
}());