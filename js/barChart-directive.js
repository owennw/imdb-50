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
          barTextField: '='
        },
        link: function (scope, element, attrs) {
          var transitionDuration = 300;

          var margin = { top: 20, right: 10, bottom: 250, left: 80 },
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

          var render = function (data, domainField, rangeField, barTextField) {
            var yMin = function () {
              return d3.min(data, function (d) { return d[rangeField]; });
            };

            var yMax = function () {
              return d3.max(data, function (d) { return d[rangeField]; });
            };

            x.domain(data.map(function (d) { return d[domainField]; }));
            y.domain([yMin() * 0.99, yMax()]);

            // x-axis
            chart.append("g")
              .attr({
                class: "x axis",
                transform: "translate(0," + height + ")"
              })
            .append("text")
              .attr({
                class: "label",
                x: width / 2,
                y: 40
              })
              .style("text-anchor", "middle")
              .style("font-size", "15px");
            chart.select("g.x.axis")
              .transition()
              .duration(transitionDuration)
              .call(xAxis)
              .select("text.label")
              .text(domainField);

            // y-axis
            chart.append("g")
              .attr("class", "y axis")
            .append("text")
              .attr({
                class: "label",
                transform: "rotate(-90)",
                x: 0 - height / 2,
                y: 10 - margin.left,
                dy: ".71em"
              })
              .style("text-anchor", "middle")
              .style("font-size", "15px");
            chart.select("g.y.axis")
              .transition()
              .duration(transitionDuration)
              .call(yAxis)
              .select("text.label")
              .text(rangeField);

            var allBars = chart.selectAll("rect.bar")
                .data(data);
            var allText = chart.selectAll("text.barText")
                .data(data);

            // Add extra
            allBars.enter()
              .append("rect")
              .attr("class", "bar");
            allText.enter()
              .append("text")
              .attr("transform", "rotate(-90)")
              .style("fill", "white")
              .attr({
                dx: ".75em",
                dy: ".3em"
              })
              .attr("class", "barText");

            // create and place bars
            allBars
              .transition()
              .duration(transitionDuration)
              .attr("x", function (d) { return x(d[domainField]); })
              .attr("y", function (d) { return y(d[rangeField]); })
              .attr("height", function (d) { return height - y(d[rangeField]); })
              .attr("width", x.rangeBand());

            // insert text into bars
            allText
              .transition()
              .duration(transitionDuration)
              .attr("x", function (d) { return -height; })
              .attr("y", function (d) { return x(d[domainField]) + x.rangeBand() / 2; })
              .text(function (d) { return d[barTextField]; });

            allBars.exit().remove();
            allText.exit().remove();
          };

          var renderHelper = function (scope) {
            render(
             scope.data,
             scope.domainField || 'name',
             scope.rangeField || 'value',
             scope.barTextField || '');
          };

          scope.$watch('data', function () {
            renderHelper(scope);
          }, true);

          scope.$watch('rangeField', function () {
            renderHelper(scope);
          });
        }
      };
    });
}());