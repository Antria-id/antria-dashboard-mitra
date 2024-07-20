describe('Dashboard', () => {
  beforeEach(() => {
    cy.visit('/data-analisis'); // Sesuaikan dengan path aplikasi Anda
  });

  it('Displays correct employee count', () => {
    cy.contains('Jumlah Karyawan').next().should('contain', '0'); // Memastikan data karyawan ditampilkan
  });

  it('Displays correct feedback count', () => {
    cy.contains('Feedback').next().should('contain', '0'); // Memastikan data feedback ditampilkan
  });

  it('Fetches and displays income correctly', () => {
    cy.contains('Jumlah Pemasukan').next().should('contain', 'IDR'); // Memastikan data pemasukan ditampilkan dalam format rupiah
  });

  it('Navigates to income data table', () => {
    cy.contains('Lihat Tabel Pemasukan').click(); // Mengklik link untuk melihat tabel pemasukan
    cy.url().should('include', '/data-pemasukan'); // Memastikan navigasi berhasil ke halaman data pemasukan
  });

  it('Navigates to feedback component', () => {
    cy.contains('Customer Feedback').click(); // Mengklik tab feedback
    cy.get('input[type="text"]').should('be.visible'); // Memastikan komponen feedback ditampilkan
  });

  it('Navigates to analytics tab', () => {
    cy.contains('Income Analytics').click(); // Mengklik tab analytics
    cy.get('.LineChart').should('be.visible'); // Memastikan LineChart ditampilkan (asumsi kelas CSS untuk LineChart)
  });
});
