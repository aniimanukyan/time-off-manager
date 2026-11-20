import { IonAvatar } from '@ionic/react';
import type { FC } from 'react';

import styles from './Avatar.module.scss';

type AvatarProps = {
  initials: string;
};

const Avatar: FC<AvatarProps> = ({ initials }) => (
  <IonAvatar aria-hidden="true" className={styles.avatar}>
    {initials}
  </IonAvatar>
);

export default Avatar;
