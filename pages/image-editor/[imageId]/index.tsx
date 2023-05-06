import ImageEditorContainer from "@/components/ImageEditor/ImageEditor";
import ImageCard from "@/components/ImageSelector/ImageCard";
import { ArrayImages, IMAGES_DOMAIN } from "@/data/constans";
import Image from "next/image";

export default function ImageEditor(props: any) {
  return (
    <main className="m-8 p-8">
      <h1 className="text-4xl p-4">Edit your Image</h1>
      <section className="grid grid-flow-col auto-cols-auto gap-4 p-4 bg-blue-200 ">
        {/* <div className="grid justify-items-center">
          <ImageCard
            image={`${IMAGES_DOMAIN}${props.imageId}`}
            resolution={"800x600"}
          />
        </div> */}
        <ImageEditorContainer imageId={props.imageId} />
      </section>
    </main>
  );
}

export async function getStaticPaths() {
  return {
    paths: ArrayImages.map((imageUrl) => ({
      params: { imageId: imageUrl },
    })),
    fallback: true,
  };
}

export async function getStaticProps(context: any) {
  const imageId = context.params.imageId;

  return {
    props: {
      imageId,
    },
  };
}
