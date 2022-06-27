import Image from "next/image";

const Spinner = () => {
  return (
    <Image
      src="/universe.svg"
      className="motion-safe:animate-spin"
      alt="Uni-verse user avatar"
      width={60}
      height={60}
    />
  );
};
export default Spinner;
