import { Outlet } from "react-router-dom";
import AnnouncementBar from "./AnnouncementBar";
import Navbar from "./Navbar";
import CategoryBar from "./CategoryBar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <div className="sticky top-0 z-40">
        <Navbar />
        <CategoryBar />
      </div>
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
