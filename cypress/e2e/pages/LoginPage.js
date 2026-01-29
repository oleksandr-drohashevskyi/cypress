class LoginPage {
  visit() {
    cy.visit("/", {
      auth: {
        username: "guest",
        password: "welcome2qauto",
      },
    });
  }

  openLoginModal() {
    cy.contains("Sign In").click();
  }

  typeEmail(email) {
    cy.get("#signinEmail").clear().type(email);
  }

  typePassword(password) {
    cy.get("#signinPassword").clear().type(password);
  }

  submit() {
    cy.get(".modal-footer").contains("Login").click();
  }

  login(email, password) {
    this.visit();              
    this.openLoginModal();     
    this.typeEmail(email);
    this.typePassword(password);
    this.submit();
  }
}

export const loginPage = new LoginPage();
