describe("Forms Page", () => {
  beforeEach(() => {
    cy.visit("/forms");
  });

  it("Forms Title Testing", () => {
    cy.getTestData("form text").should("have.text", "Testing Forms");
  });
  it("Form Input Testing", () => {
    cy.getTestData("div-email").find("input").as("emailInput");
    cy.get("@emailInput").type("something");
    cy.get("@emailInput").should("have.value", "something");
    cy.contains(/Invalid email/i).should("not.exist");
    cy.getTestData("button-subscribe").click();
    cy.contains(/Invalid email/i).should("exist");
    cy.wait(3000);
    cy.contains(/Invalid email/i).should("not.exist");

    //cy.get("@emailInput").type("");
    cy.getTestData("button-subscribe").click();
    cy.contains(/fail!/i).should("exist");
    cy.wait(3000);
    cy.contains(/fail!/i).should("not.exist");

    cy.get("@emailInput").type("mgmg@gmail.com");
    cy.getTestData("button-subscribe").click();
    cy.contains(/Successfully subbed: mgmg@gmail.com/i).should("exist");
    cy.wait(3000);
    cy.contains(/Successfully subbed: mgmg@gmail.com/i).should("not.exist");
  });
});
