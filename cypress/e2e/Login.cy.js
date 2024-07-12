describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('Should show validation error when leaving all fields blank', () => {
    cy.get('[data-cy="submit"]').click();
    cy.contains('Mohon isi email dan password Anda').should('be.visible');
  });

  it('Should show validation error when leaving username blank', () => {
    cy.get('input[name="password"]').type('password123');
    cy.get('[data-cy="submit"]').click();
    cy.contains('Mohon isi email dan password Anda').should('be.visible');
  });

  it('Should show validation error when leaving password blank', () => {
    cy.get('input[name="username"]').type('username123');
    cy.get('[data-cy="submit"]').click();
    cy.contains('Mohon isi email dan password Anda').should('be.visible');
  });

  it('Should show error message on incorrect login', () => {
    cy.get('input[name="username"]').type('wrongusername');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('[data-cy="submit"]').click();
    cy.contains('Email atau password salah. Silakan coba lagi.').should('be.visible');
  });

  it('Should login successfully with correct credentials', () => {
    cy.get('input[name="username"]').type('correctusername');
    cy.get('input[name="password"]').type('correctpassword');
    cy.get('[data-cy="submit"]').click();
  });

  it('Should remember login credentials when "Simpan Riwayat Login" is checked', () => {
    cy.get('input[name="username"]').type('remembermeuser');
    cy.get('input[name="password"]').type('remembermepassword');
    cy.get('input#rememberMe').check();
    cy.get('[data-cy="submit"]').click();

    // Simulate revisiting the page
    cy.visit('http://localhost:3000');
  });

  it('Should not remember login credentials when "Simpan Riwayat Login" is not checked', () => {
    cy.get('input[name="username"]').type('verniyhibiki');
    cy.get('input[name="password"]').type('verniy11223344');
    cy.get('[data-cy="submit"]').click();

    // Simulate revisiting the page
    cy.visit('http://localhost:3000');
    cy.get('input[name="username"]').should('be.empty');
    cy.get('input[name="password"]').should('be.empty');
    cy.get('input#rememberMe').should('not.be.checked');
  });
});
