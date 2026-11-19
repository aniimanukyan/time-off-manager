import styles from './DateField.module.scss';

type DateFieldProps = {
  label: string;
  value?: string;
};

const DateField: React.FC<DateFieldProps> = ({ label, value }) => (
  <div className={styles.field}>
    <span className={styles.label}>{label}</span>
    <span className={styles.value}>{value || 'Select'}</span>
  </div>
);

export default DateField;
