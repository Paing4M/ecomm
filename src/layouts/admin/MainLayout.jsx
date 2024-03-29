import React from 'react'
import Sidebar from './Sidebar'
import TopBar from './TopBar'
import Footer from './Footer'
import '../../assets/admin/css/sb-admin-2.min.css'
import '../../assets/admin/vendor/fontawesome-free/css/all.min.css'
import '../../assets/admin/vendor/datatables/dataTables.bootstrap4.min.css'
import { Outlet } from 'react-router-dom'

function MainLayout() {
	return (
		<div id='page-top'>
			<div id='wrapper'>
				{/* side bar */}
				<Sidebar />

				<div id='content-wrapper' className='d-flex flex-column'>
					<div id='content'>
						{/* top bar */}
						<TopBar />

						{/* page content */}
						<div className='container-fluid'>
							<Outlet />
						</div>
					</div>

					{/* footer */}
					<Footer />
				</div>
			</div>

			<a className='scroll-to-top rounded' href='#page-top'>
				<i className='fas fa-angle-up'></i>
			</a>
		</div>
	)
}

export default MainLayout
