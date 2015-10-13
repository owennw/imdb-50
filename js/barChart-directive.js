(function () {
  'use strict';

  angular.module('imdb.barChart', [])
    .directive('top50BarChart', function () {
      return {
        restrict: 'E',
        scope: {
          data: '=',
          sort: '&'
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
            var xValue = function (d) {
              return d.rank;
            };

            var yValue = function (d) {
              return d.rating;
            };

            x.domain(data.map(function (d) { return xValue(d); }));
            y.domain([8, d3.max(data, function (d) { return yValue(d); })]);

            // x-axis
            chart.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + height + ")")
              .call(xAxis)
            .append("text")
              .attr("y", 15)
              .attr("x", 0)
              .attr("dy", ".35em")
              .style("text-anchor", "middle");

            // y-axis
            chart.append("g")
              .attr("class", "y axis")
              .call(yAxis)
            .append("text")
              .attr("transform", "rotate(-90)")
              .attr("y", 6)
              .attr("dy", ".71em")
              .style("text-anchor", "middle")
              .text("Rating");

            var bar = chart.selectAll(".bar")
                .data(data)
              .enter();
            
            // create and place bars
            bar.append("rect")
              .attr("class", "bar")
              .attr("x", function (d) { return x(xValue(d)); })
              .attr("y", function (d) { return y(yValue(d)); })
              .attr("height", function (d) { return height - y(yValue(d)); })
              .attr("width", x.rangeBand());

            // insert text into bars
            bar.append("text")
              .attr("x", function (d) { return -height; })
              .attr("y", function (d) { return x(xValue(d)) + x.rangeBand() / 2; })
              .attr("transform", "rotate(-90)")
              .style("fill", "white")
              .attr("dx", ".75em")
              .attr("dy", ".3em")
              .text(function (d) { return d.title; });
          };

          scope.$watch('data', function () {
            render(scope.data);
          });
        }
      };
    });
}());