"use client";

import { Field, FieldLabel } from "@/components/ui/field";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import { BaseSyntheticEvent, useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { ArrowLeft, ImageIcon, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";

function EstadoSelect() {
  const [selectedState, setSelectedState] = useState<string>("");

  const [stateUf, setStateUf] = useState<string>("");
  const [municipioFullName, setMunicipioFullName] = useState<string>("");

  const [estados, setEstados] = useState<Array<any>>();
  const [municipios, setMunicipios] = useState<Array<any>>();

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetImage = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setImageFile(null);
    setPreviewUrl(null);
  };

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Selecione um arquivo de imagem válido");
      return;
    }
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleAddImage = async (e: BaseSyntheticEvent) => {
    e.preventDefault();

    if (!municipioFullName || !stateUf) {
      toast.error("Selecione o estado e o município");
      return;
    }

    if (!imageFile) {
      toast.error("Selecione uma imagem");
      return;
    }

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("cidade", municipioFullName);
    formData.append("uf", stateUf);

    try {
      const response = await axios.post("/api/images", formData);
      if (response.status === 200 && response.data.data) {
        toast.success("Imagem adicionada com sucesso");
        resetImage();
        setMunicipioFullName("");
        setStateUf("");
        setSelectedState("");
      }
    } catch {
      toast.error("Erro ao adicionar imagem");
    }
  };

  useEffect(() => {
    if (estados && estados.length > 0) return;
    axios
      .get("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then((res) => {
        console.log(res.data);
        setEstados(res.data);
      });
  }, []);

  useEffect(() => {
    if (estados && estados.length > 0) return;
    axios
      .get("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then((res) => {
        setEstados(res.data);
      });
  }, [estados]);

  useEffect(() => {
    if (!selectedState) {
      setMunicipios([]);
      return;
    }

    axios
      .get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedState}/municipios`,
      )
      .then((res) => {
        setMunicipios(res.data);
      })
      .catch((err) => console.error("Erro ao buscar municípios", err));
  }, [selectedState]);

  return (
    <section className="flex flex-col gap-2 w-full bg-card">
      <div className="w-full flex gap-2">
        <Field className="w-full">
          <FieldLabel className="text-xs">Estado</FieldLabel>
          <Select
            onValueChange={(value) => {
              setSelectedState(value.split("*")[0]);
              setStateUf(value.split("*")[1]);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {estados?.map((estado) => {
                  return (
                    <SelectItem
                      key={estado.id}
                      value={`${estado.id}*${estado.sigla}`}
                      onChange={() => setSelectedState(estado.id as string)}
                    >
                      {estado.nome}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
        <Field className="w-full">
          <FieldLabel className="text-xs">Município</FieldLabel>
          <Select
            disabled={!selectedState}
            onValueChange={(value) => setMunicipioFullName(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o Município" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {municipios?.map((municipio) => {
                  return (
                    <SelectItem key={municipio.id} value={municipio.nome}>
                      {municipio.nome}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
      </div>
      <Field className="w-full">
        <FieldLabel className="text-xs">Imagem</FieldLabel>
        <div
          role="button"
          tabIndex={0}
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click();
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setIsDragging(false);
          }}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            const file = e.dataTransfer.files[0];
            if (file) handleFileSelect(file);
          }}
          className={cn(
            "flex min-h-32 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-input px-4 py-6 text-center transition-colors",
            isDragging && "border-ring bg-accent/50",
            previewUrl && "border-solid",
          )}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileSelect(file);
              e.target.value = "";
            }}
          />
          {previewUrl ? (
            <>
              <img
                src={previewUrl}
                alt="Pré-visualização"
                className="max-h-40 max-w-full rounded-md object-contain"
              />
              <p className="text-xs text-muted-foreground">
                {imageFile?.name} — clique ou arraste para trocar
              </p>
            </>
          ) : (
            <>
              <Upload className="size-6 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Arraste uma imagem aqui ou clique para selecionar
              </p>
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                <ImageIcon className="size-3.5" />
                PNG, JPG ou WEBP
              </p>
            </>
          )}
        </div>
      </Field>
      <Field>
        <Button onClick={handleAddImage}>Adicionar</Button>
      </Field>
    </section>
  );
}

const ImagesPage = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col gap-4 w-2/5 bg-card p-6 border border-border shadow-lg rounded-md">
        <div>
          <Button onClick={() => redirect("/admin")} variant={"outline"}>
            <ArrowLeft />
          </Button>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Imagens</h1>
          <p className="text-xs">
            Adicione as imagens de fundo da página inicial
          </p>
        </div>
        <div className="flex gap-2">
          <EstadoSelect />
        </div>
      </div>
    </section>
  );
};

export default ImagesPage;
