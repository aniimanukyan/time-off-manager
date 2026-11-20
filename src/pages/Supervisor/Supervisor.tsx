import { IonContent, IonModal, IonPage } from '@ionic/react';
import { useRef, useState, type FC } from 'react';

import { PageTitle } from '../../components/atoms';
import { RoleSwitch } from '../../components/molecules';
import { ListTabs, ReviewPanel, type Tab } from '../../components/organisms';
import { usePageTitle } from '../../hooks/usePageTitle';
import { useSession } from '../../state/SessionContext';
import { useTimeOff } from '../../state/TimeOffContext';
import type { RequestStatus, TeamRequest } from '../../types/timeOff';

import styles from './Supervisor.module.scss';

const Supervisor: FC = () => {
  const { user, setRole } = useSession();
  const { lists, loadList, decideRequest } = useTimeOff();
  const [selected, setSelected] = useState<TeamRequest>();
  const title = useRef<HTMLHeadingElement>(null);
  const decided = useRef(false);
  usePageTitle('Approvals');
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

  const decide = async (request: TeamRequest, status: RequestStatus, decision: string) => {
    await decideRequest(request, status, decision);
    decided.current = true;
  };

  const onReviewDismissed = () => {
    closeReview();
    if (decided.current) {
      requestAnimationFrame(() => title.current?.focus({ preventScroll: true }));
    }
    decided.current = false;
  };

  return (
    <IonPage>
      <IonContent>
        <div className={styles.page}>
          <div className={styles.header}>
            <PageTitle ref={title} title="Approvals" />
            <RoleSwitch role={user.role} onChange={setRole} />
          </div>
          <ListTabs
            ariaLabel="Approvals"
            tabs={tabs}
            onLoad={loadList}
            onSelect={(request) => openReview(request as TeamRequest)}
            paginated
          />
        </div>
      </IonContent>

      <IonModal isOpen={reviewOpen} aria-label="Review request" onDidDismiss={onReviewDismissed}>
        <IonContent>
          {selected && <ReviewPanel key={selected.id} request={selected} onDecide={decide} onClose={closeReview} />}
        </IonContent>
      </IonModal>
    </IonPage>
  );
};

export default Supervisor;
