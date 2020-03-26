/* eslint-disable no-undef */
describe("Testing Form", function() {
  beforeEach(function() {
    cy.visit("http://localhost:3000");
  });
  it("Fill in all inputs and submit form", function() {
    cy.get('[data-cy="firstName"]')
      .type("Chadwick")
      .should("have.value", "Chadwick");
    cy.get("[data-cy=lastName]")
      .type("Simpson")
      .should("have.value", "Simpson");
    cy.get("[data-cy=email]")
      .type("mrsimpson3000@gmail.com")
      .should("have.value", "mrsimpson3000@gmail.com");
    cy.get("[data-cy=role]")
      .select("Back End Dev")
      .should("have.value", "Back End");
    cy.get("[data-cy=password]").type("4");
    cy.get("[data-cy=passError]").should(
      "have.html",
      "Password needs 1 uppercase, 1 lowercase letter and 1 number"
    );
    cy.get("[data-cy=password]")
      .type("197Carrigan")
      .should("have.value", "4197Carrigan");
    cy.get("[data-cy=confirm]")
      .type("4197Carrigan")
      .should("have.value", "4197Carrigan");
    cy.get("[data-cy=terms]")
      .check()
      .should("be.checked");
    cy.get("[data-cy=submit]").click();
  });
});
