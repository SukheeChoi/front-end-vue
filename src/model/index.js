export class Menu {
  constructor(title, name, children = [], type = '', path = '') {
    this.title = title;
    this.name = name;
    this.children = children;
    this.type = type;
    this.path = path;
  }

  static create(...args) {
    return new Menu(...args);
  }
}

class Collection {
  constructor(arr = []) {
    this._arr = arr;
  }
  search(item) {
    return this._arr.indexOf(item);
  }
  clear() {
    this._arr = [];
  }
  get length() {
    return this._arr.length;
  }
  get isEmpty() {
    return this.length === 0;
  }
}

export class Queue extends Collection {
  constructor() {
    super();
  }
  enqueue(...items) {
    this._arr.push(...items);
  }
  dequeue() {
    return this._arr.shift();
  }
}

export class Stack extends Collection {
  constructor() {
    super();
  }
  push(...items) {
    this._arr.push(...items);
  }
  pop() {
    return this._arr.pop();
  }
  peek() {
    return this._arr.at(-1);
  }
}

// Series
export const INFORMATIONAL = 1;
export const SUCCESSFUL = 2;
export const REDIRECTION = 3;
export const CLIENT_ERROR = 4;
export const SERVER_ERROR = 5;

// Http Status
// 1xx Informational
export const CONTINUE = 100;
export const SWITCHING_PROTOCOLS = 101;
export const PROCESSING = 102;
export const CHECKPOINT = 103;
// 2xx Success
export const OK = 200;
export const CREATED = 201;
export const ACCEPTED = 202;
export const NON_AUTHORITATIVE_INFORMATION = 203;
export const NO_CONTENT = 204;
export const RESET_CONTENT = 205;
export const PARTIAL_CONTENT = 206;
export const MULTI_STATUS = 207;
export const ALREADY_REPORTED = 208;
export const IM_USED = 226;
// 3xx Redirection
export const MULTIPLE_CHOICES = 300;
export const MOVED_PERMANENTLY = 301;
export const FOUND = 302;
export const SEE_OTHER = 303;
export const NOT_MODIFIED = 304;
export const TEMPORARY_REDIRECT = 307;
export const PERMANENT_REDIRECT = 308;
// 4xx Client Error
export const BAD_REQUEST = 400;
export const UNAUTHORIZED = 401;
export const PAYMENT_REQUIRED = 402;
export const FORBIDDEN = 403;
export const NOT_FOUND = 404;
export const METHOD_NOT_ALLOWED = 405;
export const NOT_ACCEPTABLE = 406;
export const PROXY_AUTHENTICATION_REQUIRED = 407;
export const REQUEST_TIMEOUT = 408;
export const CONFLICT = 409;
export const GONE = 410;
export const LENGTH_REQUIRED = 411;
export const PRECONDITION_FAILED = 412;
export const PAYLOAD_TOO_LARGE = 413;
export const URI_TOO_LONG = 414;
export const UNSUPPORTED_MEDIA_TYPE = 415;
export const REQUESTED_RANGE_NOT_SATISFIABLE = 416;
export const EXPECTATION_FAILED = 417;
export const I_AM_A_TEAPOT = 418;
export const UNPROCESSABLE_ENTITY = 422;
export const LOCKED = 423;
export const FAILED_DEPENDENCY = 424;
export const TOO_EARLY = 425;
export const UPGRADE_REQUIRED = 426;
export const PRECONDITION_REQUIRED = 428;
export const TOO_MANY_REQUESTS = 429;
export const REQUEST_HEADER_FIELDS_TOO_LARGE = 431;
export const UNAVAILABLE_FOR_LEGAL_REASONS = 451;
// 5xx Server Error
export const INTERNAL_SERVER_ERROR = 500;
export const NOT_IMPLEMENTED = 501;
export const BAD_GATEWAY = 502;
export const SERVICE_UNAVAILABLE = 503;
export const GATEWAY_TIMEOUT = 504;
export const HTTP_VERSION_NOT_SUPPORTED = 505;
export const VARIANT_ALSO_NEGOTIATES = 506;
export const INSUFFICIENT_STORAGE = 507;
export const LOOP_DETECTED = 508;
export const BANDWIDTH_LIMIT_EXCEEDED = 509;
export const NOT_EXTENDED = 510;
export const NETWORK_AUTHENTICATION_REQUIRED = 511;
// OWS Custom Server Error
export const AUTH_EXCEPTION = 521;
export const SESSION_TIMEOUT = 530;
export const AJAX_SESSION_TIMEOUT = 531;
export const FORBIDDEN_URL = 532;
export const AJAX_FORBIDDEN_URL = 533;
export const WITHOUT_VPN = 534;
export const BINDING_EXCEPTION = 540;
export const DATABASE_EXCEPTION = 541;
export const SERVICE_EXCEPTION = 542;
export const APPLICATION_EXCEPTION = 543;
export const INTERFACE_EXCEPTION = 544;
export const VALIDATION_EXCEPTION = 545;
export const AOP_EXCEPTION = 598;
export const UNKNOWN_EXCEPTION = 599;

export const HttpStatus = Object.freeze({
  100: 'CONTINUE',
  CONTINUE,
  101: 'SWITCHING_PROTOCOLS',
  SWITCHING_PROTOCOLS,
  102: 'PROCESSING',
  PROCESSING,
  103: 'CHECKPOINT',
  CHECKPOINT,
  200: 'OK',
  OK,
  201: 'CREATED',
  CREATED,
  202: 'ACCEPTED',
  ACCEPTED,
  203: 'NON_AUTHORITATIVE_INFORMATION',
  NON_AUTHORITATIVE_INFORMATION,
  204: 'NO_CONTENT',
  NO_CONTENT,
  205: 'RESET_CONTENT',
  RESET_CONTENT,
  206: 'PARTIAL_CONTENT',
  PARTIAL_CONTENT,
  207: 'MULTI_STATUS',
  MULTI_STATUS,
  208: 'ALREADY_REPORTED',
  ALREADY_REPORTED,
  226: 'IM_USED',
  IM_USED,
  300: 'MULTIPLE_CHOICES',
  MULTIPLE_CHOICES,
  301: 'MOVED_PERMANENTLY',
  MOVED_PERMANENTLY,
  302: 'FOUND',
  FOUND,
  303: 'SEE_OTHER',
  SEE_OTHER,
  304: 'NOT_MODIFIED',
  NOT_MODIFIED,
  307: 'TEMPORARY_REDIRECT',
  TEMPORARY_REDIRECT,
  308: 'PERMANENT_REDIRECT',
  PERMANENT_REDIRECT,
  400: 'BAD_REQUEST',
  BAD_REQUEST,
  401: 'UNAUTHORIZED',
  UNAUTHORIZED,
  402: 'PAYMENT_REQUIRED',
  PAYMENT_REQUIRED,
  403: 'FORBIDDEN',
  FORBIDDEN,
  404: 'NOT_FOUND',
  NOT_FOUND,
  405: 'METHOD_NOT_ALLOWED',
  METHOD_NOT_ALLOWED,
  406: 'NOT_ACCEPTABLE',
  NOT_ACCEPTABLE,
  407: 'PROXY_AUTHENTICATION_REQUIRED',
  PROXY_AUTHENTICATION_REQUIRED,
  408: 'REQUEST_TIMEOUT',
  REQUEST_TIMEOUT,
  409: 'CONFLICT',
  CONFLICT,
  410: 'GONE',
  GONE,
  411: 'LENGTH_REQUIRED',
  LENGTH_REQUIRED,
  412: 'PRECONDITION_FAILED',
  PRECONDITION_FAILED,
  413: 'PAYLOAD_TOO_LARGE',
  PAYLOAD_TOO_LARGE,
  414: 'URI_TOO_LONG',
  URI_TOO_LONG,
  415: 'UNSUPPORTED_MEDIA_TYPE',
  UNSUPPORTED_MEDIA_TYPE,
  416: 'REQUESTED_RANGE_NOT_SATISFIABLE',
  REQUESTED_RANGE_NOT_SATISFIABLE,
  417: 'EXPECTATION_FAILED',
  EXPECTATION_FAILED,
  418: 'I_AM_A_TEAPOT',
  I_AM_A_TEAPOT,
  422: 'UNPROCESSABLE_ENTITY',
  UNPROCESSABLE_ENTITY,
  423: 'LOCKED',
  LOCKED,
  424: 'FAILED_DEPENDENCY',
  FAILED_DEPENDENCY,
  425: 'TOO_EARLY',
  TOO_EARLY,
  426: 'UPGRADE_REQUIRED',
  UPGRADE_REQUIRED,
  428: 'PRECONDITION_REQUIRED',
  PRECONDITION_REQUIRED,
  429: 'TOO_MANY_REQUESTS',
  TOO_MANY_REQUESTS,
  431: 'REQUEST_HEADER_FIELDS_TOO_LARGE',
  REQUEST_HEADER_FIELDS_TOO_LARGE,
  451: 'UNAVAILABLE_FOR_LEGAL_REASONS',
  UNAVAILABLE_FOR_LEGAL_REASONS,
  500: 'INTERNAL_SERVER_ERROR',
  INTERNAL_SERVER_ERROR,
  501: 'NOT_IMPLEMENTED',
  NOT_IMPLEMENTED,
  502: 'BAD_GATEWAY',
  BAD_GATEWAY,
  503: 'SERVICE_UNAVAILABLE',
  SERVICE_UNAVAILABLE,
  504: 'GATEWAY_TIMEOUT',
  GATEWAY_TIMEOUT,
  505: 'HTTP_VERSION_NOT_SUPPORTED',
  HTTP_VERSION_NOT_SUPPORTED,
  506: 'VARIANT_ALSO_NEGOTIATES',
  VARIANT_ALSO_NEGOTIATES,
  507: 'INSUFFICIENT_STORAGE',
  INSUFFICIENT_STORAGE,
  508: 'LOOP_DETECTED',
  LOOP_DETECTED,
  509: 'BANDWIDTH_LIMIT_EXCEEDED',
  BANDWIDTH_LIMIT_EXCEEDED,
  510: 'NOT_EXTENDED',
  NOT_EXTENDED,
  511: 'NETWORK_AUTHENTICATION_REQUIRED',
  NETWORK_AUTHENTICATION_REQUIRED,
});

export const PermissionName = Object.freeze({
  GEOLOCATION: 'geolocation',
  NOTIFICATIONS: 'notifications',
  PUSH: 'push',
  PERSISTENT_STORAGE: 'persistent-storage',
  WINDOW_PLACEMENT: 'window-placement',
});

export const PermissionState = Object.freeze({
  GRANTED: 'granted',
  PROMPT: 'prompt',
  DENIED: 'denied',
});

export class PermissionDescriptor {
  constructor(name, userVisibleOnly = false, sysex = false) {
    this.name = name;
    this.userVisibleOnly = userVisibleOnly;
    this.sysex = sysex;
  }
}

export class PermissionStatus {
  constructor(name, state = PermissionState.DENIED) {
    this.name = name;
    this.state = state;
  }
}
