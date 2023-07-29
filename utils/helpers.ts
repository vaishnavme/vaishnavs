import { format } from "date-fns"

const dateFormatter = (date: string) => {
  const formatted = format(new Date(date), 'MMMM do, yyyy');

  return formatted;
}

const helpers = {
  dateFormatter
}

export default helpers;