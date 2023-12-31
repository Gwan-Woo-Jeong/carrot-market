export function fetcher(url: string) {
  return fetch(url).then((res) => res.json());
}

export function cls(...classnames: string[]) {
  return classnames.join(" ");
}

export function getTimeDifference(date: Date) {
  let msPerMinute = 60 * 1000;
  let msPerHour = msPerMinute * 60;
  let msPerDay = msPerHour * 24;
  let msPerMonth = msPerDay * 30;
  let msPerYear = msPerDay * 365;

  let elapsed = new Date().getTime() - new Date(date).getTime();

  if (elapsed < 1000) {
    return "now";
  } else if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + " seconds ago";
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + " minutes ago";
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + " hours ago";
  } else if (elapsed < msPerMonth) {
    return Math.round(elapsed / msPerDay) + " days ago";
  } else if (elapsed < msPerYear) {
    return Math.round(elapsed / msPerMonth) + " months ago";
  } else {
    return Math.round(elapsed / msPerYear) + " years ago";
  }
}

export function getCurrentTime(plusMin?: number) {
  const tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
  const localISOTime = new Date(
    Date.now() + (plusMin ? plusMin * 60000 : 0) - tzoffset
  )
    .toISOString()
    .slice(0, -1);

  const [currentDate, time] = localISOTime.split("T");
  const currentTime = time.slice(0, 5);

  return `${currentDate} ${currentTime}`;
}
