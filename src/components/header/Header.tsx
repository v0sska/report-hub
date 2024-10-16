import type React from 'react'
import Greeting from '../header/sections/GreetingField'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import Wishes from '../header/sections/WishesField'
import type { StackEnum } from '../types/enums/stack-enum'

interface HeaderProps {
	name: string
	type: StackEnum | 'Sale' | 'Developer'
}
const Header: React.FC<HeaderProps> = ({ name }) => {
	return (
		<div className='flex justify-between items-center'>
			<div className='flex flex-col'>
				<h2 className='text-lg font-semibold'>
					{Greeting()}, {name}
				</h2>
				<p className='text-sm text-muted-foreground ml-6 opacity-65'>
					{Wishes()}
				</p>
			</div>
			<Avatar>
				<AvatarImage src='https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExanJ2cmp3b283ZnN4N3R4c251bjBucjhiOG9mbGdhN3l1NTBoY3NpMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MDJ9IbxxvDUQM/giphy.gif' alt='avatar' />
				<AvatarFallback>User</AvatarFallback>
			</Avatar>
		</div>
	)
}

export default Header
