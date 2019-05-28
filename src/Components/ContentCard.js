import React, { Component } from 'react'
import { Tile, Image, Heading, Button, Section } from 'react-bulma-components'
import 'react-bulma-components/dist/react-bulma-components.min.css'
import temp from '../icons/star.png'
import YouTube from 'react-youtube';


class ContentCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            active: false
        }
    }

    render() {
      const opts = {
      height: '195',
      width: '320',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        //autoplay: 1
      }
    };

    //grab a youtube videoId and feed in
    //fetch using .text instead of .json
    //https://www.google.com/search?ei=IXq2XMSAKoH3-gSZ-Y_QDQ&q=site%3Ayoutube.com+james+charles+eyeshadow+&oq=site%3Ayoutube.com+james+charles+eyeshadow+&gs_l=psy-ab.3...991.16042..17445...2.0..0.84.876.20......0....1..gws-wiz.......0i67j0j0i13.DocRn_L7oz8
    //scrape https://www.google.com/search?&q=site%3Ayoutube.com+'URSEaRChehere''
        let {title, creator, thumbnail, url} = this.props.content
        return (
            // <div>
            //     <Tile kind="parent" className="has-background-primary">
            //         <Tile size={2}>
            //         <YouTube
            //             videoId="2g811Eo7K8U"
            //             opts={opts}
            //             onReady={this._onReady}
            //             />
            //         </Tile>

            //         <Tile size={8} vertical>
            //             <Heading>{title}</Heading>
            //             <Heading size={4}subtitle>{creator}</Heading>
            //         </Tile>

            //         <Tile size={2} vertical>
            //                 <Button fullwidth color="info">Favorite</Button>
            //                 <Button fullwidth color="info">Visit</Button>
            //         </Tile>
            //     </Tile>
            // </div>

            <p>test</p>
        )
    }
}

export default ContentCard;
