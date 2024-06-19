import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import Navigation from './Navigation';

describe('<Navigation />', () => {
  it('renders', () => {
    // Wrap the component with MemoryRouter
    cy.mount(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );
  });
});
