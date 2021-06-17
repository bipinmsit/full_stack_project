import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import "../node_modules/font-awesome/css/font-awesome.min.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./routes/Home";
import RestaurantsDetailPage from "./routes/RestaurantsDetailPage";
import "./index.css";
import RestaurantContextProvider from "./context/RestaurantContext";

const App = () => {
  return (
    <RestaurantContextProvider>
      <div className="container">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/restaurant/:id"
              component={RestaurantsDetailPage}
            />
          </Switch>
        </Router>
      </div>
    </RestaurantContextProvider>
  );
};

export default App;
