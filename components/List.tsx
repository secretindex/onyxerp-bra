"use client";

import { App } from "@/Context/AppsContext";
import { useContext } from "react";
import { AppsContext } from "@/Context/AppsContext";

import PeopleIcon from '@mui/icons-material/People';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import ChromeReaderModeIcon from "@mui/icons-material/ChromeReaderMode"
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

import Image from "next/image";

import {
  IdCardLanyard,
  ChartNoAxesCombined,
} from "lucide-react";

import { redirect } from "next/navigation";

const apps: App[] = [
  {
    id: 1,
    name: "Social",
    icon: <PeopleIcon />,
    url: "https://www.onyxerp.com.br/Social/",
    description: "Gerenciamento de cadastros de pessoas do RPPS",
  },
  {
    id: 2,
    name: "Processos",
    icon: <Image alt="Processos" src="https://storage3.onyxerp.com.br/logo_processos_bra_branco.png" width={12} height={12} className="" />,
    url: "https://www.onyxerp.com.br/Processos/",
    description:
      "Gestão de Simulação e Concessão de Benefícios",
  },
  {
    id: 3,
    name: "GIR",
    icon: <Image alt="GIR" src="https://onyxerp.s3.us-east-2.amazonaws.com/logo-gir.png" height={24} width={24} className="material-icons" />,
    url: "https://www.onyxerp.com.br/Gir/",
    description:
      "Gestão de Guias de Recolhimento, tratamento e leitura de dados com IA",
  },
  {
    id: 4,
    name: "Recad",
    icon: <DoneAllIcon />,
    url: "https://www.onyxerp.com.br/Recad/",
    description:
      "Tratamento e higienização de Cadastros do Censo Previdenciário",
  },
  {
    id: 5,
    name: "Fopag",
    icon: <Image src="https://onyxerp.s3.us-east-2.amazonaws.com/logo-fopag.png" alt="fopag" width={24} height={24} />,
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
      "Sistemas analítico de dados da Folha de Pagamento",
  },
  {
    id: 7,
    name: "Flowdocs",
    icon: <ChromeReaderModeIcon />,
    url: "/flowdocs",
    description: "Gestão de documentos e fluxos",
  },
  {
    id: 8,
    name: "Conselho",
    icon: <AccountBalanceIcon />,
    url: "https://www.onyxerp.com.br/Conselho/",
    description: "Gestão para eleição de membros de conselhos",
  },
  {
    id: 9,
    name: "Cadastro",
    icon: <AssignmentIndIcon />,
    url: "https://www.onyxerp.com.br/Cadastro/",
    description: "Cadastro de segurados do RPPS (Uso exclusivo de Guarulhos)",
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
              className="w-18 h-18 shrink-0 rounded-full border border-white/20 bg-transparent flex items-center justify-center cursor-pointer hover:bg-white/10 hover:border-white/40 transition-all duration-300"
              onMouseOver={() => {
                setApps({
                  name: app.name,
                  description: app.description,
                });
              }}
            >
              <div className="flex items-center justify-center [&_svg]:size-6 [&_img]:size-6 [&_img]:object-contain">
                {app.icon}
              </div>
            </div>
            <span className="text-sm font-medium text-center">{app.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
