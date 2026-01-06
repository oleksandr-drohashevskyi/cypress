export class HomePage {
  constructor(ui) {
    this.ui = ui;

    // селекторы — тут
    this.signUpBtn = ".hero-descriptor_btn";
    this.regModalHeader = ".modal-header";
  }

  open(baseUrl, auth) {
    this.ui.visit(baseUrl, { auth });
  }

  openRegistration() {
    this.ui.clickContains(this.signUpBtn, "Sign up");
  }
  shouldBeLoggedIn() {
    // после успешной регистрации/логина  появляется "Logout"

    this.ui.shouldBeVisibleText("body", "Log out");
  }
  shouldBeLoggedOut() {
    // после logout на верхней панели снова видим Sign In
    this.ui.shouldBeVisibleText("body", "Sign In");
  }
  openLogin() {
    this.ui.clickContains("button", "Sign In");
  }

  logout() {
    //кликаем Logout, чтобы вернуться в “гость”
    this.ui.clickByText("Log out");
  }
}
