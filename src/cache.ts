const ME_KEY = '@cache/me' as const;

export function setMe(me: Me) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ME_KEY, JSON.stringify(me));
}

export function getMe() {
  if (typeof window === 'undefined') return null;
  const unparsedMe = localStorage.getItem(ME_KEY);
  if (!unparsedMe) return null;
  return JSON.parse(unparsedMe) as Me;
}

export function clearMe() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(ME_KEY);
}

export function clear() {
  if (typeof window === 'undefined') return;
  localStorage.clear();
}
