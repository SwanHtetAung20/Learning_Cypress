describe("Fundamentals Page", () => {
  beforeEach(() => {
    cy.visit("/fundamentals");
  });
  it("Fundamentals Title Testing", () => {
    // cy.visit("https://example.cypress.io");
    cy.getTestData("fundamentals text").should(
      "have.text",
      "Testing Fundamentals"
    );
  });
  it("Fundamental Block Testing", () => {
    cy.contains(/Your tests will exist in a describe block/i).should(
      "not.be.visible"
    );
    // ? cy.get('[data-test="accordion-block-1"] div[role="button"]').click();
    cy.getTestData("accordion-block-1").within(() => {
      cy.get('div[role="button"]').click();
    });
    cy.contains(/Your tests will exist in a describe block/i).should(
      "be.visible"
    );
    // ? cy.get('[data-test="accordion-block-1"] div[role="button"]').click();
    cy.getTestData("accordion-block-1").within(() => {
      cy.get('div[role="button"]').click();
    });
    cy.contains(/Your tests will exist in a describe block/i).should(
      "not.be.visible"
    );
  });
});
