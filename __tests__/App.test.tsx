import { render } from '@testing-library/react-native';
import React from 'react';
import App from '../App.tsx';
describe('App', () => {
  it('renders a text component', () => {
    const { getByText, debug } = render(<App />);
    const text = getByText('Test');
    expect(text).toBeTruthy();
  });
});
