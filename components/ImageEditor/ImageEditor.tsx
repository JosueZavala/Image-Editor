import $ from "jquery";
import { IMAGES_LINKS_MAP } from "@/data/constans";
import { useEffect, useState } from "react";
import Button from "../UI/Button";
import { useImageEditorContext } from "@/context/ImageEditorContext";
import { useRouter } from "next/router";

const ImageEditorContainer = ({ imageId = "" }) => {
  const [canvas, setCanvas] = useState<HTMLCanvasElement>();
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();

  const { state, dispatch } = useImageEditorContext();
  const router = useRouter();

  const getImgData = () => {
    return ctx!.getImageData(0, 0, canvas!.width, canvas!.height);
  };

  const DeletePixels = (event: any) => {
    const target = event.target;
    const newCtx = target.getContext("2d");

    const squareLarge = 5;
    const bounding = target.getBoundingClientRect();
    const x = event.clientX - bounding.left;
    const y = event.clientY - bounding.top;

    const imageData = newCtx.getImageData(x, y, squareLarge, squareLarge),
      pixel = imageData.data;

    for (var i = 0; i < pixel.length; i++) {
      var grey = 255;

      pixel[i * 4] = grey;
      pixel[i * 4 + 1] = grey;
      pixel[i * 4 + 2] = grey;
    }

    newCtx.putImageData(imageData, x, y);
  };

  const BlackWhiteImage = (event: any) => {
    const imageData = getImgData(),
      pixels = imageData.data,
      numPixels = imageData.width * imageData.height;

    for (var i = 0; i < numPixels; i++) {
      var r = pixels[i * 4];
      var g = pixels[i * 4 + 1];
      var b = pixels[i * 4 + 2];

      var grey = (r + g + b) / 3;

      pixels[i * 4] = grey;
      pixels[i * 4 + 1] = grey;
      pixels[i * 4 + 2] = grey;
    }

    ctx!.putImageData(imageData, 0, 0);
  };

  const SepiaImage = (event: any) => {
    const imageData = getImgData(),
      pixels = imageData.data,
      numPixels = imageData.width * imageData.height;

    for (var i = 0; i < numPixels; i++) {
      var r = pixels[i * 4];
      var g = pixels[i * 4 + 1];
      var b = pixels[i * 4 + 2];

      pixels[i * 4] = 255 - r;
      pixels[i * 4 + 1] = 255 - g;
      pixels[i * 4 + 2] = 255 - b;

      pixels[i * 4] = r * 0.393 + g * 0.769 + b * 0.189;
      pixels[i * 4 + 1] = r * 0.349 + g * 0.686 + b * 0.168;
      pixels[i * 4 + 2] = r * 0.272 + g * 0.534 + b * 0.131;
    }

    ctx!.putImageData(imageData, 0, 0);
  };

  const DownloadImage = () => {
    const link = window.document.createElement("a"),
      url = canvas!.toDataURL(),
      filename = "./assets/editedImage.jpg";

    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);
  };

  const SaveImageData = () => {
    const imageData = getImgData();
    const newImage = { arrayId: state.imageSelected, imageData: imageData };
    dispatch({ type: "saveImageEdited", payload: newImage });
    ctx!.putImageData(imageData, 0, 0);

    router.push("/image-selector");
  };

  useEffect(() => {
    const canvasElement = document.getElementById("canvas");

    const imageObj = new Image();
    imageObj.crossOrigin = "anonymous";
    imageObj.src = IMAGES_LINKS_MAP[imageId];

    const newCanvas = canvasElement as HTMLCanvasElement;
    const newCtx = newCanvas.getContext("2d") as CanvasRenderingContext2D;

    imageObj.addEventListener("load", () => {
      newCanvas.width = imageObj.width;
      newCanvas.height = imageObj.height;

      setCanvas(newCanvas);
      setCtx(newCtx);
      newCtx.drawImage(imageObj, 0, 0, imageObj.width, imageObj.height);
    });
  }, [imageId]);

  useEffect(() => {
    $("#canvas")
      .on("mousedown", function () {
        $("#canvas").on("mousemove", function (event) {
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
      <section className="grid border border-white rounded">
        <div className="grid grid-flow-col auto-cols-auto justify-center gap-4 p-4">
          <Button text="Save Image" action={() => SaveImageData()} />
          <Button text="Download Image" action={() => DownloadImage()} />
          <Button
            text="Black and White"
            action={(event: any) => BlackWhiteImage(event)}
          />
          <Button text="Sepia" action={(event: any) => SepiaImage(event)} />
        </div>
      </section>
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
