import * as d3 from 'd3';

var node = document.createElement('div');

var width = 950,
  height = 500;

var svg = d3.select(node).append('svg')
  .attr('width', width)
  .attr('height', height);

var defs = svg.append('defs');

defs.append('clipPath')
  .attr('id', 'circle1')
  .append('circle')
    .attr('cx', 350)
    .attr('cy', 200)
    .attr('r', 180);

defs.append('clipPath')
  .attr('id', 'circle2')
  .append('circle')
    .attr('cx', 550)
    .attr('cy', 200)
    .attr('r', 180);

export default node;

