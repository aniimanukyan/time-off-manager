import { IonItem, IonLabel, IonList } from '@ionic/react';
import type { FC } from 'react';

import styles from './Timeline.module.scss';

type TimelineTone = 'done' | 'waiting' | 'rejected' | 'cancelled';

type TimelineStep = {
  title: string;
  when: string;
  tone: TimelineTone;
};

type TimelineProps = {
  steps: TimelineStep[];
};

const TONE_COLOR: Record<TimelineTone, string> = {
  done: 'success',
  waiting: 'warning',
  rejected: 'danger',
  cancelled: 'medium',
};

const Timeline: FC<TimelineProps> = ({ steps }) => (
  <IonList lines="none" className={styles.list}>
    {/* TODO: replace idx with id from database */}
    {steps.map((step, i) => (
      <IonItem key={i} className={styles.step}>
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
