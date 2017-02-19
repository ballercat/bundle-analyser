import * as d3 from 'd3';
import { map, curry } from 'ramda';

const truncate = (max, str) => str.length > max ? str.substr(0, max - 3) + '...' : str;
const getName = curry(truncate)(10);

const build = (data) => {
  let target = document.createElement('div');
  const width = 800;
  const height = 600;

  let svg = d3.select(target).append('svg').attr('width', width).attr('height', height);
  let color = d3.scaleOrdinal(d3.schemeCategory20);
  let format = d3.format(',d');

  let treemap = d3.treemap(svg)
    .size([width, height])
    .round(true)
    .padding(1);

  window.data = data;

  const render = (data) => {
    const root = d3.stratify()
      .id(d => d.name)
      .parentId(d => 'rootId')
      (data)
        .sum(d => d.size)
        .sort((a, b) => a.size > b.size);

    treemap(root);

    const cell = svg.selectAll('a')
      .data(root.leaves());

    cell.append('rect')
      .attr('id', (d) => d.id)
      .attr('width', (d) => d.x1 - d.x0)
      .attr('height', (d) => d.y1 - d.y0)
      .attr('fill', (d) => { let a = d.ancestors(); return color(a[a.length - 2].id); });

    cell.append('clipPath')
      .attr('id', (d) => 'clip-' + d.id)
      .append('use')
      .attr('xlink:href', (d) => '#' + d.id);

    const label = cell.append('text')
      .attr('clip-path', (d) => 'url(#clip-' + d.id + ')');

    label.append('tspan')
      .attr('x', 4)
      .attr('y', 13)
      .text((d) => getName(d.name));

    label.append('tspan')
      .attr('x', 4)
      .attr('y', 25)
      .text((d) => d.size);

    cell.append('title').text((d) => d.id + '\n' + format(d.size));
  };

  map(render, data);

  return target;
};

export default build;

