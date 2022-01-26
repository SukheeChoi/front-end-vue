export function expando(prefix = 'expando') {
  return prefix + '-' + ('' + Math.random()).replace(/\D/g, '');
}

export function getMimeType(mime) {
  switch (mime) {
    case 'gif':
      return 'image/gif';
    case 'jpg':
    case 'jpeg':
      return 'image/jpg';
    case 'png':
      return 'image/png';
    case 'svg':
      return 'image/svg+xml';
    default:
      console.error('mime type이 없습니다.');
  }
}
