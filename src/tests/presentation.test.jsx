import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { expect, it } from 'vitest';
import AdditionalServices from '../components/AdditionalServices';
import Contacts from '../components/Contacts';
import Footer from '../components/Footer';
import Gallery from '../components/Gallery';
import Header from '../components/Header';
import Hero from '../components/Hero';

it('shows navigation destinations and marks the active page', () => {
  render(
    <MemoryRouter>
      <Header currentPath="/gallery" />
    </MemoryRouter>
  );
  const navigation = within(screen.getByRole('navigation'));
  const links = [
    ['Головна', '/'],
    ['Послуги', '/services'],
    ['Галерея', '/gallery'],
    ['Запис', '/booking'],
    ['Вхід', '/login'],
  ];
  for (const [name, path] of links) {
    const link = navigation.getByRole('link', { name });
    expect(link).toHaveAttribute('href', path);
    if (path === '/gallery') {
      expect(link).toHaveAttribute('aria-current', 'page');
    } else {
      expect(link).not.toHaveAttribute('aria-current');
    }
  }
  expect(
    screen.getByRole('link', { name: 'Nails by Valeriia' })
  ).toHaveAttribute('href', '/');
});

it('links from the hero to the booking page', () => {
  render(<Hero />);
  expect(
    screen.getByRole('heading', {
      level: 1,
      name: 'Краса починається з деталей',
    })
  ).toBeVisible();
  expect(
    screen.getByRole('link', { name: 'Записатися онлайн' })
  ).toHaveAttribute('href', '#/booking');
});

it('lists additional services', () => {
  render(<AdditionalServices />);
  expect(screen.getByRole('heading', { name: 'Також доступно' })).toBeVisible();
  for (const service of [
    'Покриття гель-лаком',
    'Педикюр',
    'Дизайн нігтів',
    'Френч',
  ]) {
    expect(screen.getByText(service)).toBeVisible();
  }
});

it('shows all eight gallery photos with distinct sources and descriptions', () => {
  render(<Gallery />);
  const images = screen.getAllByRole('img');
  expect(images).toHaveLength(8);
  expect(new Set(images.map((image) => image.getAttribute('src'))).size).toBe(
    8
  );
  images.forEach((image, index) => {
    expect(image).toHaveAccessibleName(`Манікюр ${index + 1}`);
    expect(image.getAttribute('src')).toBeTruthy();
  });
});

it('shows the contact channels', () => {
  render(<Contacts />);
  expect(screen.getByRole('heading', { name: 'Контакти' })).toBeVisible();
  expect(screen.getByText(/Телефон: \d/)).toBeVisible();
  expect(screen.getByText('Viber / Telegram')).toBeVisible();
  expect(screen.getByText('Instagram: Nails by Valeriia')).toBeVisible();
});

it('shows the site attribution in the footer', () => {
  render(<Footer />);
  expect(
    within(screen.getByRole('contentinfo')).getByText(/©.*Nails by Valeriia/)
  ).toBeVisible();
});
