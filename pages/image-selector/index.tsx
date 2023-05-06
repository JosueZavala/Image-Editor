import { Inter } from "next/font/google";
import ImagesContainer from "@/components/ImageSelector/ImagesContainer";

const inter = Inter({ subsets: ["latin"] });

export default function ImageEditor() {
  return (
    <main className="m-8 p-8">
      <h1 className="text-4xl p-4">Select an Image</h1>
      <section className="p-4 bg-blue-200">
        <ImagesContainer />
      </section>
    </main>
  );
}
