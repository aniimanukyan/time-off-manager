import { IonBadge, IonIcon, IonLabel, IonTabButton } from '@ionic/react';
import { calendarOutline, checkboxOutline, sunnyOutline } from 'ionicons/icons';
import type { FC } from 'react';

import styles from './NavItem.module.scss';

type NavIcon = 'timeoff' | 'approvals' | 'calendar';

type NavItemProps = {
  label: string;
  icon: NavIcon;
  tab: string;
  href: string;
  active?: boolean;
  badge?: number;
  onClick?: React.ComponentProps<typeof IonTabButton>['onClick'];
};

const ICONS: Record<NavIcon, string> = {
  timeoff: sunnyOutline,
  approvals: checkboxOutline,
  calendar: calendarOutline,
};

const NavItem: FC<NavItemProps> & { isTabButton?: boolean } = ({
  label,
  icon,
  tab,
  href,
  active = false,
  badge = 0,
  onClick,
}) => (
  <IonTabButton tab={tab} href={href} selected={active} className={styles.tab} onClick={onClick}>
    <IonIcon aria-hidden="true" icon={ICONS[icon]} />
    <IonLabel>{label}</IonLabel>
    {badge > 0 && (
      <IonBadge color="notification" className={styles.badge}>
        {badge}
      </IonBadge>
    )}
  </IonTabButton>
);

NavItem.isTabButton = true;

export default NavItem;
