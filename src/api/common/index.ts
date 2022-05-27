import { POST_FILE } from 'constant';
import axiosClient from './axiosClient';

export async function postUploadImage(image: FormData) {
  const url = POST_FILE;
  try {
    const response = await axiosClient.post(url, image);
    return response.data;
  } catch (error) {}
}
