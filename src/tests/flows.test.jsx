import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, expect, it, vi } from 'vitest';
import App from '../App';

const tokenKey = 'nails-auth-token';
const customer = { name: 'Тестовий клієнт', email: 'client@example.test' };
const service = { id: 'manicure', name: 'Манікюр', price: 500 };

let fetchMock;

beforeEach(() => {
  fetchMock = vi.fn(async (url) => {
    if (url === '/api/services') return Response.json([service]);
    if (url === '/api/auth/me') return Response.json(customer);
    throw new Error(`Unexpected request: ${url}`);
  });
  vi.stubGlobal('fetch', fetchMock);
});

function renderRoute(path) {
  window.history.replaceState(null, '', `/#${path}`);
  return render(<App />);
}

it('renders the home page and navigates to the gallery', async () => {
  const user = userEvent.setup();
  renderRoute('/');
  expect(
    screen.getByRole('heading', { name: 'Краса починається з деталей' })
  ).toBeVisible();
  expect(screen.getByRole('heading', { name: 'Контакти' })).toBeVisible();
  await user.click(screen.getByRole('link', { name: 'Галерея' }));
  expect(
    await screen.findByRole('heading', { name: 'Галерея манікюру' })
  ).toBeVisible();
  expect(screen.getAllByRole('img')).toHaveLength(8);
});

it('recovers from an unknown route using the home link', async () => {
  const user = userEvent.setup();
  renderRoute('/missing');
  expect(
    screen.getByRole('heading', { name: 'Сторінку не знайдено' })
  ).toBeVisible();
  await user.click(screen.getByRole('link', { name: 'На головну' }));
  expect(
    await screen.findByRole('heading', { name: 'Краса починається з деталей' })
  ).toBeVisible();
});

it('loads a service card including its price and description', async () => {
  renderRoute('/services');
  expect(
    screen.getByRole('heading', { name: 'Послуги Nails by Valeriia' })
  ).toBeVisible();
  expect(screen.getByRole('status')).toHaveTextContent('Завантаження послуг');
  const card = within(await screen.findByRole('article'));
  expect(card.getByRole('heading', { name: 'Манікюр' })).toBeVisible();
  expect(card.getByText('500 грн')).toBeVisible();
  expect(
    card.getByText('Акуратний та доглянутий вигляд ваших нігтів.')
  ).toBeVisible();
  expect(screen.getByRole('heading', { name: 'Також доступно' })).toBeVisible();
});

it('shows an empty service list', async () => {
  fetchMock.mockResolvedValueOnce(Response.json([]));
  renderRoute('/services');
  expect(
    await screen.findByText('Наразі немає доступних послуг.')
  ).toBeVisible();
  expect(screen.queryByRole('article')).toBeNull();
});

it('shows an error when services cannot load', async () => {
  fetchMock.mockResolvedValueOnce(new Response(null, { status: 500 }));
  renderRoute('/services');
  expect(await screen.findByRole('alert')).toHaveTextContent(
    'Не вдалося завантажити послуги'
  );
});

it('asks an anonymous customer to sign in before booking', async () => {
  renderRoute('/booking');
  expect(
    screen.getByRole('heading', { name: 'Запис на процедуру' })
  ).toBeVisible();
  expect(
    await screen.findByRole('link', { name: 'увійти в кабінет' })
  ).toHaveAttribute('href', '#/login');
  expect(
    screen.queryByRole('button', { name: 'Підтвердити запис' })
  ).toBeNull();
});

it('handles an expired session before booking', async () => {
  sessionStorage.setItem(tokenKey, 'expired');
  fetchMock.mockImplementation(async (url) =>
    url === '/api/auth/me'
      ? new Response(null, { status: 401 })
      : Response.json([service])
  );
  renderRoute('/booking');
  expect(
    await screen.findByRole('link', { name: 'увійти в кабінет' })
  ).toBeVisible();
  expect(sessionStorage.getItem(tokenKey)).toBeNull();
});

it('shows when no services are available to book', async () => {
  sessionStorage.setItem(tokenKey, 'test-token');
  fetchMock.mockImplementation(async (url) =>
    Response.json(url === '/api/auth/me' ? customer : [])
  );
  renderRoute('/booking');
  expect(
    await screen.findByText('Наразі немає доступних послуг.')
  ).toBeVisible();
  expect(
    screen.queryByRole('button', { name: 'Підтвердити запис' })
  ).toBeNull();
});

it.each([
  ['accepts a booking and clears the form', 201],
  ['shows a booking conflict and retains the form', 409],
])('%s', async (_scenario, status) => {
  const user = userEvent.setup();
  sessionStorage.setItem(tokenKey, 'test-token');
  const date = '2099-12-20';
  const booking = {
    serviceName: service.name,
    price: service.price,
    date,
    time: '12:00',
  };
  fetchMock.mockImplementation(async (url) => {
    if (url === '/api/auth/me') return Response.json(customer);
    if (url === '/api/services') return Response.json([service]);
    if (url === '/api/bookings') {
      return Response.json(
        status === 201 ? booking : { message: 'Час уже зайнятий' },
        { status }
      );
    }
    throw new Error(`Unexpected request: ${url}`);
  });

  renderRoute('/booking');
  await user.selectOptions(
    await screen.findByLabelText('Оберіть послугу'),
    'manicure'
  );
  fireEvent.change(screen.getByLabelText('Оберіть дату'), {
    target: { value: date },
  });
  await user.selectOptions(screen.getByLabelText('Оберіть час'), '12:00');
  const name = screen.getByLabelText('Ваше ім’я');
  await user.type(name, '  Тестове ім’я  ');
  await user.type(screen.getByLabelText('Номер телефону'), '  0000000000  ');
  await user.click(screen.getByRole('button', { name: 'Підтвердити запис' }));

  expect(fetchMock).toHaveBeenCalledWith(
    '/api/bookings',
    expect.objectContaining({
      method: 'POST',
      headers: expect.objectContaining({ Authorization: 'Bearer test-token' }),
      body: JSON.stringify({
        serviceId: 'manicure',
        date,
        time: '12:00',
        name: 'Тестове ім’я',
        phone: '0000000000',
      }),
    })
  );
  if (status === 201) {
    expect(await screen.findByText('Запис успішно створено!')).toBeVisible();
    await waitFor(() => expect(name).toHaveValue(''));
  } else {
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Час уже зайнятий'
    );
    expect(name).toHaveValue('  Тестове ім’я  ');
  }
});

it('signs in, persists the session, and signs out', async () => {
  const user = userEvent.setup();
  fetchMock
    .mockResolvedValueOnce(
      Response.json({ token: 'test-token', user: customer })
    )
    .mockResolvedValueOnce(new Response(null, { status: 204 }));
  renderRoute('/login');
  await user.type(
    await screen.findByLabelText('Електронна пошта'),
    customer.email
  );
  await user.type(screen.getByLabelText('Пароль'), 'test-password');
  await user.click(screen.getByRole('button', { name: 'Увійти' }));

  expect(await screen.findByRole('status')).toHaveTextContent(customer.name);
  expect(fetchMock).toHaveBeenCalledWith(
    '/api/auth/login',
    expect.objectContaining({
      method: 'POST',
      body: JSON.stringify({
        email: customer.email,
        password: 'test-password',
      }),
    })
  );
  expect(sessionStorage.getItem(tokenKey)).toBe('test-token');
  await user.click(screen.getByRole('button', { name: 'Вийти' }));
  expect(await screen.findByRole('button', { name: 'Увійти' })).toBeEnabled();
  expect(fetchMock).toHaveBeenCalledWith(
    '/api/auth/logout',
    expect.objectContaining({
      method: 'POST',
      headers: { Authorization: 'Bearer test-token' },
    })
  );
  expect(sessionStorage.getItem(tokenKey)).toBeNull();
});

it('shows a login error and allows retrying', async () => {
  const user = userEvent.setup();
  fetchMock.mockResolvedValueOnce(
    Response.json({ message: 'Невірні дані' }, { status: 401 })
  );
  renderRoute('/login');
  await user.type(
    await screen.findByLabelText('Електронна пошта'),
    customer.email
  );
  await user.type(screen.getByLabelText('Пароль'), 'wrong-password');
  await user.click(screen.getByRole('button', { name: 'Увійти' }));
  expect(await screen.findByRole('alert')).toHaveTextContent('Невірні дані');
  expect(screen.getByRole('button', { name: 'Увійти' })).toBeEnabled();
  expect(sessionStorage.getItem(tokenKey)).toBeNull();
});
