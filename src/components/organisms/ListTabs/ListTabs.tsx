import { IonSpinner } from '@ionic/react';
import { useEffect, useState, type FC } from 'react';

import type { Page } from '../../../types/pagination';
import type { LeaveRequest, Segment } from '../../../types/timeOff';
import { EmptyState, SegmentedControl } from '../../atoms';
import { ListItem, ListPager } from '../../molecules';

import styles from './ListTabs.module.scss';

export type Tab = {
  segment: Segment;
  label: string;
  page?: Page;
  emptyTitle: string;
  emptyText?: string;
  selectable?: boolean;
};

type ListTabsProps = {
  ariaLabel: string;
  tabs: Tab[];
  onLoad: (segment: Segment) => Promise<void>;
  onSelect?: (request: LeaveRequest) => void;
  paginated?: boolean;
};

const ListTabs: FC<ListTabsProps> = ({ ariaLabel, tabs, onLoad, onSelect, paginated }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const tab = tabs[activeIndex];
  const { segment: active, page } = tab;

  useEffect(() => {
    if (!page) {
      onLoad(active);
    }
  }, [active, page, onLoad]);

  return (
    <div className={styles.tabs}>
      <SegmentedControl
        ariaLabel={ariaLabel}
        value={active}
        onChange={(segment) => setActiveIndex(tabs.findIndex((item) => item.segment === segment))}
        options={tabs.map(({ segment, label, page }) => ({
          value: segment,
          label: page ? `${label} · ${page.total}` : label,
        }))}
      />

      <div role="tabpanel" aria-label={tab.label} aria-busy={!page} className={styles.panel}>
        {!page ? (
          <IonSpinner aria-label="Loading requests" className={styles.spinner} />
        ) : page.items.length === 0 ? (
          <EmptyState title={tab.emptyTitle} text={tab.emptyText} />
        ) : (
          <>
            <ul aria-label={`${tab.label} requests`} className={styles.list}>
              {page.items.map((request) => (
                <li key={request.id}>
                  <ListItem {...request} onSelect={tab.selectable ? onSelect : undefined} />
                </li>
              ))}
            </ul>
            {paginated && (
              <ListPager key={active} total={page.total} shown={page.items.length} onLoadMore={() => onLoad(active)} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ListTabs;
