import ImageEditorContainer from "@/components/ImageEditor/ImageEditor";
import { ArrayImages } from "@/data/constans";

export default function ImageEditor(props: any) {
  return (
    <main className="m-8 p-8">
      <h1 className="text-4xl p-4">Edit your Image</h1>
      <section className="grid grid-flow-col auto-cols-auto gap-4 p-4 bg-blue-200 w-fit">
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
