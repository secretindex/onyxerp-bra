'use server';

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = createClient(await cookies());
  const formData = await request.formData();

  try {
    console.log("formData", formData);

    const file = formData.get("file");
    console.log("file", file)
    const cidade = formData.get("cidade");
    const uf = formData.get("uf");

    if (!(file instanceof File) || !cidade || !uf) {
      return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });
    }

    const ext = file.name.split(".").pop() || "jpg";
    const fileName = `${uf}${String(cidade).replace(/\s+/g, "-").toLowerCase()}-${Date.now()}.${ext}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("clientes")
      .upload(fileName, file);

    console.log("uploadData", uploadData);
    console.log("uploadError", uploadError);

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const { data: urlData } = supabase.storage
      .from("clientes")
      .getPublicUrl(uploadData.path);

    const { data, error } = await supabase
      .from("images")
      .insert({ cidade, uf, image_url: urlData.publicUrl });

    console.log("data", data);
    console.log("error", error);

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({ message: "Imagem adicionada com sucesso" }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: "Erro ao adicionar imagem" }, { status: 500 });
  }
}
