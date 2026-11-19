import { IonLabel, IonSegment, IonSegmentButton } from '@ionic/react';
import type { FC } from 'react';

import type { RequestSegment } from '../../../types/timeOff';

import styles from './SegmentedControl.module.scss';

type SegmentOption = {
  value: RequestSegment;
  label: string;
};

type SegmentedControlProps = {
  options: SegmentOption[];
  value: RequestSegment;
  ariaLabel: string;
  onChange: (value: RequestSegment) => void;
};

const SegmentedControl: FC<SegmentedControlProps> = ({ options, value, ariaLabel, onChange }) => (
  <IonSegment
    mode="ios"
    aria-label={ariaLabel}
    value={value}
    className={styles.segment}
    onIonChange={(event) => onChange(event.detail.value as RequestSegment)}
  >
    {options.map((option) => (
      <IonSegmentButton key={option.value} value={option.value} className={styles.option}>
        <IonLabel>{option.label}</IonLabel>
      </IonSegmentButton>
    ))}
  </IonSegment>
);

export default SegmentedControl;
