import React from 'react'

import '../../assets/css/login.css'

export default class LoginContainer extends React.PureComponent{

	render(){
		return(
			<div className = "container-fluid">
				<div className = "row no-gutter">
					<div className = "d-none d-md-flex col-md-4 col-lg-6 bg-image" />
					<div className = "col-md-8 col-lg-6">
						<div className = "login d-flex align-items-center py-5">
							<div className = "container">
								<div className = "row">
									<div className = "col-md-9 col-lg-8 mx-auto">
										{ this.props.children }
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
