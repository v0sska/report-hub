import type { StackEnum } from "../../enums/stack-enum"


export interface CreateDeveloperTypes {
	name: string
	stack: StackEnum
	telegram: string
	timeJoin: string
}