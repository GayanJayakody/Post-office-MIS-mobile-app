import React from 'react';
import Delivered from '../screens/MarkAsDelivered';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<Delivered />).toJSON();
  expect(tree).toMatchSnapshot();
});