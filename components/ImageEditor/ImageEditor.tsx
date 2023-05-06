import $ from "jquery";
import { IMAGES_LINKS_MAP } from "@/data/constans";
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

    canvas = canvasElement as HTMLCanvasElement;
    ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    imageObj.addEventListener("load", () => {
      canvas.width = imageObj.width;
      canvas.height = imageObj.height;

      ctx.drawImage(imageObj, 0, 0, imageObj.width, imageObj.height);
    });
  }, [imageId]);

  useEffect(() => {
    $("#canvas")
      .on("mousedown", function () {
        $(this).on("mousemove", function (event) {
          DeletePixels(event);
        });
      })
      .on("mousedown", function (event) {
        DeletePixels(event);
      })
      .on("mouseup", function () {
        $(this).off("mousemove");
      })
      .on("mouseout", function () {
        $(this).off("mousemove");
      });
  }, []);

  return (
    <div className="grid w-fit">
      <canvas
        id="canvas"
        className="border border-white rounded "
        width="800"
        height="600"
      ></canvas>
    </div>
  );
};

export default ImageEditorContainer;
