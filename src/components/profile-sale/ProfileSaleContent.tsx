import type React from 'react'
import Header from '../header/Header'
import UserInfo from '../profile-dev/sections/UserInfo'
import { useEffect, useState } from 'react'
import type { ResSalesTypes } from '../types/interfaces/sale/res-sales'
import WorkAccountContent from './sections/work-account-content/WorkAccountContent'
import userService from '@/api/userService'

const ProfileSaleContent: React.FC = () => {
	const [user, setUser] = useState<ResSalesTypes | null>(null)
	useEffect(() => {
		const fetchUser = async () => {
			const data = await userService.getMy();

			const sale = data.data.sale;

			if(sale) {
				setUser(sale);
			}
		}

		fetchUser()
	}, [])

	return (
		<div>
			<Header name={user?.name || '...'} type={'Sale'} />
			<UserInfo timeInJoinTeam={user?.timeJoin} position={'Sale'} />
			<WorkAccountContent />
		</div>
	)
}

export default ProfileSaleContent
