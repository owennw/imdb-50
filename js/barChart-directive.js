(function () {
  'use strict';

  angular.module('imdb.barChart', [])
    .directive('top50BarChart', function () {
      return {
        restrict: 'E',
        controller: 'Top50Ctrl',
        scope: {
          data: '='
        },
        link: function (scope, element, attrs) {
          var margin = { top: 20, right: 40, bottom: 250, left: 30 },
          width = 1800 - margin.left - margin.right,
          height = 900 - margin.top - margin.bottom;

          var x = d3.scale.ordinal()
              .rangeRoundBands([0, width], .1);

          var y = d3.scale.linear()
              .range([height, 0]);

          var xAxis = d3.svg.axis()
              .scale(x)
              .orient("bottom");

          var yAxis = d3.svg.axis()
              .scale(y)
              .orient("left");

          var chart = d3.select(element[0]).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

          var render = function (data) {
            x.domain(data.map(function (d) { return d.title; }));
            y.domain([8, d3.max(data, function (d) { return d.rating; })]);

            chart.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + height + ")")
              .call(xAxis)
            .selectAll("text")
              .attr("y", 15)
              .attr("x", 5)
              .attr("dy", ".35em")
              .attr("transform", "rotate(45)")
              .style("text-anchor", "start");

            chart.append("g")
              .attr("class", "y axis")
              .call(yAxis)
            .append("text")
              .attr("transform", "rotate(-90)")
              .attr("y", 6)
              .attr("dy", ".71em")
              .style("text-anchor", "end")
              .text("Rating");

            chart.selectAll(".bar")
                .data(data)
              .enter().append("rect")
                .attr("class", "bar")
                .attr("x", function (d) { return x(d.title); })
                .attr("y", function (d) { return y(d.rating); })
                .attr("height", function (d) { return height - y(d.rating); })
                .attr("width", x.rangeBand());
          };

          scope.$watch('data', function () {
            render(scope.data);
          });
        }
      };
    });
}());