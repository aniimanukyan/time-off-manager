import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import type { FC } from 'react';
import { Route } from 'react-router-dom';

import Employee from './pages/Employee/Employee';
import Home from './pages/Home/Home';
import Supervisor from './pages/Supervisor/Supervisor';
import { useSession } from './state/SessionContext';
import SessionProvider from './state/SessionProvider';
import TimeOffProvider from './state/TimeOffProvider';

import '@ionic/react/css/core.css';

import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import './theme/variables.scss';

setupIonicReact();

const AppRoutes: FC = () => {
  const { user } = useSession();

  return (
    <TimeOffProvider key={user.id}>
      <IonRouterOutlet>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={user.role === 'employee' ? <Employee /> : <Supervisor />} />
      </IonRouterOutlet>
    </TimeOffProvider>
  );
};

const App: FC = () => (
  <IonApp>
    <SessionProvider>
      <IonReactRouter>
        <AppRoutes />
      </IonReactRouter>
    </SessionProvider>
  </IonApp>
);

export default App;
