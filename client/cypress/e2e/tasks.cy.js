/// <reference types="cypress" />

describe("tasks", () => {
  const taskName = "Falar que amo Nutaia";

  it("should registry a new task", () => {
    cy.request({
      url: "http://localhost:3001/helper/tasks",
      method: "DELETE",
      body: {
        name: taskName,
      },
    }).then((res) => {
      expect(res.status).to.eq(204);
    });

    cy.createTask(taskName);

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

  it("should not allow duplicated tasks", () => {
    const taskName = "Dar comida pra Django";

    cy.request({
      url: "http://localhost:3001/helper/tasks",
      method: "DELETE",
      body: {
        name: taskName,
      },
    }).then((res) => {
      expect(res.status).to.eq(204);
    });

    cy.createTask(taskName);
    cy.createTask(taskName);

    cy.contains("div", "Já existe uma task com esse nome!")
      .should("be.visible")
      .should("have.text", "Já existe uma task com esse nome!");
  });
});

Cypress.Commands.add("createTask", (taskName) => {
  cy.visit("http://localhost:5173");

  cy.get(".form-input").type(taskName);

  cy.get(".form-header-container > button").click();
});
