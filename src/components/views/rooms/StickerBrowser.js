var React = require('react');

import UserSettingsStore from '../../../UserSettingsStore';

var MatrixClientPeg = require('../../../MatrixClientPeg');

var StickerPack = require('./StickerPack');

export default class StickerBrowser extends React.Component {
    constructor(props){
        super(props);
        this.client = MatrixClientPeg.get();
        this.update();
    }
    update(){ //TODO: only update if something relevant changed?
        const packUrls = UserSettingsStore.getSyncedSetting('StickerBrowser.PackUrls',[])
        Promise.all(
            packUrls.map(mxcUrl => {
                const url = this.client.mxcUrlToHttp(mxcUrl);
                return fetch(url).then(response => response.json())
            })
        ).then(stickerPacks => this.setState({packs: stickerPacks}));
    }
    onAccountData(ev){
        if (ev.getType() == "im.vector.web.settings"){
            this.update();
        }
    }
    componentWillMount(){
        this.client.on("accountData", this.onAccountData.bind(this));
    }
    componentWillUnmount() {
        this.client.removeListener("accountData", this.onAccountData.bind(this));
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
