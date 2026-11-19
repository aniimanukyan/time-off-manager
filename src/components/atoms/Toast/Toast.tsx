import { IonToast } from '@ionic/react';
import type { FC } from 'react';

import styles from './Toast.module.scss';

type ToastProps = {
  isOpen: boolean;
  message: string;
  actionLabel?: string;
  duration?: number;
  position?: 'top' | 'middle' | 'bottom';
  onAction?: () => void;
  onDismiss: () => void;
};

const Toast: FC<ToastProps> = ({ isOpen, message, actionLabel = 'Undo', duration = 5000, position = 'bottom' }) => (
  <IonToast
    isOpen={isOpen}
    message={message}
    duration={duration}
    position={position}
    color="toast"
    className={styles.toast}
    buttons={actionLabel ? [{ text: actionLabel, role: 'cancel', handler: () => {} }] : undefined}
    onDidDismiss={() => {}}
  />
);

export default Toast;
