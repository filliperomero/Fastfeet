import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';
import Delivery from '~/pages/Delivery';
import DeliveryEdit from '~/pages/DeliveryEdit';
import DeliveryAdd from '~/pages/DeliveryAdd';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/deliveries" exact component={Delivery} isPrivate />
      <Route
        path="/delivery/edit/:id"
        exact
        component={DeliveryEdit}
        isPrivate
      />
      <Route path="/delivery/add" exact component={DeliveryAdd} isPrivate />
    </Switch>
  );
}