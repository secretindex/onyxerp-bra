"use client";

import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { redirect } from "next/navigation";
import { refresh } from "next/cache";

function EstadoSelect() {
  const [selectedState, setSelectedState] = useState<string>("");
  const [stateUf, setStateUf] = useState<string>("");
  const [municipioFullName, setMunicipioFullName] = useState<string>("");
  const [link, setLink] = useState<string>("");

  const [estados, setEstados] = useState<Array<any>>();
  const [municipios, setMunicipios] = useState<Array<any>>();

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

  const handleAddFlowdocsClient = () => {
    axios
      .post("/api/flowdocs", {
        estado: stateUf,
        municipio: municipioFullName,
        link: link,
      })
      .then((res) => {
        setSelectedState("");
        setStateUf("");
        setMunicipioFullName("");
        setLink("");

        toast.success("Cliente de FlowDocs adicionado com sucesso");

        refresh();
      })
      .catch((err) =>
        toast.error("Erro ao adicionar cliente de FlowDocs", err),
      );
  };

  return (
    <section className="flex flex-col gap-2 w-full bg-card">
      <div className="w-full flex flex-col sm:flex-row gap-2">
        <Field className="w-full">
          <FieldLabel className="text-xs">Estado</FieldLabel>
          <Select
            onValueChange={(value) => {
              setSelectedState(value.split("*")[0]);
              setStateUf(value.split("*")[1]);
            }}
          >
            <SelectTrigger className="w-full">
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
            <SelectTrigger className="w-full">
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
        <FieldLabel className="text-xs">Link</FieldLabel>
        <Input
          type="text"
          placeholder="Adicione o link de acesso"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
      </Field>
      <Field className="w-full">
        <Button onClick={handleAddFlowdocsClient} className="w-full">
          Adicionar
        </Button>
      </Field>
    </section>
  );
}

const FlowdocsClientesPage = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center w-full items-center px-4 py-8">
      <div className="flex flex-col gap-4 w-full sm:w-4/5 md:w-3/5 lg:w-2/5 max-w-xl bg-card p-6 border border-border shadow-lg rounded-md">
        <div>
          <Button onClick={() => redirect("/admin")} variant={"outline"}>
            <ArrowLeft />
          </Button>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Clientes de FlowDocs</h1>
          <p className="text-xs">Adicione um novo cliente de FlowDocs</p>
        </div>
        <div className="flex gap-2">
          <EstadoSelect />
        </div>
      </div>
    </section>
  );
};

export default FlowdocsClientesPage;
