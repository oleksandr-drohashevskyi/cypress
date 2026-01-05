import { ui } from "../../support/ui.js";
import { HomePage } from "../pages/HomePage.js";
import { RegistrationModal } from "../pages/registration.modal.js";
import { registrationRequiredSpec } from "./registration.required.spec.js";

describe("Registration suite (runner)", () => {
  const home = new HomePage(ui);
  const reg = new RegistrationModal(ui);

  const baseUrl = "https://qauto.forstudy.space/";
  const auth = { username: "guest", password: "welcome2qauto" };

  beforeEach(() => {
    home.open(baseUrl, auth); // Task 2
  });

  registrationRequiredSpec(home, reg); // Task 3 
});
