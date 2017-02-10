var React = require('react');

import UserSettingsStore from '../../../UserSettingsStore';

var MatrixClientPeg = require('../../../MatrixClientPeg');

var StickerPack = require('./StickerPack');

export default class StickerBrowser extends React.Component {
    constructor(props){
        super(props);
        const packUrls = UserSettingsStore.getSyncedSetting('StickerBrowser.PackUrls',[])
        Promise.all(
            packUrls.map(mxcUrl => {
                const url = MatrixClientPeg.get().mxcUrlToHttp(mxcUrl);
                return fetch(url).then(response => response.json())
            })
        ).then(stickerPacks => this.setState({packs: stickerPacks}));
    }
    render() {
        if(!this.props.visible) return false;
        return (<div>
            {this.state.packs.map(pack => 
                <StickerPack
                    title = {pack.title}
                    stickers = {pack.stickers}
                    room = {this.props.room}
                />
            )}
        </div>);
    }

}
