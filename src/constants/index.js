const dbOptions = {
  page: 1,
  limit: 10,
  sortBy: 'createdAt',
  sortOrder: 'desc',
};

const imgTypeToExtension = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
  'image/svg': 'svg',
  'image/svg+xml': 'svg+xml',
};

const docTypeToExtension = {
  'text/plain': 'txt',
  'application/pdf': 'pdf',
  'application/msword': 'doc',
  'application/vnd.ms-excel': 'xls',
  'application/vnd.ms-powerpoint': 'ppt',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'pptx',
};

const audioTypeToExtension = {
  'audio/mpeg': 'mp3',
  'audio/wav': 'wav',
  'audio/x-wav': 'wav',
  'audio/wave': 'wav',
  'audio/mp4': 'm4a',
  'audio/x-m4a': 'm4a',
  'audio/ogg': 'ogg',
  'audio/webm': 'webm',
  'audio/flac': 'flac',
  'audio/aac': 'aac',
  'audio/x-aac': 'aac',
};

const videoTypeToExtension = {
  'video/mp4': 'mp4',
  'video/x-msvideo': 'avi',
  'video/ogg': 'ogv',
  'video/webm': 'webm',
  'video/quicktime': 'mov',
  'video/x-matroska': 'mkv',
};

const mimetypeToExtension = {
  ...imgTypeToExtension,
  ...docTypeToExtension,
  ...audioTypeToExtension,
  ...videoTypeToExtension,
};

const imageTypes = Object.keys(imgTypeToExtension);
const docTypes = Object.keys(docTypeToExtension);
const audioTypes = Object.keys(audioTypeToExtension);
const videoTypes = Object.keys(videoTypeToExtension);
const fileTypes = [...imageTypes, ...docTypes, ...audioTypes, ...videoTypes];

module.exports = {
  dbOptions,
  imageTypes,
  docTypes,
  audioTypes,
  videoTypes,
  fileTypes,
  imgTypeToExtension,
  docTypeToExtension,
  audioTypeToExtension,
  videoTypeToExtension,
  mimetypeToExtension,
};
