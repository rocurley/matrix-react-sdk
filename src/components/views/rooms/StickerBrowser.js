var React = require('react');

import UserSettingsStore from '../../../UserSettingsStore';

import StickerPack from './StickerPack.js';
var MatrixClientPeg = require('../../../MatrixClientPeg');
var StickerPackPreview = require('./StickerPackPreview');

export default class StickerBrowser extends React.Component {
    constructor(props){
        super(props);
				this.state = {openPack: null};
        const packUrls = UserSettingsStore.getSyncedSetting('StickerBrowser.PackUrls',[])
        Promise.all(
            packUrls.map(mxcUrl => {
                const url = MatrixClientPeg.get().mxcUrlToHttp(mxcUrl);
                return fetch(url).then(response => response.json())
            })
        ).then(stickerPacks => this.setState({packs: stickerPacks}));
				this.setOpenPack = this.setOpenPack.bind(this);
				this.clearOpenPack = this.clearOpenPack.bind(this);
    }
		setOpenPack = (event) => {
			this.setState({openPack: event.target.name});
		}
		clearOpenPack = () => {
			this.setState({openPack: null});
		}
    render() {
        if(!this.props.visible) return false;
				if (this.state.openPack === null) {
					return <StickerPackPreview
									packs={this.state.packs}
									setOpenPack={this.setOpenPack} />
				} else {
						let pack = this.state.packs[this.state.openPack]
						return <StickerPack
										title = {pack.title}
										stickers = {pack.stickers}
										room = {this.props.room}
										clearOpenPack = {this.clearOpenPack} />
				}
    }
}
