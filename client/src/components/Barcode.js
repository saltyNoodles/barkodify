import React from 'react';
import JsBarcode from 'jsbarcode';

const imgStyle = {
  maxWidth: '90%',
  left: 0,
  marginBottom: '10px',
  margin: '30px'
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
    let canvas = document.querySelector('#barcode');
    return canvas.toDataURL("image/png");
  }

  generateBarcode(text, callback) {
    if (text) {
      JsBarcode('#barcode', text); 
    } else {
      JsBarcode('#barcode', this.props.initialValue, {
        background: null
      });
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
        <canvas style={imgStyle} id="barcode" alt={this.props.value} />
      </div>
    );
  }
}

export default Barcode;
