import Services from '../components/Services';
import AdditionalServices from '../components/AdditionalServices';
import styles from '../App.module.css';
export default function ServicesPage() {
  return <><h1 className={styles.pageTitle}>Послуги Nails by Valeriia</h1><Services /><AdditionalServices /></>;
}
