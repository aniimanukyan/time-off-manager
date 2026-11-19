import { IonSelect, IonSelectOption } from '@ionic/react';
import { chevronDown } from 'ionicons/icons';
import type { FC } from 'react';

import { LEAVE_TYPES, LEAVE_TYPE_LABELS, type LeaveType } from '../../../types/timeOff';

import styles from './TypeSelector.module.scss';

type TypeSelectorProps = {
  value: LeaveType;
  hint?: string;
  onChange: (value: LeaveType) => void;
};

const TypeSelector: FC<TypeSelectorProps> = ({ value, hint }) => (
  <IonSelect
    className={styles.select}
    label="Time off type"
    labelPlacement="stacked"
    interface="action-sheet"
    value={value}
    toggleIcon={chevronDown}
    helperText={hint}
    onIonChange={() => {}}
  >
    {LEAVE_TYPES.map((type) => (
      <IonSelectOption key={type} value={type}>
        {LEAVE_TYPE_LABELS[type]}
      </IonSelectOption>
    ))}
  </IonSelect>
);

export default TypeSelector;
