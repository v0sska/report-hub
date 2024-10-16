import type React from 'react'
import Header from '../header/Header'
import UserInfo from './sections/UserInfo'
import AddReport from './sections/AddReport'
import ListOfReports from './sections/ListOfReports'
import type { ResDeveloperTypes } from '../types/interfaces/dev/res-dev'
import { useEffect, useState } from 'react'
import userService from '@/api/userService'

const ProfileDevContent: React.FC = () => {
	const [user, setUser] = useState<ResDeveloperTypes | null>(null)
	useEffect(() => {
		const fetchUser = async () => {
			const data = await userService.getMy();
			
			const deveeloper = data.data.developer
			if (deveeloper) {
				setUser(deveeloper)
			}
		}

		fetchUser()
	}, [])
	return (
		
		<div className='flex flex-col gap-5'>
			<Header name={user?.name || '...'} type={user?.stack || 'Developer'} />
			<UserInfo
				position={user?.stack || 'Developer'}
				timeInJoinTeam={user?.timeJoin}
			/>
			<AddReport />
			<ListOfReports />
		</div>
	)
}

export default ProfileDevContent
