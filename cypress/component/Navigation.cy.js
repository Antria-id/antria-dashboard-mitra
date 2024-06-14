describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('/data-analytics') // Adjust the URL according to your application
  })

  it('displays the sidebar', () => {
    cy.get('.lg\\:block') // Get the element with lg:block class
      .should('be.visible') // Ensure it's visible
  })

  it('toggles the sidebar', () => {
    cy.get('button').contains('Toggle Sidebar').click() // Assuming there's a button to toggle the sidebar
    cy.get('.lg\\:block').should('not.be.visible') // Ensure it's not visible after clicking the button
  })

  it('navigates to Data Analytics page', () => {
    cy.contains('Data Analytics').click() // Click on the link with text Data Analytics
    cy.url().should('include', '/data-analytics') // Ensure the URL includes /data-analytics
  })

  it('logs out when clicking logout button', () => {
    cy.contains('Logout').click() // Click on the logout button
    cy.url().should('include', '/Login') // Ensure the URL redirects to the login page
  })
})
