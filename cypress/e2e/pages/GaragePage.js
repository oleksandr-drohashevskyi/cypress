class GaragePage {
  open() {
    cy.contains("Garage").click(); // или по href
  }

  openAddCarModal() {
    cy.contains("Add car").click();
  }

  fillCarBrand(brand) {
    cy.get("#addCarBrand").select(brand);
  }

  fillCarModel(model) {
    cy.get("#addCarModel").select(model);
  }

  fillCarMileage(mileage) {
    cy.get("#addCarMileage").clear().type(mileage);
  }

  submitAddCar() {
    cy.get(".modal-footer").contains("Add").click();
  }

  addCar({ brand, model, mileage }) {
    this.open();
    this.openAddCarModal();
    this.fillCarBrand(brand);
    this.fillCarModel(model);
    this.fillCarMileage(mileage);
    this.submitAddCar();
  }

  carShouldExist({ brand, model }) {
    cy.get(".car").contains(brand).should("exist");
    cy.get(".car").contains(model).should("exist");
  }

  openCarExpenses() {

    cy.get('.car').first().contains('Add fuel expense').click();
  }
}

export const garagePage = new GaragePage();
