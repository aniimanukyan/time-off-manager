import { IonInfiniteScroll, IonInfiniteScrollContent, type InfiniteScrollCustomEvent } from '@ionic/react';
import type { FC } from 'react';

import styles from './ListPager.module.scss';

type ListPagerProps = {
  total: number;
  shown: number;
  noun?: string;
  onLoadMore?: () => void;
};

const getStatusText = (total: number, visible: number, noun: string): string => {
  if (total === 0) return `No ${noun}`;
  if (visible < total) return `${visible} of ${total} ${noun}`;
  return `That’s all · ${total} ${noun}`;
};

const ListPager: FC<ListPagerProps> = ({ total, shown, noun = 'requests', onLoadMore }) => {
  const visible = Math.min(shown, total);
  const hasMore = visible < total;
  const text = getStatusText(total, visible, noun);

  const handleInfinite = (e: InfiniteScrollCustomEvent) => {
    onLoadMore?.();
    void e.target.complete();
  };

  return (
    <div className={styles.pager}>
      <p aria-live="polite" className={styles.status}>
        {text}
      </p>
      <IonInfiniteScroll disabled={!hasMore} onIonInfinite={handleInfinite}>
        <IonInfiniteScrollContent loadingSpinner="crescent" loadingText={`Loading more ${noun}…`} />
      </IonInfiniteScroll>
    </div>
  );
};

export default ListPager;
