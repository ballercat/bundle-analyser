import React, { Component } from 'react';
import {
  not,
  both,
  isNil,
  curry,
  equals,
  when,
  map,
  filter,
  compose,
  fromPairs,
  either,
  prop,
  merge,
  addIndex
} from 'ramda';
import '../../scss/components/PickSource';

const Group = (props) => (
  <li className="PickSource-group">
    <label>{props.label}</label>
    {props.inputs ? mapToFormInputs(props.inputs) : null}
  </li>
);

const TextInput = (props) => (
  <input type="text"
         className="PickSource-divided"
         name={props.name}
         placeholder={props.placeholder}>
  </input>
);

const Button = (props) => (
  <button type={props.type}
          className="PickSource-submit">
    {props.text}
  </button>
);

const toInput = curry(
    (InputComponent, options) => merge(
      options,
      {
        instance: <InputComponent {...options} />
      }
    )
);
const noInstance = compose(isNil, prop('instance'));
const isTextInputType = compose(equals('text-input'), prop('type'));
const toTextInput = toInput(TextInput);
const getTextInput = when(both(isTextInputType, noInstance), toTextInput);
const isGroupType = compose(equals('group'), prop('type'));
const toGroup = toInput(Group);
const getGroup = when(both(isGroupType, noInstance), toGroup);
const isButtonType= compose(equals('submit'), prop('type'));
const toButton = toInput(Button);
const getButton = when(both(isButtonType, noInstance), toButton);
const getFormChild = compose(
  prop('instance'),
  getGroup,
  getTextInput,
  getButton,
  (options, index) => merge(options, {key: index})
);
const mapToFormInputs = addIndex(map)(getFormChild);

const getPairs = map(input => [input.name, input.value]);
const getInputs = filter(el => el.type === 'text');
const serialize = compose(fromPairs, getPairs, getInputs);

export default function(props) {
  const hasSubmit = not(isNil(props.onSubmit));
  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(serialize(e.target.elements));
  }
  const onSubmit = hasSubmit ? handleSubmit : null;
  const inputs = props.inputs ? mapToFormInputs(props.inputs) : null;
  return (
    <form className="PickSource" onSubmit={onSubmit}>
      <ul>{inputs}</ul>
    </form>
  );
};

