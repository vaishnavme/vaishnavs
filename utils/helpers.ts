import { format } from "date-fns";

const site_url: string = process.env.NEXT_PUBLIC_FE_URL || "";

const dateFormatter = (date: string) => format(new Date(date), "MMMM do, yyyy");

const generateSlug = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

const mergeURLPaths = (paths: string[]) => {
  const serializePaths = paths.map((p: string) => {
    let path = p;
    if (path.startsWith("/")) {
      path = path.slice(1);
    }
    if (path.endsWith("/")) {
      path = path.slice(0, path.length - 1);
    }
    return path;
  });
  return serializePaths.join("/");
};

const getAbsoluteURL = (path: string) => mergeURLPaths([site_url, path]);

const helpers = {
  dateFormatter,
  generateSlug,
  getAbsoluteURL,
};

export default helpers;
