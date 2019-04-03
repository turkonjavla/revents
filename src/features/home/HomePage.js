import React from 'react';
import { Button } from 'semantic-ui-react'

const HomePage = ({ history: { push } }) => {
  return (
    <div>
      <div className="ui inverted vertical masthead center aligned segment">
        <div className="ui text container">
          <h1 className="ui inverted stackable header">
            <img
              className="ui image massive"
              src="/assets/logo.png"
              alt="logo"
            />
            <div className="content">Re-vents</div>
          </h1>
          <h2>Do whatever you want to do</h2>
          <Button onClick={() => push('/events')} inverted>
            Get Started
            <i className="right arrow icon" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default HomePage
