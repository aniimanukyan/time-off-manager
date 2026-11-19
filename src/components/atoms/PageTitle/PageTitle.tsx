import type { FC } from 'react';

import styles from './PageTitle.module.scss';

type PageTitleProps = {
  title: string;
  level?: 1 | 2;
  id?: string;
};

const PageTitle: FC<PageTitleProps> = ({ title, level = 1, id }) => {
  const Heading = level === 1 ? 'h1' : 'h2';

  return (
    <Heading id={id} className={`${styles.title} ${level === 2 ? styles.level2 : ''}`}>
      {title}
    </Heading>
  );
};

export default PageTitle;
