import React from 'react';
import JsBarcode from 'jsbarcode';

class Barcode extends React.Component {
  constructor(props) {
    super(props);

    this.generateBarcode = this.generateBarcode.bind(this);
    this.getDataURL = this.getDataURL.bind(this);
  }

  componentDidMount() {
    this.generateBarcode(this.props.initialValue);
  }

  getDataURL() {
    let img = document.querySelector('#barcode');
    console.log(img.src);
  }

  generateBarcode(text) {
    if (text) {
      JsBarcode('#barcode', text); 
    } else {
      JsBarcode('#barcode', this.props.initialValue);
    }
  }

  shouldComponentUpdate(nextProps) {
    this.generateBarcode(nextProps.value);
    return true;
  }

  render() {
    return (
      <div>
        <img id="barcode" />
        <button onClick={this.getDataURL}>share</button>
      </div>
    );
  }
}

export default Barcode;
