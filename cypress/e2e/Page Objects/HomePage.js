import { BasePage } from "./BasePage";

const url = "/";

export class HomePage extends BasePage {
  constructor() {
    super(url);
  }
  // get list() {
  //   return cy.get(".home-list");
  // }

  listbutton(text) {
    return cy.get(".home-list").contains(text);
  }
}
