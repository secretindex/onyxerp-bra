"use client";

import { LoginModal } from "@/components/LoginModal";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { useContext, useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { LoginContext } from "@/Context/LoginContext";

const Admin = () => {
  const { isLogged, setIsLogged } = useContext(LoginContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setIsLogged(true);
        setIsLoading(false);
      }

      setIsLoading(false);
    };

    checkUser();
  }, []);

  const signOut = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error(error.message);
    }

    redirect("/")
  };

  if (isLoading && !isLogged) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner className="size-8" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background w-full flex flex-col justify-around items-center gap-4 px-16 py-6 font-sans">
      {!isLogged ? (
        <LoginModal />
      ) : (
        <div className="w-full flex flex-col justify-between items-center gap-10 px-16 font-sans">
          <div>
            <h1 className="text-2xl font-bold">Admin Page</h1>
            <p className="text-sm text-center">
              Bem vindo ao Admin do OnyxERP. Aqui você pode gerenciar sua
              aplicação.
            </p>
          </div>
          <div className="flex w-full max-w-md flex-col gap-4">
            <Item variant="outline">
              <ItemContent>
                <ItemTitle>Imagens de Fundo</ItemTitle>
                <ItemDescription className="text-xs">
                  Adicionar mais imagens de fundo para página inicial.
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => redirect("/admin/images")}
                >
                  Acessar
                </Button>
              </ItemActions>
            </Item>
            <Item variant="outline">
              <ItemContent>
                <ItemTitle>Clientes de Folha</ItemTitle>
                <ItemDescription>
                  Adicionar mais um cliente de folha.
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => redirect("/admin/fopag_clientes")}
                >
                  Acessar
                </Button>
              </ItemActions>
            </Item>
            <Item variant="outline">
              <ItemContent>
                <ItemTitle>Clientes de FlowDocs</ItemTitle>
                <ItemDescription>
                  Adicionar mais um cliente de FlowDocs.
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => redirect("/admin/flowdocs_clientes")}
                >
                  Acessar
                </Button>
              </ItemActions>
            </Item>
            <Item variant="outline">
              <ItemContent>
                <ItemTitle>Clientes de SGM</ItemTitle>
                <ItemDescription>
                  Adicionar mais um cliente de SGM.
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => redirect("/admin/sgm_clientes")}
                >
                  Acessar
                </Button>
              </ItemActions>
            </Item>
          </div>
          <footer className="w-2/4 flex flex-col justify-center gap-2">
            <p className="text-xs text-gray-300 text-center">
              © {new Date().getFullYear()} OnyxERP. Todos os direitos
              reservados.
            </p>
            <a
              href="#"
              onClick={signOut}
              className="text-xs mx-auto text-center text-muted-foreground hover:text-primary transition-all ease-in-out underline"
            >
              Logout
            </a>
          </footer>
        </div>
      )}
    </div>
  );
};

export default Admin;
