(function () {
  'use strict';

  angular.module('imdb.barChart', [])
    .directive('top50BarChart', function () {
      return {
        restrict: 'E',
        scope: {
          data: '=',
          domainField: '=',
          rangeField: '=',
          barTextField: '=',
        },
        link: function (scope, element, attrs) {
          var margin = { top: 20, right: 10, bottom: 250, left: 60 },
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
            var domainField = scope.domainField || 'name';
            var rangeField = scope.rangeField || 'value';
            var barTextField = scope.barTextField || '';

            x.domain(data.map(function (d) { return d[domainField]; }));
            y.domain([8, d3.max(data, function (d) { return d[rangeField]; })]);

            // x-axis
            chart.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + height + ")")
              .call(xAxis);
            chart.append("text")
              .attr("transform", "translate(" + width / 2 + ", " + (height + 40) + ")")
              .style("text-anchor", "middle")
              .text(domainField);

            // y-axis
            chart.append("g")
              .attr("class", "y axis")
              .call(yAxis)
            .append("text")
              .attr("transform", "rotate(-90)")
              .attr("y", 10 - margin.left)
              .attr("x", 0 - height / 2)
              .attr("dy", ".71em")
              .style("text-anchor", "middle")
              .text(rangeField);

            var bar = chart.selectAll(".bar")
                .data(data)
              .enter();
            
            // create and place bars
            bar.append("rect")
              .attr("class", "bar")
              .attr("x", function (d) { return x(d[domainField]); })
              .attr("y", function (d) { return y(d[rangeField]); })
              .attr("height", function (d) { return height - y(d[rangeField]); })
              .attr("width", x.rangeBand());

            // insert text into bars
            bar.append("text")
              .attr("x", function (d) { return -height; })
              .attr("y", function (d) { return x(d[domainField]) + x.rangeBand() / 2; })
              .attr("transform", "rotate(-90)")
              .style("fill", "white")
              .attr("dx", ".75em")
              .attr("dy", ".3em")
              .text(function (d) { return d[barTextField]; });
          };

          scope.$watch('data', function () {
            render(scope.data);
          });
        }
      };
    });
}());