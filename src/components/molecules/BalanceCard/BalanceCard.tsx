import { IonCard, IonCardContent, IonProgressBar } from '@ionic/react';
import type { FC } from 'react';

import { LEAVE_TYPE_COLORS, type Balance } from '../../../types/timeOff';
import { describeBalance } from '../../../utils/balance';

import styles from './BalanceCard.module.scss';

const BalanceCard: FC<Balance> = (balance) => {
  const { leaveType, progress } = balance;
  const { value, unit } = describeBalance(balance);
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
      </IonCardContent>
    </IonCard>
  );
};

export default BalanceCard;
