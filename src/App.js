import React, { Component } from 'react';
import Home from './Home'
import NavigationBar from './Containers/NavigationBar'
import NewItemForm from './Containers/NewItemForm'
import Collection from './Containers/Collection'
import Content from './Containers/Content'
import Login from './Containers/Login'
import Signup from './Containers/Signup'

import { BrowserRouter as Router, Route } from 'react-router-dom';


import { Columns, Container, Button } from 'react-bulma-components'
import 'react-bulma-components/dist/react-bulma-components.min.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      addItemFormOpen: false,
      activeTile: "",
      loggedIn: false
    }
  }

  componentDidMount() {
    if (!localStorage.getItem('UserID')) {
        this.setState({loggedIn: false})
    } else {
        this.setState({loggedIn: true})
    }
  }

  setLogIn = () => {
    this.setState({loggedIn: true})

}

  setLogOut = () => {
      this.setState({loggedIn: false})
  }


  sendToContent = (tile) => {
    this.setState({activeTile: tile})
  }

  handleAddItemButton = () => {
    this.toggleAddItemForm();
  }

  toggleAddItemForm = () => {
    if (this.state.addItemFormOpen === false) {
      this.setState({addItemFormOpen: true})
    } else if (this.state.addItemFormOpen === true) {
      this.setState({addItemFormOpen: false})
    }
  }

  render() {
    const addItemToggle= this.state.addItemFormOpen;
    let loggedIn = this.state.loggedIn
    return (
      <Container fluid >
        <NavigationBar setLogIn={this.setLogIn} setlogOut={this.setLogOut} loggedIn={loggedIn} addItemToggle={this.handleAddItemButton}/>
        <br/>
        {addItemToggle ? <NewItemForm toggle={this.toggleAddItemForm}/> : null}
        <br/>
        <Router>
          <Route exact path="/" component={() => <Home loggedIn={loggedIn} setLogIn={this.setLogIn}/>} />
          <Route exact path='/signup' component={() => <Signup setLogIn={this.setLogIn}/>} />
          <Route exact path='/login' component={() => <Login />} />
        </Router>
      </Container>

    );
  }
}

export default App;
