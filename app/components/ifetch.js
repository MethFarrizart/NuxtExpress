import { ofetch } from "ofetch";

export function ifetch(url, body, responseType = "json") {
  const { $swal } = useNuxtApp();
  const fetch = ofetch.create({
    baseURL: url,
    body: body,
    responseType: responseType,
    headers: {
      Accept: "application/json",
    },
    async onRequestError({ request, options, error }) {
      $swal.fire({
        icon: "error",
        title: error,
        text: request,
      });
    },
    async onResponse({ request, response, options }) {
      $swal.fire({
        icon: "success",
        title: "success",
        text: response._data.message,
      });
      return options;
    },

    async onResponseError({ request, response, options }) {
      $swal.fire({
        icon: "error",
        title: "error",
        text: response._data.message,
      });
    },
  });

  return fetch(url, { method: "POST", body });
}
