import fly from 'flyio';
import { UPLOAD_URL } from './constants';

export function uploadImg(file) {
  let formData = new FormData();
  formData.append('smfile', file);
  return fly.post(UPLOAD_URL, formData)
    .then(res => {
      return res.data.data.url;
    });
}