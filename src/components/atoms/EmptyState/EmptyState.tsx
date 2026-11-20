import type { FC } from 'react';

import styles from './EmptyState.module.scss';

type EmptyStateProps = {
  title: string;
  text?: string;
};

const EmptyState: FC<EmptyStateProps> = ({ title, text }) => (
  <div className={styles.empty}>
    <p className={styles.title}>{title}</p>
    {text && <p className={styles.text}>{text}</p>}
  </div>
);

export default EmptyState;
