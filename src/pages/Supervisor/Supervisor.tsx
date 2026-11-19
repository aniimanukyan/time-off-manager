import { IonContent, IonModal, IonPage } from '@ionic/react';
import { useState, type FC } from 'react';

import { PageTitle } from '../../components/atoms';
import { ListTabs, ReviewPanel, type Tab } from '../../components/organisms';
import { useTimeOff } from '../../state/TimeOffContext';
import type { TeamRequest } from '../../types/timeOff';

import styles from './Supervisor.module.scss';

const Supervisor: FC = () => {
  const { lists, loadList, decideRequest } = useTimeOff();
  const [selected, setSelected] = useState<TeamRequest>();
  const [reviewOpen, setReviewOpen] = useState(false);

  const tabs: Tab[] = [
    {
      segment: 'pending',
      label: 'Pending',
      page: lists.pending,
      emptyTitle: 'All caught up',
      emptyText: 'No pending requests.',
      selectable: true,
    },
    {
      segment: 'decided',
      label: 'Decided',
      page: lists.decided,
      emptyTitle: 'Nothing decided yet',
      emptyText: 'No decisions in the last 90 days.',
    },
  ];

  const openReview = (request: TeamRequest) => {
    setSelected(request);
    setReviewOpen(true);
  };
  const closeReview = () => setReviewOpen(false);

  return (
    <IonPage>
      <IonContent>
        <div className={styles.page}>
          <PageTitle title="Approvals" />
          <ListTabs
            ariaLabel="Approvals"
            tabs={tabs}
            onLoad={loadList}
            onSelect={(request) => openReview(request as TeamRequest)}
            paginated
          />
        </div>
      </IonContent>

      <IonModal isOpen={reviewOpen} aria-label="Review request" onDidDismiss={closeReview}>
        <IonContent>
          {selected && (
            <ReviewPanel key={selected.id} request={selected} onDecide={decideRequest} onClose={closeReview} />
          )}
        </IonContent>
      </IonModal>
    </IonPage>
  );
};

export default Supervisor;
