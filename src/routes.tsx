import React from 'react';
import { Switch, Route } from 'react-router-dom';

import TableWithCheckbox from '@yolo/pages/TableWithCheckbox';

function routes() {
  return (
    <Switch>
      <Route exact path="/tableWithCheckbox">
        <TableWithCheckbox />
      </Route>
    </Switch>
  );
}

export default routes;
