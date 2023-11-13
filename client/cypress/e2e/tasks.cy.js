/// <reference types="cypress" />

describe("tasks", () => {
  it("should registry a new task", () => {
    cy.visit("http://localhost:5173");

    cy.get(".form-input").type("Dar aula pro meu aluno preferido.");

    cy.get(".form-header-container > button").click();
    /* 
    Cypress não oferece suporte ao xpath (tem plugin para oferecer)
    XPATH CODE: //button[contains(text(), "Add Task")]
    CYPRESS ALTERNATIVE: cy.contains('button', 'Add Task').click()
    */
  });
});
