import { loginPage } from "../pages/LoginPage.js";
import { garagePage } from "../pages/GaragePage.js";
import { expensesPage } from "../pages/ExpensesPage.js";

describe("Lesson 22: Intercept car creation + API checks + API expense + UI validation", () => {
  beforeEach(() => {
    const email = Cypress.env("USER_EMAIL");
    const password = Cypress.env("USER_PASSWORD");
    loginPage.login(email, password);
  });

  it("should create car via UI (intercept), verify in GET /api/cars, create expense via API, verify via UI", () => {
    const car = {
      brand: "Audi",
      model: "TT",
      mileage: "122",
    };

    // 1) INTERCEPT создания машины
    cy.intercept("POST", "**/api/cars").as("createCar");

    garagePage.addCar(car);
    garagePage.carShouldExist(car);

    cy.wait("@createCar").then(({ response }) => {
      expect(response.statusCode).to.eq(201);
      expect(response.body.status).to.eq("ok");

      const created = response.body.data;
      expect(created).to.have.property("id");

      // сохраняем id
      cy.wrap(created.id).as("carId");
      // дата для expense: берем updatedMileageAt и превращаем в YYYY-MM-DD
      const createdDateISO = new Date(created.updatedMileageAt)
        .toISOString()
        .slice(0, 10);
      cy.wrap(createdDateISO).as("carCreatedDate");

      // опционально — в фикстуру
      cy.writeFile("cypress/fixtures/createdCar.json", {
        id: created.id,
        createdDate: createdDateISO,
        ...car,
      });
    });

    // 2) GET /api/cars и проверка, что в списке есть созданная машина
    cy.get("@carId").then((carId) => {
      cy.apiGetCars().then((resp) => {
        expect(resp.status).to.eq(200);
        expect(resp.body.status).to.eq("ok");
        expect(resp.body.data).to.be.an("array");

        const found = resp.body.data.find(
          (c) => String(c.id) === String(carId),
        );
        expect(found, "created car exists in GET /api/cars").to.exist;

        expect(found.brand).to.eq(car.brand);
        expect(found.model).to.eq(car.model);
        expect(String(found.mileage)).to.eq(String(car.mileage));
      });
    });

    // 3) POST /api/expenses через кастомную команду
    cy.get("@carId").then((carId) => {
      cy.get("@carCreatedDate").then((createdDate) => {
        const expense = {
          carId,
          reportedAt: createdDate, // гарантированно не раньше даты создания
          mileage: 12350,
          liters: 40,
          totalCost: 200,
        };

        cy.apiCreateExpense(expense).then((resp) => {
          expect(resp.status).to.be.oneOf([200, 201]);
          expect(resp.body.status).to.eq("ok");

          const data = resp.body.data;
          expect(data).to.have.property("id");

          expect(String(data.carId)).to.eq(String(expense.carId));
          expect(String(data.mileage)).to.eq(String(expense.mileage));
          expect(String(data.liters)).to.eq(String(expense.liters));
          expect(String(data.totalCost)).to.eq(String(expense.totalCost));

          cy.wrap(expense).as("expenseData");
        });
      });
    });

    // 4) UI: найти нужную машину и проверить expense по параметрам
    // Переходим в "Fuel expenses" через UI
    cy.contains("Fuel expenses").click();

    cy.get("@expenseData").then((expense) => {
 
      expensesPage.expenseShouldExist({
        mileage: String(expense.mileage),
      });

      cy.contains("td", String(expense.liters)).should("exist");
      cy.contains("td", String(expense.totalCost)).should("exist");
    });
  });
});
