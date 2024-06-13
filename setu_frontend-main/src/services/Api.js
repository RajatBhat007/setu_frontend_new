import axios from "axios";
// import { withRouter } from "react-router-dom";
import { message } from "antd";

let _TIMER = null;
const _REQUESTS = {};

class Api {
  constructor() {

  }

  _url = "/";
   _base_url = "https://n-gage.co.in:9000";
  // _base_url = "http://localhost:8080"

  _method = "get";
  _params = {};
  _headers = {
    Authorization: "Brear",
    'Access-Control-Allow-Origin' : '*',
  };

  get(url, params = {}) {
    this._url = url;
    this._method = "get";
    this._middleUrl = "/api";
    this._params = params;
    return this;
  }

  post(url, params = {}) {
    this._url = url;
    this._method = "post";
    this._middleUrl = "/api";
    this._params = params;
    return this;
  }

  delete(url, params = {}) {
    this._url = url;
    this._method = "delete";
    this._middleUrl = "/api";
    this._params = params;
    return this;
  }
  patch(url, params = {}) {
    this._url = url;
    this._method = "patch";
    this._middleUrl = "/api";
    this._params = params;
    return this;
  }

  params(params) {
    this._params = params;
    return this;
  }

  header(value) {
    console.log('token for header', value)
    this._headers["Authorization"] = `Bearer ${value}`;
  }

  orgHeader(value) {
    this._headers["orgurl"] = `${value}`;
    this._base_url = `https://${this._headers["orgurl"]}`;
  }

  send(callback) {
    _REQUESTS[this._url] = {
      _url: this._url,
      _base_url: this._base_url,
      _method: this._method,
      _params: this._params,
      _middleUrl: this._middleUrl,
      _headers: this._headers,
      callback,
    };

    const _self = this;
    clearTimeout(_TIMER);
    _TIMER = setTimeout(() => {
      _self.processApiRequest();
    }, 1000);
  }

  processApiRequest() {
    const _keys = Object.keys(_REQUESTS);
    if (!_keys.length) {
      return;
    }

    const _self = _REQUESTS[_keys[0]];
    delete _REQUESTS[_keys[0]];
    _self.processApiRequest = this.processApiRequest;

    const request = {
      method: _self._method,
      headers: _self._headers,
      timeout: _self._timeout,
      url: `${_self._base_url}${_self._middleUrl}${_self._url}`,
    };

    if (_self._method === "post" || _self._method === "patch") {
      request.data = _self._params;
    } else if (_self._method === "get" || _self._method === "delete") {
      request.params = _self._params;
    }
    // console.log("APi req", request);

    axios(request)
      .then((response, error) => {
        // console.log("APi res", response);
        if (typeof response !== "undefined" && response.data && response.data.message) {
          message.success(response.data.message)
        }
        _self.processApiRequest();
        _self.callback(response.data, error);
      })
      .catch((error, response) => {
        console.log("Error", error);

        if (typeof error.response !== "undefined" && error.response.data) {
          message.error(error.response.data.message)

        }

        _self.processApiRequest();
        _self.callback(response, error.message);
      });
  }


  upload(params, callback) {
    const headers = this._headers;
    headers["Content-Type"] = "multipart/form-data";
    // eslint-disable-next-line no-undef
    const form = new FormData();

    if (params.files) {
      params.files.forEach((file) => {
        form.append("files", file);
      });
    }
    for (const param in params) {
      if (param !== "files") {
        form.append(param, params[param]);
      }
    }

    const config = {
      headers,
      onUploadProgress(progressEvent) {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        callback(percentCompleted);
      },
    };

    axios
      .post(this._base_url + "/api" + this._url, form, config)
      .then((response) => {
        if (typeof response !== "undefined" && response?.data) {
          message[response.data.type](
            response.data.message
          );
        }
        if (
          typeof response !== "undefined" &&
          response?.data &&
          response?.data?.type === "error"
        ) {
          callback(-1);
        }
        callback(100, response);
      })
      .catch((error) => {
        if (typeof error.response !== "undefined" && error.response.data) {
          message.error(error.response.data.message);
        }
        callback(-1);
      });

    this._headers["Content-Type"] = "application/json";
  }

  uploadAndPatch(params, callback) {
    const headers = this._headers;

    const form = new FormData();
    // for (var param in params) {
    //   form.append(param, params[param]);
    // }
    for (var param in params) {
      if (Array.isArray(params[param])) {
        form.append(param, JSON.stringify(params[param]));
      } else {
        form.append(param, params[param]);
      }
    }
    headers["Content-Type"] = `multipart/form-data;boundary=${form._boundary}`;

    const config = {
      headers,
      onUploadProgress(progressEvent) {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        callback(percentCompleted);
      },
    };

    axios
      .patch(this._base_url + "/api" + this._url, form, config)
      .then((response) => {
        if (typeof response !== "undefined" && response.data) {
          message[response.data.type](
            response.data.message
          );
          if (
            typeof response !== "undefined" &&
            response.data &&
            response.data.type === "error"
          ) {
            callback(-1);
          }
        }
        callback(100, response);
      })
      .catch((error) => {
        if (typeof error.response !== "undefined" && error.response.data) {
          message.error(error.response.data.message);
        }
        callback(-1);
      });

    this._headers["Content-Type"] = "application/json";
  }

  uploadAndPost(_url = null, params, callback) {
    const headers = this._headers;
    const form = new FormData();
    // for (var param in params) {
    //   form.append(param, params[param])
    // }
    for (var param in params) {
      if (Array.isArray(params[param])) {
        form.append(param, JSON.stringify(params[param]));
      } else {
        form.append(param, params[param]);
      }
    }
    headers["Content-Type"] = `multipart/form-data;boundary=${form._boundary}`;
    const config = {
      headers,
      onUploadProgress(progressEvent) {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        callback(percentCompleted);
      },
    };
    // console.log("Api req", params);
    axios
      .post(this._base_url + "/api" + _url, form, config)
      .then((response) => {
        if (typeof response !== "undefined" && response.data) {
          message[response.data.type](
            response.data.message
          );
          if (
            typeof response !== "undefined" &&
            response.data &&
            response.data.type === "error"
          ) {
            callback(-1);
          }
        }
        callback(100, response);
      })
      .catch((error) => {
        if (typeof error.response !== "undefined" && error.response.data) {
          message.error(error.response.data.message);
        }
        callback(-1);
      });

    this._headers["Content-Type"] = "application/json";
  }
}

const ApiClass = new Api();

export default ApiClass;
