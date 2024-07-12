import React from 'react'
import Button from './Button'

describe('<Button /> additional tests', () => {
  const text = "Masuk";
  const bgColor = "bg-gradient-to-r from-[#9b59b6] to-[#e74c3c]";
  const size = "sm:w-[27.125rem] w-[19rem] h-[2.938rem]";
  const txtColor = "text-white";
  const txtSize = "sm:w-[27.125rem] w-[19rem] h-[2.938rem]";
  const position = "sm:flex sm:justify-center sm:items-center flex justify-center items-center";

  beforeEach(() => {
    const onClick = cy.stub();
    cy.mount(
      <Button
        text={text}
        bgColor={bgColor}
        size={size}
        txtColor={txtColor}
        txtSize={txtSize}
        position={position}
        onClick={onClick}
      />
    );
    cy.wrap(onClick).as('onClick');
  });

  it('renders with correct text', () => {
    cy.get('button').contains(text);
  });

  it('applies the correct background color class', () => {
    cy.get('button').should('have.class', bgColor);
  });

  it('applies the correct size class', () => {
    cy.get('button').should('have.class', size);
  });

  it('applies the correct text color class', () => {
    cy.get('h1').should('have.class', txtColor);
  });

  it('applies the correct text size class', () => {
    cy.get('h1').should('have.class', txtSize);
  });

  it('applies the correct position class', () => {
    cy.get('h1').should('have.class', position);
  });

  it('handles click events correctly', () => {
    cy.get('button').click();
    cy.get('@onClick').should('have.been.called');
  });
});
