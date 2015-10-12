(function () {
  'use strict';

  var margin = { top: 50, right: 50, bottom: 50, left: 50 },
    width = 1800 - margin.left - margin.right,
    height = 750 - margin.top - margin.bottom;

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

  var chart = d3.select(".chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.json("imdb_top_50.json", function (error, data) {
    x.domain(data.map(function (d) { return d.title; }));
    y.domain([0, 10]); // d3.max(data, function (d) { return d.rating; })

    chart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

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
  });
}());