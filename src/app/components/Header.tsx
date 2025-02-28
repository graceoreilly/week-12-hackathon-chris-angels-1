import Image from "next/image";
import conevibesicon from "../../../public/conevibesicon.png";
import conevibeslogo from "../../../public/conevibeslogo.png";
import c1 from "../../../public/c1.png";
import v1 from "../../../public/v1.png";
import pinealexa from "../../../public/pinealexa.png"
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
      <div style={{ margin: '0 100px' }}> {/* Adjust margin as needed */}
      </div>
      <Image
        src={c1}
        alt="c1"
        width="110"
        height="110"
        className="ml-3 jitter2"
      />
      <div style={{ margin: '0 0.5px' }}> {/* Adjust margin as needed */}
      </div>
      
      <Image
        src={v1}
        alt="v1"
        width="110"
        height="110"
        className="ml-3 jitter1"
      />
      <div style={{ margin: '0 100px' }}> {/* Adjust margin as needed */}
      </div>
      <Image
       src={conevibesicon}
       alt="conevibes-icon"
       width="230"
       height="80"
       className="ml-3 pulse2"
      />
    </header>
  );
}
