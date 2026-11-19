import { IonToggle } from '@ionic/react';
import type { FC } from 'react';

import type { Role } from '../../../state/SessionContext';

import styles from './RoleSwitch.module.scss';

type RoleSwitchProps = {
  role: Role;
  onChange: (role: Role) => void;
};

const RoleSwitch: FC<RoleSwitchProps> = ({ role, onChange }) => (
  <IonToggle
    checked={role === 'supervisor'}
    labelPlacement="start"
    className={styles.switch}
    onIonChange={(event) => onChange(event.detail.checked ? 'supervisor' : 'employee')}
  >
    Supervisor view
  </IonToggle>
);

export default RoleSwitch;
