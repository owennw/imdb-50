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
      self.displayKey = 1;
      self.displays = [
        { id: 1, name: 'Rating', field: 'rating' },
        { id: 2, name: 'Number of Votes', field: 'votes' }
      ];

      var createLookup = function (array) {
        var lookup = {};
        for (var i = 0, max = array.length; i < max; i += 1) {
          lookup[array[i].id] = array[i];
        }

        return lookup;
      };

      var sortLookup = createLookup(self.sortings);
      var displayLookup = createLookup(self.displays);

      self.data = [];
      top50DataService.getData()
        .then(function (data) {
          self.data = data;
        });

      self.sortData = function () {
        self.domainField = sortLookup[self.sortKey].field;
        
        var tempData = self.data;

        self.data = tempData.sort(function (a, b) {
          return self.sortKey === 1 ? a.rank - b.rank : b.year - a.year;
        });
      };

      self.refreshRange = function () {
        self.rangeField = displayLookup[self.displayKey].field;
      };
    }]);
}());