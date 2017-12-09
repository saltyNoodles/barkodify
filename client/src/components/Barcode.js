import React from 'react';
import JsBarcode from 'jsbarcode';

const imgStyle = {
  maxWidth: '100%',
  marginBottom: '10px',
  marginTop: '80px'
}
class Barcode extends React.Component {
  constructor(props) {
    super(props);

    this.generateBarcode = this.generateBarcode.bind(this);
    this.getDataURL = this.getDataURL.bind(this);
  }

  componentDidMount() {
    this.generateBarcode(this.props.initialValue, dataUrl => {
      this.props.onChange(dataUrl);
    });
  }

  getDataURL() {
    let img = document.querySelector('#barcode');
    return img.src;
  }

  generateBarcode(text, callback) {
    if (text) {
      JsBarcode('#barcode', text); 
    } else {
      JsBarcode('#barcode', this.props.initialValue);
    }

    if (callback) callback(this.getDataURL());
  }

  componentWillReceiveProps(nextProps) {
    this.generateBarcode(nextProps.value, dataUrl => {
      this.props.onChange(dataUrl);
    });
  }

  render() {
    return (
      <div>
        <img style={imgStyle} id="barcode" alt={this.props.value} />
      </div>
    );
  }
}

export default Barcode;
