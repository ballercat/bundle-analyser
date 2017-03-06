import logger from '../logger';
import * as d3 from 'd3';
import R, {
  is,
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
  values,
  addIndex
} from 'ramda';

const isArray = is(Array);
const mapChild = curry((p, c, i) => ({
    name: c.name,
    size: c.size,
    parent: p.name,
    original: c,
    children: c.expand ? addIndex(map)(mapChild(c), c.deps): null,
    cid: i
}));
const parseData = data => ({
  name: data.name,
  size: data.size,
  parent: null,
  children: addIndex(map)(mapChild(data), data.deps)
});

// Collapse the node and all it's children
const collapse = d => {
  if(d.children) {
    d._children = d.children
    d._children.forEach(collapse)
    d.children = null
  }
}

// Toggle children on click.
const click = curry((build, root, d) => {
  if (d === root) {
    if (d.children) {
      d._children = d.children;
      d.children = null;
    } else {
      d.children = d._children;
      d._children = null;
    }
    build(d);
  } else {
    if (d.children) {
      d.data.original.expand = false;
    } else {
      d.data.original.expand = true;
    }
    build(root);
  }

});

const radius = d => Math.max((d.data || d).size, 1) * 2;
const hierarchy = (data, width) => Object.assign(
  d3.hierarchy(parseData(data), prop('children')),
  {
    isRoot: true,
    x0: width/2,
    y0: radius(data) * 1.5
  }
);
const diagonal = d3.line().x(d => d.x).y(d => d.y); // .curve(d3.curveStep);

const mapIds = addIndex((d, i) => d.id || i);
const normalizeDepth = d => {
  if (!d.isRoot) {
    d.y = 50 + d.depth * 150 + (((d.data || d).size || 10) * 10);
  } else {
    d.y = radius(d) * 2;
  }
};
const nodeTransform = curry((root, d) => d.parent ? `translate(${d.parent.x}, ${d.parent.y})` : `translate(${root.x0}, ${root.y0})`);

export default (options) => {
  const {
    width,
    height,
    data,
  } = options;

  const target = document.createElement('div');

  const svg = d3.select(target)
    .append('svg')
    .attr('width', width + 20)
    .attr('height', height + 20)
    .append('g');

  const tree = d3.tree().size([width, height]);
  const duration = 750;

  const build = (data) => {
		const root = tree(hierarchy(data, width));
    const clickHandler = click(build, data);
    // Compute the new tree layout.
		var nodes = root.descendants(),
			links = root.descendants().slice(1);

    // Normalize for fixed-depth.
    nodes.forEach(normalizeDepth);

    // Update the nodes…
    var node = svg.selectAll("g.node").data(nodes, mapIds);

    // Enter any new nodes at the parent's previous position.
    var nodeEnter = node.enter().append("g")
      .attr("class", "node")
      .attr("transform", nodeTransform(root))
      .on("click", clickHandler);

    nodeEnter.append("circle")
      .attr("r", radius)
      .style("fill", d => d._children ? "lightsteelblue" : "#fff");

    nodeEnter.append("text")
      .attr("y", d => d.children || d._children ? radius(d) * -1.4 : radius(d) + 10)
      .attr("dy", ".35em")
      .attr("text-anchor", d => d.children || d._children ? "end" : "start")
      .text(d => d.data.name)
      .style("fill-opacity", 1e-6);

    // Transition nodes to their new position.
    var nodeUpdate = nodeEnter.merge(node);

		nodeUpdate.transition()
      .duration(duration)
      .attr("transform", d => `translate(${d.x}, ${d.y})`);

    nodeUpdate.select("circle")
      .style("fill", d => d._children ? "lightsteelblue" : "#fff");

    nodeUpdate.select("text")
      .style("fill-opacity", 1);

    // Transition exiting nodes to the parent's new position.
    var nodeExit = node.exit().transition()
      .duration(duration)
      .attr("transform", nodeTransform(root))
      .remove();

    nodeExit.select("circle")
      .attr("r", 1e-6);

    nodeExit.select("text")
      .style("fill-opacity", 1e-6);

    // Update the links…
    var link = svg.selectAll("path.link")
      .data(links, d => d.id);

    // Enter any new links at the parent's previous position.
    var linkEnter = link.enter().insert("path", "g")
      .style("stroke-dasharray", ("3, 5"))
      .attr("class", "link")
      .attr('d', d => d.parent ?
        diagonal([d.parent, d.parent]) :
        diagonal([{x: root.x0, y: root.y0}, {x: root.x0, y: root.y0}]));

		var linkUpdate = linkEnter.merge(link);

    // Transition links to their new position.
    linkUpdate.transition()
      .duration(duration)
      .attr("d", d => diagonal([d.parent, d]));

    // Transition exiting nodes to the parent's new position.
    var linkExit = link.exit().transition()
      .duration(duration)
      .attr("d", (d) => d.parent ? diagonal([d.parent, d.parent]) : diagonal([root, root]))
      .remove();

    // Stash the old positions for transition.
    nodes.forEach(function(d) {
      d.x0 = d.x;
      d.y0 = d.y;
    });
  };

	build(data);

  return target;
};

