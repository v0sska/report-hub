import {
	differenceInYears,
	differenceInMonths,
	differenceInDays,
} from 'date-fns'

interface TypeTimeInTeam {
	years: number
	months: number
	days: number
}

function timeInTeam(isoDateStr: string): TypeTimeInTeam {
	const startDate = new Date(isoDateStr)
	const now = new Date()

	const years = differenceInYears(now, startDate)
	const months = differenceInMonths(now, startDate) % 12
	const days = differenceInDays(now, startDate) % 30

	return { years, months, days }
}

export default timeInTeam
