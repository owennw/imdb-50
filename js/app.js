(function () {
  'use strict';

  var margin = { top: 10, right: 10, bottom: 10, left: 10 },
    width = 1500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  var x = d3.scale.ordinal()
      .rangeRoundBands([0, width], .1);

  var y = d3.scale.linear()
      .range([height, 0]);

  var chart = d3.select(".chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.json("imdb_top_50.json", function (error, data) {
    x.domain(data.map(function (d) { return d.title; }));
    y.domain([0, d3.max(data, function (d) { return d.rating; })]);

    var bar = chart.selectAll("g")
        .data(data)
      .enter().append("g")
        .attr("transform", function (d, i) { return "translate(" + x(d.title) + ",0)"; });

    bar.append("rect")
      .attr("y", function (d) { return y(d.rating); })
      .attr("height", function (d) { return height - y(d.rating); })
      .attr("width", x.rangeBand());

    bar.append("text")
      .attr("x", x.rangeBand() / 2)
      .attr("y", function (d) { return y(d.rating) + 3; })
      .attr("dy", ".75em")
      .text(function (d) { return d.rating; });
  });
}());