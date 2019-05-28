import React, { Component, PureComponent } from 'react'
import 'react-bulma-components/dist/react-bulma-components.min.css'
import 'bulma-calendar/dist/css/bulma-calendar.min.css'
import bulmaCalendar from 'bulma-calendar/dist/js/bulma-calendar.min.js'
import { Container, Form, Button } from 'react-bulma-components'


class NewItemForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      makeup_type: '',
      rating: '',
      brand: "",
      name: "",
      notes: "",
      expiration: "",
      purchase_date: ""
    }

  }


  handleChange = (ev) => {
    const value = ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value
    this.setState({[ev.target.name]: value})
  }

  handleType = (ev) => {
    const value = ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value
    this.setState({[ev.target.name]: value})
  }

  handleExpiration = (newincrement) => {
    let increment = parseInt(newincrement)
    let year = parseInt(this.state.purchase_date.slice(0, 4))
    let month = parseInt(this.state.purchase_date.slice(5, 7))
    let day = parseInt(this.state.purchase_date.slice(8, 10))
    let monthsLeft = 12 - month
    let newMonth = ''
    let newYear = ''

    if (increment < 12) {
      if (increment < monthsLeft) {
        let newMonth = month + increment
        this.setExp(year, newMonth, day)
      } else {
        let newMonth = Math.round((month + increment/12))
        let newYear = year + 1
        console.log(newMonth)
        console.log(newYear)
        this.setExp(newYear, newMonth, day)
      }
    } else if (increment == 12) {
      let newYear = year + 1
      console.log(newYear)
      this.setExp(newYear, month, day)

    } else if (increment == 24) {
      let newYear = year + 2
      console.log(newYear)
      this.setExp(newYear, month, day)

    }
  }

  setExp(year, month, day) {
    let adjMonth = ''
    let adjDay = ''
    if (month < 10) {
      adjMonth = `0${month}`
    } else {
      adjMonth = month
    }
    if (day < 10) {
      adjDay = `0${day}`
    } else {
      adjDay = day
    }
    this.setState({
      expiration: `${year}/${adjMonth}/${adjDay}`
    }, () => {
      console.log(this.state)
      this.postItem()
    })
  }

  handleSubmit = (ev) => {

    this.setExpiration()

  }

  handleCancel = () => {
    this.props.toggle()
  }

  postItem() {
    let currentCollection = localStorage.getItem("CollectionID")

    fetch('https://makeup-directory-backebd.herokuapp.com/items', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${this.state.token}`
    },
    body: JSON.stringify({
      item: {
        collection_id: currentCollection,
        name: this.state.name,
        brand: this.state.brand,
        makeup_type: this.state.makeup_type,
        purchase_date: this.state.purchase_date,
        notes: this.state.notes,
        rating: this.state.rating,
        expiration: this.state.expiration
      }
    })
  })
    .then(r => r.json())
    .then(json => {
      this.props.toggle()
      console.log(json)
    })
  }

  setExpiration() {
    const sixMonth = ['liquid_eyeliner', 'cream_eyeshadow']
    const oneYear = ['bb_cc_cream', 'concealer', 'cream_contour', 'foundation', 'highlighter', 'lip_product', 'tinted_moisturizer'];
    const twoYear = ['blush','bronzer','powder_contour','eye_primer','eyebrow','pencil_eyeliner','powder_eyeshadow','face_primer','setting_powder','setting_spray'];
    if (this.state.makeup_type == 'mascara') {
      this.handleExpiration(4)

    } else if (sixMonth.includes(this.state.makeup_type)) {
      this.handleExpiration(6)
      console.log('hi')


    } else if (oneYear.includes(this.state.makeup_type)) {
      this.handleExpiration(12)
      console.log('hello')


    } else if (twoYear.includes(this.state.makeup_type)) {
      this.handleExpiration(24)
      console.log('kashjhagk')

    }
    console.log(this.state)
  }

  render() {
    const { makeup_type, name, brand, rating, purchase_date, notes, expiration } = this.state

    return (
      <Container fluid>
        <Form.Field>
          <Form.Control>
            <Form.Label>Type</Form.Label>
            <Form.Select onChange={this.handleType} name="makeup_type" value={makeup_type}>
              <option value="">Select</option>
              <option value="bb_cc_cream">BB & CC Cream</option>
              <option value="blush">Blush</option>
              <option value="bronzer">Bronzer</option>
              <option value="concealer">Concealer</option>
              <option value="cream_contour">Cream Contour</option>
              <option value="powder_contour">Powder Contour</option>
              <option value="eye_primer">Eye Primer</option>
              <option value="eyebrow">Eyebrow</option>
              <option value="liquid_eyeliner">Liquid Eyeliner</option>
              <option value="pencil_eyeliner">Pencil Eyeliner</option>
              <option value="cream_eyeshadow">Cream Eyeshadow</option>
              <option value="powder_eyeshadow">Powder Eyeshadow</option>
              <option value="face_primer">Face Primer</option>
              <option value="foundation">Foundation</option>
              <option value="highlighter">Highlighter</option>
              <option value="lip_product">Lip Product</option>
              <option value="mascara">Mascara</option>
              <option value="setting_powder">Setting Powder</option>
              <option value="setting_spray">Setting Spray</option>
              <option value="tinted_moisturizer">Tinted Moisturizer</option>
            </Form.Select>
          </Form.Control>
        </Form.Field>

        <Form.Field>
          <Form.Control>
            <Form.Label>Name</Form.Label>
            <Form.Input onChange={this.handleChange} name="name" type="text" placeholder="Name" value={name} />
          </Form.Control>
        </Form.Field>

        <Form.Field>
          <Form.Control>
            <Form.Label>Brand</Form.Label>
            <Form.Input onChange={this.handleChange} name="brand" type="text" placeholder="Brand" value={brand} />
          </Form.Control>
        </Form.Field>

        <Form.Field>
          <Form.Control>
            <Form.Label>Rating</Form.Label>
            <Form.Select onChange={this.handleChange} name="rating" value={rating}>
              <option value={""}>Select</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </Form.Select>
          </Form.Control>
        </Form.Field>

        <Form.Field>
          <Form.Control>
            <Form.Label>Purchase Date</Form.Label>
            <input  onChange={this.handleChange} value={purchase_date} name="purchase_date" type="date" ></input>
          </Form.Control>
        </Form.Field>

        <Form.Field>
          <Form.Label>Notes</Form.Label>
          <Form.Textarea onChange={this.handleChange} name="notes" value={notes} placeholder="Type Here" />
        </Form.Field>

        <Form.Field kind="group">
          <Form.Control >
            <Button onClick={this.handleSubmit} color="primary">Add To Collection</Button>
          </Form.Control>
          <Form.Control>
            <Button onClick={this.handleCancel} color="link">Cancel</Button>
          </Form.Control>
        </Form.Field>

      </Container>
    )
  }
}


export default NewItemForm;
