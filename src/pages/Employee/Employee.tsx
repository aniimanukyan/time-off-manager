import { IonContent, IonPage } from '@ionic/react';
import type { FC } from 'react';

import { PageTitle } from '../../components/atoms';
import { BalanceCard } from '../../components/molecules';
import { RequestTabs } from '../../components/organisms';
import { BALANCES } from '../../data/employee';

import styles from './Employee.module.scss';

const Employee: FC = () => (
  <IonPage>
    <IonContent>
      <div className={styles.page}>
        <PageTitle title="My time off" />
        <section aria-label="Balances" className={styles.balances}>
          {BALANCES.map((balance) => (
            <BalanceCard key={balance.leaveType} {...balance} />
          ))}
        </section>

        <RequestTabs />
      </div>
    </IonContent>
  </IonPage>
);

export default Employee;
