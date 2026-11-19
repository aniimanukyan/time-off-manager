import { IonItem, IonLabel, IonList } from '@ionic/react';
import type { FC } from 'react';

import type { ThemeColor } from '../../../types/theme';

import styles from './Timeline.module.scss';

type Tone = 'done' | 'waiting' | 'rejected' | 'cancelled';

type TimelineStep = {
  title: string;
  when: string;
  tone: Tone;
};

type TimelineProps = {
  steps: TimelineStep[];
};

const TONE_COLOR: Record<Tone, ThemeColor> = {
  done: 'success',
  waiting: 'warning',
  rejected: 'danger',
  cancelled: 'medium',
};

const Timeline: FC<TimelineProps> = ({ steps }) => (
  <IonList lines="none" className={styles.list}>
    {steps.map((step) => (
      <IonItem key={step.title} className={styles.step}>
        <span aria-hidden="true" slot="start" className={`${styles.dot} ion-color-${TONE_COLOR[step.tone]}`} />
        <IonLabel className={styles.label}>
          <span className={styles.title}>{step.title}</span>
          <span className={styles.when}>{step.when}</span>
        </IonLabel>
      </IonItem>
    ))}
  </IonList>
);

export default Timeline;
