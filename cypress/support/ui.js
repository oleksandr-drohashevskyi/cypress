export const ui = {
  visit: (url, opts) => cy.visit(url, opts),
  clickContains: (locator, text) => cy.get(locator).contains(text).click(),
  click: (locator) => cy.get(locator).click(),

  type: (locator, value, options = {}) =>
    cy.get(locator).clear().type(value, options),

  focusBlur: (locator) => cy.get(locator).focus().blur(),

  shouldContain: (locator, text) => cy.get(locator).should("contain", text),
  shouldBeVisible: (locator) => cy.get(locator).should("be.visible"),

  shouldBeVisibleText: (locator, text) =>
    cy.contains(locator, text).should("be.visible"),

  shouldHaveCss: (locator, prop, value) =>
    cy.get(locator).should("have.css", prop, value),

  shouldBeDisabledContains: (tag, text) =>
    cy.contains(tag, text).should("be.disabled"),

  shouldBeEnabledContains: (tag, text) =>
    cy.contains(tag, text).should("be.enabled"),

  urlShouldContain: (part) => cy.url().should("contain", part),
  clickByText: (text) => cy.contains(text).click(),
};
