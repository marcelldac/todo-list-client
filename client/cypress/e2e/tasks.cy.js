/// <reference types="cypress" />

describe("tasks", () => {
  it("should registry a new task", () => {
    cy.visit("http://localhost:5173");

    cy.get(".form-input").type("Dar aula pro meu aluno preferido.");

    cy.get(".form-header-container > button").click();
  });
});
