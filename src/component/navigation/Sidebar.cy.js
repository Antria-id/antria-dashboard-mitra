/// <reference types="cypress" />
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import Sidebar from './Sidebar';

describe('<Sidebar />', () => {
  beforeEach(() => {
    cy.mount(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );
  });

  it('renders correctly', () => {
    cy.get('.sidebar-component aside').should('exist');
    cy.get('.sidebar-component aside').then($aside => {
      console.log('Aside element found:', $aside);
    });
  });
  

  it('contains navigation links', () => {
    const menuItems = [
      { to: '/data-analytics', text: 'Data Analytics' },
      { to: '/data-akun', text: 'Data Akun' },
      { to: '/data-pemasukan', text: 'Data Pemasukan' },
      { to: '/data-menu', text: 'Data Menu' },
    ];

    menuItems.forEach((item) => {
      cy.get(`.sidebar-component a[href="${item.to}"]`).should('exist');
      cy.contains(item.text).should('exist');
    });
  });

  it('toggles the sidebar', () => {
    cy.get('.sidebar-component aside').should('have.class', 'w-[17.9rem]');
    cy.get('.sidebar-component button').contains('FaChevronLeft').click();
    cy.get('.sidebar-component aside').should('have.class', 'w-[6rem]');
    cy.get('.sidebar-component button').contains('FaChevronRight').click();
    cy.get('.sidebar-component aside').should('have.class', 'w-[17.9rem]');
  });

  it('opens and closes the logout popup', () => {
    cy.get('.sidebar-component button').contains('FaSignOutAlt').click();
    cy.get('.fixed', { timeout: 10000 }).should('exist');
    cy.contains('Apakah kamu yakin ingin keluar?', { timeout: 10000 }).should('exist');
    cy.contains('Cancel').click();
    cy.get('.fixed').should('not.exist');
  });

  it('logs out correctly', () => {
    cy.window().then((win) => {
      win.localStorage.setItem('authToken', 'mockAuthToken');
    });

    cy.get('.sidebar-component button').contains('FaSignOutAlt').click();
    cy.get('.fixed', { timeout: 10000 }).should('exist');
    cy.contains('Apakah kamu yakin ingin keluar?', { timeout: 10000 }).should('exist');
    cy.contains('Sign Out').click();
    cy.url().should('include', '/Login');
    cy.window().then((win) => {
      expect(win.localStorage.getItem('authToken')).to.be.null;
    });
  });
});
