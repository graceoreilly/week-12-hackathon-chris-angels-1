import Image from "next/image";
import conevibesicon from "../../../public/conevibesicon.png";
import conevibeslogo from "../../../public/conevibeslogo.png";
import  "./header.css"

export default function Header({ className }: { className?: string }) {
  return (
    <header
      className={`flex items-center justify-center text-gray-200 text-2xl ${className}`}
      style={{ backgroundColor: "#C0F1ED" }}
    >
      <Image
        src={conevibesicon}
        alt="conevibes-icon"
        width="230"
        height="80"
        className="ml-3 pulse1"
      />
      <div style={{ margin: '0 300px' }}> {/* Adjust margin as needed */}
      </div>
      <Image
       src={conevibesicon}
       alt="conevibes-icon"
       width="230"
       height="50"
       className="ml-3 pulse2"
      />
    </header>
  );
}
