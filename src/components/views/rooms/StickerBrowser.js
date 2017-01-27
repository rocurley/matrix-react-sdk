var React = require('react');

import UserSettingsStore from '../../../UserSettingsStore';

var StickerPack = require('./StickerPack');

export default class StickerBrowser extends React.Component {
    constructor(props){
        super(props);
        //packUrls = UserSettingsStore.getSyncedSetting('StickerPacks.PackUrls',[])
        const test_pack = {
            title: "Test Pack",
            stickers: [
                {url: "mxc://matrix.org/kMdhagucDXmOoGOCbEtMZWWm", emoji:"😃"},
                {url: "mxc://matrix.org/cglBAYnbFhDFbPIJKOwKXjFh", emoji:"😑"}
            ],
        };
        this.state = {
            packs: [test_pack, test_pack],
        };
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
