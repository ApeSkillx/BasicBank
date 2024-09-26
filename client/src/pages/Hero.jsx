import './All.css'
import React from 'react'

const Hero = () => {
    return (
      <div className='middle'>
        <div class="content container">
            <h1>The Spark Bank</h1>
            <p>
                This website is the
                outcome of a intern project, and does not
                necessarily represent the views of any organisation or any other individuals referenced or
                acknowledged within the website. Anyone may reproduce, distribute, adapt, translate the content on the website,
                without explicit permission, provided that the content is accompanied by an acknowledgement that this Bank website 
                is the source and that it is clearly indicated if changes were made to the original content.
            </p>
        </div>

        <div>
            <img src="https://media4.giphy.com/media/EFcct0wn6TBHAzKaSR/giphy.gif?cid=ecf05e47ytmpvc0c5xrs5m2s2zshmubbwzhal9sbzsm5ag5m&rid=giphy.gif&ct=g" alt="img" style={{marginLeft: '15px'}}/>
        </div>
      </div>
    )
  }
  
  export default Hero