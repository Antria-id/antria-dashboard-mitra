// cypress/component/Tab.spec.js

import React from 'react';
import Tab from '../tab/Tab';

describe('<Tab />', () => {
  it('renders without tabs', () => {
    cy.mount(<Tab />);
    cy.contains('No tabs available').should('be.visible');
  });

  it('renders with tabs and switches between tabs', () => {
    const tabs = [
      { label: 'Tab 1', content: <div>Content 1</div> },
      { label: 'Tab 2', content: <div>Content 2</div> },
    ];

    cy.mount(<Tab tabs={tabs} />);
    cy.contains('Tab 1').should('be.visible');
    cy.contains('Tab 2').should('be.visible');
    
    // Verify the initial content
    cy.contains('Content 1').should('be.visible');
    cy.contains('Content 2').should('not.exist');

    // Click on the second tab
    cy.contains('Tab 2').click();

    // Verify the content changes
    cy.contains('Content 1').should('not.exist');
    cy.contains('Content 2').should('be.visible');
  });

  it('renders with tabs and icons', () => {
    const tabs = [
      { label: 'Tab 1', content: <div>Content 1</div>, icon: <span>🔥</span> },
      { label: 'Tab 2', content: <div>Content 2</div>, icon: <span>🌟</span> },
    ];

    cy.mount(<Tab tabs={tabs} />);
    cy.contains('Tab 1').should('be.visible');
    cy.contains('🔥').should('be.visible');
    cy.contains('Tab 2').should('be.visible');
    cy.contains('🌟').should('be.visible');
    
    // Verify the initial content
    cy.contains('Content 1').should('be.visible');
    cy.contains('Content 2').should('not.exist');

    // Click on the second tab
    cy.contains('Tab 2').click();

    // Verify the content changes
    cy.contains('Content 1').should('not.exist');
    cy.contains('Content 2').should('be.visible');
  });
});
