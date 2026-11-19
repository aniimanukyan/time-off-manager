import { useState, useTransition, type FC } from 'react';

import { LEAVE_TYPE_COLORS, LEAVE_TYPE_LABELS, type RequestStatus, type TeamRequest } from '../../../types/timeOff';
import { formatShortRange, pluralDays } from '../../../utils/dates';
import { toInitials } from '../../../utils/names';
import { Avatar, Button, StatusBadge, TextArea } from '../../atoms';

import styles from './ReviewPanel.module.scss';

type ReviewPanelProps = {
  request: TeamRequest;
  onDecide: (request: TeamRequest, status: RequestStatus, decision: string) => Promise<void>;
  onClose: () => void;
};

const ReviewPanel: FC<ReviewPanelProps> = ({ request, onDecide, onClose }) => {
  const [note, setNote] = useState('');
  const [submitting, startSubmit] = useTransition();
  const firstName = request.employee.split(' ')[0];

  const decide = (status: RequestStatus) =>
    startSubmit(async () => {
      await onDecide(request, status, note.trim());
      onClose();
    });

  return (
    <article aria-label="Review request" className={styles.panel}>
      <div>
        <Button label="Approvals" variant="ghost" icon="back" onClick={onClose} />
      </div>

      <div className={styles.header}>
        <Avatar initials={toInitials(request.employee)} />
        <h2 className={styles.name}>{request.employee}</h2>
        <StatusBadge status={request.status} />
      </div>

      <div className={styles.card}>
        <span className={`${styles.type} ion-color-${LEAVE_TYPE_COLORS[request.leaveType]}`}>
          <span aria-hidden="true" className={styles.swatch} />
          {LEAVE_TYPE_LABELS[request.leaveType]}
        </span>
        <p className={styles.dates}>{formatShortRange(request.start, request.end)}</p>
        <div className={styles.meta}>
          <span className={styles.metaLabel}>Length </span>
          <strong>{pluralDays(request.days, 'working day')}</strong>
        </div>
      </div>

      {request.note && (
        <div className={styles.noteBlock}>
          <h3 className={styles.noteTitle}>{firstName}’s note</h3>
          <p className={styles.note}>{request.note}</p>
        </div>
      )}

      <TextArea
        label={`Note to ${firstName}`}
        value={note}
        max={300}
        placeholder="Sent with your decision — suggest other dates if you reject"
        onChange={setNote}
      />

      <div className={styles.actions}>
        <Button label="Reject" variant="danger" full disabled={submitting} onClick={() => decide('Rejected')} />
        <Button label="Approve" full disabled={submitting} onClick={() => decide('Approved')} />
      </div>
    </article>
  );
};

export default ReviewPanel;
