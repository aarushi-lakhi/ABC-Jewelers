"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AccountPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeTab, setActiveTab] = useState("login")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: need to authenticate with backend
    setIsLoggedIn(true)
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: need to register with backend
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  if (isLoggedIn) {
    return (
      <div className="container py-16">
        <div className="mx-auto max-w-2xl">
          <h1 className="mb-8 text-3xl font-light tracking-wide text-center">My Account</h1>

          <div className="mb-8 rounded-lg border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-light">Account Information</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p>Jane Doe</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p>jane.doe@example.com</p>
              </div>
            </div>
            <div className="mt-4">
              <Button variant="outline" size="sm" className="font-light">
                Edit Profile
              </Button>
            </div>
          </div>

          <div className="mb-8 rounded-lg border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-light">Order History</h2>
            <div className="rounded-lg border border-dashed p-8 text-center">
              <p className="text-muted-foreground font-light">You haven't placed any orders yet.</p>
              <Button asChild className="mt-4 font-light">
                <Link href="/shop">Start Shopping</Link>
              </Button>
            </div>
          </div>

          <div className="mb-8 rounded-lg border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-light">Your Impact</h2>
            <p className="mb-4 text-muted-foreground font-light">
              Your purchases have helped fund medical care for those in need. Thank you for making a difference!
            </p>
            <div className="rounded-md bg-primary/10 p-4">
              <p className="font-medium text-center">You've helped fund approximately 0 medical treatments</p>
              <p className="mt-2 text-sm text-center text-muted-foreground font-light">
                Shop more to increase your impact!
              </p>
            </div>
          </div>

          <div className="text-center">
            <Button variant="outline" onClick={handleLogout} className="font-light">
              Log Out
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-16">
      <div className="mx-auto max-w-md">
        <h1 className="mb-8 text-3xl font-light tracking-wide text-center">My Account</h1>

        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login" className="font-light">
                Login
              </TabsTrigger>
              <TabsTrigger value="register" className="font-light">
                Register
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="mt-6">
              <form onSubmit={handleLogin}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="email" className="text-sm font-light">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="password" className="text-sm font-light">
                      Password
                    </label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="remember" className="h-4 w-4 rounded border-gray-300" />
                      <label htmlFor="remember" className="text-sm font-light">
                        Remember me
                      </label>
                    </div>
                    <a href="#" className="text-sm font-light text-primary hover:underline">
                      Forgot password?
                    </a>
                  </div>
                  <Button type="submit" className="w-full font-light">
                    Login
                  </Button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="register" className="mt-6">
              <form onSubmit={handleRegister}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="firstName" className="text-sm font-light">
                      First Name
                    </label>
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="lastName" className="text-sm font-light">
                      Last Name
                    </label>
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="registerEmail" className="text-sm font-light">
                      Email
                    </label>
                    <Input
                      id="registerEmail"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="registerPassword" className="text-sm font-light">
                      Password
                    </label>
                    <Input
                      id="registerPassword"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="terms" className="h-4 w-4 rounded border-gray-300" required />
                    <label htmlFor="terms" className="text-sm font-light">
                      I agree to the{" "}
                      <a href="#" className="text-primary hover:underline">
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                  <Button type="submit" className="w-full font-light">
                    Register
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
