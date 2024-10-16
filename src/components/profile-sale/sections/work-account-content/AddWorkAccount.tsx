import type React from 'react'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer'
import { CirclePlus } from 'lucide-react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import workAccountService from '@/api/workAccountService'

const formSchema = z.object({
	name: z.string().min(2, {
		message: 'End time is required',
	}),
})

const AddWorkAccount: React.FC = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	})

	async function onSubmit(values: z.infer<typeof formSchema>) {
		await workAccountService.create(values)
		form.reset()
		window.location.reload()
	}

	return (
		<Drawer>
			<DrawerTrigger className='py-1 px-2 rounded-xl  flex gap-2 bg-brown w-fit '>
				Add work account <CirclePlus className=' bg-brown' />
			</DrawerTrigger>
			<DrawerContent className=' bg-main h-fit'>
				<DrawerHeader>
					<DrawerTitle className='text-[#4f4c45]'>
						Write the name of your work account.
					</DrawerTitle>
				</DrawerHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className='px-5 flex flex-col gap-4'>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem className='items-center flex flex-col'>
										<FormLabel>Name work account</FormLabel>
										<FormControl>
											<Input
												className='text-center'
												placeholder='Name Example'
												{...field}
											/>
										</FormControl>
										<FormMessage className='text-red-900' />
									</FormItem>
								)}
							/>
						</div>
						<DrawerFooter>
							<DrawerClose>
								<Button type='submit' className='bg-brown'>
									Submit
								</Button>
								<Button variant='outline' type='button'>
									Cancel
								</Button>
							</DrawerClose>
						</DrawerFooter>
					</form>
				</Form>
			</DrawerContent>
		</Drawer>
	)
}

export default AddWorkAccount
