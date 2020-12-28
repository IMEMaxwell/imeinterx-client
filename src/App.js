import React from 'react';
import {BrowserRouter as Router,Route} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from "./components/navbar.component"
import TicketsList from "./components/tickets-list.component";
import EditTicket from "./components/edit-ticket.component";
import CreateTicket from "./components/create-ticket.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar/>
        <br/>
        <Route path="/" exact component={TicketsList}/>
        <Route path="/edit/:id" exact component={EditTicket}/>
        <Route path="/create" exact component={CreateTicket}/>
        <Route path="/user" exact component={CreateUser}/>
      </div>
    </Router>
  );
}

export default App;
