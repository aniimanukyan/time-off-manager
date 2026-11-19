import { IonItem } from '@ionic/react';

import { LEAVE_TYPE_COLORS, type LeaveType, type RequestStatus } from '../../../types/timeOff';
import { Avatar, StatusBadge } from '../../atoms';

import styles from './ListItem.module.scss';

type ListItemExtraTone = 'heavy' | 'some' | 'none';

type ListItemData = {
  id: string;
  title: string;
  leaveType: LeaveType;
  dates: string;
  days: string;
  status: RequestStatus;
  initials?: string;
  note?: string;
  extra?: string;
  extraTone?: ListItemExtraTone;
};

type ListItemProps = {
  item: ListItemData;
  onSelect?: (id: string) => void;
};

const EXTRA_COLOR: Record<ListItemExtraTone, string> = {
  heavy: 'coverage',
  some: 'pending',
  none: 'cancelled',
};

const ListItem: React.FC<ListItemProps> = ({ item, onSelect }) => (
  <IonItem
    button={!!onSelect}
    detail={false}
    lines="none"
    className={styles.row}
    onClick={onSelect ? () => onSelect(item.id) : undefined}
  >
    <div className={styles.content}>
      {item.initials ? (
        <Avatar initials={item.initials} />
      ) : (
        <span aria-hidden="true" className={`${styles.swatch} ion-color-${LEAVE_TYPE_COLORS[item.leaveType]}`}>
          <span className={styles.swatchDot} />
        </span>
      )}
      <span className={styles.body}>
        <span className={styles.title}>{item.title}</span>
        <span className={styles.meta}>
          {item.dates} · {item.days}
        </span>
        {item.extra && (
          <span title={item.extra} className={`${styles.extra} ion-color-${EXTRA_COLOR[item.extraTone ?? 'none']}`}>
            {item.extra}
          </span>
        )}
        {item.note && (
          <span title={item.note} className={styles.note}>
            {item.note}
          </span>
        )}
      </span>
      <StatusBadge status={item.status} />
    </div>
  </IonItem>
);

export default ListItem;
