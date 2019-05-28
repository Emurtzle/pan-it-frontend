import React, { Component, Fragment } from 'react'
import { Container, Heading, Panel, Form, Tabs, Button, Tile, Image } from 'react-bulma-components'
import 'react-bulma-components/dist/react-bulma-components.min.css'
import ItemCard from '../Components/ItemCard'

class Collection extends Component {
    constructor(props) {
        super(props)

        this.state ={
            items: [
                {
                    name: "Blue Eagle",
                    brand: "Aspire",
                    makeup_type: "eyeshadow",
                    expiration: "Tuesday",
                    rating: 4
                },
                {
                    name: "Sparkle Planet",
                    brand: "Lust Mechanic",
                    makeup_type: "eyeliner",
                    expiration: "Next Month",
                    rating: 3
                },
                {
                    name: "Butterfly Dust",
                    brand: "Lust Mechanic",
                    makeup_type: "foundation",
                    expiration: "Next Week",
                    rating: 5
                },
                {
                    name: "City Nights",
                    brand: "Sephora",
                    makeup_type: "concealer",
                    expiration: "Tomorrow",
                    rating: 2
                },
                {
                    name: "Spring Days",
                    brand: "Ulta",
                    makeup_type: "lip",
                    expiration: "Thursday",
                    rating: 1
                },
                {
                    name: "Nightclub",
                    brand: "Cover Girl",
                    makeup_type: "mascara",
                    expiration: "now",
                    rating: 5
                }
            ],
            query: ""
        }
    }

    loadAllItems = () => {
        return this.state.items.map((item, index) => (
            <ItemCard item={item} key={index} onClick={this.handleActiveTileChange}/>
        ))
    }

    loadItemCategory = (category) => {
        return this.state.items.filter((item) => item.makeup_type === category).map((item, index) => (
            <ItemCard item={item} key={index} onClick={this.handleActiveTileChange} />
        ))
    }

    handleActiveTileChange = (ev) => {

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

    handleSearch = (ev) => {
        this.setState({query: ev.target.value})
    }

    render() {
        return (
            <Container fluid className={"has-background-info"}>
                <Heading className={"has-text-centered has-text-white"}>Collection</Heading>
                
                <Panel >
                    <Panel.Block>
                        <Form.Control>
                            <Form.Input onChange={this.handleSearch} size="small" type="text" placeholder="Search" value={this.state.query} />
                        </Form.Control>
                    </Panel.Block>

                    <Panel.Tabs>
                        <Panel.Tabs.Tab active>All</Panel.Tabs.Tab>
                        <Panel.Tabs.Tab>Favorites</Panel.Tabs.Tab>
                    </Panel.Tabs>
                </Panel>
                <Tabs>
                    <Tabs.Tab className="colTab all is-active" id="all" onClick={this.openTab}>
                        All
                    </Tabs.Tab>
                    <Tabs.Tab className="colTab all" id="bb_and_cc_Cream" onClick={this.openTab}>
                        BB and CC Cream
                    </Tabs.Tab>
                    <Tabs.Tab className="colTab all" id="blush" onClick={this.openTab}>
                        Blush
                    </Tabs.Tab>
                    <Tabs.Tab className="colTab all" id="Bronzer" onClick={this.openTab}>
                        Bronzer
                    </Tabs.Tab>
                    <Tabs.Tab className="colTab all" id="Concealer" onClick={this.openTab}>
                        Concealer
                    </Tabs.Tab>
                    <Tabs.Tab className="colTab all" id="Contour" onClick={this.openTab}>
                        Contour
                    </Tabs.Tab>
                    <Tabs.Tab className="colTab all" id="eye_primer" onClick={this.openTab}>
                        Eye Primer
                    </Tabs.Tab>
                    <Tabs.Tab className="colTab all" id="eyebrow" onClick={this.openTab}>
                        Eyebrow
                    </Tabs.Tab>
                    <Tabs.Tab className="colTab all" id="eyeliner" onClick={this.openTab}>
                        Eyeliner
                    </Tabs.Tab>
                    <Tabs.Tab className="colTab all" id="eyeshadow" onClick={this.openTab}>
                        Eyeshadow
                    </Tabs.Tab>
                    <Tabs.Tab className="colTab all" id="face_primer" onClick={this.openTab}>
                        Face Primer
                    </Tabs.Tab>
                    <Tabs.Tab className="colTab all" id="false_eyelashes" onClick={this.openTab}>
                        False Eyelashes
                    </Tabs.Tab>
                    <Tabs.Tab className="colTab all" id="foundation" onClick={this.openTab}>
                        Foundation
                    </Tabs.Tab>
                    <Tabs.Tab className="colTab all" id="highlighter" onClick={this.openTab}>
                        Highlighter
                    </Tabs.Tab>
                    <Tabs.Tab className="colTab all" id="lips" onClick={this.openTab}>
                        Lipstick/Stain/Gloss/Etc.
                    </Tabs.Tab>
                    <Tabs.Tab className="colTab all" id="mascara" onClick={this.openTab}>
                        Mascara
                    </Tabs.Tab>
                    <Tabs.Tab className="colTab all" id="setting_powder" onClick={this.openTab}>
                    Setting Powder
                    </Tabs.Tab>
                    <Tabs.Tab className="colTab all" id="setting_spray" onClick={this.openTab}>
                        Setting Spray
                    </Tabs.Tab>
                    <Tabs.Tab className="colTab all" id="tinted_moisturizer" onClick={this.openTab}>
                        Tinted Moisturizer
                    </Tabs.Tab>
                </Tabs>

                    <Container fluid className="content-colTab all" id="all-colTab">
                        {this.loadAllItems()}
                    </Container>
                    <Container fluid className="content-colTab all" id="bb_and_cc_Cream-colTab"  style={{display: "none"}}>
                        {this.loadItemCategory("bb_cc_cream")}
                    </Container>
                    <Container fluid className="content-colTab all" id="blush-colTab" style={{display: "none"}}>
                        {this.loadItemCategory("blush")}
                    </Container>
                    <Container fluid className="content-colTab all" id="Bronzer-colTab" style={{display: "none"}}>
                        {this.loadItemCategory("bronzer")}
                    </Container>
                    <Container fluid className="content-colTab all" id="Concealer-colTab" style={{display: "none"}}>
                        {this.loadItemCategory("concealer")}
                    </Container>
                    <Container fluid className="content-colTab all" id="Contour-colTab" style={{display: "none"}}>
                        {this.loadItemCategory("contour")}
                    </Container>
                    <Container fluid className="content-colTab all" id="eye_primer-colTab" style={{display: "none"}}>
                        {this.loadItemCategory("eye_primer")}
                    </Container>
                    <Container fluid className="content-colTab all" id="eyebrow-colTab" style={{display: "none"}}>
                        {this.loadItemCategory("eyebrow")}
                    </Container>
                    <Container fluid className="content-colTab all" id="eyeliner-colTab" style={{display: "none"}}>
                        {this.loadItemCategory("eyeliner")}
                    </Container>
                    <Container fluid className="content-colTab all" id="eyeshadow-colTab" style={{display: "none"}}>
                        {this.loadItemCategory("eyeshadow")}
                    </Container>
                    <Container fluid className="content-colTab all" id="face_primer-colTab" style={{display: "none"}}>
                        {this.loadItemCategory("face_primer")}
                    </Container>
                    <Container fluid className="content-colTab all" id="false_eyelashes-colTab" style={{display: "none"}}>
                        {this.loadItemCategory("false_eyelashes")}
                    </Container>
                    <Container fluid className="content-colTab all" id="foundation-colTab" style={{display: "none"}}>
                        {this.loadItemCategory("foundation")}
                    </Container>
                    <Container fluid className="content-colTab all" id="highlighter-colTab" style={{display: "none"}}>
                        {this.loadItemCategory("highlighter")}
                    </Container>
                    <Container fluid className="content-colTab all" id="lips-colTab" style={{display: "none"}}>
                        {this.loadItemCategory("lips")}
                    </Container>
                    <Container fluid className="content-colTab all" id="mascara-colTab" style={{display: "none"}}>
                        {this.loadItemCategory("mascara")}
                    </Container>
                    <Container fluid className="content-colTab all" id="setting_powder-colTab" style={{display: "none"}}>
                        {this.loadItemCategory("setting_powder")}
                    </Container>
                    <Container fluid className="content-colTab all" id="setting_spray-colTab" style={{display: "none"}}>
                        {this.loadItemCategory("setting_spray")}
                    </Container>
                    <Container fluid className="content-colTab all" id="tinted_moisturizer-colTab" style={{display: "none"}}>
                        {this.loadItemCategory("tinted_moisturizer")}
                    </Container>



            </Container>
        )
    }
}

export default Collection;