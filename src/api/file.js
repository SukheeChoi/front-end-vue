'use strict';

import http from '@/api';

const FILE_URI = '/com/FileMgr';

const POST_UPLOAD_FILES = '/upload';
const GET_DOWNLOAD_FILE = '/download';

const FILE_REQUEST_PART_NAME = 'fileList';

function createFormData(files) {
  const formdata = new FormData();
  for (const file of files) {
    formdata.append(FILE_REQUEST_PART_NAME, file);
  }
  return formdata;
}

export async function upload(files, onUploadProgress = () => {}) {
  return await http.post(FILE_URI + POST_UPLOAD_FILES, createFormData(files), {
    headers: { ContentType: 'multipart/form-data' },
    onUploadProgress,
  });
}

function random() {
  const name = Math.random().toString(36);
  const at = name.indexOf('.');
  return name.substring(at + 1);
}

function createObjectUrl(data, filename = random()) {
  const anchor = document.createElement('a');
  const url = window.URL.createObjectURL(data);
  anchor.href = url;
  anchor.download = filename;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  window.URL.revokeObjectURL(url);
}

export async function download(file, onDownloadProgress = () => {}) {
  const blob = await http.get(FILE_URI + GET_DOWNLOAD_FILE, {
    responseType: 'blob',
    params: { fileId: file.id },
    onDownloadProgress,
  });
  createObjectUrl(blob, file.name);
  return blob;
}
