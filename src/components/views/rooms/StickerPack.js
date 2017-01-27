var React = require('react');

var MatrixClientPeg = require('../../../MatrixClientPeg');

export default class StickerPack extends React.Component {
    render() {
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
        return (
            <div>
                <div> {this.props.title} </div>
                <div> {stickerPreviews} </div>
            </div>
        )
    }
}
