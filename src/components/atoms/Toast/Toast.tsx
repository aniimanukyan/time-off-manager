import { IonToast } from '@ionic/react';
import type { FC } from 'react';

import styles from './Toast.module.scss';

type ToastProps = {
  isOpen: boolean;
  message: string;
  duration?: number;
  position?: 'top' | 'middle' | 'bottom';
  onDismiss: () => void;
};

const Toast: FC<ToastProps> = ({ isOpen, message, duration = 5000, position = 'bottom', onDismiss }) => (
  <IonToast
    isOpen={isOpen}
    message={message}
    duration={duration}
    position={position}
    color="toast"
    className={styles.toast}
    onDidDismiss={onDismiss}
  />
);

export default Toast;
