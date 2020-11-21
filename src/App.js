import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import Home from './Components/Home.js';
import AddPlace from './Components/AddPlace.js';
import AddReview from './Components/AddReview.js'
import './App.css';

function App() {
  return (
     <BrowserRouter>
      <Switch>
        <Route exact path='/mynearbyplaces/' render={props => <Home {...props}/>}/>
        <Route path='/addplace'>
          <AddPlace />
        </Route>
        <Route path='/addreview' render={props => <AddReview {...props}/>}/>
      </Switch>
     </BrowserRouter>
  );
}

export default App;
