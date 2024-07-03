import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import Card from './Card';

describe('<Card />', () => {
  it('renders', () => {
    const props = {
      link: '',
      icon: <span>Icon</span>,
      tag: 'Tag',
      data: 'Data',
    };

    cy.mount(
      <MemoryRouter>
        <Card {...props} />
      </MemoryRouter>
    );
  });
});
