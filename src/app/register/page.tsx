'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FormEvent } from "react"
import { register } from "@/app/services/authService"
import { toast, Toaster } from "sonner"
import { useRouter } from "next/navigation"

export default function Page() {
  const router = useRouter()
  const handleSubmit = async( e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirm-password") as string

    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem!")
      return
    }

    const payload  = { name, email, password }

    try {
      const res = await register(payload)
      router.push("/")
      toast.success("Conta criada com sucesso!")
    } catch (err: any) {
      if (err.response && err.response.data) {
        const message = err.response.data.message || "Erro ao registrar"
        toast.error(message)
      } else {
        toast.error("Erro inesperado. Tente novamente.")
      }
    }
  }
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <Toaster richColors position="bottom-right" />
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Criar uma conta</CardTitle>
          <CardDescription className="text-center">Preencha os dados abaixo para se registrar</CardDescription>
        </CardHeader>
        <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" name="name" placeholder="João" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" name="email" placeholder="seu@email.com" type="email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirmar senha</Label>
              <Input id="confirm-password" name="confirm-password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Criar conta
            </Button>
          </div>
        </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm">
            Já tem uma conta?{" "}
            <Link href="/" className="text-primary hover:underline">
              Entrar
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
