import React from 'react';
import axios from 'axios';
import { Button, Modal } from 'semantic-ui-react';

class ShareButton extends React.Component {
  constructor(props) {
    super(props);

    this.share = this.share.bind(this);
    this.getSharableUrl = this.getSharableUrl.bind(this);
  }

  share() {
    this.getSharableUrl(this.props.dataUrl, (e, res) => {
      if (e) return console.log(e);
      console.log('saved to', res.data.url );
    });

  }

  getSharableUrl(dataUrl = this.props.dataUrl, callback) {
    axios.post('/save/', {'imageDataURI': dataUrl})
      .then(response => {
        if (callback) callback(null, response);
        return
      }).catch(e => callback(e));;
  }

  render() {
    return (
      <span>
        <Button secondary className={`share-button`} onClick={() => this.share()}>Share this barcode!</Button>
      </span>
    );
  }
}

export default ShareButton;