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

  it('ter-render', () => { // renders
    cy.get('button').should('exist');
  });

  it('menampilkan ikon yang benar', () => { // displays the correct icon
    cy.get('button').contains('Icon');
  });

  it('menampilkan tag yang benar', () => { // displays the correct tag
    cy.get('h1').contains('Tag');
  });

  it('menampilkan data yang benar', () => { // displays the correct data
    cy.get('h2').contains('Data');
  });

  it('menerapkan tautan yang benar', () => { // applies the correct link
    cy.get('a').should('have.attr', 'href', '/test-link');
  });
});
