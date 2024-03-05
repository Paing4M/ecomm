import React from 'react'

import { useEffect } from 'react'
import { useState } from 'react'
import { getPaidOrdersRequest } from '../../../api/order.api'
import * as userService from '../../../api/user.api'

function Dashboard() {
	const [totalPrice, setTotalPrice] = useState(0)
	const [admin, setAdmin] = useState([])
	const [user, setUser] = useState([])

	useEffect(() => {
		getOrderPrice()
		getUsers()
		getAdmins()
	}, [])

	const getUsers = async () => {
		const res = await userService.getUsers('user')
		if (res) {
			setUser(res.users)
		}
	}

	const getAdmins = async () => {
		const res = await userService.getUsers('admin')
		if (res) {
			setAdmin(res.users)
		}
	}

	useEffect(() => {
		getOrderPrice()
	}, [])

	const getOrderPrice = async () => {
		let price = []
		const res = await getPaidOrdersRequest()

		if (res) {
			res.map((item) => price.push(+item.total_price))
			setTotalPrice(price.reduce((a, c) => a + c, 0))
		}
	}

	return (
		<>
			<div className='d-sm-flex align-items-center justify-content-between mb-4'>
				<h1 className='h3 mb-0 text-gray-800'>Dashboard</h1>
				<a
					href='#'
					className='d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm'
				>
					<i className='fas fa-download fa-sm text-white-50'></i> Generate
					Report
				</a>
			</div>

			<div className='row'>
				<div className='col-xl-3 col-md-6 mb-4'>
					<div className='card border-left-success shadow h-100 py-2'>
						<div className='card-body'>
							<div className='row no-gutters align-items-center'>
								<div className='col mr-2'>
									<div className='text-xs font-weight-bold text-success text-uppercase mb-1'>
										Orders amount (total)
									</div>
									<div className='h5 mb-0 font-weight-bold text-gray-800'>
										$ {totalPrice}
									</div>
								</div>
								<div className='col-auto'>
									<i className='fas fa-dollar-sign fa-2x text-gray-300'></i>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className='col-xl-3 col-md-6 mb-4'>
					<div className='card border-left-primary shadow h-100 py-2'>
						<div className='card-body'>
							<div className='row no-gutters align-items-center'>
								<div className='col mr-2'>
									<div className='text-xs font-weight-bold text-primary text-uppercase mb-1'>
										Admins
									</div>
									<div className='h5 mb-0 font-weight-bold text-gray-800'>
										{admin?.length}
									</div>
								</div>
								<div className='col-auto'>
									<i className='fas fa-users fa-2x text-gray-300'></i>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className='col-xl-3 col-md-6 mb-4'>
					<div className='card border-left-secondary shadow h-100 py-2'>
						<div className='card-body'>
							<div className='row no-gutters align-items-center'>
								<div className='col mr-2'>
									<div className='text-xs font-weight-bold text-secondary text-uppercase mb-1'>
										Users
									</div>
									<div className='h5 mb-0 font-weight-bold text-gray-800'>
										{user?.length}
									</div>
								</div>
								<div className='col-auto'>
									<i className='fas fa-users fa-2x text-gray-300'></i>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Dashboard
