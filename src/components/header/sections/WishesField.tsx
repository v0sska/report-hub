import { useMemo } from 'react'

const Wishes = (): JSX.Element => {
	const wishes = useMemo(() => {
		const currentHour = new Date().getHours()
		let wishesMessage = ''

		switch (true) {
			case currentHour >= 6 && currentHour < 18:
				wishesMessage = 'Have a great day!'
				break
			default:
				wishesMessage = 'I hope the day was productive!'
				break
		}

		return wishesMessage
	}, [])

	return <span>{wishes}</span>
}

export default Wishes
