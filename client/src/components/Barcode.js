import React from 'react';
import JsBarcode from 'jsbarcode';

class Barcode extends React.Component {
  constructor(props) {
    super(props);

    this.generateBarcode = this.generateBarcode.bind(this);
  }

  componentDidMount() {
    this.generateBarcode(this.props.initialValue);
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
        <svg id="barcode" />
      </div>
    );
  }
}

export default Barcode;
