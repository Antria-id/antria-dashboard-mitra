import React from 'react';
import { mount } from 'cypress/react';
import Tab from './Tab';
import { VscFeedback } from 'react-icons/vsc';

const tabsFeedback = [
  {
    label: "Customer Feedback",
    icon: <VscFeedback size={28} />,
    content: (
      <div>
        <p>Feedback Content</p>
      </div>
    ),
  },
  {
    label: "Another Tab",
    content: (
      <div>
        <p>Another Tab Content</p>
      </div>
    ),
  },
];

describe('<Tab />', () => {
  it('displays content of the active tab', () => {
    cy.mount(<Tab tabs={tabsFeedback} />);

    // Default active tab content
    cy.contains('Feedback Content').should('exist');
    cy.contains('Another Tab Content').should('not.exist');

    // Switch to another tab
    cy.contains('Another Tab').click();
    cy.contains('Another Tab Content').should('exist');
    cy.contains('Feedback Content').should('not.exist');
  });
});
