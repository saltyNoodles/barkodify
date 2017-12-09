import React from 'react';
import axios from 'axios';
import { Button, Modal } from 'semantic-ui-react';

import ShareModal from './ShareModal';

class ShareButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sharableURL: null
    }
    this.share = this.share.bind(this);
    this.getSharableUrl = this.getSharableUrl.bind(this);
  }

  share() {
    this.getSharableUrl(this.props.dataUrl, (e, res) => {
      if (e) return console.log(e);
      this.setState({ sharableURL: res.data.url });
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
    let shareTrigger = (
        <Button secondary className={`share-button`} onClick={() => this.share()}>Share this barcode!</Button>
    );
    return (
      <ShareModal
        trigger={shareTrigger}
        url={this.state.sharableURL}
      />
    );
  }
}

export default ShareButton;