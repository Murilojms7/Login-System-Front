"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast, Toaster } from "sonner";
import { FormEvent } from "react";
import { login } from "./services/authService";
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
   const handleSubmit = async( e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
  
      const formData = new FormData(e.currentTarget)
      const payload = {
        email: formData.get("email") as string,
        password: formData.get("password") as string
      }
      if(!payload.email || !payload.password){
        toast.error("Todos os campos são obrigatórios!")
        return
      }
    
      try {
        await login(payload)
        router.push("/main") // Mudar para a pagina que deseja que seja redirecionado 
        toast.success("login efetuado com sucesso!")
      } catch (err: any) {
        if (err.response && err.response.data) {
          const message = err.response.data.message || "Erro ao logar"
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
          <CardTitle className="text-2xl font-bold text-center">Entrar</CardTitle>
          <CardDescription className="text-center">Digite seu e-mail e senha para acessar sua conta</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" name="email" placeholder="seu@email.com" type="email"  />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>
                  <Link href="/recuperar-senha" className="text-sm text-primary hover:underline">
                    Esqueceu a senha?
                  </Link>
                </div>
                <Input id="password" name="password" type="password"  />
              </div>
              <Button type="submit" className="w-full">
                Entrar
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm">
            Não tem uma conta?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Registre-se
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
