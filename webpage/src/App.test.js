import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { getElapsedTime } from './Helpers/helpers';

// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/ /i);
//   expect(linkElement).toBeInTheDocument();
// });
test('get elapsed time in string format', () => {
    expect(getElapsedTime(Date.now())).toBe("0 seconds");
    expect(getElapsedTime(Date.now() - 10000)).toBe("10 seconds");
    expect(getElapsedTime(Date.now() - 70000)).toBe("1 minute");
});