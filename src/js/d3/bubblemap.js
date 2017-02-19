import * as d3 from 'd3';
import { map, curry, last } from 'ramda';

const truncate = (max, str) => str.length > max ? str.substr(0, max - 3) + '...' : str;
const getName = curry(truncate)(10);

const build = (data) => {
  if (!data || (data && !data.length)) {
    return data;
  }

  let target = document.createElement('div');
  const width = 800;
  const height = 600;

  let svg = d3.select(target).append('svg').attr('width', width).attr('height', height);
  let color = d3.scaleOrdinal(d3.schemeCategory20c);
  let format = d3.format(',d');

  let pack = d3.pack()
    .size([width, height])
    .padding(1.5);

  let uuid = 0;

  const nonEmpty = data.filter((d) => !!d.size);

  const root = d3.hierarchy({children: nonEmpty})
    .sum(d => d.size)
    .each(d => {
      d.id = ++uuid;
    });

  const node = svg.selectAll('.node')
    .data(pack(root).leaves())
    .enter().append('g')
      .attr('class', 'node')
      .attr('transform', (d) => `translate(${d.x}, ${d.y})`);

  node.append('circle')
    .attr('id', d => d.id)
    .attr('r', d => d.r)
    .style('fill', d => color(d.id));

  node.append('clipPath')
    .attr('id', d => 'clip-' + d.id)
    .append('use')
      .attr('xlink:href', d => '#' + d.id);

  node.append('text')
    .attr('clip-path', d => `url(#clip-${d.id})`)
    .selectAll('tspan')
    .data(d => {
      if (!(d.data.size > 4000)) {
        return [];
      }
      return [last(d.data.name.split('/'))];
    })
    .enter().append('tspan')
      .attr('x', 0)
      .attr('y', (d, i, nodes) => 13 + (i - nodes.length / 2 - 0.4) * 10)
      .text(d => {
        return d;
      });

  node.append('title')
    .text(d => d.id + '\n' + format(d.size));

  return target;
}

export default build;

