let cachedInfo: {
	month: { number: number; name: string }
	day: { number: number; name: string }
} | null = null

const getDateInfo = (): {
	month: { number: number; name: string }
	day: { number: number; name: string }
} => {
	if (cachedInfo) {
		return cachedInfo
	}

	const dateNow = new Date()
	const dateMonthNow = dateNow.getMonth()
	const dateDayNow = dateNow.getDay()

	const monthNamesEn = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	]

	const dayNamesEn = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	]

	cachedInfo = {
		month: {
			number: dateMonthNow + 1,
			name: monthNamesEn[dateMonthNow],
		},
		day: {
			number: dateDayNow,
			name: dayNamesEn[dateDayNow],
		},
	}

	return cachedInfo
}

export default getDateInfo
