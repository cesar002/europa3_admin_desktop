import React from 'react';

const ThumbnailImagePreview = ({ uri }) => (
	<img className = 'img-fluid p-3' alt = {uri} src = { uri }
		style = {{ maxWidth: '200px', maxHeight: '200px' }}
	/>
)

export default ThumbnailImagePreview;
