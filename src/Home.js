import React, { Component, Fragment } from 'react';
import NavigationBar from './Containers/NavigationBar'
import NewItemForm from './Containers/NewItemForm'
import Collection from './Containers/Collection'
import Content from './Containers/Content'
import Login from './Containers/Login'
import Signup from './Containers/Signup'
import { BrowserRouter as Router, Route } from 'react-router-dom';


import { Columns, Container, Button } from 'react-bulma-components'
import 'react-bulma-components/dist/react-bulma-components.min.css'

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            addItemFormOpen: false,
            activeTile: "",
            loggedIn: false
          }
    }

    componentDidMount() {
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
        let loggedIn = this.props.loggedIn
        return (
            <Fragment>
                {loggedIn && (
                    <Columns >
                        <Columns.Column size="half" >
                            <Collection sendToContent={this.sendToContent}/>
                        </Columns.Column>

                        <Columns.Column size="half">
                            <Content activeTile={this.state.activeTile}/>
                        </Columns.Column>
                    </Columns>
                )}

                {!loggedIn && (
                    <Fragment>
                        <Login setLogIn={this.props.setLogIn}/>
                    </Fragment>
                )}
            </Fragment>

        )
    }
}

export default Home;
