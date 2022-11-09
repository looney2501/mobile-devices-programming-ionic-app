/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';

import '@ionic/react/css/typography.css';
/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.scss';

/* Other imports */
import React from 'react'
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router';
import HotelHomePage from './pages/HotelHomePage';
import HotelProvider from './services/HotelProvider'
import HotelCreatePage from './pages/HotelCreatePage'

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <HotelProvider>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/" render={() => <Redirect to="/hotels" />} />
          <Route exact path="/hotels" component={HotelHomePage} />
          <Route path="/hotels/new" component={HotelCreatePage} />
        </IonRouterOutlet>
      </IonReactRouter>
    </HotelProvider>
  </IonApp>
);

export default App;
