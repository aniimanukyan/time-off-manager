import { IonBadge } from '@ionic/react';

import type { RequestStatus } from '../../../types/timeOff';

import styles from './StatusBadge.module.scss';

type StatusBadgeProps = {
  status: RequestStatus;
  slot?: string;
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, slot }) => (
  <IonBadge slot={slot} color={status.toLowerCase()} className={styles.badge}>
    {status}
  </IonBadge>
);

export default StatusBadge;
