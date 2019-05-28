import React, { Component } from 'react'
import { Container, Heading, Tabs, Button } from 'react-bulma-components'
import 'react-bulma-components/dist/react-bulma-components.min.css'
import ContentCard from '../Components/ContentCard'



class Content extends Component {
    constructor(props) {
        super(props)

        this.state = {
            items: [],
            tiles: []
        }
    }

    componentDidUpdate() {
        if (this.props.activeTile) {
            this.fetchActive()
        }
    }

    fetchActive() {
      this.standardFetch('MakeupAddiction')
      this.standardFetch('MakeupAddicts')
      this.standardFetch('lookoftheday')
    }

    standardFetch(subreddit) {
      fetch(`https://www.reddit.com/r/${subreddit}/search.json?q=${this.props.activeTile.name}&restrict_sr=1`)
        .then(response => response.json())
        .then(items => {
            document.getElementById('ConContainer').innerHTML = ""
            for (var i = 0; i < items.data.children.length; i++) {
              if (items.data.children[i].data.thumbnail !== 'self') {


                var div = document.createElement('div')
                div.className = "tile is-parent is-vertical"
                div.style.backgroundColor = "#FF7C60"
                // div.style.border =

                var h1Title = document.createElement('h1')
                h1Title.className = "title is-5"
                h1Title.textContent = items.data.children[i].data.title

                var figure = document.createElement('figure')
                figure.className = 'image is-128x128'

                var image = document.createElement('img')
                image.src = items.data.children[i].data.thumbnail

                var h1Creator = document.createElement('h1')
                h1Creator.className = "subtitle is-5"
                h1Creator.textContent = "by " + items.data.children[i].data.author

                figure.appendChild(image)
                div.appendChild(h1Title)
                div.appendChild(h1Creator)
                div.appendChild(figure)


                document.getElementById('ConContainer').appendChild(div)
            }
          }
        })
    }


    render () {
        return (
            <Container fluid style={{background: '#FF9B6D'}}>
                <Heading className={"has-text-centered"} style={{color: '#F2F1DC'}}>Inspiration</Heading>
                <div className="tile is-fluid is-vertical" id="ConContainer" style={{padding: '10px'}} />
            </Container>
        )
    }
}

export default Content;
