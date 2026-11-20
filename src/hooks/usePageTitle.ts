import { useIonViewWillEnter } from '@ionic/react';

export const usePageTitle = (title: string): void =>
  useIonViewWillEnter(() => {
    document.title = `${title} · Time Off Manager`;
  });
