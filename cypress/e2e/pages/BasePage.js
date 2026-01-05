export class BasePage {
  constructor(ui, selectors = {}) {
    this.ui = ui;
    this.s = selectors;
  }

  // общие хелперы — без Cypress
  click(locator) {
    return this.ui.click(locator);
  }

  clickContains(locator, text) {
    return this.ui.clickContains(locator, text);
  }

  type(locator, value) {
    return this.ui.type(locator, value);
  }

  focus(locator) {
    return this.ui.focus(locator);
  }

  blur(locator) {
    return this.ui.blur(locator);
  }

  shouldContainText(locator, text) {
    return this.ui.shouldContainText(locator, text);
  }

  shouldBeVisible(locator) {
    return this.ui.shouldBeVisible(locator);
  }

  shouldBeDisabled(locator) {
    return this.ui.shouldBeDisabled(locator);
  }

  shouldHaveCss(locator, prop, value) {
    return this.ui.shouldHaveCss(locator, prop, value);
  }

  containsShouldBeVisible(locator, text) {
    return this.ui.containsShouldBeVisible(locator, text);
  }
}
