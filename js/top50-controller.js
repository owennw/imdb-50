(function () {
  'use strict';

  angular.module('imdb.top50', [])
    .controller('Top50Ctrl', ['top50DataService', function (top50DataService) {
      var self = this;
      self.domainField = 'rank';
      self.rangeField = 'rating';
      self.barTextField = 'title';
      self.sortKey = 1;
      self.sortings = [
        { id: 1, name: 'Rank', field: 'rank' },
        { id: 2, name: 'Release Year', field: 'year' }
      ];

      var lookup = {};
      for (var i = 0; i < self.sortings.length; i++) {
        lookup[self.sortings[i].id] = self.sortings[i];
      }

      self.data = [];
      top50DataService.getData()
        .then(function (data) {
          self.data = data;
        });

      self.sortData = function () {
        self.domainField = lookup[self.sortKey].field;
        
        var tempData = self.data;

        self.data = tempData.sort(function (a, b) {
          return self.sortKey === 1 ? a.rank - b.rank : b.year - a.year;
        });
      };
    }]);
}());