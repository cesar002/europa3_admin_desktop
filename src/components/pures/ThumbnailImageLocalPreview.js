import React, { useState, useEffect } from 'react'

const ThumbnailPreview = ({ file }) => {

	const [image, setImage] = useState(null)

	useEffect(()=> {
		const reader = new FileReader();
		reader.onloadend = () =>{
			setImage(reader.result)
		}
		reader.readAsDataURL(file)
	}, [])


	return(
		<img className = 'img-fluid p-3' alt = {file.name} src = { image }
			style = {{ maxWidth: '150px', maxHeight: '150px' }}
		/>
	)
}

export default ThumbnailPreview;
