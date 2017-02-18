import React, { Component } from 'react';
import { map, filter, compose, fromPairs } from 'ramda';
import '../../scss/components/PickSource';

const getPairs = map(input => [input.name, input.value]);
const getInputs = filter(el => el.type === 'text');
const serialize = compose(fromPairs, getPairs, getInputs);

const Group = (props) => (
  <li className="PickSource-group">
    <label>{props.label}</label>
    {props.children}
  </li>
);

const TextInput = (props) => (
  <input type="text"
         className="PickSource-divided"
         name={props.name}
         placeholder={props.placeholder}>
  </input>
);

export default class PickSource extends Component {

  submit(e) {
    if (typeof this.props.onSubmit === 'function') {
      e.preventDefault();
      this.props.onSubmit(serialize(e.target.elements));
    }
  }

  render() {
    return (
      <form className="PickSource" onSubmit={this.submit.bind(this)}>
        <ul>
          <Group label={'Pick a Source to analyse'}>
            <TextInput name={"source"} placeholder={"Source"} />
            <TextInput name={"entry"} placeholder={"Entry point (optional)"} />
          </Group>


          <li className="PickSource-group">
            <button type="submit" className="PickSource-submit">Analyse</button>
          </li>
        </ul>
      </form>
    );
  }
}

