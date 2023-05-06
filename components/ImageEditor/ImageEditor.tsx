import { IMAGES_DOMAIN, IMAGES_LINKS_MAP } from "@/data/constans";
import { useEffect } from "react";

const ImageEditorContainer = ({ imageId = "" }) => {
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;

  const DeletePixels = (event: any) => {
    const squareLarge = 5;
    const bounding = canvas.getBoundingClientRect();
    const x = event.clientX - bounding.left;
    const y = event.clientY - bounding.top;

    const imageData = ctx.getImageData(x, y, squareLarge, squareLarge),
      pixel = imageData.data;

    for (var i = 0; i < pixel.length; i++) {
      var grey = 255;

      pixel[i * 4] = grey;
      pixel[i * 4 + 1] = grey;
      pixel[i * 4 + 2] = grey;
    }

    ctx.putImageData(imageData, x, y);
  };

  useEffect(() => {
    const canvasElement = document.getElementById("canvas");

    const imageObj = new Image();
    imageObj.crossOrigin = "anonymous";
    imageObj.src = IMAGES_LINKS_MAP[imageId];

    const canvas: HTMLCanvasElement = canvasElement as HTMLCanvasElement;
    const ctx: CanvasRenderingContext2D = canvas.getContext(
      "2d"
    ) as CanvasRenderingContext2D;

    imageObj.addEventListener("load", () => {
      canvas.width = imageObj.width;
      canvas.height = imageObj.height;

      ctx.drawImage(imageObj, 0, 0, imageObj.width, imageObj.height);
    });
  }, [imageId]);

  return (
    <div className="grid">
      <canvas
        id="canvas"
        className="border border-white rounded max-w-[1170px] max-h-[780px]"
        width="800"
        height="600"
      ></canvas>
    </div>
  );
};

export default ImageEditorContainer;
