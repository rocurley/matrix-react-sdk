var React = require('react');

import UserSettingsStore from '../../../UserSettingsStore';

import StickerPack from './StickerPack.js';
var MatrixClientPeg = require('../../../MatrixClientPeg');
var StickerPackPreview = require('./StickerPackPreview');

export default class StickerBrowser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {openPack: null};
        this.client = MatrixClientPeg.get();
        this.update();
    }
    update() { //TODO: only update if something relevant changed?
        const packUrls = UserSettingsStore.getSyncedSetting('StickerBrowser.PackUrls',[])
        Promise.all(
            packUrls.map(mxcUrl => {
                const url = this.client.mxcUrlToHttp(mxcUrl);
                return fetch(url).then(response => response.json())
            })
        ).then(stickerPacks => this.setState({packs: stickerPacks}));
    }
    setOpenPack(event) {
        this.setState({openPack: event.target.name});
    }
    clearOpenPack() {
        this.setState({openPack: null});
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
        if (this.state.openPack === null) {
            return <StickerPackPreview
                            packs={this.state.packs}
                            setOpenPack={this.setOpenPack.bind(this)} />
        } else {
            let pack = this.state.packs[this.state.openPack]
            return <StickerPack
                            title = {pack.title}
                            stickers = {pack.stickers}
                            room = {this.props.room}
                            clearOpenPack = {this.clearOpenPack.bind(this)} />
        }
    }

}
