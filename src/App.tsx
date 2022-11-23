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
import HotelHomePage from './components/hotel/HotelHomePage';
import HotelProvider from './services/hotel/HotelProvider'
import HotelCreatePage from './components/hotel/HotelCreatePage'
import { Login } from './components/auth/Login'
import { PrivateRoute } from './components/auth/PrivateRoute'
import AuthProvider from './services/auth/AuthProvider'

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <AuthProvider>
          <Route path="/login" component={Login} exact={true} />
          <HotelProvider>
            <PrivateRoute exact path="/hotels" component={HotelHomePage} />
            <PrivateRoute path="/hotels/new" component={HotelCreatePage} />
          </HotelProvider>
          <Route exact path="/" render={() => <Redirect to="/hotels" />} />
        </AuthProvider>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
