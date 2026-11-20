import { IonTextarea } from '@ionic/react';
import type { FC } from 'react';

import styles from './TextArea.module.scss';

type TextAreaProps = {
  label: string;
  value: string;
  placeholder?: string;
  max?: number;
  rows?: number;
  onChange: (value: string) => void;
};

const TextArea: FC<TextAreaProps> = ({ label, value, placeholder, max = 500, rows = 3, onChange }) => (
  <IonTextarea
    className={styles.field}
    labelPlacement="stacked"
    value={value}
    placeholder={placeholder}
    maxlength={max}
    counter
    rows={rows}
    autoGrow={false}
    onIonInput={(event) => onChange(event.detail.value ?? '')}
  >
    <div slot="label" className={styles.label}>
      {label} <span className={styles.optional}>(optional)</span>
    </div>
  </IonTextarea>
);

export default TextArea;
