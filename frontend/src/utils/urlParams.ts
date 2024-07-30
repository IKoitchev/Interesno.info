export default function createUrlParams(object: any) {
  const queryParams = new URLSearchParams();

  if (object && Object.keys(object).length === 0) {
    return '';
  }
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      queryParams.append(key, object[key]);
    }
  }
  const res = `?${queryParams.toString()}`;
  console.log(res);

  return res;
}
