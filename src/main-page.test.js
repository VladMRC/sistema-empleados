import React from 'react';
import {screen, render} from '@testing-library/react';

import MainPage  from "./main-page";

test("Renders Priority Label", () => {
    render(<Main />);
    const linkElement = screen.getByText("Main Page");
    expect(linkElement);
});