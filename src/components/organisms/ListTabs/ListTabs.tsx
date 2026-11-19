import { IonSpinner } from '@ionic/react';
import { useCallback, useEffect, useImperativeHandle, useState, type FC, type Ref } from 'react';

import { fetchList } from '../../../data/lists';
import type { Page } from '../../../types/pagination';
import type { AnyRequest, Segment } from '../../../types/timeOff';
import { EmptyState, SegmentedControl } from '../../atoms';
import { ListItem, ListPager } from '../../molecules';

import styles from './ListTabs.module.scss';

export type Tab = {
  segment: Segment;
  label: string;
  emptyTitle: string;
  emptyText?: string;
};

export type ListTabsHandle = {
  prepend: (segment: Segment, item: AnyRequest) => void;
};

type ListTabsProps = {
  ariaLabel: string;
  tabs: Tab[];
  ref?: Ref<ListTabsHandle>;
};

const ListTabs: FC<ListTabsProps> = ({ ariaLabel, tabs, ref }) => {
  const [active, setActive] = useState(tabs[0].segment);
  const [pages, setPages] = useState<Partial<Record<Segment, Page>>>({});
  const page = pages[active];
  const tab = tabs.find((t) => t.segment === active);

  const load = useCallback(
    (segment: Segment) => {
      const offset = pages[segment]?.items.length ?? 0;
      return fetchList(segment, offset).then((next) =>
        setPages((prev) => ({
          ...prev,
          [segment]: offset ? { ...next, items: [...(prev[segment]?.items ?? []), ...next.items] } : next,
        })),
      );
    },
    [pages],
  );

  useEffect(() => {
    if (!page) load(active);
  }, [active, page, load]);

  useImperativeHandle(ref, () => ({
    prepend: (segment, item) =>
      setPages((prev) => {
        const current = prev[segment];
        return current ? { ...prev, [segment]: { items: [item, ...current.items], total: current.total + 1 } } : prev;
      }),
  }));

  return (
    <div className={styles.tabs}>
      <SegmentedControl
        ariaLabel={ariaLabel}
        value={active}
        onChange={setActive}
        options={tabs.map(({ segment, label }) => ({
          value: segment,
          label: pages[segment] ? `${label} · ${pages[segment].total}` : label,
        }))}
      />

      <div className={styles.panel}>
        {!page ? (
          <IonSpinner aria-label="Loading requests" className={styles.spinner} />
        ) : page.items.length === 0 ? (
          <EmptyState title={tab?.emptyTitle ?? ''} text={tab?.emptyText} />
        ) : (
          <>
            <ul aria-label={`${tab?.label} requests`} className={styles.list}>
              {page.items.map((request) => (
                <li key={request.id}>
                  <ListItem request={request} />
                </li>
              ))}
            </ul>
            <ListPager key={active} total={page.total} shown={page.items.length} onLoadMore={() => load(active)} />
          </>
        )}
      </div>
    </div>
  );
};

export default ListTabs;
