import Image from "next/image";
import cn from "classnames";
import Link from "next/link";
import Button from "../UI/Button";
import { useImageEditorContext } from "@/context/ImageEditorContext";

const ImageCard = ({
  image = "",
  resolution = "",
  imageUrl = "",
  imageIndex = 0,
}) => {
  const { state, dispatch } = useImageEditorContext();

  const UpdateImageSelected = (imageIndex: number) => {
    dispatch({ type: "imageSelected", payload: imageIndex });
  };

  return (
    <div className="grid border border-white rounded">
      <div
        className={cn("bg-white", {
          "w-72 h-72": !resolution,
          "w-[800px] h-[600px]": resolution === "800x600",
        })}
      >
        <div
          style={{ width: "100%", height: "100%", position: "relative" }}
        >
          <Image className="rounded" src={image} alt={"image Test"} fill />
        </div>
      </div>
      {imageUrl && (
        <div className="flex flex-row flex-wrap justify-center p-2 gap-4">
          <Link href={`/image-editor/${imageUrl}`}>
            <Button
              text="Edit"
              action={() => UpdateImageSelected(imageIndex)}
            />
          </Link>
          <Button text="Request edit" />
        </div>
      )}
    </div>
  );
};

export default ImageCard;
