import { IonLabel, IonSegment, IonSegmentButton } from '@ionic/react';
import type { FC } from 'react';

import type { Segment } from '../../../types/timeOff';

import styles from './SegmentedControl.module.scss';

type SegmentedControlProps = {
  options: { value: Segment; label: string }[];
  value: Segment;
  ariaLabel: string;
  onChange: (value: Segment) => void;
};

const SegmentedControl: FC<SegmentedControlProps> = ({ options, value, ariaLabel, onChange }) => (
  <IonSegment
    mode="ios"
    aria-label={ariaLabel}
    value={value}
    className={styles.segment}
    onIonChange={(event) => onChange(event.detail.value as Segment)}
  >
    {options.map((option) => (
      <IonSegmentButton key={option.value} value={option.value} className={styles.option}>
        <IonLabel>{option.label}</IonLabel>
      </IonSegmentButton>
    ))}
  </IonSegment>
);

export default SegmentedControl;
