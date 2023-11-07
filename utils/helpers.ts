import { format } from "date-fns";

const dateFormatter = (date: string) => format(new Date(date), "MMMM do, yyyy");

const generateSlug = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

const helpers = {
  dateFormatter,
  generateSlug,
};

export default helpers;
