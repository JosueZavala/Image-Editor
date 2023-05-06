import Image from "next/image";
import cn from "classnames";
import Link from "next/link";

const ImageCard = ({ image = "", resolution = "", imageUrl = "" }) => (
  <div className="grid border border-white rounded">
    <div
      className={cn("bg-white", {
        "w-72 h-72": !resolution,
        "w-[800px] h-[600px]": resolution === "800x600",
      })}
    >
      <div
        className="cursor-pointer"
        style={{ width: "100%", height: "100%", position: "relative" }}
      >
        <Image className="rounded" src={image} alt={"image Test"} fill />
      </div>
    </div>
    {imageUrl && (
      <div className="flex flex-row flex-wrap justify-center p-2 gap-4">
        <Link href={`/image-editor/${imageUrl}`}>
          <button className="py-2 px-4 rounded bg-white text-slate-400">
            Edit
          </button>
        </Link>
        <button className="py-2 px-4 rounded bg-white text-slate-400">
          Request edit
        </button>
      </div>
    )}
  </div>
);

export default ImageCard;
