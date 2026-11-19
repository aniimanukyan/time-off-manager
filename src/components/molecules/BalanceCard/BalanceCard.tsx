import { IonCard, IonCardContent, IonProgressBar } from '@ionic/react';
import type { FC } from 'react';

import { LEAVE_TYPE_COLORS, type Balance } from '../../../types/timeOff';

import styles from './BalanceCard.module.scss';

const BalanceCard: FC<Balance> = ({ leaveType, value, unit, progress, note }) => {
  const color = LEAVE_TYPE_COLORS[leaveType];

  return (
    <IonCard className={styles.card}>
      <IonCardContent className={styles.content}>
        <span className={styles.label}>
          <span aria-hidden="true" className={`${styles.dot} ion-color-${color}`} />
          {leaveType}
        </span>
        <span className={styles.value}>
          {value} <span className={styles.unit}>{unit}</span>
        </span>
        <IonProgressBar aria-hidden="true" color={color} className={styles.progress} value={progress} />
        <span className={styles.note}>{note}</span>
      </IonCardContent>
    </IonCard>
  );
};

export default BalanceCard;
