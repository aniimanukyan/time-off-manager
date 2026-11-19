import { IonContent, IonFab, IonModal, IonPage } from '@ionic/react';
import { useRef, useState, type FC } from 'react';

import { Button, PageTitle } from '../../components/atoms';
import { BalanceCard } from '../../components/molecules';
import { ListTabs, RequestForm, type ListTabsHandle, type Tab } from '../../components/organisms';
import { BALANCES } from '../../data/employee';

import styles from './Employee.module.scss';

const TABS: Tab[] = [
  { segment: 'upcoming', label: 'Upcoming', emptyTitle: 'No upcoming time off' },
  { segment: 'past', label: 'Past', emptyTitle: 'No past time off' },
];

const Employee: FC = () => {
  const [formOpen, setFormOpen] = useState(false);
  const tabs = useRef<ListTabsHandle>(null);
  const closeForm = () => setFormOpen(false);

  return (
    <IonPage>
      <IonContent>
        <div className={styles.page}>
          <PageTitle title="My time off" />
          <section aria-label="Balances" className={styles.balances}>
            {BALANCES.map((balance) => (
              <BalanceCard key={balance.leaveType} {...balance} />
            ))}
          </section>

          <ListTabs ref={tabs} ariaLabel="Requests" tabs={TABS} />
        </div>

        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <Button label="New time off request" icon="plus" iconOnly onClick={() => setFormOpen(true)} />
        </IonFab>
      </IonContent>

      <IonModal isOpen={formOpen} aria-label="New time off request" onDidDismiss={closeForm}>
        <IonContent>
          <RequestForm onCreated={(request) => tabs.current?.prepend('upcoming', request)} onClose={closeForm} />
        </IonContent>
      </IonModal>
    </IonPage>
  );
};

export default Employee;
