﻿(function () {
  'use strict';

  var width = 1000,
    barHeight = 20;

  var x = d3.scale.linear()
      .range([0, width]);

  var chart = d3.select(".chart")
    .attr("width", width);

  d3.json("imdb_top_50.json", function (error, data) {
    x.domain([0, d3.max(data, function (d) { return d.rating; })]);

    chart.attr("height", barHeight * data.length);

    var bar = chart.selectAll("g")
        .data(data)
      .enter().append("g")
        .attr("transform", function (d, i) { return "translate(0," + i * barHeight + ")"; });

    bar.append("rect")
      .attr("width", function (d) { return x(d.rating); })
      .attr("height", barHeight - 1);

    bar.append("text")
      .attr("x", function (d) { return x(d.rating) - 3; })
      .attr("y", barHeight / 2)
      .attr("dy", ".35em")
      .text(function (d) { return d.rating; });
  });
}());