import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";
import MainNav from "./MainNav";

function Header() {
  return (
    <>
      <div className="border-b-2 border-b-orange-500 py-6 m-5">
        <div className="container mx-auto flex justify-between items-center">
          <Link to={"/"} className="text-title font-bold tracking-tight ">
            Company.com
          </Link>
          <div className="md:hidden">
            <MobileNav />
          </div>
          <div className="hidden md:block">
            <MainNav />
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;