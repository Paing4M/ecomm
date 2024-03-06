import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser } from '../../slide/userSlide'
import { axiosInstance } from '../../util/axiosInstance'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { faShop } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

function Navbar() {
	const { user, token } = useSelector((state) => state.user)
	const navigate = useNavigate()
	const dispatch = useDispatch()
	let renderRightNav

	async function logout() {
		const res = await axiosInstance.post('/logout')
		if (res.status === 200) {
			dispatch(logoutUser())
			navigate('/login')
		}
		console.log(res)
	}

	if (user && token) {
		renderRightNav = (
			<>
				<li className='nav-item'>
					<NavLink className={'nav-link mx-2'} to={'/'}>
						Home
					</NavLink>
				</li>

				<li className='nav-item'>
					<NavLink className={'nav-link mx-2'} to={'/shop'}>
						Shop
					</NavLink>
				</li>

				<li className='nav-item'>
					<Link
						style={{ textTransform: 'capitalize' }}
						className='nav-link mx-2'
					>
						{user.name}
					</Link>
				</li>

				{user?.type == '1' && (
					<li className='nav-item'>
						<Link
							to={'/admin/dashboard'}
							style={{ textTransform: 'capitalize' }}
							className='nav-link mx-2'
						>
							Dashboard{' '}
						</Link>
					</li>
				)}

				<li className='nav-item'>
					<NavLink className={'nav-link mx-2'} to={'/cart'}>
						<FontAwesomeIcon icon={faCartShopping} />
					</NavLink>
				</li>

				<li className='d-inline-block d-md-none'>
					<hr class='dropdown-divider' />
				</li>

				<li className='nav-item bg-primary mt-2 mt-md-0  px-2 ml-2 rounded text-center'>
					<a
						onClick={logout}
						style={{ cursor: 'pointer' }}
						className='nav-link mx-2 text-white'
					>
						Logout
					</a>
				</li>
			</>
		)
	} else {
		renderRightNav = (
			<>
				<li className='nav-item'>
					<Link
						className='nav-link mx-2 active'
						aria-current='page'
						to='/'
					>
						Home
					</Link>
				</li>

				<li className='nav-item'>
					<Link className='nav-link mx-2' to='/login'>
						Login
					</Link>
				</li>
				<li className='nav-item'>
					<Link className='nav-link mx-2' to='/register'>
						Register
					</Link>
				</li>
			</>
		)
	}

	return (
		<nav className='navbar navbar-expand-lg bg-light navbar-light shadow-sm sticky-top '>
			<div className='container'>
				<Link className='navbar-brand' to='/'>
					<i className='text-primary fs-4'>
						<FontAwesomeIcon icon={faShop} />
					</i>
				</Link>
				<button
					className='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbarNav'
					aria-controls='navbarNav'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div className='collapse navbar-collapse' id='navbarNav'>
					<ul className='navbar-nav ml-auto'>{renderRightNav}</ul>
				</div>
			</div>
		</nav>
	)
}

export default Navbar
