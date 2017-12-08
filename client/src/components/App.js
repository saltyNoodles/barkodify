import React from 'react';

import Barcode from './Barcode';

import logo from '../logo.png';

let appStyle = {
  fontFamily: 'sans-serif',
  fontSize: '18pt'
}

let inputStyle = {
  width: '750px',
  padding: '10px'
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    this.setState({inputValue: e.target.value});
  }

  render() {
    return (
      <div style={appStyle}>
        <center>
          <h1><img src={logo} height="64" role="presentation" />Barkodify</h1>
          <Barcode value={this.state.inputValue} initialValue="wow. such bar. very code." />
          <input style={inputStyle} placeholder="wow. such bar. very code." value={this.state.inputValue} onChange={this.handleInputChange} />
        </center>
      </div>
    );
  }
}

export default App;
