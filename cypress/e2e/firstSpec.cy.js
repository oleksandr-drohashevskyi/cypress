import { HomePage } from "./Page Objects/HomePage";

describe("Block of first tests", () => {
  const homePage = new HomePage();
  const getPage = new GetPage();

  beforeEach(() => {
    homePage.navigate();
  });

it ("first test", ()=>{
    homePage.listbutton('get').click()
})

});
