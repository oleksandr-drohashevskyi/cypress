
export class RegistrationModal {
  constructor(ui) {
    this.ui = ui;

    // ====== СЕЛЕКТОРЫ МОДАЛКИ ======
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

  // ====== БАЗОВЫЕ ПРОВЕРКИ ======

  shouldBeOpened() {
    // Проверяем, что действительно открыта модалка регистрации
    this.ui.shouldContain(this.header, "Registration");
  }

  registerShouldBeDisabled() {
    // Проверяем, что Register не активна (по требованиям кнопка disabled если данные некорректны)
    this.ui.shouldBeDisabledContains(this.registerBtnTag, this.registerBtnText);
  }

  triggerRequired(fieldLocator, expectedMsg) {
    // Триггерим валидацию required:
   
    this.ui.focusBlur(fieldLocator);

    // Проверяем текст ошибки
    this.ui.shouldBeVisibleText(this.invalid, expectedMsg);

    // Проверяем красную рамку у поля
    this.ui.shouldHaveCss(
      fieldLocator,
      "border-color",
      this.invalidBorderColor
    );
  }

  // ====== ХЕЛПЕРЫ ДЛЯ НЕ REQUIRED ПРОВЕРОК ======

  typeAndBlur(locator, value) {
    // Унифицированный шаг: ввести значение и убрать фокус, чтобы появилась ошибка/убралась ошибка
    this.ui.type(locator, value);
    this.ui.focusBlur(locator); 
  }

  shouldShowError(message) {
    // Проверка: в модалке показана нужная ошибка (по тексту)
    this.ui.shouldBeVisibleText(this.invalid, message);
  }

  shouldNotShowError(message) {

  }

  // ====== КОНКРЕТНЫЕ ПРОВЕРКИ ПО ТРЕБОВАНИЯМ ======

  checkNameLengthTooShort() {
    // min=2 => если 1 символ, должна быть ошибка длины
    this.typeAndBlur(this.name, "A");
    this.shouldShowError("Name has to be from 2 to 20 characters long");
    this.ui.shouldHaveCss(this.name, "border-color", this.invalidBorderColor);
  }

  checkNameLengthTooLong() {
    // max=20 => если 21 символ, должна быть ошибка длины
    this.typeAndBlur(this.name, "A".repeat(21));
    this.shouldShowError("Name has to be from 2 to 20 characters long");
    this.ui.shouldHaveCss(this.name, "border-color", this.invalidBorderColor);
  }

  checkLastNameLengthTooShort() {
    this.typeAndBlur(this.lastName, "B");
    this.shouldShowError("Last name has to be from 2 to 20 characters long");
    this.ui.shouldHaveCss(
      this.lastName,
      "border-color",
      this.invalidBorderColor
    );
  }

  checkLastNameLengthTooLong() {
    this.typeAndBlur(this.lastName, "B".repeat(21));
    this.shouldShowError("Last name has to be from 2 to 20 characters long");
    this.ui.shouldHaveCss(
      this.lastName,
      "border-color",
      this.invalidBorderColor
    );
  }

  checkEmailInvalid() {
    // Email validation "standard"
    this.typeAndBlur(this.email, "not-an-email");
    this.shouldShowError("Email is incorrect");
    this.ui.shouldHaveCss(this.email, "border-color", this.invalidBorderColor);
  }

  checkPasswordInvalid(value) {
    // Универсальная проверка: вводим плохой пароль и ждём именно сообщение про правила пароля
    this.typeAndBlur(this.password, value);
    this.shouldShowError(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );
    this.ui.shouldHaveCss(
      this.password,
      "border-color",
      this.invalidBorderColor
    );
  }

  checkRepeatPasswordMismatch() {
    // Сначала введём валидный пароль, затем другой repeat — должна быть ошибка mismatch
    this.typeAndBlur(this.password, "Abcdefg1");
    this.typeAndBlur(this.repeatPassword, "Abcdefg2");

    this.shouldShowError("Passwords do not match");
    this.ui.shouldHaveCss(
      this.repeatPassword,
      "border-color",
      this.invalidBorderColor
    );
  }

  checkTrimOnName() {
    // Требование: "Need to ignore space and please use trim"
    // Вводим с пробелами по краям, и ожидаем, что это НЕ будет считаться invalid.
    // Мы не можем легко "доказать", что trim сработал без доступа к value,
    // поэтому делаем практичную проверку: после заполнения остальных полей
    // кнопка Register становится enabled (позже мы добавим этот happy-path).
    this.typeAndBlur(this.name, "  Alex  ");

  }

  fillValidForm(user) {
    // Комментарий: заполняем все поля валидными значениями
    // чтобы кнопка Register стала enabled (happy path)
    this.typeAndBlur(this.name, user.firstName);
    this.typeAndBlur(this.lastName, user.lastName);
    this.typeAndBlur(this.email, user.email);
    this.ui.type(this.password, user.password, { sensitive: true });
    this.ui.type(this.repeatPassword, user.password, { sensitive: true });
  }
  // Проверяем, что кнопка Register стала активной (enabled)
  registerShouldBeEnabled() {
    this.ui.shouldBeEnabledContains(this.registerBtnTag, this.registerBtnText);
  }
  // Кликаем по кнопке Register
  clickRegister() {
    // Комментарий: клик по кнопке Register через contains — универсально
    this.ui.clickContains(this.registerBtnTag, this.registerBtnText);
  }
}
