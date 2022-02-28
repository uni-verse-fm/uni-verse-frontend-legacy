import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-black w-full h-full flex flex-col">
      <div className="w-full flex flex-col m-16">
        <h1 className="text-grn">Hot releases</h1>
        <div className="flex flex-row">
          <div className="w-1/2">
            <h2 className="text-gry"> Blackk sabbath - God is Dead</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
