import R from 'ramda';

let modules = [];

export const define = function (name, deps, body, ref) {
  const module = modules[name] || {
    name: name,
    deps: [],
    body: '',
    size: 0,
    refs: []
  };
  if (deps) {
    if (deps.length !== module.deps.length) {
      module.deps = R.map((m) => define(m, null, null, name), deps);
    }
    if (body.length !== module.body.length) {
      module.body = body;
      module.size = Math.ceil(body.toString().length / 1024);
    }
  }

  if (ref) {
    module.refs.push(ref);
  }

  return modules[name] = module;
};

export const importScript = (source) => new Promise((resolve) => {
  modules = [];
  let script = document.createElement('script');
  script.src = source;
  script.onload = () => {
    resolve(R.sort(R.prop('size'), R.values(modules)));
  };

  document.head.appendChild(script);
});

