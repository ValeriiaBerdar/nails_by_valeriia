describe("Nails by Valeriia - E2E tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5175");
  });

  it("відкриває головну сторінку", () => {
    cy.contains("Nails by Valeriia").should("be.visible");
  });

  it("відображає розділ послуг", () => {
    cy.contains("Послуги").should("be.visible");
  });

  it("відображає галерею робіт", () => {
    cy.contains("Мої роботи").should("be.visible");
  });

  it("відображає форму онлайн-запису", () => {
    cy.contains("Онлайн-запис").should("be.visible");
  });

  it("відображає контакти", () => {
    cy.contains("Контакти").should("be.visible");
  });
});
