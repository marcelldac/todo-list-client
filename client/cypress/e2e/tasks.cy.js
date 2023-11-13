/// <reference types="cypress" />

import { faker } from "@faker-js/faker";

const fakeMusic = faker.music.genre();

describe("tasks", () => {
  it("should registry a new task", () => {
    cy.visit("http://localhost:5173");

    cy.get(".form-input").type(fakeMusic);

    cy.get(".form-header-container > button").click();
    /* 
    Cypress não oferece suporte ao xpath (tem plugin para oferecer)
    XPATH CODE: //button[contains(text(), "Add Task")]
    CYPRESS ALTERNATIVE: cy.contains('button', 'Add Task').click()
    */
  });
});
