export function isValidUrl(url) {
  try {
    const u = new URL(url);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch (_) {
    return false;
  }
}

export function isValidShortcode(str) {
  return /^[a-zA-Z0-9]{1,10}$/.test(str);
}

export function isPositiveInteger(value) {
  const num = parseInt(value, 10);
  return !isNaN(num) && num > 0;
}
