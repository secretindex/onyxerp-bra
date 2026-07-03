'use server';

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = createClient(await cookies());
  try {
    const { estado, municipio, link } = await request.json();

    console.log("estado", estado);
    console.log("municipio", municipio);
    console.log("link", link);

    const { data, error } = await supabase
      .from("sgm_clientes")
      .insert({ uf: estado, cidade: municipio, url: link });

    console.log("data", data);
    console.log("error", error);

    return NextResponse.json({ message: "Cliente de SGM adicionado com sucesso" }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: "Erro ao adicionar cliente de SGM" }, { status: 500 });
  }
}
