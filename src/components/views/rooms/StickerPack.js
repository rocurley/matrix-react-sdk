var React = require('react');

var MatrixClientPeg = require('../../../MatrixClientPeg');

export default class StickerPack extends React.Component {
    constructor(props, context) {
        super(props, context); // This probably does nothing
    }
    render() {
        if(!this.props.visible) return false;
        let stickerPreviews = this.props.stickers.map(sticker => {
            const imageUrl = MatrixClientPeg.get().mxcUrlToHttp(sticker.url);
            return <img
                    src={imageUrl}
                    key={imageUrl}
                    alt={sticker.emoji}
                    width="64"
                    height="64"
                    onClick={()=> {
                        const content = {
                            body: sticker.emoji,
                            msgtype: "m.image",
                            url: sticker.url
                        };
                        MatrixClientPeg.get().sendMessage(this.props.room.roomId, content);
                    }}
                />
        });
        return (<div> {stickerPreviews} </div>)
    }
}
