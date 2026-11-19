import type { FC, Ref } from 'react';

import styles from './PageTitle.module.scss';

type PageTitleProps = {
  title: string;
  level?: 1 | 2;
  id?: string;
  ref?: Ref<HTMLHeadingElement>;
};

const PageTitle: FC<PageTitleProps> = ({ title, level = 1, id, ref }) => {
  const Heading = level === 1 ? 'h1' : 'h2';

  return (
    <Heading
      ref={ref}
      id={id}
      tabIndex={ref ? -1 : undefined}
      className={`${styles.title} ${level === 2 ? styles.level2 : ''}`}
    >
      {title}
    </Heading>
  );
};

export default PageTitle;
