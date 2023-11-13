/// <reference types="cypress" />

describe("home", () => {
  it("webapp should be online", () => {
    cy.visit("http://localhost:5173");
    cy.title().should("eq", "Vite + React");
  });
});
