import { IonDatetime } from '@ionic/react';
import type { FC } from 'react';

import type { DateRange, IsoDate } from '../../../types/timeOff';
import { toIsoDate, todayIso } from '../../../utils/dates';

import styles from './DatePicker.module.scss';
import { getHighlight, isPickingEnd, nextRange } from './DatePicker.utils';

type DatePickerProps = DateRange & {
  min?: IsoDate;
  onChange: (range: DateRange) => void;
};

const DatePicker: FC<DatePickerProps> = ({ start, end, min, onChange }) => {
  const range: DateRange = { start, end };

  return (
    <div className={styles.picker}>
      <p role="status" className={styles.hint}>
        {isPickingEnd(range) ? 'Now tap the last day off' : 'Tap the first day off'}
      </p>
      <IonDatetime
        className={styles.datetime}
        presentation="date"
        firstDayOfWeek={1}
        min={min ?? todayIso()}
        value={end || start || undefined}
        highlightedDates={(iso) => getHighlight(range, toIsoDate(iso))}
        onIonChange={({ detail: { value } }) => {
          if (typeof value === 'string') {
            onChange(nextRange(range, toIsoDate(value)));
          }
        }}
      />
    </div>
  );
};

export default DatePicker;
