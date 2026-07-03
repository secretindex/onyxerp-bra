import Image from "next/image";
import Header from "@/components/Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex flex-col flex-1 px-16 py-6 text-white font-sans">
      <section className="h-[calc(100vh-85px)] w-full flex flex-col justify-between items-start gap-2">
        <Header />
        <div className="m-auto">{children}</div>
        <div className="flex flex-col items-center w-full">
          <a
            href="https://www.braconsultoria.com.br/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="https://www.onyxerp.com.br/img/bra_logo_branco.6b32e208.svg"
              alt="OnyxERP"
              width={80}
              height={80}
              className="transition-transform duration-300 hover:scale-105 -my-2.5"
            />
          </a>
          <footer className="w-full mt-4">
            <p className="text-xs text-gray-300 text-center">
              © {new Date().getFullYear()} OnyxERP. Todos os direitos
              reservados.
            </p>
          </footer>
        </div>
      </section>
    </div>
  );
}

export default Layout;