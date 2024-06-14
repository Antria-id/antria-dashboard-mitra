describe('Button', () => {
  beforeEach(() => {
    cy.visit('/data-akun')
  })

  it('renders with default props', () => {
    cy.get('button').should('exist')
    cy.get('button').should('have.class', 'bg-transparent')
    cy.get('button').should('have.class', 'rounded-xl')

  })

  it('executes onClick callback when clicked', () => {
    const onClick = cy.stub()
    cy.get('button').invoke('onClick', onClick).click()
    expect(onClick).to.be.calledOnce
  })
})
