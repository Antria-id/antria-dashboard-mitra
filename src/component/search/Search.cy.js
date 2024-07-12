import React from "react";
import Search from './Search'; // sesuaikan path sesuai struktur proyek

describe('Search.cy.js', () => {
  it('should render Search component and handle input changes', () => {
    const onChangeSpy = cy.spy().as('onChangeSpy');
    const placeholderText = 'Search Products';

    cy.mount(<Search placeholder={placeholderText} onChange={onChangeSpy} />);

    cy.get('input')
      .should('have.attr', 'placeholder', placeholderText)
      .type('testing')
      .should('have.value', 'testing');

    cy.get('@onChangeSpy').should('have.been.called');
  });
});
