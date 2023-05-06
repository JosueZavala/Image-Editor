import { useEffect, useState } from "react";
import ImageCard from "./ImageCard";
import { ArrayImages, IMAGES_DOMAIN, IMAGES_LINKS_MAP } from "@/data/constans";
import Link from "next/link";

const ImagesContainer = () => {
  const [imagesCards, setImagesCards] = useState<JSX.Element[]>([]);

  useEffect(() => {
    if (!ArrayImages) return;

    const newImagesCards = ArrayImages.map((imageUrl, index) => (
      <Link href={`/image-editor/${imageUrl}`} key={`LinkImageCard_${index}`}>
        <ImageCard
          key={`imageCard_${index}`}
          image={IMAGES_LINKS_MAP[imageUrl]}
          imageUrl={imageUrl}
        />
      </Link>
    ));

    setImagesCards(newImagesCards);
  }, []);

  return (
    <div className="flex flex-row flex-wrap justify-center gap-4">
      {imagesCards}
    </div>
  );
};

export default ImagesContainer;
