import React, { Component, PureComponent } from 'react'
import 'react-bulma-components/dist/react-bulma-components.min.css'
import 'bulma-calendar/dist/css/bulma-calendar.min.css'
import bulmaCalendar from 'bulma-calendar/dist/js/bulma-calendar.min.js'
import { Container, Form, Button } from 'react-bulma-components'
import { NavLink } from 'react-router-dom'


class Login extends Component {
  constructor() {
    super()

    this.state = {
      username: '',
      password: '',
      hasTyped: false
    }
  }


  handleChange = (ev) => {
    const value = ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value
    this.setState({[ev.target.name]: value})
    this.setState({hasTyped: true})
  }

  // get auth from user profiles on backend
  handleSubmit = (ev) => {
    //post to user database
      fetch('https://makeup-directory-backebd.herokuapp.com/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        user: {
          name: this.state.username,
          password: this.state.password,
          }
        })
      })
      .then(response => response.json())
      .then(json => {
        localStorage.setItem('UserID', json.user.id);
        localStorage.setItem('Token', json.token);
        localStorage.setItem('UserName', json.user.name);
      })
      .then(()=> {
        this.fetchCollection()
      })
  }

  fetchCollection() {
    //gotta send the token over
    fetch((`https://makeup-directory-backebd.herokuapp.com/collections/${localStorage.getItem('UserID')}`), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('Token')}`
      }
    })
    .then(response => response.json())
    .then(json => {
      localStorage['CollectionID'] = json.items[0].collection_id;
      this.props.setLogIn();

      })


  }


  render() {
    const { username, password } = this.state
    if (!this.state.hasTyped) {
      window.alert("Would you like to test PanIt out? Try Username: Emily and Password: Emily")
    }
    return (
      <Container fluid>

      <Form.Field>
        <Form.Label>Username</Form.Label>
        <Form.Input onChange={this.handleChange} name="username" value={username} placeholder="Type Username Here" />
      </Form.Field>


        <Form.Field>
          <Form.Label>Password</Form.Label>
          <Form.Input onChange={this.handleChange} name="password" value={password} placeholder="Type Password Here" />
        </Form.Field>

        <Form.Field >
          <Button onClick={this.handleSubmit} color="primary">Login</Button>
        </Form.Field>

        <Form.Field>
          <NavLink to="/signup"><Button>Signup</Button></NavLink>
        </Form.Field>

      </Container>
    )
  }
}


export default Login;
