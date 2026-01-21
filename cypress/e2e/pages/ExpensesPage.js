class ExpensesPage {
  openAddExpenseModal() {
    cy.contains("Add fuel expense").click();
  }

  fillMileage(mileage) {
    cy.get("#addExpenseMileage").clear().type(mileage);
  }

  fillLiters(liters) {
    cy.get("#addExpenseLiters").clear().type(liters);
  }

  fillTotalCost(cost) {
    cy.get("#addExpenseTotalCost").clear().type(cost);
  }

  submitAddExpense() {
    cy.get(".modal-footer").contains("Add").click();
  }

  addExpense({ mileage, liters, cost }) {
    this.fillMileage(mileage);
    this.fillLiters(liters);
    this.fillTotalCost(cost);
    this.submitAddExpense();
  }

  expenseShouldExist({ mileage }) {
    cy.get("table").contains("td", mileage).should("exist");
  }
}

export const expensesPage = new ExpensesPage();
