import type React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { CreateSales } from '@/components/auth/CreateSales'
import { CreateDeveloper } from '@/components/auth/CreateDeveloper'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import userService from '@/api/userService'

const CreateAccountPage: React.FC = () => {
	const navigate = useNavigate()

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const { data } = await userService.getMy()
				if (data.developer) {
					navigate('/profile-dev')
				}
				if (data.sale) {
					navigate('/profile-sale')
				}
			} catch (error) {
				console.error('Error fetching user:', error)
			}
		}

		fetchUser()
	}, [navigate])

	return (
		<div>
			<Tabs
				defaultValue='developer'
				className='w-full flex flex-col justify-center items-center my-5'
			>
				<blockquote className='mb-2 border-l-2 italic'>
					"Fill out the form below 👇"
				</blockquote>
				<TabsList className='bg-slate-100 w-fit '>
					<TabsTrigger value='developer'>Developer</TabsTrigger>
					<TabsTrigger value='sales'>Sales</TabsTrigger>
				</TabsList>

				<div className='w-full px-5'>
					<TabsContent value='developer'>
						<CreateDeveloper />
					</TabsContent>
					<TabsContent value='sales'>
						<CreateSales />
					</TabsContent>
				</div>
			</Tabs>
		</div>
	)
}

export default CreateAccountPage
