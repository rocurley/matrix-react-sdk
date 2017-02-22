var React = require('react');

var MatrixClientPeg = require('../../../MatrixClientPeg');

function StickerPackPreview (props) {
		var packPreviews = []
		if (props.packs) {
			for (var i = 0; i < props.packs.length; i++) {
					let pack = props.packs[i];
					let sticker = pack.stickers[0];
					const imageUrl = MatrixClientPeg.get().mxcUrlToHttp(sticker.url);
					packPreviews.push(<img
									src={imageUrl}
									key={imageUrl}
									alt={pack.title}
									title={pack.title}
									name={i}
									width="64"
									height="64"
									onClick={props.setOpenPack}
									style={{cursor: 'pointer'}}
							/>);
			}
		}
		return (
				<div>
			      <div><b>Sticker Packs</b></div>
						<div>{packPreviews}</div>
				</div>
		);
}

module.exports = StickerPackPreview;
