describe("Example Page", () => {
  beforeEach(() => {
    cy.visit("/examples");
  });
  it("Multiple Page Testing", () => {
    cy.getTestData("nav-why-cypress").click();
    cy.location("pathname").should("eq", "/");

    cy.getTestData("nav-overview").click();
    cy.location("pathname").should("eq", "/overview");

    cy.getTestData("nav-fundamentals").click();
    cy.location("pathname").should("eq", "/fundamentals");

    cy.getTestData("nav-forms").click();
    cy.location("pathname").should("eq", "/forms");

    cy.getTestData("nav-component").click();
    cy.location("pathname").should("eq", "/component");

    cy.getTestData("nav-best-practices").click();
    cy.location("pathname").should("eq", "/best-practices");

    cy.getTestData("nav-examples").click();
    cy.location("pathname").should("eq", "/examples");
  });

  it("Intercept Testing", () => {
    cy.intercept("POST", "http://localhost:3000/examples", {
      fixture: "example.json",
    });
    cy.getTestData("post-button").click();
  });

  it.only("Grudge List Testing", () => {
    cy.contains(/Add Some Grudges/i).should("exist");

    cy.getTestData("grudge-list").within(() => {
      cy.get("li").should("have.length", 0);
    });

    cy.getTestData("all-clear-button").should("not.exist");
    cy.getTestData("grudge-div").find("input").as("input");
    cy.get("@input").type("something added");
    cy.getTestData("grudge-button").click();
    cy.contains(/Add Some Grudges/i).should("not.exist");
    cy.contains(/Grudges/i).should("exist");
    cy.getTestData("grudge-list").find("li").should("have.length", 1);

    cy.get("@input").type("something added 2");
    cy.getTestData("grudge-button").click();

    cy.getTestData("grudge-list").within(() => {
      cy.get("li").should("have.length", 2);
      cy.get("li").its(0).should("contains.text", "something added");
    });

    cy.getTestData("grudge-list").within(() => {
      cy.get("li")
        .its(0)
        .within(() => {
          cy.get("button").click();
        });
    });

    cy.getTestData("grudge-list").within(() => {
      cy.get("li").should("have.length", 1);
    });

    cy.get("@input").type("something added 3");
    cy.getTestData("grudge-button").click();

    cy.getTestData("grudge-list").within(() => {
      cy.get("li").should("have.length", 2);
    });

    cy.getTestData("all-clear-button").click();

    cy.getTestData("grudge-list").within(() => {
      cy.get("li").should("have.length", 0);
    });

    cy.contains(/Add Some Grudges/i).should("exist");
  });
});
