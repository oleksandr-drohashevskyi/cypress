// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// cypress/support/commands.js

import { ui } from "./ui.js";
import { HomePage } from "../e2e/pages/HomePage";
import { LoginModal } from "../e2e/pages/login.modal.js";
import 'cypress-mochawesome-reporter/register';


Cypress.Commands.add("login", (email, password) => {
  // создаём объекты страниц прямо внутри команды
  // (так команда самодостаточная и не зависит от теста)
  const home = new HomePage(ui);
  const login = new LoginModal(ui);

  // открываем логин-модалку через UI
  home.openLogin();
  login.shouldBeOpened();

  // заполняем и отправляем форму
  login.fill(email, password);
  login.submit();

  // проверяем, что логин успешен
  // Самый простой признак — появление "Logout"
  home.shouldBeLoggedIn();
});

Cypress.Commands.overwrite(
  "type",
  (originalFn, element, text, options = {}) => {
    if (options.sensitive) {
      options.log = false;

      Cypress.log({
        $el: element,
        name: "type",
        message: "*".repeat(String(text).length),
      });
    }

    return originalFn(element, text, options);
  }
);
