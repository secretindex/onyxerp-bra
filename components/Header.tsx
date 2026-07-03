import Image from "next/image"

const Header = () => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-4xl font-bold hidden">
        OnyxERP
      </h1>
      <a href="/">
        <Image
          src="https://static.onyxerp.com.br/img/logo-onyxerp-invertido.svg"
          alt="OnyxERP"
          width={120}
          height={80}
        />
      </a>
      <span className="text-xs text-gray-300">
        Soluções modernas para o serviço público
      </span>
    </div >
  )
}

export default Header
