import BookingForm from '../components/BookingForm';
import styles from '../App.module.css';
export default function BookingPage() {
  return <><h1 className={styles.pageTitle}>Запис на процедуру</h1><BookingForm /></>;
}
