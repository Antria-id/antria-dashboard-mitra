describe("Dashboard Page Tests", () => {
  beforeEach(() => {
    // Handle login if required
    cy.visit("http://localhost:3000/login"); // Change this URL to your actual login page
    cy.get("input[name=username]").type("verniyhibiki"); // Change the selector to match your username field
    cy.get("input[name=password]").type("verniy11223344"); // Change the selector to match your password field
    cy.get("button[type=submit]").click(); // Change the selector to match your login button
    cy.url().should("include", "/data-analytics"); // Verify successful login

    // Visit the data-analytics page
    cy.visit("http://localhost:3000/data-analytics");
  });

  it('should display the title "Data Analytics"', () => {
    // Wait for the page to fully load and check for the title
    cy.get("h1").contains("Data Analytics").should("be.visible");
  });

  it("should display the cards with data", () => {
    cy.get(".card-container").should("have.length", 4); // Adjust selector and number of cards if necessary
    cy.contains("Jumlah Pemasukan").should("be.visible");
    cy.contains("Jumlah Pengunjung").should("be.visible");
    cy.contains("Jumlah Karyawan").should("be.visible");
  });

  it('should display the "Income Analytics" tab with a LineChart', () => {
    cy.contains("Income Analytics").click();
    cy.get(".line-chart").should("be.visible"); // Adjust selector if necessary
  });

  it('should display the "Order System Analytics" tab with a BarChart and PieChart', () => {
    cy.contains("Order System Analytics").click();
    cy.get(".bar-chart").should("be.visible"); // Adjust selector if necessary
    cy.get(".pie-chart").should("be.visible"); // Adjust selector if necessary
  });

  it('should display the "Customer Feedback" tab with feedback list', () => {
    cy.contains("Customer Feedback").click();
    cy.get(".feedback-list").should("be.visible"); // Adjust selector if necessary
  });

  it('should navigate to "Data Pemasukan" page when the link is clicked', () => {
    cy.contains("Lihat Tabel Pemasukan").click();
    cy.url().should("include", "/data-pemasukan"); // Ensure the URL matches the intended route
  });
});
