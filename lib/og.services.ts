import satori from "satori";
import { readFileSync, writeFileSync } from "fs";
import { Resvg } from "@resvg/resvg-js";
import { join } from "path";
import OGTemplate from "@/components/OGTemplate";

const fontPath = "fonts";
const interPath = join(process.cwd(), fontPath, "Inter-Regular.ttf");
const frauncesPath = join(
  process.cwd(),
  fontPath,
  "Fraunces_144pt_Soft-Regular.ttf"
);

const generateOGImage = async ({
  slug,
  title,
  publishedAt,
}: {
  slug: string;
  title: string;
  publishedAt: string;
}) => {
  const publicPath = "public";
  const relativePath = `og-images/${slug}.png`;
  const pngPath = join(process.cwd(), publicPath, relativePath);

  const og = OGTemplate({ title, publishedAt });

  console.log;

  const svg = await satori(og, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: "Inter-Regular",
        data: readFileSync(interPath),
        weight: 400,
        style: "normal",
      },
      {
        name: "Fraunces_144pt_Soft-Regular",
        data: readFileSync(frauncesPath),
        weight: 300,
        style: "normal",
      },
    ],
  });

  const resvg = new Resvg(svg);
  const pngBuffer = resvg.render().asPng();

  writeFileSync(pngPath, pngBuffer);

  return relativePath;
};

export default generateOGImage;
