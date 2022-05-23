'use strict';

import _ from 'lodash';

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

import {
  //
  isFunction,
  //
  CollectionView,
  Event,
  Point,
} from '@grapecity/wijmo';
import {
  //
  CellRange,
  CellRangeEventArgs,
} from '@grapecity/wijmo.grid';
import {
  //
  RestCollectionView,
} from '@grapecity/wijmo.rest';

export const _READ_ONLY = Symbol('readonly');

if (!CollectionView.prototype.setReadOnly) {
  CollectionView.prototype.setReadOnly = function (dataItem, isReadOnly = true) {
    const at = this._src.indexOf(dataItem);
    if (at > -1) {
      if (isReadOnly) {
        Reflect.set(dataItem, _READ_ONLY, true);
      } else if (this.isReadOnly(dataItem)) {
        Reflect.deleteProperty(dataItem, _READ_ONLY);
      }
    }
  };
}

if (!CollectionView.prototype.isReadOnly) {
  CollectionView.prototype.isReadOnly = function (dataItem) {
    return _READ_ONLY in dataItem;
  };
}

export class GridRestCollectionView extends RestCollectionView {
  // 생성자
  constructor(options) {
    super();
    // 그리드 정보
    this.grid = options.grid;
    // 기본 정보 설정
    this.pageOnServer = true;
    this.sortOnServer = true;
    this.filterOnServer = true;
    // 페이지 정보 설정
    // wijmo는 zero-base
    this._pgIdx = (options.pageNo ?? 1) - 1;
    this._pgSz = options.pageSize ?? 10;
    this._pageSizeList = options.pageSizeList ?? [5, 10, 20, 30, 50, 100];
    this.scrollRestoration = options.scrollRestoration ?? false;
    // 쿼리 정보 설정
    this._query = options.query ?? {};
    // API 정보 설정
    this._getItems = options.getItems;
    this._addItem = options.addItem;
    this._patchItem = options.patchItem;
    this._deleteItem = options.deleteItem;
    this._scrollTop = 0;
    // 스크롤 최상단 이동
    this.loading.addHandler(() => (this._scrollTop = this.grid.scrollPosition.y));
    this.loaded.addHandler(this._loaded, this);
  }

  implementsInterface(intf) {
    switch (intf) {
      case 'RestCollectionView':
        return true;
    }
    return super.implementsInterface(intf);
  }

  get insertable() {
    return isFunction(this._addItem);
  }

  get updatable() {
    return isFunction(this._patchItem);
  }

  get removable() {
    return isFunction(this._deleteItem);
  }

  get query() {
    return this._query;
  }

  get pageSizeList() {
    return this._pageSizeList.map((pageSize) => ({ name: `${pageSize}건`, value: pageSize }));
  }

  /**
   * one-base
   */
  get pageNo() {
    return this.pageIndex + 1;
  }

  _loaded() {
    const grid = this.grid;
    if (grid.rows.length > 0) {
      const x = grid.scrollPosition.x;
      const y = this.scrollRestoration ? this._scrollTop : 0;
      grid.scrollPosition = new Point(x, y);
    }
    const range = new CellRange(0);
    const event = new CellRangeEventArgs(grid.cells, range);
    grid.onSelectionChanged(event);
  }

  moveToScrollTop() {}

  moveToFirstPage() {
    return this.moveToPage(1);
  }

  moveToLastPage() {
    return this.moveToPage(this.pageCount);
  }

  moveToPreviousPage() {
    return this.moveToPage(this.pageNo - 1);
  }

  moveToNextPage() {
    return this.moveToPage(this.pageNo + 1);
  }

  moveToPage(pageNo) {
    super.moveToPage(pageNo - 1);
  }

  lookup(query) {
    this._query = query;
    this._pgIdx = 0;
    this._pgSz = 10;
    this.load();
  }

  async getItems() {
    if (!isFunction(this._getItems)) {
      console.error('조회 API가 없거나 함수 형태가 아닙니다.');
      return;
    }
    const fn = this._getItems.bind(this);
    const result = await fn(this.query, this.pageIndex + 1, this.pageSize);
    const { totalCount: totalItemCount, data: items } = result;
    this._totalItemCount = totalItemCount;
    return items;
  }

  async addItem(item) {
    if (!isFunction(this._addItem)) {
      console.error('추가 API가 없거나 함수 형태가 아닙니다.');
      return;
    }
    const fn = this._addItem.bind(this);
    const success = await fn(item);
    if (success) {
      this.load();
    } else {
      console.error('추가 작업 수행 중 오류가 발생했습니다.');
    }
  }

  async patchItem(item) {
    if (!isFunction(this._patchItem)) {
      console.error('수정 API가 없거나 함수 형태가 아닙니다.');
      return;
    }
    const fn = this._patchItem.bind(this);
    const success = await fn(item);
    if (success) {
      this.load();
    } else {
      console.error('수정 작업 수행 중 오류가 발생했습니다.');
    }
  }

  async deleteItem(item) {
    if (!isFunction(this._deleteItem)) {
      console.error('삭제 API가 없거나 함수 형태가 아닙니다.');
      return;
    }
    const fn = this._deleteItem.bind(this);
    const success = await fn(item);
    if (success) {
      this.load();
    } else {
      console.error('삭제 작업 수행 중 오류가 발생했습니다.');
    }
  }
}

export class TreeGridRestCollectionView extends GridRestCollectionView {
  constructor(options) {
    super(options);
    this._treeLoadedTimeout = null;
    this.loaded.addHandler(this._treeLoaded, this);
  }

  get childItemPath() {
    return this.grid.childItemPath;
  }

  get totalItemCount() {
    return this.grid.rows.length;
  }

  _treeLoaded() {
    if (this._treeLoadedTimeout) {
      clearTimeout(this._treeLoadedTimeout);
    }
    this._treeLoadedTimeout = setTimeout(() => this.refresh(), 100);
  }
}

export class NGridRestCollectionView extends GridRestCollectionView {
  constructor(options) {
    super(options);
    this.n = options.n;
    this.i = options.i;
    this.first = this.i === 1;
  }

  get pageCount() {
    return this.pageSize ? Math.ceil(this.totalItemCount / (this.pageSize * this.n)) : 1;
  }

  async getItems() {
    if (!isFunction(this._getItems)) {
      console.error('조회 API가 없거나 함수 형태가 아닙니다.');
      return;
    }
    const fn = this._getItems.bind(this);
    const pageNo = this.pageIndex * this.n + this.i;
    const result = await fn(this.query, +pageNo, this.pageSize);
    const { totalCount: totalItemCount, data: items } = result;
    this._totalItemCount = totalItemCount;
    return items;
  }
}

export class DataTransfer {
  constructor() {
    this.src = null;
    this.data = null;
    this.isProcessing = false;
    this.starting = new Event();
    this.stoping = new Event();
  }

  /**
   * 데이터 이동 시작
   *
   * @param {Object} src
   * @param {Object} data
   */
  start(src, data) {
    this.src = src;
    this.data = data;
    this.isProcessing = true;
    if (this.starting.hasHandlers) {
      this.starting.raise(this);
    }
    this.starting.removeAllHandlers();
  }

  /**
   * 데이터 이동 종료
   */
  stop() {
    if (this.isProcessing) {
      this.src = null;
      this.data = null;
      this.isProcessing = false;
      if (this.stoping.hasHandlers) {
        this.stoping.raise(this);
      }
      this.stoping.removeAllHandlers();
    }
  }
}
