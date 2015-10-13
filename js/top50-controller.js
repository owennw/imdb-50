(function () {
  'use strict';

  angular.module('imdb.top50', [])
    .controller('Top50Ctrl', ['top50DataService', function (top50DataService) {
      var self = this;
      self.domainField = 'rank';
      self.rangeField = 'rating';
      self.barTextField = 'title';

      var rank = { value: 'Rank', checked: true };
      var releaseYear = { value: 'Release Year', checked: false };
      self.sortings = [rank, releaseYear];

      self.data = [];
      top50DataService.getData()
        .then(function (data) {
          self.data = data;
        });
    }]);
}());