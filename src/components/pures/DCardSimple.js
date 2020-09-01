import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const getTypeBorder = type => {
	switch (type) {
		case 'primary':
			return 'border-left-primary'
		case 'success':
			return 'border-left-success'
		case 'info':
			return 'border-left-info'
		case 'warning':
			return 'border-left-warning'
		case 'danger':
			return 'border-left-danger'
		default:
			return ''
	}
}

const DCardSimple = ({ typeBorder, header, text, icon = null }) => (
	<div class="col-xl-3 col-md-6 mb-4">
		<div class={`card ${getTypeBorder(typeBorder)} shadow h-100 py-2`}>
			<div class="card-body">
				<div class="row no-gutters align-items-center">
					<div class="col mr-2">
					<div class="text-xs font-weight-bold text-primary text-uppercase mb-1">{ header }</div>
					<div class="h5 mb-0 font-weight-bold text-gray-800">{ text }</div>
					</div>
					<div class="col-auto">
						{ icon &&
						<FontAwesomeIcon icon = { icon } />
						}
					</div>
				</div>
			</div>
		</div>
	</div>
)

export default DCardSimple;
