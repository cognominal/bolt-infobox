import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { cubicOut } from 'svelte/easing'

export function cn(...inputs) {
	return twMerge(clsx(inputs))
}

export const fetchWikipediaPages = async (searchTerm) => {
  const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=5&format=json&origin=*&srsearch=${encodeURIComponent(searchTerm)}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data.query.search.map(result => ({
    title: result.title,
    snippet: result.snippet.replace(/<\/?span[^>]*>/g, ''),
    pageid: result.pageid
  }));
};

export const flyAndScale = (
  node,
  params = {}
) => {
  const {
    delay = 0,
    duration = 200,
    easing = cubicOut,
    opacity = 0,
    scale = 0.95
  } = params;

  const style = getComputedStyle(node);
  const transform = style.transform === 'none' ? '' : style.transform;

  return {
    delay,
    duration,
    easing,
    css: (t, u) => `
      transform: ${transform} scale(${1 - (1 - scale) * u});
      opacity: ${1 - (1 - opacity) * u}
    `
  };
};