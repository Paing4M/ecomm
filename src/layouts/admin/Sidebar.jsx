import { faChartLine } from '@fortawesome/free-solid-svg-icons'
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons'
import { faShop } from '@fortawesome/free-solid-svg-icons'
import { faTableList } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser } from '../../slide/userSlide'
import { axiosInstance } from '../../util/axiosInstance'
import { useNavigate } from 'react-router-dom'

function Sidebar() {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	async function logout() {
		const res = await axiosInstance.post('/logout')
		if (res.status === 200) {
			dispatch(logoutUser())
			navigate('/login')
		}
		console.log(res)
	}

	return (
		<ul
			className='navbar-nav bg-gradient-primary sidebar sidebar-dark accordion'
			id='accordionSidebar'
		>
			<Link
				className='sidebar-brand d-flex align-items-center justify-content-center'
				to={'/admin'}
			>
				<div className='sidebar-brand-icon rotate-n-15'>
					<FontAwesomeIcon className='fs-5' icon={faShop} />
				</div>
				<div className='sidebar-brand-text mx-3'>Admin</div>
			</Link>

			<hr className='sidebar-divider my-0' />

			<li className='nav-item active'>
				<Link className='nav-link' to={'/'}>
					<i className='fas fa-fw fa-pager'></i>
					<span>User Page</span>
				</Link>

				<Link className='nav-link' to={'/admin/dashboard'}>
					<i className='fas fa-fw fa-desktop'></i>
					<span>Dashboard</span>
				</Link>

				<Link className='nav-link' to={'/admin/category'}>
					<FontAwesomeIcon className='mr-1' icon={faTableList} />
					<span>Category</span>
				</Link>

				<Link className='nav-link' to={'/admin/product'}>
					<FontAwesomeIcon className='mr-1' icon={faBoxOpen} />
					<span>Product</span>
				</Link>

				<Link className='nav-link' to={'/admin/order'}>
					<FontAwesomeIcon className='mr-1' icon={faChartLine} />
					<span>Order</span>
				</Link>
			</li>

			<hr className='sidebar-divider' />

			<li className='nav-item '>
				<button
					className='nav-link d-flex align-items-center fw-bold text-white'
					onClick={logout}
				>
					<i className='fas fa-sign-out-alt fa-sm fs-6 text-white fa-fw mr-2'></i>
					<span className='font-bold fs-6'>Logout</span>
				</button>
			</li>
		</ul>
	)
}

export default Sidebar
