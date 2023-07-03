export function fetcher(url: string) {
  return fetch(url).then((res) => res.json());
}

export function cls(...classnames: string[]) {
  return classnames.join(" ");
}
