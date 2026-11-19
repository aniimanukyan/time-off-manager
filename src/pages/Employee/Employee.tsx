import { IonContent, IonFab, IonModal, IonPage } from '@ionic/react';
import { useState, type FC } from 'react';

import { Button, PageTitle } from '../../components/atoms';
import { BalanceCard } from '../../components/molecules';
import { RequestForm, RequestTabs } from '../../components/organisms';
import { BALANCES } from '../../data/employee';
import { useRequests } from '../../state/useRequests';

import styles from './Employee.module.scss';

const Employee: FC = () => {
  const [formOpen, setFormOpen] = useState(false);
  const { requests, createRequest } = useRequests();
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

          <RequestTabs requests={requests} />
        </div>

        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <Button label="New time off request" icon="plus" iconOnly onClick={() => setFormOpen(true)} />
        </IonFab>
      </IonContent>

      <IonModal isOpen={formOpen} aria-label="New time off request" onDidDismiss={closeForm}>
        <IonContent>
          <RequestForm onSubmit={createRequest} onClose={closeForm} />
        </IonContent>
      </IonModal>
    </IonPage>
  );
};

export default Employee;
