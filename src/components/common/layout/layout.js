import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";
import clsx from "clsx";
import { ContextProvider } from "../../../context/context";

export default function Layout({ children, navbar = true, footer = true }) {
  return (
    <>
      <ContextProvider>
        {navbar ? <Navbar /> : <></>}
        <main>{children}</main>
        {footer ? <Footer /> : <></>}
      </ContextProvider>
    </>
  );
}
