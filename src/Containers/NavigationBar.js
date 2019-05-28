import React, { Component } from 'react'
import 'react-bulma-components/dist/react-bulma-components.min.css'
import { Navbar, Button } from 'react-bulma-components'
import logo from '../icons/logo.png'

class NavigationBar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loggedIn: false
        }
    }

    handleLogOutClick = () => {
        this.props.setlogOut()
        localStorage.clear();
    }
    render() {
        return (
            <Navbar fixed={"top"} active={false} transparent={false} style={{background: '#400101'}}>

                <Navbar.Brand>
                    <Navbar.Item renderAs="a" href="/">
                        <img src={logo} alt="Panning Out Logo" width="30"/>
                    </Navbar.Item>
                    <Navbar.Burger />
                </Navbar.Brand>

                <Navbar.Menu>
                    <Navbar.Container>
                    {this.props.loggedIn && (
                        <Navbar.Item onClick={this.props.addItemToggle} style={{color: '#F2F1DC'}}>
                            Add Item
                        </Navbar.Item>
                    )}
                    </Navbar.Container>

                    <Navbar.Container position="end">
                        {this.props.loggedIn && (
                            <Navbar.Item href="/" onClick={this.handleLogOutClick} style={{color: '#F2F1DC'}}>Log out</Navbar.Item>
                        )}


                    </Navbar.Container>

                </Navbar.Menu>
            </Navbar>
        )
    }
}

export default NavigationBar;
