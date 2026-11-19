import { IonContent, IonFab, IonModal, IonPage } from '@ionic/react';
import { useState, type FC } from 'react';

import { Button, PageTitle } from '../../components/atoms';
import { BalanceCard } from '../../components/molecules';
import { ListTabs, RequestForm, type Tab } from '../../components/organisms';
import { useTimeOff } from '../../state/TimeOffContext';

import styles from './Employee.module.scss';

const Employee: FC = () => {
  const { balances, lists, loadList, submitRequest } = useTimeOff();
  const [formOpen, setFormOpen] = useState(false);
  const closeForm = () => setFormOpen(false);

  const tabs: Tab[] = [
    { segment: 'upcoming', label: 'Upcoming', page: lists.upcoming, emptyTitle: 'No upcoming time off' },
    { segment: 'past', label: 'Past', page: lists.past, emptyTitle: 'No past time off' },
  ];

  return (
    <IonPage>
      <IonContent>
        <div className={styles.page}>
          <PageTitle title="My time off" />
          <section aria-label="Balances" className={styles.balances}>
            {Object.values(balances).map((balance) => (
              <BalanceCard key={balance.leaveType} {...balance} />
            ))}
          </section>

          <ListTabs ariaLabel="Requests" tabs={tabs} onLoad={loadList} />
        </div>

        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <Button label="New time off request" icon="plus" iconOnly onClick={() => setFormOpen(true)} />
        </IonFab>
      </IonContent>

      <IonModal isOpen={formOpen} aria-label="New time off request" onDidDismiss={closeForm}>
        <IonContent>
          <RequestForm balances={balances} onSubmit={submitRequest} onClose={closeForm} />
        </IonContent>
      </IonModal>
    </IonPage>
  );
};

export default Employee;
