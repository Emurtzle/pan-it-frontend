import React, { Component, PureComponent } from 'react'
import 'react-bulma-components/dist/react-bulma-components.min.css'
import 'bulma-calendar/dist/css/bulma-calendar.min.css'
import bulmaCalendar from 'bulma-calendar/dist/js/bulma-calendar.min.js'
import { Container, Form, Button } from 'react-bulma-components'
import { NavLink } from 'react-router-dom'


class Signup extends Component {
  constructor() {
    super()

    this.state = {
      username: '',
      password: '',
    }
  }


  handleChange = (ev) => {
    const value = ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value
    this.setState({[ev.target.name]: value})
  }

  handleSubmit = (ev) => {
    //post to user database
      fetch('https://makeup-directory-backebd.herokuapp.com/users', {
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
      .then(r => r.json())
      .then(json => {
        console.log(json)
        localStorage.setItem('UserID', json.user.id);
        localStorage.setItem('Token', json.jwt);
        localStorage.setItem('UserName', json.user.name);
        this.handleCollection()
      })
      //store the token in local storage
  }

  handleCollection = (ev) => {
    fetch('https://makeup-directory-backebd.herokuapp.com/collections', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('Token')}`
    },
    body: JSON.stringify({
      collection: {
        user_id: localStorage.getItem("UserID")
      }
    })
  })
    .then(r => r.json())
    .then(json => {
      localStorage.setItem('CollectionID', json.id);
      this.props.setLogIn()
      window.location.href = "/"

    })
  }

  render() {
    const { username, password } = this.state

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
            <Button onClick={this.handleSubmit} color="primary">Signup</Button>
        </Form.Field>

      </Container>
    )
  }
}


export default Signup;
