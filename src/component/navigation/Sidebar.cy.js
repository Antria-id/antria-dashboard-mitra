import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import Sidebar from './Sidebar'

describe('<Sidebar />', () => {
  it('renders', () => {
    cy.mount(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    )
  })
})
