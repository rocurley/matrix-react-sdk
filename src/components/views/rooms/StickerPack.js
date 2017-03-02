var React = require('react');

var MatrixClientPeg = require('../../../MatrixClientPeg');

function StickerPack (props) {
    let stickerPreviews = props.stickers.map(sticker => {
        const imageUrl = MatrixClientPeg.get().mxcUrlToHttp(sticker.url);
        return <img
                src={imageUrl}
                key={imageUrl}
                alt={sticker.emoji}
                width="64"
                height="64"
                style={{cursor: 'pointer'}}
                onClick={()=> {
                    const content = {
                        body: sticker.emoji,
                        msgtype: "m.image",
                        url: sticker.url,
                        stickerPack: props.packUrl
                    };
                    MatrixClientPeg.get().sendMessage(props.room.roomId, content);
                }}
            />
    });
    return (
      <div>
          <div>
              <a onClick={props.clearOpenPack} style={{cursor: 'pointer'}}>
                  Sticker Packs
              </a> &gt; <b>{props.title}</b></div>
          <div> {stickerPreviews} </div>
      </div>
    );
}

module.exports = StickerPack;
