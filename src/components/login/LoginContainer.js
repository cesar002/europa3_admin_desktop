import React from 'react'

const LoginContainer = (props) => (
	<div className = 'h-screen flex'>
		<div className = 'sm:w-2/5 img_banner_login' />
		<div className = 'flex flex-col w-full sm:w-3/5'>
			<div className = 'h-24 flex justify-center items-center'>
				<h1 className = 'text-4xl'>
					Bienvenido
				</h1>
			</div>
			<div className = 'flex-1 flex justify-center'>
				{ props.children }
			</div>
		</div>
	</div>
)

export default LoginContainer
