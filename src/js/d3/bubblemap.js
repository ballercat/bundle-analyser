import * as d3 from 'd3';
import d3tip from 'd3-tip';
import R, {
  all,
  not,
  isNil,
  map,
  curry,
  last,
  prop,
  compose,
  pluck,
  type,
  values
} from 'ramda';

const truncate = (max, str) => str.length > max ? str.substr(0, max - 3) + '...' : str;
const getName = curry(truncate)(10);

const sizeValue = sz => 10;
const size = compose(sizeValue, prop('size'), prop('data'));

const build = (options) => {
  if (!options || !options.data) {
    return options;
  }

  const {
    width,
    height,
    data,
    search
  } = options;

  let target = document.createElement('div');

  let svg = d3.select(target).append('svg').attr('width', width).attr('height', height);
  let color = d3.scaleOrdinal(d3.schemeCategory20c);
  let format = d3.format(',d');

  let pack = d3.pack()
    .size([width, height])
    .padding(1.0);

  let uuid = 0;

  const tip = d3tip()
    .attr('class', 'tooltip')
    //.offset([-10, 0])
    .offset(function() {
      return [0, 0];
    })
    .html(d => `<p>Module: ${d.data.name}</p>
                <p>Size:   ${d.data.size}KB</p>
                <p>Refs:   ${d.data.refs.length}</p>`
    );

  svg.call(tip);

  const nonEmpty = data.filter((d) => !!d.size);

  const noRoot = {children: nonEmpty};
  const getChild = (d) => {
    if (type(d) === 'Array') {
      return d;
    }
    return R.pluck('name', d);
  }

  const root = d3.hierarchy(noRoot)
    .sum(d => d.size ? d.size : 0)
    .sort((a, b) => a.refs ? a.refs.length * a.size - b.refs.length * b.size : 0)
    .each(d => {
      d.id = ++uuid;

      let name = d.data.name;
      try {
        name = decodeURI(name);
      } catch (e) {}
      d.data.name = name.replace(/%2C/, ',');
    });

  const node = svg.selectAll('.node')
    .data(pack(root).leaves())
    .enter().append('g')
      .attr('class', 'node')
      .attr('transform', (d) => `translate(${d.x}, ${d.y})`);


  node.append('circle')
    .attr('id', d => d.id)
    .attr('r', d => d.r)
    .style('fill', d => color(d.id))
    .on('mouseover', function(d) {
      tip.show.call(this, d);
      d3.select(this).transition().duration(200)
        .attr('stroke', 'black')
        .attr('stroke-width', 3);

      const name = d.data.name;
      const refs = d.data.refs;

      d3.selectAll('circle')
        .filter((d) => {
          if (name === d.data.name) {
            return false;
          }
          return !R.contains(d.data.name, refs);
        })
        .transition().duration(100)
        .attr('fill-opacity', 0.1);
    })
    .on('mouseout', function(d) {
      tip.hide.call(this, d);
      d3.select(this).transition().duration(100)
        .attr('stroke', 1);

      const name = d.data.name;
      d3.selectAll('circle')
        .filter((d) => d.data.deps.indexOf(name) < 0)
        .transition().duration(100)
        .attr('fill-opacity', 1);
    });


  node.append('clipPath')
    .attr('id', d => 'clip-' + d.id)
    .append('use')
      .attr('xlink:href', d => '#' + d.id);

  if (search) {
    d3.selectAll('circle')
      .filter((d) => d.data.name !== search)
      .transition().duration(100)
      .attr('fill-opacity', 1);
  }

  node.append('title')
    .text(d => d.data.name + '\n' + format(d.data.size));

  return target;
}

export default build;

