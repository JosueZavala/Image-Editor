import { ImageEditorProvider } from "@/context/ImageEditorContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ImageEditorProvider>
      <Component {...pageProps} />
    </ImageEditorProvider>
  );
}
