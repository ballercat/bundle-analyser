import * as d3 from 'd3';
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

const parseData = data => ({
  name: data.name,
  size: data.size,
  parent: null,
  children: data.deps.map(
    (dep, idx) => ({
      name: dep.name,
      size: dep.size,
      parent: data.name,
      original: dep,
      children: null,
      cid: idx
    }))
});

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

  const tree = d3.tree()
		.size([width, height]);

	var i = 0, duration = 750;
  const root = d3.hierarchy(parseData(data), d => d.children);
	root.x0 = width/2;
	root.y0 = height/2;;

  const build = (root) => {
		root = tree(root);
    // Compute the new tree layout.
		var nodes = root.descendants(),
			links = root.descendants().slice(1);

    // Normalize for fixed-depth.
    nodes.forEach(d => {
      d.y = 50 + (d.depth || 1) * (d.data.cid) * 20 * (d.data.size || 5);
    });

    // Update the nodes…
    var node = svg.selectAll("g.node")
      .data(nodes, d => d.id || (d.id = ++i));

    // Enter any new nodes at the parent's previous position.
    var nodeEnter = node.enter().append("g")
      .attr("class", "node")
      .attr("transform", () => `translate(${root.x0}, ${root.y0})`)
      .on("click", click);

    nodeEnter.append("circle")
      //.attr("r", 1e-6)
      .style("fill", d => d._children ? "lightsteelblue" : "#fff");

    nodeEnter.append("text")
      .attr("y", d => d.children || d._children ? -23 : 23)
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
      .attr("r", d => (d.data.size || 1 * 2))
      .style("fill", d => d._children ? "lightsteelblue" : "#fff");

    nodeUpdate.select("text")
      .style("fill-opacity", 1);

    // Transition exiting nodes to the parent's new position.
    var nodeExit = node.exit().transition()
      .duration(duration)
      .attr("transform", d => `translate(${root.x},${root.y})`)
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
      .attr("class", "link")
      .attr("d", function(d) {
        var o = {x: root.x0, y: root.y0};
        return diagonal(o, o);
      });

		var linkUpdate = linkEnter.merge(link);

    // Transition links to their new position.
    linkUpdate.transition()
      .duration(duration)
      .attr("d", d => diagonal(d.parent, d));

    // Transition exiting nodes to the parent's new position.
    var linkExit = link.exit().transition()
      .duration(duration)
      .attr("d", function(d) {
        var o = {x: root.x, y: root.y};
        return diagonal(o, o);
      })
      .remove();

    // Stash the old positions for transition.
    nodes.forEach(function(d) {
      d.x0 = d.x;
      d.y0 = d.y;
    });
  };

	// Collapse the node and all it's children
	function collapse(d) {
		if(d.children) {
			d._children = d.children
			d._children.forEach(collapse)
			d.children = null
		}
	}

	// Creates a curved (diagonal) path from parent to the child nodes
	function diagonal(s, d) {
		return `M ${s.x} ${s.y}
		C ${(s.x + d.x) / 2} ${s.y},
			${(s.x + d.x) / 2} ${d.y},
			${d.x} ${d.y}`;
	}

  // Toggle children on click.
  function click(d) {
    if (d.children) {
      d._children = d.children;
      d.children = null;
    } else {
      d.children = d._children;
      d._children = null;
    }
    build(d);
  }

	root.children.forEach(collapse);
	build(root);

  return target;
};

