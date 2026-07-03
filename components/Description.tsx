"use client";

import { AppsContext } from "@/Context/AppsContext";
import { useContext } from "react";

const Description = () => {
  const { apps } = useContext(AppsContext);

  return (
    <section className={`flex flex-col gap-2 `}>
      {apps.name ? (
        <div>
          <h3
            className={`text-md font-semibold transition-all duration-300 ${apps.name ? "opacity-100" : "opacity-0"}`}
          >
            Sobre a {apps.name}
          </h3>
          <p
            className={`text-sm text-gray-300 transition-all duration-300 ${apps.name ? "opacity-100" : "opacity-0"}`}
          >
            {apps.description}
          </p>
        </div>
      ) : (
        <div>
          <h2 className="text-md font-semibold">Sobre os Aplicativos</h2>
          <p className="text-sm text-gray-300">
            Selecione um aplicativo para ver mais informações sobre ele.
          </p>
        </div>
      )}
    </section>
  );
};

export default Description;
