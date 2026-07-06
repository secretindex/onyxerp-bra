"use client";
import Image from "next/image";

const Digitalprev = () => {
  return (
    <section className="w-full max-w-lg flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold text-center">DigitalPrev</h1>
      <div className="flex flex-col gap-4 w-full items-center">
        <label htmlFor="sgm" className="text-sm text-gray-300">
          Baixe o aplicativo:
        </label>
        <div className="flex gap-8">
          <div className="flex flex-col gap-4 justify-center shadow-md items-center rounded-md bg-card p-8">
            <Image
              src="/android_digitalprev.png"
              className="rounded-md"
              alt="digitalprev"
              width={180}
              height={180}
            />
            <div>
              <a href="https://play.google.com/store/apps/details?id=br.srv.futuratec&hl=pt_BR">
                <Image
                  src={"/getongplay.png"}
                  alt="baixar na google play"
                  width={120}
                  height={24}
                />
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-4 justify-center shadow-md items-center rounded-md bg-card p-8">
            <Image
              src="/ios_digitalprev.png"
              className="rounded-md"
              alt="digitalprev"
              width={180}
              height={180}
            />
            <div>
              <a href="https://apps.apple.com/br/app/digitalprev/id1626739012">
                <Image
                  src={"/baixar_appstore.svg"}
                  alt="baixar na app store"
                  width={120}
                  height={24}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Digitalprev;
