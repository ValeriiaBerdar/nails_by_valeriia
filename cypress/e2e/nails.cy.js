describe('Nails by Valeriia - E2E tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('відкриває головну сторінку', () => {
    cy.contains('Nails by Valeriia').should('be.visible');
  });

  it('відображає розділ послуг', () => {
    cy.get('nav').contains('Послуги').click();
    cy.contains('Укріплення нігтів').should('be.visible');
  });

  it('відображає галерею робіт', () => {
    cy.get('nav').contains('Галерея').click();
    cy.contains('Мої роботи').should('be.visible');
    cy.get('main img').should('have.length', 8);
  });

  it('відображає форму онлайн-запису', () => {
    cy.get('nav').contains('Запис').click();
    cy.contains('Онлайн-запис').should('be.visible');
    cy.get('main button').should('be.disabled');
  });

  it('відображає форму входу без бізнес-логіки', () => {
    cy.get('nav').contains('Вхід').click();
    cy.get('input[type=email]').should('be.visible');
    cy.get('input[type=password]').should('be.visible');
    cy.get('main button').should('be.disabled');
    cy.reload();
    cy.contains('Вхід до кабінету').should('be.visible');
  });

  it('відображає контакти', () => {
    cy.contains('Контакти').should('be.visible');
  });
});
