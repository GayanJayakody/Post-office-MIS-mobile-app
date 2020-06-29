import React from 'react';
import Scan from '../screens/QR';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<Scan />).toJSON();
  expect(tree).toMatchSnapshot();
});