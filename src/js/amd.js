import R from 'ramda';

let modules = [];

const define = function (name, deps, body) {
  const module = modules[name] || {name: name, deps: [], body: '', size: 0};
  if (arguments.length > 1) {
    if (deps.length !== module.deps.length) {
      module.deps = R.map(define, deps);
    }
    if (body.length !== module.body.length) {
      module.body = body;
      module.size = body.toString().length;
    }
  }
  return modules[name] = module;
};

const importScript = (source) => new Promise((resolve) => {
  modules = [];
  let script = document.createElement('script');
  script.src = source;
  script.onload = () => {
    resolve(R.sort(R.prop('size'), R.values(modules)));
  };

  document.head.appendChild(script);
});

export {
  define,
  importScript
}

