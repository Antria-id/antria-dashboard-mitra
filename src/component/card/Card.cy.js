import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import Card from './Card';

describe('<Card />', () => {
  it('renders', () => {
    const props = {
      link: '/some-path',
      icon: <span>Icon</span>,
      tag: 'Tag',
      data: 'Data',
    };

    // Wrap the component with MemoryRouter
    cy.mount(
      <MemoryRouter>
        <Card {...props} />
      </MemoryRouter>
    );
  });
});
