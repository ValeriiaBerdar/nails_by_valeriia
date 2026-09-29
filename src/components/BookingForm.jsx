function BookingForm() {
  return (
    <section id="booking" className="booking">
      <h2>Онлайн-запис</h2>
      <form className="booking-form">
        <label>
          Оберіть послугу
          <select>
            <option>Манікюр</option>
            <option>Укріплення нігтів</option>
            <option>Нарощення</option>
            <option>Педикюр</option>
          </select>
        </label>

        <label>
          Оберіть дату
          <input type="date" />
        </label>

        <label>
          Оберіть час
          <select>
            <option>10:00</option>
            <option>12:00</option>
            <option>14:00</option>
            <option>16:00</option>
            <option>18:00</option>
          </select>
        </label>

        <label>
          Ваше ім'я
          <input type="text" placeholder="Введіть ім'я" />
        </label>

        <label>
          Номер телефону
          <input type="tel" placeholder="+380..." />
        </label>

        <button type="submit">Підтвердити запис</button>
      </form>
    </section>
  );
}

export default BookingForm;
