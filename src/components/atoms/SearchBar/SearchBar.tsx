import { IonSearchbar } from '@ionic/react';
import type { FC } from 'react';

import styles from './SearchBar.module.scss';

type SearchBarProps = {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
};

const SearchBar: FC<SearchBarProps> = ({ value, placeholder = 'Search people' }) => (
  <IonSearchbar
    value={value}
    placeholder={placeholder}
    aria-label={placeholder}
    debounce={300}
    className={styles.search}
    onIonInput={() => {}}
  />
);

export default SearchBar;
