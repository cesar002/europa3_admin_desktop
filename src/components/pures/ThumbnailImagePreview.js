import React from 'react';

const ThumbnailImagePreview = ({ uri }) => (
	<img className = 'img-fluid p-3' alt = {uri} src = { uri }
		style = {{ maxWidth: '150px', maxHeight: '150px' }}
	/>
)

export default ThumbnailImagePreview;
