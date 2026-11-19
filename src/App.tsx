import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import type { FC } from 'react';
import { Navigate, Route } from 'react-router-dom';

import Employee from './pages/Employee/Employee';
import Home from './pages/Home/Home';
import Supervisor from './pages/Supervisor/Supervisor';

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

const App: FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/home" element={<Home />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/supervisor" element={<Supervisor />} />
        <Route path="/" element={<Navigate to="/home" replace />} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
