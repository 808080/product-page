export enum HTTPmethods {
  POST = 'POST',
  GET = 'GET'
};

export type ResponseMessage<T = any> =
  | {
    success: true;
    data: T;
  }
  | {
    success: false;
    error: string;
  };

const BaseURL = 'http://localhost:3000';

const httpRequest = async <R, T = unknown>(method: HTTPmethods, url: string, body?: T): Promise<ResponseMessage<R>> => {
  const controller = new AbortController();
  const id = setTimeout(controller.abort, 5000);

  const response = await fetch(`${BaseURL}${url}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    signal: controller.signal,
    body: body ? JSON.stringify(body) : null
  }).catch((err) => {
    console.log(err);
  });
  clearTimeout(id);
  if (!response) return { success: false, error: 'Server error' };
  const result = await response.json();
  return result;
};

export default httpRequest;