import React from 'react';
import {screen, render} from '@testing-library/react';

import { MainPage, HomeP } from "./main-page";

//1. - Crear un test que falle (RED)
//2. - lo MINIMO necesario para que el test pase (GREEN)
//3. - refactos (clean code, code smells)

describe('MainPage', () => {
    it('must display a title', () => {
        render(<MainPage />);
        expect(screen.queryByText(/ReactDOM/i));
    });
});