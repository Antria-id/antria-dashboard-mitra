describe('Card', () => {
  beforeEach(() => {
    cy.visit('/data-analytics') // Sesuaikan URL sesuai dengan aplikasi Anda
  })

  it('displays the card with correct tag and data', () => {
    const tag = 'Total Sales'
    const data = '$1000'
    cy.mount(<Card tag={tag} data={data} />) // Memasang komponen Card dengan properti yang sesuai
    cy.contains(tag).should('be.visible') // Memastikan tag ditampilkan dengan benar
    cy.contains(data).should('be.visible') // Memastikan data ditampilkan dengan benar
  })

  it('has correct styles', () => {
    cy.mount(<Card tag="Test" data="123" />) // Memasang komponen Card dengan properti yang sesuai
    cy.get('button').should('have.css', 'background-color', 'rgb(155, 89, 182)') // Memeriksa warna latar belakang
    cy.get('button').should('have.css', 'color', 'rgb(255, 255, 255)') // Memeriksa warna teks
    cy.get('button').should('have.css', 'border-radius', '8px') // Memeriksa border-radius
  })

  it('responds to hover correctly', () => {
    cy.mount(<Card tag="Test" data="123" />) // Memasang komponen Card dengan properti yang sesuai
    cy.get('button').trigger('mouseover') // Menimbulkan peristiwa mouseover
    cy.get('button').should('have.css', 'box-shadow', 'rgb(0, 0, 0) 0px 3px 6px 0px') // Memeriksa bayangan saat dihover
  })
})
