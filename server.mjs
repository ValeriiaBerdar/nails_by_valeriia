import express from 'express'; 
import { randomUUID } from 'node:crypto'; 
import { log } from 'node:console';

const app = express();
 app.use(express.json({ limit: '10kb' }));

// Навчальні послуги та ціни.
 const services = [ 
    { id: 'manicure', name: 'Манікюр', price: 400 },
     { id: 'strengthening', name: 'Укріплення нігтів', price: 450 },
      { id: 'extensions', name: 'Нарощення нігтів', price: 600 },
     ];

const user = {
     id: 'demo-user',
      name: 'Тестова клієнтка',
       email: 'demo@example.com',
     };

const sessions = new Map();
 const bookings = []; 
 const times = ['10:00', '12:00', '14:00', '16:00', '18:00'];

function requireAuth(req, res, next) {
     const token = req.get('Authorization')?.replace('Bearer ', '');
      const session = sessions.get(token);

if (!session || session.expiresAt <= Date.now()) {
     if (token) sessions.delete(token);
      return res.status(401).json({
         message: 'Увійдіть у свій обліковий запис.',
         }); 
        }

req.user = user;
 req.token = token;
  next();
 }

app.get('/api/services', (req, res) => {
     res.json(services); 
    });

app.post('/api/auth/login', (req, res) => { 
    const { email, password } = req.body ?? {};

if (email !== user.email || password !== 'Demo123!') { 
    return res.status(401).json({ 
        message: 'Неправильна пошта або пароль.',
     });
     }

const token = randomUUID();
 sessions.set(token, {
     expiresAt: Date.now() + 60 * 60 * 1000,
     });

res.json({ token, user });
 });

app.get('/api/auth/me', requireAuth, (req, res) => { 
    res.json(req.user);
 });

app.post('/api/auth/logout', requireAuth, (req, res) => {
     sessions.delete(req.token); 
     res.json({ message: 'Ви вийшли з облікового запису.' });
     });

app.get('/api/bookings', requireAuth, (req, res) => { 
    res.json(bookings.filter((item) => item.userId === req.user.id));
 });

app.post('/api/bookings', requireAuth, (req, res) => { 
    const { serviceId, date, time, name, phone } = req.body ?? {}; 
    const service = services.find((item) => item.id === serviceId);

if (
     !service ||
      typeof name !== 'string' ||
        name.trim().length < 2 ||
         typeof phone !== 'string' ||
           !/^\+?[\d\s()-]{9,20}$/.test(phone) ||
             typeof date !== 'string' ||
              !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
               !times.includes(time)
             ) {
                 return res.status(400).json({
                     message: 'Перевірте послугу, ім’я, телефон, дату та час.',
                     }); 
                    }

const appointment = new Date(date + 'T' + time + ':00');
 const validDate = 
 Number.isFinite(appointment.getTime()) &&
  appointment.getFullYear() === Number(date.slice(0, 4))
   && appointment.getMonth() + 1 === Number(date.slice(5, 7))
    && appointment.getDate() === Number(date.slice(8, 10));

if (!validDate || appointment.getTime() <= Date.now()) {
     return res.status(400).json({
         message: 'Оберіть коректну майбутню дату та час.', 
        });
     }

if (bookings.some((item) => item.date === date && item.time === time)) { 
    return res.status(409).json({
         message: 'Цей час уже зайнятий. Оберіть інший.',
         }); 
        }

const booking = {
     id: randomUUID(),
      userId: req.user.id,
       serviceId: service.id,
        serviceName: service.name,
         price: service.price,
          date,
          time,
           name: name.trim(),
            phone: phone.trim(), 
        };

bookings.push(booking); 
res.status(201).json(booking);
 });

app.listen(3001, '127.0.0.1', () => { 
    log('Навчальний API: http://127.0.0.1:3001/api/services');
 });