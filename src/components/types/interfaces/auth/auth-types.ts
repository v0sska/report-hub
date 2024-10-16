export interface AuthTypesRes {
  token: string
  user: {
    id: string
    email: string
    position: string
  }
}