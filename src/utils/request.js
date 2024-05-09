

class Request {
  // serverUrl = "https://www.obital.top/";
  serverUrl = "http://localhost:8080/";
  // serverUrl = "http://127.0.0.1:8080/";

  request({ url, method = "GET", params, data, config: { credentials = false } }) {
    let link = this.serverUrl + url;
    if (params) {
      let strParams = "";
      let i = 0;
      for (let k in params) {
        if (i == 0) {
          strParams += k + "=" + params[k];
        } else {
          strParams += "&" + k + "=" + params[k];
        }
        i++;
      }
      link += "?" + strParams;
    }
    let cfg = {};
    if (method.toUpperCase() == "POST") {
      Object.assign(cfg, {
        method,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        }
      });
      if (data) {
        let strBody = "";
        let i = 0;
        for (let k in data) {
          if (i == 0) {
            strBody += k + "=" + data[k];
          } else {
            strBody += "&" + k + "=" + data[k];
          }
          i++;
        }
        cfg.body = strBody;
      }
    }
    if (credentials) {
      cfg.credentials = "include";
    }
    return new Promise((resolve, reject) => {
      fetch(link, cfg).then(function(res){
        return res.json();
      }).then(data => {
        resolve(data);
      }).catch(err => {
        console.log(err);
        reject(err);
        console.error("发生错误！请检查。" + err);
      })
    })
  }

  get({ url, params, config: { credentials = false } = {} }) {
    return this.request({ url, params, config: { credentials } });
  }

  post({ url, params, data, config: { credentials = false } = {} }) {
    return this.request({ url, method: "POST", params, data, config: { credentials } })
  }
}

export default new Request();