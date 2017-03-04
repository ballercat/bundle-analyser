import React, { Component } from 'react';
import Form from './Form';
import Progress from './Progress';
import ModuleMap from './ModuleMap';
import appConfig from '../../defaults';
import {
  has,
  map,
  curry
} from 'ramda';

const App = (props) => (
  <div className="App">
  </div>
);

export default App;

//   constructor(props) {
//     super(props);
//     this.state = {
//       loading: false,
//       modules: []
//     };
//
//     this.setModules = this.setModules.bind(this);
//   }
//
//   render() {
//     const moduleMap = this.state.modules ?
//       <ModuleMap
//         modules={this.state.modules}
//         ref={(el) => this.moduleMap = el}
//       /> : null;
//
//     return (
//       <div className="App">
//         <Form
//           onSubmit={this.addSource.bind(this)}
//           inputs={appConfig.pick_source.inputs}
//         />
//         <Progress loading={this.state.loading} />
//
//         { moduleMap }
//
//         { this.state.modules ?
//             <Form
//               onSubmit={this.searchModule.bind(this)}
//               inputs={appConfig.search_module.inputs}
//             /> : null }
//       </div>
//     );
//   }
// }
//
