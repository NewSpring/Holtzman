// __tests__/Input.js

import React from 'react';
import { mount } from 'enzyme';
import Input from '../Input.js';

it('Password input allows <> in field', () => {
  // Render a password with <> in the value
  const passwordInput = mount(
    <Input name="password" defaultValue="1234<>" />
  );

  expect(passwordInput.instance().getValue()).toEqual("1234<>");
});

it('Name input does not allow <> in field', () => {
  // Render a input with <> in the value
  const passwordInput = mount(
    <Input name="something" defaultValue="1234<>" />
  );

  expect(passwordInput.instance().getValue()).toEqual("1234");
});