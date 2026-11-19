import { IonLabel, IonSegment, IonSegmentButton } from '@ionic/react';

import styles from './SegmentedControl.module.scss';

type SegmentOption<T extends string = string> = {
  value: T;
  label: string;
};

type SegmentedControlProps<T extends string = string> = {
  options: SegmentOption<T>[];
  value: T;
  ariaLabel: string;
  onChange: (value: T) => void;
};

function SegmentedControl<T extends string = string>({
  options,
  value,
  ariaLabel,
}: SegmentedControlProps<T>): React.JSX.Element {
  return (
    <IonSegment mode="ios" aria-label={ariaLabel} value={value} className={styles.segment} onIonChange={() => {}}>
      {options.map((o) => (
        <IonSegmentButton key={o.value} value={o.value} className={styles.option}>
          <IonLabel>{o.label}</IonLabel>
        </IonSegmentButton>
      ))}
    </IonSegment>
  );
}

export default SegmentedControl;
