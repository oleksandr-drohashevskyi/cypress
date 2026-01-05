export class RegistrationModal {
  constructor(ui) {
    this.ui = ui;

    this.header = ".modal-header";
    this.invalid = ".invalid-feedback";

    this.name = "#signupName";
    this.lastName = "#signupLastName";
    this.email = "#signupEmail";
    this.password = "#signupPassword";
    this.repeatPassword = "#signupRepeatPassword";

    this.registerBtnTag = "button";
    this.registerBtnText = "Register";

    this.invalidBorderColor = "rgb(220, 53, 69)";
  }

  shouldBeOpened() {
    this.ui.shouldContain(this.header, "Registration");
  }

  // ====== кнопка Register: disabled/enabled ======

  registerShouldBeDisabled() {
    // По требованиям: если данные некорректны — кнопка disabled
    this.ui.shouldBeDisabledContains(this.registerBtnTag, this.registerBtnText);
  }

  registerShouldBeEnabled() {
    // Когда все поля валидны — кнопка должна быть активна
    this.ui.shouldBeEnabledContains(this.registerBtnTag, this.registerBtnText);
  }

  clickRegister() {
    // Кликаем по кнопке (через contains, чтобы не зависеть от DOM структуры)
    this.ui.clickContains(this.registerBtnTag, this.registerBtnText);
  }

  // ====== helper: вводим значение и триггерим валидацию через blur ======

  typeAndBlur(locator, value) {
    this.ui.type(locator, value);
    this.ui.focusBlur(locator);
  }

  // ====== required check  ======

  triggerRequired(fieldLocator, expectedMsg) {
    this.ui.focusBlur(fieldLocator);
    this.ui.shouldBeVisibleText(this.invalid, expectedMsg);
    this.ui.shouldHaveCss(
      fieldLocator,
      "border-color",
      this.invalidBorderColor
    );
  }

  // ====== Happy path: заполнить все поля валидными данными ======

  fillValidForm(user) {
    this.typeAndBlur(this.name, user.firstName);
    this.typeAndBlur(this.lastName, user.lastName);
    this.typeAndBlur(this.email, user.email);
    this.typeAndBlur(this.password, user.password);
    this.typeAndBlur(this.repeatPassword, user.password);
  }
}

import { makeUniqueUser } from "./user.factory";

export const registrationRequiredSpec = (home, reg) => {
  describe("Tasks 1-2: Registration validations", () => {
    it("Open registration modal", () => {
      home.openRegistration();
      reg.shouldBeOpened();
    });

    it("Required fields: messages + red border + Register disabled", () => {
      home.openRegistration();
      reg.shouldBeOpened();

      const fields = [
        { locator: reg.name, msg: "Name required" },
        { locator: reg.lastName, msg: "Last name required" },
        { locator: reg.email, msg: "Email required" },
        { locator: reg.password, msg: "Password required" },
        { locator: reg.repeatPassword, msg: "Re-enter password required" },
      ];

      fields.forEach((f) => {
        reg.triggerRequired(f.locator, f.msg);
        reg.registerShouldBeDisabled();
      });
    });

    it("Happy path: user can be registered (and saved for login test)", () => {
      // 1) Открываем модалку регистрации
      home.openRegistration();
      reg.shouldBeOpened();

      // 2) Генерим уникального юзера
      const user = makeUniqueUser();

      // 3) Сохраняем юзера на диск, чтобы следующий тест мог взять эти креды
      cy.writeFile("cypress/fixtures/generatedUser.json", user);

      // 4) Заполняем форму и регистрируем
      reg.fillValidForm(user);
      reg.registerShouldBeEnabled();
      reg.clickRegister();

      // 5) Проверяем, что мы залогинены после регистрации
      home.shouldBeLoggedIn();

      // 6) Разлогинимся, чтобы следующий тест проверял именно login
      home.logout();
      home.shouldBeLoggedOut(); 
    });
    it("Login with user created in previous test", () => {
      // 1) Берём пользователя из fixtures (который записали в предыдущем тесте)
      cy.fixture("generatedUser.json").then((user) => {
      // 2) Базовые проверки — чтобы было понятнее, если файл пустой/не создался
        expect(user, "generated user exists").to.exist;
        expect(user.email, "user email exists").to.exist;
        expect(user.password, "user password exists").to.exist;

        // 3) Логин через custom command (UI)
        cy.login(user.email, user.password);

        // 4) Проверяем, что реально залогинились
        home.shouldBeLoggedIn();
      });
    });
  });
};
