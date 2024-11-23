import Image from "next/image";
import Load from "../../../public/Assets/Animation/Cube Loading Animated 3D Icon.gif";

const Loader = () => {
  return (
    <>
      <section>
        <h1 className="text-[#5c45fd] heading-primary">NeXDev Solutions</h1>
        {/* <div className="loading loading05">
          <span className="text-[#5c45fd] heading-primary">N</span>
          <span className="text-[#5c45fd] heading-primary">e</span>
          <span className="text-[#5c45fd] heading-primary">X</span>
          <span className="text-[#5c45fd] heading-primary">D</span>
          <span className="text-[#5c45fd] heading-primary">e</span>
          <span className="text-[#5c45fd] heading-primary">v</span>
        </div> */}
      </section>
      {/* <div className="🤚">
        <div className="👉"></div>
        <div className="👉"></div>
        <div className="👉"></div>
        <div className="👉"></div>
        <div className="🌴"></div>
        <div className="👍"></div>
      </div> */}
      <Image src={Load} width={360} height={360} alt="Loader" />
    </>
  );
};

export default Loader;
