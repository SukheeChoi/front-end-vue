export function expando(prefix = 'expando') {
  return prefix + '-' + ('' + Math.random()).replace(/\D/g, '');
}
