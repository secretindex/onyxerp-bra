"use client";

import { App } from "@/Context/AppsContext";
import { useContext } from "react";
import { AppsContext } from "@/Context/AppsContext";

import {
  CircleUser,
  ListCheck,
  IdCardLanyard,
  FileCog,
  FilePen,
  Landmark,
  HandCoins,
  BanknoteArrowUp,
  ChartNoAxesCombined,
} from "lucide-react";

import { redirect } from "next/navigation";

const apps: App[] = [
  {
    id: 1,
    name: "Social",
    icon: <CircleUser size={24} />,
    url: "https://www.onyxerp.com.br/Social/",
    description: "Gerenciamento de cadastros de pessoas do RPPS",
  },
  {
    id: 2,
    name: "Processos",
    icon: <FilePen size={24} />,
    url: "https://www.onyxerp.com.br/Processos/",
    description:
      "Gestão de processos, simulações de benefícios e parametrização de leis",
  },
  {
    id: 3,
    name: "GIR",
    icon: <BanknoteArrowUp size={24} />,
    url: "https://www.onyxerp.com.br/Gir/",
    description:
      "Gestão de Guias de Recolhimento, tratamento e leitura de dados com IA",
  },
  {
    id: 4,
    name: "Recad",
    icon: <ListCheck size={24} />,
    url: "https://www.onyxerp.com.br/Recad/",
    description:
      "Tratamento e higienização de Cadastros do Censo Previdenciário",
  },
  {
    id: 5,
    name: "Fopag",
    icon: <HandCoins size={24} />,
    url: "/fopag",
    description:
      "Gestão de folhas de pagamento através do Sistema SIP 7.0 da Fiorilli",
  },
  {
    id: 6,
    name: "SGM",
    icon: <ChartNoAxesCombined size={24} />,
    url: "/sgm",
    description:
      "Sistemas de Gestão Municipal para prefeituras e órgãos públicos",
  },
  {
    id: 7,
    name: "Flowdocs",
    icon: <FileCog size={24} />,
    url: "/flowdocs",
    description: "Gestão de documentos e fluxos para prefeitura",
  },
  {
    id: 8,
    name: "Conselho",
    icon: <Landmark size={24} />,
    url: "https://www.onyxerp.com.br/Conselho/",
    description: "Gestão de conselhos e órgãos",
  },
  {
    id: 9,
    name: "Cadastro",
    icon: <IdCardLanyard size={24} />,
    url: "https://www.onyxerp.com.br/Cadastro/",
    description: "Cadastro de pessoas do RPPS (Uso exclusivo de Guarulhos)",
  },
];

const List = () => {
  const { setApps } = useContext(AppsContext);

  return (
    <div>
      <div className="flex gap-4 w-full overflow-x-auto py-4 scrollbar-none">
        {apps.map((app) => (
          <div
            key={app.id}
            className="flex flex-col gap-2 items-center text-md"
          >
            <div
              onClick={() => redirect(app.url)}
              className="flex-1 rounded-full border cursor-pointer border-ring p-4 hover:bg-white/10 transition-colors"
              onMouseOver={() => {
                setApps({
                  name: app.name,
                  description: app.description,
                });
              }}
            >
              {app.icon}
            </div>
            <span className="text-sm font-medium text-center">{app.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
