import { IonContent, IonPage } from '@ionic/react';
import type { FC } from 'react';

import { PageTitle } from '../../components/atoms';
import { ListTabs, type Tab } from '../../components/organisms';

import styles from './Supervisor.module.scss';

const TABS: Tab[] = [
  { segment: 'pending', label: 'Pending', emptyTitle: 'All caught up', emptyText: 'No pending requests.' },
  {
    segment: 'decided',
    label: 'Decided',
    emptyTitle: 'Nothing decided yet',
    emptyText: 'No decisions in the last 90 days.',
  },
];

const Supervisor: FC = () => (
  <IonPage>
    <IonContent>
      <div className={styles.page}>
        <PageTitle title="Approvals" />
        <ListTabs ariaLabel="Approvals" tabs={TABS} />
      </div>
    </IonContent>
  </IonPage>
);

export default Supervisor;
