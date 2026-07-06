"use client";

import {
  Select,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Field, FieldLabel } from "@/components/ui/field";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

const Flowdocs = () => {
  const supabase = createClient();
  const [flowdocsClientes, setFlowdocsClientes] = useState<Array<any>>([]);

  useEffect(() => {
    const fetchFlowdocsClients = async () => {
      const { data, error } = await supabase
        .from("flowdocs_clientes")
        .select("*");

      if (error) {
        console.error("Error fetching Flowdocs Clients:", error);
      } else {
        setFlowdocsClientes(data as Array<any>);
        console.log("Fetched clients:", data);
      }
    };
    fetchFlowdocsClients();
  }, []);

  return (
    <section className="w-full max-w-lg flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold text-center">FlowDocs</h1>
      <div className="flex flex-col gap-4 w-full items-center">
        <label htmlFor="sgm" className="text-sm text-gray-300">
          Selecione o município:
        </label>
        <Field className="w-full">
          <FieldLabel className="text-xs">Estado</FieldLabel>
          <Select
            onValueChange={(value) => {
              if (value === "") return;

              if (value.includes("://")) {
                window.location.href = value;
              } else {
                const newUrl = `https://${value}/`;
                window.location.href = newUrl;
              }
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione o Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="">Selecione</SelectItem>
                {flowdocsClientes?.map((cliente) => {
                  return (
                    <SelectItem key={cliente.id} value={`${cliente.url}`}>
                      {`${cliente.cidade}, ${cliente.uf}`}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
      </div>
    </section>
  );
};

export default Flowdocs;
