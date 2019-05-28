import React, { Component, Fragment } from 'react'
import { Container, Heading, Panel, Form, Tile } from 'react-bulma-components'
import 'react-bulma-components/dist/react-bulma-components.min.css'

import ItemCard from '../Components/ItemCard'
import Accordion from './Accordion'

class Collection extends Component {
    constructor(props) {
        super(props)

        this.state = {
            items: [],
            currentCollection: localStorage.getItem("CollectionID"),
            current_user: localStorage.getItem("UserID"),
            token: localStorage.getItem('Token'),
            tiles: []
        }

    }

    componentDidMount() {
      this.fetchItems()
    }

    loadTiles = () => {
        var temp = this.state.items.slice().map((item, index) => {
            return {
                category: item.makeup_type,
                item: item,
                active: false
            }
        })
        this.setState({tiles: temp})
    }

    displayAllTiles = () => {
        var temp = this.state.tiles.map((tile, index) => {
            return (
                <Fragment key={index}>
                    <ItemCard
                        item={tile.item}
                        active={tile.active}
                        selectTile= {this.selectTile}
                        sendToContent={this.props.sendToContent}
                        key={index}
                    />
                </Fragment>
            )
        })
        return temp
    }

    displayTiles = (category) => {
        var temp = this.state.tiles.filter(tile => tile.category.includes(category)).map((tile, index) => {
            return (
                <Fragment key={index}>
                    <ItemCard
                        item={tile.item}
                        active={tile.active}
                        selectTile= {this.selectTile}
                        sendToContent={this.props.sendToContent}
                        key={index}
                    />
                </Fragment>
            )
        })
        return temp
    }

    selectTile = (item) => {
        var tempTile = this.state.tiles.slice().find(tile => tile.item.name === item.name)
        var tempIndex = this.state.tiles.indexOf(tempTile)
        var tempArr = this.state.tiles.slice()
        for(var i = 0; i < tempArr.length; i++) {
            tempArr[i].active = false
        }
        tempArr[tempIndex].active = true
        this.setState({tiles: tempArr})
    }

    // fetchCollection() {
    //   //gotta send the token over
    //   fetch((`http://localhost:3000/collections/${this.state.current_user}`), {
    //     method: 'GET',
    //     headers: {
    //       Authorization: `Bearer ${this.state.token}`
    //     }
    //   })
    //   .then(response => response.json())
    //   .then(json => {
    //     console.log(json)
    //     console.log(this.state.currentCollection)
    //
    //     // localStorage['CollectionID'] = json.items[0].collection_id;
    //     this.fetchItems()
    //     })
    //
    // }

    fetchItems() {
      console.log('hi',localStorage.getItem('CollectionID'))
      
      fetch((`https://makeup-directory-backebd.herokuapp.com/items/${localStorage.getItem('CollectionID')}`), {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('Token')}`
        }
      })
      .then(response => response.json())
      .then(json => {
        this.setItems(json)
        this.loadTiles()
      })
      //pulling from database is working just need to publish to cards
    }

    setItems(items) {
      items.forEach(item => {
        this.state.items.push(item)
        this.setState({
          items: this.state.items
        })
      })
    }

    openTab = (ev) => {
        var tabs = document.getElementsByClassName("content-colTab")
        var tabLinks = document.getElementsByClassName("colTab")
        for (var i = 0; i < tabs.length; i++) {
            tabs[i].style.display = "none"
        }
        for (var i = 0; i < tabs.length; i++ ) {
            tabLinks[i].className = tabLinks[i].className.replace(" is-active", "")
        }
        document.getElementById(`${ev.target.id}-colTab`).style.display = ""
        ev.target.parentNode.className += " is-active"
    }

    render() {
        return (
            <Container fluid style={{background: '#FF7C60'}}>
                <Heading className={"has-text-centered"} size={2} style={{color: '#F2F1DC'}}>{localStorage.getItem('UserName')}'s Directory</Heading>

                <Accordion >
                    <div label='All'>
                        <Tile kind="ancestor" vertical>
                            <Tile size={12} vertical kind="parent">
                                {this.displayAllTiles()}
                            </Tile>
                        </Tile>
                    </div>
                    <div label='BB and CC Cream'>
                        <Tile kind="ancestor" vertical>
                            <Tile size={12} vertical kind="parent">
                                {this.displayTiles("bb_cc_cream")}
                            </Tile>
                        </Tile>
                    </div>
                    <div label='Blush'>
                        <Tile kind="ancestor" vertical>
                            <Tile size={12} vertical kind="parent">
                                {this.displayTiles("blush")}
                            </Tile>
                        </Tile>
                    </div>
                    <div label='Bronzer'>
                        <Tile kind="ancestor" vertical>
                            <Tile size={12} vertical kind="parent">
                                {this.displayTiles("bronzer")}
                            </Tile>
                        </Tile>
                    </div>
                    <div label='Concealer'>
                        <Tile kind="ancestor" vertical>
                            <Tile size={12} vertical kind="parent">
                                {this.displayTiles("concealer")}
                            </Tile>
                        </Tile>
                    </div>
                    <div label='Contour'>
                        <Tile kind="ancestor" vertical>
                            <Tile size={12} vertical kind="parent">
                                {this.displayTiles("contour")}
                            </Tile>
                        </Tile>
                    </div>
                    <div label='Eye Primer'>
                        <Tile kind="ancestor" vertical>
                            <Tile size={12} vertical kind="parent">
                                {this.displayTiles("eye_primer")}
                            </Tile>
                        </Tile>
                    </div>
                    <div label='Eyebrow'>
                         <Tile kind="ancestor" vertical>
                            <Tile size={12} vertical kind="parent">
                                {this.displayTiles("eyebrow")}
                            </Tile>
                        </Tile>
                    </div>
                    <div label='Eyeliner'>
                         <Tile kind="ancestor" vertical>
                            <Tile size={12} vertical kind="parent">
                                {this.displayTiles("eyeliner")}
                            </Tile>
                        </Tile>
                    </div>
                    <div label='Eyeshadow'>
                         <Tile kind="ancestor" vertical>
                            <Tile size={12} vertical kind="parent">
                                {this.displayTiles("eyeshadow")}
                            </Tile>
                        </Tile>
                    </div>
                    <div label='Face Primer'>
                         <Tile kind="ancestor" vertical>
                            <Tile size={12} vertical kind="parent">
                                {this.displayTiles("face_primer")}
                            </Tile>
                        </Tile>
                    </div>
                    <div label='False Eyelashes'>
                         <Tile kind="ancestor" vertical>
                            <Tile size={12} vertical kind="parent">
                                {this.displayTiles("false_eyelashes")}
                            </Tile>
                        </Tile>
                    </div>
                    <div label='Foundation'>
                         <Tile kind="ancestor" vertical>
                            <Tile size={12} vertical kind="parent">
                                {this.displayTiles("foundation")}
                            </Tile>
                        </Tile>

                    </div>
                    <div label='Highlighter'>
                         <Tile kind="ancestor" vertical>
                            <Tile size={12} vertical kind="parent">
                                {this.displayTiles("highlighter")}
                            </Tile>
                        </Tile>
                    </div>
                    <div label='Lips'>
                         <Tile kind="ancestor" vertical>
                            <Tile size={12} vertical kind="parent">
                                {this.displayTiles("lips")}
                            </Tile>
                        </Tile>
                    </div>
                    <div label='Mascara'>
                         <Tile kind="ancestor" vertical>
                            <Tile size={12} vertical kind="parent">
                                {this.displayTiles("mascara")}
                            </Tile>
                        </Tile>

                    </div>
                    <div label='Setting Powder'>
                         <Tile kind="ancestor" vertical>
                            <Tile size={12} vertical kind="parent">
                                {this.displayTiles("setting_powder")}
                            </Tile>
                        </Tile>

                    </div>
                    <div label='Setting Spray'>
                         <Tile kind="ancestor" vertical>
                            <Tile size={12} vertical kind="parent">
                                {this.displayTiles("setting_spray")}
                            </Tile>
                        </Tile>

                    </div>
                    <div label='Tined Moisturizer'>
                         <Tile kind="ancestor" vertical>
                            <Tile size={12} vertical kind="parent">
                                {this.displayTiles("tinted_moisturizer")}
                            </Tile>
                        </Tile>
                    </div>
                </Accordion>
            </Container>
        )
    }
}

export default Collection;
