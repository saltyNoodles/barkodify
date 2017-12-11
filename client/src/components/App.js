import React from 'react';
import { Container, Input } from 'semantic-ui-react'

import Barcode from './Barcode';
import ShareButton from './ShareButton';

import logo from '../logo.png';

let inputStyle = {
  padding: '10px',
  marginTop: '30px',
  width: '100%'
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
      dataUrl: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBarcodeChange = this.handleBarcodeChange.bind(this);
  }

  handleInputChange(e) {
    this.setState({ inputValue: e.target.value });
  }

  handleBarcodeChange(dataUrl) {
    if (dataUrl !== this.state.dataUrl) this.setState({ dataUrl });
  }

  render() {
    return (
      <Container text>
        <center>
          <h1><img src={logo} height="64" role="presentation" />Barkodify</h1>
          <Barcode value={this.state.inputValue} initialValue="wow. such bar. very code." onChange={this.handleBarcodeChange} />
          <Input className="text-input" style={inputStyle} placeholder="wow. such bar. very code." value={this.state.inputValue} onChange={this.handleInputChange} />
        </center>
      </Container>
    );
  }
}

export default App;
