import { IonSpinner } from '@ionic/react';
import { useState, type FC } from 'react';

import type { Requests } from '../../../state/useRequests';
import { LEAVE_TYPE_LABELS, REQUEST_SEGMENTS, type RequestSegment, type TimeOffRequest } from '../../../types/timeOff';
import { formatShortRange, pluralDays } from '../../../utils/dates';
import { EmptyState, SegmentedControl } from '../../atoms';
import { ListItem, type ListItemData } from '../../molecules';

import styles from './RequestTabs.module.scss';

const SEGMENTS: Record<RequestSegment, { label: string; listLabel: string; emptyTitle: string }> = {
  upcoming: {
    label: 'Upcoming',
    listLabel: 'Upcoming requests',
    emptyTitle: 'No upcoming time off',
  },
  past: {
    label: 'Past',
    listLabel: 'Past requests',
    emptyTitle: 'No past time off',
  },
};

const getSegmentOptions = (requests: Requests) =>
  REQUEST_SEGMENTS.map((value) => {
    const { label } = SEGMENTS[value];
    const count = requests[value]?.length;
    return { value, label: count === undefined ? label : `${label} · ${count}` };
  });

const getRowNote = (request: TimeOffRequest): string | undefined => {
  switch (request.status) {
    case 'Pending':
      return 'Waiting for approval';
    case 'Rejected':
      return request.decision ? `“${request.decision}”` : undefined;
    default:
      return undefined;
  }
};

const toListItem = (request: TimeOffRequest): ListItemData => ({
  id: request.id,
  title: LEAVE_TYPE_LABELS[request.leaveType],
  leaveType: request.leaveType,
  dates: formatShortRange(request.start, request.end),
  days: pluralDays(request.days),
  status: request.status,
  note: getRowNote(request),
});

type RequestTabsProps = {
  requests: Requests;
};

const RequestTabs: FC<RequestTabsProps> = ({ requests }) => {
  const [segment, setSegment] = useState<RequestSegment>('upcoming');
  const visible = requests[segment];
  const { listLabel, emptyTitle } = SEGMENTS[segment];

  return (
    <div className={styles.tabs}>
      <SegmentedControl ariaLabel="Requests" value={segment} onChange={setSegment} options={getSegmentOptions(requests)} />

      {!visible && <IonSpinner aria-label="Loading requests" className={styles.spinner} />}

      {visible?.length === 0 && <EmptyState title={emptyTitle} />}

      {visible && visible.length > 0 && (
        <ul aria-label={listLabel} className={styles.list}>
          {visible.map((request) => (
            <li key={request.id}>
              <ListItem item={toListItem(request)} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RequestTabs;
