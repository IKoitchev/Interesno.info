import axiosClient from './apiClient';

export function getAllArticles() {
  return axiosClient.get('/articles');
}
