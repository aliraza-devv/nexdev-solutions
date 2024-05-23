import Image from "next/image";
import Logo from "../Assets/Logos/nexdev-logo-full.png";

export default function Home() {
  return (
    <main className="flex w-[100vw] h-[100vh] flex-col items-center p-24 bg-[#1a1728]">
      <Image src={Logo} alt="Nexdev Solutions Logo" width={250} height={250} />
      <h1 className="text-[#f5f5f5] font-extrabold text-6xl">Launching Soon</h1>
      <div className="🤚 mt-16">
        <div className="👉"></div>
        <div className="👉"></div>
        <div className="👉"></div>
        <div className="👉"></div>
        <div className="🌴"></div>
        <div className="👍"></div>
      </div>
    </main>
  );
}
