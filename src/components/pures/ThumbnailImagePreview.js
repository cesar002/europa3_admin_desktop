import React from 'react';

const ThumbnailImagePreview = ({ uri, maxWidth = 150, maxHeight = 150 }) => (
	<img className = 'img-fluid p-3' alt = {uri} src = { uri }
		style = {{ maxWidth: `${maxWidth}px`, maxHeight: `${maxHeight}px` }}
	/>
)

export default ThumbnailImagePreview;
