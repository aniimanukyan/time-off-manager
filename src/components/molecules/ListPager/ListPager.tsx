import { IonInfiniteScroll, IonInfiniteScrollContent, type InfiniteScrollCustomEvent } from '@ionic/react';
import type { FC } from 'react';

import styles from './ListPager.module.scss';

type ListPagerProps = {
  total: number;
  shown: number;
  onLoadMore?: () => void | Promise<void>;
};

const ListPager: FC<ListPagerProps> = ({ total, shown, onLoadMore }) => {
  const hasMore = shown < total;

  const handleInfinite = async (e: InfiniteScrollCustomEvent) => {
    await onLoadMore?.();
    await e.target.complete();
  };

  return (
    <div className={styles.pager}>
      <p aria-live="polite" className={styles.status}>
        {hasMore ? `${shown} of ${total} requests` : `That’s all · ${total} requests`}
      </p>
      <IonInfiniteScroll disabled={!hasMore} onIonInfinite={handleInfinite}>
        <IonInfiniteScrollContent loadingSpinner="crescent" loadingText="Loading more…" />
      </IonInfiniteScroll>
    </div>
  );
};

export default ListPager;
