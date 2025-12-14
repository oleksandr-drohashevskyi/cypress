describe("my tests", () => {
  beforeEach(() => {
    cy.visit("https://qauto.forstudy.space/", {
      auth: {
        username: "guest",
        password: "welcome2qauto",
      },
    });
  });

  it("Verify displaying a hero button and opening modal", () => {
    cy.get(".hero-descriptor_btn").contains("Sign up").click(); //перевіряємо що кнопка є і натискаємо
    cy.get(".modal-header").should("contain", "Registration"); //перевіряємо що модалка відображаеться

    //а тут по церзі клікаємо поля і перевіряємо що показується валідаційне повідомлення
    const fields = [
      { id: "#signupName", msg: "Name required" },
      { id: "#signupLastName", msg: "Last name required" },
      { id: "#signupEmail", msg: "Email required" },
      { id: "#signupPassword", msg: "Password required" },
      { id: "#signupRepeatPassword", msg: "Re-enter password required" },
    ];

    fields.forEach(({ id, msg }) => {
      cy.get(id).focus().blur();
      cy.contains(".invalid-feedback", msg).should("be.visible");
      cy.get(id).should("have.css", "border-color", "rgb(220, 53, 69)");

      cy.contains("button", "Register").should("be.disabled"); // перевіряємо що кнопка не активна
    });
  });

  it("Check Hilell link", () => {
    cy.get("[class = 'contacts_link display-4']")
      .should("be.visible")
      .invoke("removeAttr", "target ")
      .click();
    cy.url().should("contain", "hillel");
  });
});
