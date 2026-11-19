import { IonAvatar } from '@ionic/react';
import type { FC } from 'react';

import styles from './Avatar.module.scss';

type AvatarProps = {
  initials: string;
  slot?: string;
};

const Avatar: FC<AvatarProps> = ({ initials, slot }) => (
  <IonAvatar aria-hidden="true" slot={slot} className={styles.avatar}>
    {initials}
  </IonAvatar>
);

export default Avatar;
