const getDate = (timeStamp: Date) => {
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

  const date = new Date(timeStamp);
  const day = date.getDay();
  const month = MONTHS[date.getMonth()];
  const year = date.getFullYear();
  
  return `${day} ${month}, ${year}`
}

const helpers = {
  getDate
}

export default helpers;