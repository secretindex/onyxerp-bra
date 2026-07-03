import Image from "next/image";
import BodyWithWallpapers from "@/components/BodyWithWallpapers";
import { AppsProvider } from "@/Context/AppsContext";
import Header from "@/components/Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <BodyWithWallpapers>
      <AppsProvider>
        <div className="h-dvh max-h-dvh flex flex-col justify-between p-4 md:p-6 lg:px-16 lg:py-6 text-white font-sans box-border overflow-hidden">
          <header className="w-full flex-shrink-0">
            <Header />
          </header>
          <main className="flex-1 flex flex-col justify-end items-center w-full min-h-0 my-4 md:my-6">
            <div className="w-full max-h-full overflow-y-auto pr-1">
              {children}
            </div>
          </main>
          <footer className="w-full flex-shrink-0 flex flex-col items-center">
            <a
              href="https://www.braconsultoria.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Image
                src="https://www.onyxerp.com.br/img/bra_logo_branco.6b32e208.svg"
                alt="OnyxERP"
                width={80}
                height={80}
                className="transition-transform duration-300 hover:scale-105"
              />
            </a>
            <div className="w-full mt-2">
              <p className="text-xs text-gray-300 text-center">
                © {new Date().getFullYear()} OnyxERP. Todos os direitos
                reservados.
              </p>
            </div>
          </footer>
        </div>
      </AppsProvider>
    </BodyWithWallpapers>
  );
}

export default Layout;