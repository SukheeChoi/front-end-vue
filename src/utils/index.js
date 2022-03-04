import _ from 'lodash';

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

export function objectWithoutProperties(source, ...withoutKeys) {
  const target = {};
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key) && withoutKeys.indexOf(key) < 0) {
      target[key] = _.cloneDeep(source[key]);
    }
  }
  return target;
}

export function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
