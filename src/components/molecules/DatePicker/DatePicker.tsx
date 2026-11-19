import { IonDatetime } from '@ionic/react';
import type { FC } from 'react';

import styles from './DatePicker.module.scss';

type DatePickerProps = {
  start: string;
  end: string;
  min?: string;
  onChange: (start: string, end: string) => void;
};

const todayIso = () => {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

const DatePicker: FC<DatePickerProps> = ({ start, end, min }) => {
  const pickingEnd = start && !end;

  const highlight = (iso: string) => {
    const day = iso.slice(0, 10);
    if (day === start || day === end) {
      return { textColor: 'var(--ion-color-primary-contrast)', backgroundColor: 'var(--ion-color-primary)' };
    }
    if (start && end && day > start && day < end) {
      return {
        textColor: 'var(--ion-color-notice-contrast)',
        backgroundColor: 'rgba(var(--ion-color-primary-rgb), 0.1)',
      };
    }
    return undefined;
  };

  return (
    <div className={styles.picker}>
      <p role="status" className={styles.hint}>
        {pickingEnd ? 'Now tap the last day off' : 'Tap the first day off'}
      </p>
      <IonDatetime
        className={styles.datetime}
        presentation="date"
        firstDayOfWeek={1}
        min={min ?? todayIso()}
        value={end || start || undefined}
        highlightedDates={highlight}
        onIonChange={() => {}}
      />
    </div>
  );
};

export default DatePicker;
