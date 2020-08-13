import React from 'react'
import Proptypes from 'prop-types'

const Badge = () => (
	<span className="flex h-2 w-2 mb-4">
		<span className="animate-ping relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
	</span>
)

class Navbar extends React.PureComponent{

	render(){
		return(
			<nav className = 'bg-blue-700 flex items-center flex-wrap shadow-md px-10 w-screen h-16 fixed z-40'>
				<div className = 'flex items-center flex-shrink-0 text-white mr-6'>
					<span className="font-semibold text-xl tracking-tight">Europa3 -Administrador</span>
				</div>
				<div className = 'w-full block flex flex-grow flex-row-reverse sm:flex sm:items-center sm:w-auto'>
					<span className = 'cursor-pointer'>
						<svg viewBox="0 0 20 20" fill="#ffff" className="logout w-5 h-5"><path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd"></path></svg>
					</span>
					<span className = 'text-white text-lg font-bold mx-4'>Usuario</span>
					<a className = 'block lg:inline-block lg:mt-0 text-teal-200 mr-4 outline-none cursor-pointer'>
						<svg viewBox="0 0 20 20" fill="#ffff" className="bell w-5 h-5"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path></svg>
					</a>
					{this.props.hasBadgeNotification &&
					<Badge />}
					<a className = 'block lg:inline-block lg:mt-0 text-teal-200 mr-4 outline-none cursor-pointer'>
						<svg viewBox="0 0 20 20" fill="#ffff" className="annotation w-5 h-5"><path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
					</a>
					{this.props.hasBadgeChat &&
					<Badge />}
				</div>
			</nav>
		)
	}
}


Navbar.propTypes = {
	hasBadgeNotification: Proptypes.bool,
	hasBadgeChat: Proptypes.bool
}

Navbar.defaultProps = {
	hasBadgeNotification : false,
	hasBadgeChat : false,
}

export default Navbar
