import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { Toaster } from "@/components/ui/sonner";
import { PropsType } from "@/types/types";

function Structure({ children }: PropsType) {
  return (
    <>
      <div className="text-heading">
        <Header />
      </div>
      <div className="h-screen bg-background text-mainHeading">{children}</div>
      <Toaster />
      <Footer />
    </>
  );
}

export default Structure;
