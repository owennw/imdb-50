(function () {
  'use strict';

  var width = 1500,
    height = 500;

  var y = d3.scale.linear()
      .range([height, 0]);

  var chart = d3.select(".chart")
    .attr("width", width)
    .attr("height", height);

  d3.json("imdb_top_50.json", function (error, data) {
    y.domain([0, d3.max(data, function (d) { return d.rating; })]);

    var barWidth = width / data.length;

    var bar = chart.selectAll("g")
        .data(data)
      .enter().append("g")
        .attr("transform", function (d, i) { return "translate(" + i * barWidth + ",0)"; });

    bar.append("rect")
      .attr("y", function (d) { return y(d.rating); })
      .attr("height", function (d) { return height - y(d.rating); })
      .attr("width", barWidth - 1);

    bar.append("text")
      .attr("x", barWidth / 2)
      .attr("y", function (d) { return y(d.rating) + 3; })
      .attr("dy", ".75em")
      .text(function (d) { return d.rating; });
  });
}());