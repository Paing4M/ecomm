import { axiosInstance } from '../util/axiosInstance'

export const getUsers = async (userType) => {
	const res = await axiosInstance.get('/users/' + userType)
	return res.data
}
