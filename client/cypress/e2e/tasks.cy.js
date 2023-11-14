/// <reference types="cypress" />

describe("tasks", () => {
  it("should registry a new task", () => {
    cy.visit("http://localhost:5173");

    cy.request({
      url: "http://localhost:3001/helper/tasks",
      method: "DELETE",
      body: {
        name: "Falar que amo Nutaia",
      },
    }).then((res) => {
      expect(res.status).to.eq(204);
    });

    cy.get(".form-input").type("Falar que amo Nutaia");

    cy.get(".form-header-container > button").click();

    /* 
    Cypress não oferece suporte ao xpath (tem plugin para oferecer)
    XPATH CODE: //button[contains(text(), "Add Task")]
    CYPRESS ALTERNATIVE: cy.contains('button', 'Add Task').click()
    */

    /* cy.get(".task-name")
      .should("be.visible")
      .should("have.text", "Falar que amo Nutaia"); */

    cy.contains(".task-name", "Falar que amo Nutaia").should("be.visible");
  });
});
