import $ from "jquery";
import NextImage from "next/image";
import cn from "classnames";
import Link from "next/link";
import Button from "../UI/Button";
import { useImageEditorContext } from "@/context/ImageEditorContext";
import { FC, useEffect } from "react";

type ImageCardProps = {
  image: string;
  resolution?: string;
  imageUrl: string;
  imageIndex: number;
  edited?: boolean;
  imageEditedData?: any;
};

const ImageCard: FC<ImageCardProps> = ({
  image = "",
  resolution = "",
  imageUrl = "",
  imageIndex = 0,
  edited = false,
  imageEditedData,
}) => {
  const { state, dispatch } = useImageEditorContext();

  const UpdateImageSelected = (imageIndex: number) => {
    dispatch({ type: "imageSelected", payload: imageIndex });
  };

  useEffect(() => {
    if (edited && imageEditedData) {
      const canvasElement = document.getElementById(`canvas_${imageIndex}`);
      const canvas = canvasElement as HTMLCanvasElement;
      const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

      canvas.width = imageEditedData.width;
      canvas.height = imageEditedData.height;
      ctx.putImageData(imageEditedData, 0, 0);

      const imageObject = new Image();
      imageObject.onload = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.scale(0.5, 0.5);
        ctx.drawImage(imageObject, 0, 0);
      };
      imageObject.src = canvas.toDataURL();
    }
  }, [edited]);

  return (
    <div className="grid border border-white rounded">
      <div
        className={cn("bg-white", {
          "w-72 h-72": !resolution,
          "w-[800px] h-[600px]": resolution === "800x600",
        })}
      >
        {!edited && (
          <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <NextImage
              className="rounded"
              src={image}
              alt={"image Test"}
              fill
            />
          </div>
        )}
        {edited && (
          <canvas
            id={`canvas_${imageIndex}`}
            className="border border-white rounded "
          ></canvas>
        )}
      </div>
      {imageUrl && (
        <div className="flex flex-row flex-wrap justify-center p-2 gap-4">
          <Link href={`/image-editor/${imageUrl}`}>
            <Button
              text="Edit"
              action={() => UpdateImageSelected(imageIndex)}
            />
          </Link>
          {/* <Button text="Request edit" /> */}
        </div>
      )}
    </div>
  );
};

export default ImageCard;
