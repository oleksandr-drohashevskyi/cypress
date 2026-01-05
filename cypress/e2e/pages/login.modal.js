export class LoginModal {
  constructor(ui) {
    this.ui = ui;

    //селекторы логин-модалки 
    this.header = ".modal-header";
    this.email = "#signinEmail"; 
    this.password = "#signinPassword";
    this.loginBtnTag = "button";
    this.loginBtnText = "Login";
  }

  shouldBeOpened() {
    // убеждаемся что открылась нужная модалка
    this.ui.shouldContain(this.header, "Log in");
  }

  fill(email, password) {
    // вводим креды
    this.ui.type(this.email, email);
    this.ui.type(this.password, password, { sensitive: true });
  }

  submit() {
    // кликаем по кнопке Login (по тексту — меньше зависит от селектора)
    this.ui.clickContains(this.loginBtnTag, this.loginBtnText);
  }
}
