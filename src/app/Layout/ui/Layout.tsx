import Navbar from "@/pages/Navbar/Navbar";
import { FC } from "react";
import LeftSideMenuBar from "@/app/Layout/LeftSideMenuBar";
import Footer from "../Footer";

const Layout: FC = () => {
  return (
    <div className="admin-panel">
      <Navbar />
      <LeftSideMenuBar />
      <Footer />
    </div>
  );
};

export default Layout;
