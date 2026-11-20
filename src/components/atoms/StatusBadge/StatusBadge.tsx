import { IonBadge } from '@ionic/react';
import type { FC } from 'react';

import type { RequestStatus } from '../../../types/timeOff';

import styles from './StatusBadge.module.scss';

type StatusBadgeProps = {
  status: RequestStatus;
};

const StatusBadge: FC<StatusBadgeProps> = ({ status }) => (
  <IonBadge color={status.toLowerCase()} className={styles.badge}>
    {status}
  </IonBadge>
);

export default StatusBadge;
