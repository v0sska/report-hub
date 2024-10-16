import type React from 'react'
import { useState } from 'react'
import authService from '../api/authService'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useNavigate } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

const AuthPage: React.FC = () => {
  const navigator = useNavigate()
  
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

 const handleLogin = async () => {
  setError(null)
  setLoading(true)
  
  try {
    const { data: result } = await authService.login(email, password)

    if (result && 'token' in result && 'user' in result) {
      localStorage.setItem('token', result.token)
      
      if (result.user.position === 'sale') {
        navigator('/profile-sale')
      } else {
        navigator('/profile-dev')
      }
    } else {
      setError(result?.message || 'Login failed')
    }
  } catch (error) {
    setError('An unexpected error occurred')
    console.error('Login error:', error)
  } finally {
    setLoading(false)
  }
}


const handleRegister = async () => {
  setError(null)
  setLoading(true)
  try {
    const result = await authService.register(email, password)
    if ('token' in result.data) {
      localStorage.setItem('token', result.data.token)
      navigator('/create-account')
    } else {
      setError(result.message || 'Registration failed')
    }
  } catch (error) {
    setError('An unexpected error occurred')
    console.log(error)
  } finally {
    setLoading(false)
  }
}


  return (
    <Tabs defaultValue="login" className="w-full p-10">
			<p className='font-extrabold flex justify-center gap-2 items-center mb-10'>Report <span className='bg-amber-500 p-1 rounded-lg'>HUB</span></p>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="register">Register</TabsTrigger>
      </TabsList>

      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Enter your email and password to log in.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />

            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            
            {error && <p className="text-red-900 mt-2 text-center">{error}</p>}
          </CardContent>
          <CardFooter className='flex justify-end'>
            <Button onClick={handleLogin} disabled={loading}>
              {loading ? 'Loading...' : 'Login'}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="register">
        <Card>
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>Create an account by filling out the information below.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />

            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            
            {error && <p className="text-red-900 mt-2 text-center">{error}</p>}
          </CardContent>
          <CardFooter className='flex justify-end'>
            <Button onClick={handleRegister} disabled={loading}>
              {loading ? 'Loading...' : 'Register'}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

export default AuthPage
