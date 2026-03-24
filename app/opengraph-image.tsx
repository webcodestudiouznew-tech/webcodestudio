import { createOpenGraphImage } from "@/lib/opengraph-image";

export const alt = "WebCode";
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};

export default function OpenGraphImage() {
  return createOpenGraphImage("ru");
}
