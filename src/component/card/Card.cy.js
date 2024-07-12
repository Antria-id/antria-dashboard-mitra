import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import Card from './Card';

describe('<Card />', () => {
  const props = {
    link: '/test-link',
    icon: <span>Icon</span>,
    tag: 'Tag',
    data: 'Data',
  };

  beforeEach(() => {
    cy.mount(
      <MemoryRouter>
        <Card {...props} />
      </MemoryRouter>
    );
  });

  it('renders', () => {
    cy.get('button').should('exist');
  });

  it('displays the correct icon', () => {
    cy.get('button').contains('Icon');
  });

  it('displays the correct tag', () => {
    cy.get('h1').contains('Tag');
  });

  it('displays the correct data', () => {
    cy.get('h2').contains('Data');
  });

  it('applies the correct link', () => {
    cy.get('a').should('have.attr', 'href', '/test-link');
  });
});
