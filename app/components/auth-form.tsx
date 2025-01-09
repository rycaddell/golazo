'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { supabase } from "@/lib/supabase"

export default function AuthForm() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        })

        if (error) {
          alert('Login failed: ' + error.message)
        } else {
          alert('Login successful! Redirecting...')
          router.push('/dashboard')
        }
      } else {
        const { error } = await supabase.auth.signUp({ 
          email, 
          password 
        })

        if (error) {
          alert('Sign-up failed: ' + error.message)
        } else {
          alert('Sign-up successful! Please check your email for confirmation.')
        }
      }
    } catch (err) {
      console.error("Unexpected error:", err)
      alert('An unexpected error occurred.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          {isLogin ? "Login" : "Sign Up"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              required
              disabled={isLoading}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading 
              ? (isLogin ? "Logging in..." : "Signing up...") 
              : (isLogin ? "Login" : "Sign Up")
            }
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button
          variant="link"
          onClick={() => setIsLogin(!isLogin)}
          disabled={isLoading}
        >
          {isLogin 
            ? "Need an account? Sign up" 
            : "Already have an account? Login"}
        </Button>
      </CardFooter>
    </Card>
  )
}

