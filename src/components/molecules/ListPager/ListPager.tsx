import { IonInfiniteScroll, IonInfiniteScrollContent, type InfiniteScrollCustomEvent } from '@ionic/react';

import styles from './ListPager.module.scss';

type ListPagerProps = {
  total: number;
  shown: number;
  noun?: string;
  onLoadMore?: () => void;
};

const ListPager: React.FC<ListPagerProps> = ({ total, shown, noun = 'requests', onLoadMore }) => {
  const visible = Math.min(shown, total);
  const hasMore = visible < total;

  let text: string;
  if (total === 0) text = `No ${noun}`;
  else if (hasMore) text = `${visible} of ${total} ${noun}`;
  else text = `That’s all · ${total} ${noun}`;

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
