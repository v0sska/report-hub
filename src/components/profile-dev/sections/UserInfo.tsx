import type { StackEnum } from '@/components/types/enums/stack-enum'
import getDateInfo from '@/utils/get-date-now'
import timeInTeam from '@/utils/time-in-team'
import type React from 'react'

interface UserInfoProps {
	timeInJoinTeam: string | undefined
	position: StackEnum | 'Sale' | 'Developer'
}

const UserInfo: React.FC<UserInfoProps> = ({ position, timeInJoinTeam }) => {
	const isoString = new Date(timeInJoinTeam || new Date()).toISOString()

	const dateInfo = getDateInfo()
	const { years, months, days } = timeInTeam(isoString)

	return (
		<div className='flex gap-2 p-5 border-b-2 border-border'>
			<div className='border-r-2 border-border pr-5'>
				<p>{dateInfo.month.name}</p>
				<p className='text-[80px] leading-tight text-brown '>
					{dateInfo.day.number}
				</p>
				<p className='text-[30px] leading-tight opacity-50'>
					{dateInfo.day.name}
				</p>
			</div>
			<div className='flex flex-col pl-2 gap-1 '>
				<div className='text-nowrap pb-2'>You are with us:</div>
				<p>Years : {years}</p>
				<p>Months : {months}</p>
				<p>Days : {days}</p>
				<p className='text-nowrap pt-4 text-brown'>{position}</p>
			</div>
		</div>
	)
}

export default UserInfo
