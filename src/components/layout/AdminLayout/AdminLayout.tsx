import React from "react";
import AdminSidebar from "./AdminSidebar/AdminSidebar";

export default function AdminLayout({ children }: any) {
  const [open, setOpen] = React.useState(true);

  React.useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true),
    );
  }, []);

  return (
    <section className="flex h-fit w-full">
      <AdminSidebar open={open} onClose={() => setOpen(false)} />
      <div className="h-full w-full bg-zinc-100 ">
        <main
          className={`mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px] scroll-smooth overflow-x`}
        >
          {children}
        </main>
      </div>
    </section>
  );
}
