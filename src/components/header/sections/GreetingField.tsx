import { useMemo } from 'react'

const Greeting = (): JSX.Element => {
	const greeting = useMemo(() => {
		const currentHour = new Date().getHours()
		let greetingMessage = ''

		switch (true) {
			case currentHour >= 6 && currentHour < 13:
				greetingMessage = '☀️ Good morning'
				break
			case currentHour >= 13 && currentHour < 15:
				greetingMessage = '🍔 Have a nice lunch'
				break
			case currentHour >= 15 && currentHour < 18:
				greetingMessage = '🪐 Hello dear'
				break
			default:
				greetingMessage = '🌚 Good evening'
				break
		}

		return greetingMessage
	}, [])

	return <span>{greeting}</span>
}

export default Greeting
