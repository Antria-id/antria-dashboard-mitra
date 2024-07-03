import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import Navigation from './Navigation';

describe('<Navigation />', () => {
  beforeEach(() => {
    cy.mount(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );
  });

  it('renders correctly', () => {
    // Check if the navigation component is rendered
    cy.get('aside').should('exist');
  });

  it('contains navigation links', () => {
    // Check if all navigation links are present
    const menuItems = [
      { path: '/data-analytics', text: 'Data Analytics' },
      { path: '/data-akun', text: 'Data Akun' },
      { path: '/data-pemasukan', text: 'Data Pemasukan' },
      { path: '/data-menu', text: 'Data Menu' },
    ];

    menuItems.forEach(item => {
      cy.get(`a[href="${item.path}"]`).should('exist');
      cy.contains(item.text).should('exist');
    });
  });

  it('toggles the sidebar', () => {
    // Check initial state (expanded)
    cy.get('aside').should('have.class', 'w-[17.9rem]');
    
    // Click to toggle
    cy.get('button').contains('FaChevronLeft').click();
    
    // Check collapsed state
    cy.get('aside').should('have.class', 'w-[6rem]');
    
    // Click to toggle back
    cy.get('button').contains('FaChevronRight').click();
    
    // Check expanded state again
    cy.get('aside').should('have.class', 'w-[17.9rem]');
  });

  it('opens and closes the logout popup', () => {
    // Click logout button to open popup
    cy.get('button').within(() => {
      cy.get('svg').should('have.class', 'fa-sign-out-alt').click();
    });
    
    // Check if the popup is visible
    cy.get('.fixed').should('exist');
    cy.contains('Apakah kamu yakin ingin keluar?').should('exist');
    
    // Click Cancel to close the popup
    cy.contains('Cancel').click();
    
    // Check if the popup is hidden
    cy.get('.fixed').should('not.exist');
  });

  it('logs out correctly', () => {
    // Click logout button to open popup
    cy.get('button').within(() => {
      cy.get('svg').should('have.class', 'fa-sign-out-alt').click();
    });
    
    // Check if the popup is visible
    cy.get('.fixed').should('exist');
    cy.contains('Apakah kamu yakin ingin keluar?').should('exist');
    
    // Click Sign Out to log out
    cy.contains('Sign Out').click();
    
    // Check if redirected to login page
    cy.url().should('include', '/Login');
  });
});
