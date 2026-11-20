import { IonItem } from '@ionic/react';
import type { FC } from 'react';

import { LEAVE_TYPE_COLORS, LEAVE_TYPE_LABELS, type LeaveRequest } from '../../../types/timeOff';
import { formatShortRange, pluralDays } from '../../../utils/dates';
import { toInitials } from '../../../utils/names';
import { Avatar, StatusBadge } from '../../atoms';

import styles from './ListItem.module.scss';

type ListItemProps = LeaveRequest & {
  onSelect?: (request: LeaveRequest) => void;
};

const getNote = (request: LeaveRequest) => (request.decision ? `“${request.decision}”` : undefined);

const ListItem: FC<ListItemProps> = ({ onSelect, ...request }) => {
  const employee = 'employee' in request ? request.employee : undefined;
  const typeLabel = LEAVE_TYPE_LABELS[request.leaveType];
  const typeColor = `ion-color-${LEAVE_TYPE_COLORS[request.leaveType]}`;
  const note = getNote(request);

  return (
    <IonItem
      button={!!onSelect}
      detail={false}
      lines="none"
      className={styles.row}
      onClick={onSelect ? () => onSelect(request) : undefined}
    >
      <div className={styles.content}>
        {employee ? (
          <Avatar initials={toInitials(employee)} />
        ) : (
          <span aria-hidden="true" className={`${styles.swatch} ${typeColor}`}>
            <span className={styles.dot} />
          </span>
        )}
        <span className={styles.body}>
          <span className={styles.title}>{employee ?? typeLabel}</span>
          <span className={styles.meta}>
            {formatShortRange(request.start, request.end)} · {pluralDays(request.days)}
          </span>
          {employee && <span className={`${styles.typeTag} ${typeColor}`}>{typeLabel}</span>}
          {note && (
            <span title={note} className={styles.note}>
              {note}
            </span>
          )}
        </span>
        <StatusBadge status={request.status} />
      </div>
    </IonItem>
  );
};

export default ListItem;
