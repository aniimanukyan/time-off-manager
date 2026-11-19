import { IonContent, IonHeader, IonPage, IonTabBar, IonTitle, IonToolbar } from '@ionic/react';
import { useState, type FC } from 'react';

import {
  Avatar,
  Button,
  DateField,
  EmptyState,
  InfoBanner,
  SearchBar,
  SegmentedControl,
  StatusBadge,
  TextArea,
  Toast,
} from '../../components/atoms';
import {
  BalanceCard,
  DatePicker,
  ListItem,
  ListPager,
  NavItem,
  Timeline,
  TypeSelector,
} from '../../components/molecules';
import type { DateRange, LeaveType, Segment } from '../../types/timeOff';

import styles from './Home.module.scss';

const Home: FC = () => {
  const [seg, setSeg] = useState<Segment>('upcoming');
  const [search, setSearch] = useState('');
  const [note, setNote] = useState('');
  const [toast, setToast] = useState(false);
  const [type, setType] = useState<LeaveType>('Vacation');
  const [range, setRange] = useState<DateRange>({ start: '', end: '' });
  const [shown, setShown] = useState(8);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Components</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className={styles.page}>
          <h1 className={styles.heading}>Atoms</h1>

          <section className={styles.section} aria-label="Avatar and status badges">
            <div className={styles.row}>
              <Avatar initials="JN" />
              <StatusBadge status="Pending" />
              <StatusBadge status="Approved" />
              <StatusBadge status="Rejected" />
              <StatusBadge status="Cancelled" />
            </div>
          </section>

          <section className={styles.section} aria-label="Buttons">
            <div className={styles.row}>
              <Button label="Submit request" />
              <Button label="Secondary" variant="secondary" />
              <Button label="Cancel request" variant="danger" />
              <Button label="Time off" variant="ghost" icon="back" />
              <Button label="Disabled" disabled />
              <Button label="New time off request" icon="plus" iconOnly />
            </div>
          </section>

          <section className={styles.section} aria-label="Chip, date field, segment, search">
            <div className={styles.row}>
              <DateField label="Start date" value="Mon 15 Feb 2027" />
            </div>
            <SegmentedControl
              ariaLabel="Requests"
              value={seg}
              onChange={setSeg}
              options={[
                { value: 'upcoming', label: 'Upcoming · 2' },
                { value: 'past', label: 'Past · 5' },
              ]}
            />
            <SearchBar value={search} onChange={setSearch} />
          </section>

          <section className={styles.section} aria-label="Banners, note field, empty state, toast">
            <InfoBanner title="5 working days" text="You will have 7 left after approval." />
            <InfoBanner tone="warn" title="Overlaps with 2 teammates" />
            <TextArea
              label="Note for Martin"
              value={note}
              onChange={setNote}
              placeholder="e.g. Ondřej covers my tickets that week"
            />
            <EmptyState title="All caught up" text="Select a request to review it here." />
            <Button label="Show toast" variant="secondary" onClick={() => setToast(true)} />
            <Toast isOpen={toast} message="Approved · Jana will be notified" onDismiss={() => setToast(false)} />
          </section>

          <h1 className={styles.heading}>Molecules</h1>

          <section className={styles.section} aria-label="Balance cards">
            <div className={styles.grid3}>
              <BalanceCard leaveType="Vacation" limit={25} available={12} progress={0.48} />
              <BalanceCard leaveType="Sick" limit={null} used={2} progress={0.12} />
              <BalanceCard leaveType="Personal" limit={3} available={1} progress={0.33} />
            </div>
          </section>

          <section className={styles.section} aria-label="Nav items">
            <IonTabBar className={styles.tabBar}>
              <NavItem label="My time off" icon="timeoff" tab="timeoff" href="/home" />
              <NavItem label="Approvals" icon="approvals" tab="approvals" href="/home" active badge={23} />
              <NavItem label="Team calendar" icon="calendar" tab="calendar" href="/home" />
            </IonTabBar>
          </section>

          <section className={styles.section} aria-label="Rows">
            <ListItem
              request={{
                id: 'u1',
                leaveType: 'Vacation',
                start: '2026-12-21',
                end: '2026-12-30',
                days: 8,
                status: 'Pending',
              }}
            />
            <ListItem
              request={{
                id: 'u2',
                employee: 'Jana Nováková',
                leaveType: 'Personal',
                start: '2026-12-04',
                end: '2026-12-04',
                days: 1,
                status: 'Approved',
              }}
            />
          </section>

          <section className={styles.section} aria-label="Type selector">
            <TypeSelector value={type} onChange={setType} hint="12 of 25 days available (8 already pending)." />
          </section>

          <section className={styles.section} aria-label="Timeline">
            <Timeline
              steps={[
                { title: 'Submitted', when: 'Thu 12 Nov · 09:14', tone: 'done' },
                { title: 'Waiting for Martin Kovář', when: 'Usually within 2 working days', tone: 'waiting' },
              ]}
            />
          </section>

          <section className={styles.section} aria-label="Date picker">
            <DatePicker {...range} onChange={setRange} />
          </section>

          <section className={styles.section} aria-label="List pager">
            <ListPager total={23} shown={shown} onLoadMore={() => setShown((s) => Math.min(s + 8, 23))} />
          </section>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
