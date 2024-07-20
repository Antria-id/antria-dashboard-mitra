import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import Sidebar from '../navigation/Sidebar';

describe('Sidebar Component', () => {
  beforeEach(() => {
    cy.mount(
      <Router>
        <Sidebar />
      </Router>
    );
  });

  it('Handles logout properly', () => {
    // Simulate clicking on the logout button
    cy.get('button[aria-label="Logout"]').click();

    // Example: Test confirmation popup visibility
    cy.contains('Apakah kamu yakin ingin keluar?').should('be.visible');

    // Example: Test canceling logout
    cy.contains('Cancel').click();
    cy.contains('Apakah kamu yakin ingin keluar?').should('not.exist');

    // Example: Test logout functionality
    cy.get('button[aria-label="Logout"]').click();
    cy.contains('Sign Out').click();
    // Add assertions for logout functionality
  });

  // Add more tests as needed
});
