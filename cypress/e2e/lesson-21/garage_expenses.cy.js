import { loginPage } from "../pages/LoginPage.js";
import { garagePage } from "../pages/GaragePage.js";
import { expensesPage } from "../pages/ExpensesPage.js";

describe("Garage and fuel expenses flow", () => {
  beforeEach(() => {
    const email = Cypress.env("USER_EMAIL");
    const password = Cypress.env("USER_PASSWORD");

    // логин
    loginPage.login(email, password);
  });

  it("Should add car and fuel expense", () => {
    const car = {
      brand: "Audi",
      model: "TT",
      mileage: "12345",
    };

    const expense = {
      mileage: "12350",
      liters: "40",
      cost: "200",
    };

    // добавить машину
    garagePage.addCar(car);
    garagePage.carShouldExist(car);

    // перейти в расходы топлива
    garagePage.openCarExpenses();

    // добавить расход
    expensesPage.addExpense(expense);
    expensesPage.expenseShouldExist(expense);
  });
});
