export class BasePage {
  constructor(url) {
    this.url = url;
  }
  navigate() {
    cy.visit(this.url);
  }
}
