import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

export default function Layout() {
  return (
    <>
   <div className="flex flex-col min-h-screen">
  <Navbar className="w-full" />

  <main className="container mx-auto flex-1 px-4 xl:w-[90%] max-w-6xl">
    <Outlet />
  </main>

  <Footer className="w-full" />
</div>

    </>
  )
}
