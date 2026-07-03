"use client";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { FormEvent, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useContext } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { refresh } from "next/cache";
import { LoginContext } from "@/Context/LoginContext";

export function LoginModal() {
  const supabase = createClient();
  const { setIsLogged } = useContext(LoginContext);
  const [loginData, setLoginData] = useState<{
    email: string;
    password: string;
  } | null>(null);

  async function signInWithEmail() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginData!.email,
      password: loginData!.password,
    });

    console.log("Login response:", { data, error });

    if (error) {
      toast.error(error.message);
    } else {
      setIsLogged(true);
      refresh();
    }
  }

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!loginData?.email && !loginData?.password) {
      toast.error("Por favor, insira todos os dados requeridos");
      return;
    }

    signInWithEmail();
  };

  return (
    <Card className="w-full max-w-sm bg-[#191919] border border-[#333] text-primary-content">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Login para OnyxERP
        </CardTitle>
        <CardDescription className="text-xs">
          Acesse o painel administrativo do OnyxERP com suas credenciais.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-xs font-light">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                onChange={(e) =>
                  setLoginData((prev: any) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password" className="text-xs font-light">
                  Password
                </Label>
              </div>
              <Input
                id="password"
                type="password"
                required
                placeholder="*******"
                onChange={(e) =>
                  setLoginData((prev: any) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <div>
            <Button
              type="submit"
              variant="outline"
              className="w-full bg-secondary text-primary border-[#333] hover:bg-[#333] hover:text-accent-foreground"
            >
              Login
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
