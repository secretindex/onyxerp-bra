const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen w-full bg-linear-45 from-[#090909] via-[#111111] to-[#090909]  text-gray-100 flex flex-col">
      {children}
    </div>
  );
};

export default Layout;
