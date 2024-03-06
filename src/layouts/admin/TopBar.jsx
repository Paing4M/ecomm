import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { axiosInstance } from '../../util/axiosInstance'
import { logoutUser } from '../../slide/userSlide'
import { useNavigate } from 'react-router-dom'

function TopBar() {
	const { user } = useSelector((state) => state.user)
	const navigate = useNavigate()
	const dispatch = useDispatch()

	async function logout() {
		const res = await axiosInstance.post('/logout')
		if (res.status === 200) {
			dispatch(logoutUser())
			navigate('/login')
		}
		console.log(res)
	}

	return (
		<nav className='navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow'>
			<button className='btn btn-link d-md-none rounded-circle mr-3'>
				<span className='text-capitalize text-lg  text-gray-600 small'>
					{user?.name}
				</span>
			</button>

			<ul className='navbar-nav ml-auto'>
				<div className='topbar-divider d-none d-md-block'></div>

				<li className='nav-item dropdown no-arrow'>
					<a className='nav-link '>
						<span className='mr-2 text-capitalize d-none text-lg d-md-inline text-gray-600 small'>
							{user?.name}
						</span>
					</a>

					<div
						className='dropdown-menu dropdown-menu-right shadow animated--grow-in'
						aria-labelledby='userDropdown'
					>
						<button className='dropdown-item' onClick={logout}>
							<i className='fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400'></i>
							Logout
						</button>
					</div>
				</li>
			</ul>
		</nav>
	)
}

export default TopBar
