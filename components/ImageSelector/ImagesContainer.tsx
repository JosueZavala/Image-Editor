import { useEffect, useState } from "react";
import ImageCard from "./ImageCard";
import { ArrayImages, IMAGES_LINKS_MAP } from "@/data/constans";
import { useImageEditorContext } from "@/context/ImageEditorContext";

const ImagesContainer = () => {
  const [imagesCards, setImagesCards] = useState<JSX.Element[]>([]);
  const { state, dispatch } = useImageEditorContext();

  useEffect(() => {
    if (!ArrayImages) return;

    const { imagesEdited } = state;
    const arrayIds = imagesEdited?.map((element) => element.arrayId);
    console.log(arrayIds);

    const newImagesCards = ArrayImages.map((imageUrl, index) => {
      let imageEditedData;
      if (arrayIds?.includes(index)) {
        const imageInfo = imagesEdited?.find(
          (element) => element.arrayId === index
        );
        imageEditedData = imageInfo.imageData;
        console.log(imageEditedData);
      }
      return (
        <ImageCard
          key={`imageCard_${index}`}
          image={IMAGES_LINKS_MAP[imageUrl]}
          imageUrl={imageUrl}
          imageIndex={index}
          edited={arrayIds?.includes(index) || false}
          imageEditedData={imageEditedData}
        />
      );
    });

    setImagesCards(newImagesCards);
  }, []);

  return (
    <div className="flex flex-row flex-wrap justify-center gap-4">
      {imagesCards}
    </div>
  );
};

export default ImagesContainer;
