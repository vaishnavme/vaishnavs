import { Rufina, Inter } from "next/font/google";

const rufina = Rufina({
  subsets: ["latin"],
  weight: ["400"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const font = {
  rufina: rufina.className,
  inter: inter.className,
};

export default font;
