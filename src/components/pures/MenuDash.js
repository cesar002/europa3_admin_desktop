import React from 'react'
import PropTypes from 'prop-types'

const MenuDash = (props) => (
	<nav className = 'flex flex-row'>
		<section className = 'bg-blue-800 fixed bottom-0 h-screen w-56'>
			<div className = 'fixed content-center text-left justify-between px-3'>
				<ul className="list-reset flex flex-row flex-col py-3 text-center text-left my-16">
					<li className = 'flex-1'>
						<a href = '#' className = {`flex flex-wrap block align-middle ${props.indexSelected == 0? 'text-white' : 'text-gray-400'} hover:text-white no-underline py-3`}>
							<span className = 'px-1'>
								<svg viewBox="0 0 20 20" fill="currentColor" className="home w-6 h-6"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
							</span>
							<span className = 'pl-4 text-lg font-semibold'>Inicio</span>
						</a>
					</li>
				</ul>
			</div>
		</section>
	</nav>
)

MenuDash.propTypes = {
	indexSelected : PropTypes.number
}

MenuDash.defaultProps = {
	indexSelected: -1
}


export default MenuDash
