export const decodeHtml = (html: string) =>
  new DOMParser().parseFromString(html, "text/html").body.textContent || "";
