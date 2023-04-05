import axios from 'axios'
// //http request 拦截器
// axios.interceptors.request.use(
//   config => {
//     // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
//     config.data = JSON.stringify(config.data);
//     config.headers = {
//       'Content-Type':'application/x-www-form-urlencoded'
//     }
//     // if(token){
//     //   config.params = {'token':token}
//     // }
//     return config;
//   },
//   error => {
//     return Promise.reject(err);
//   }
// );
//
//
// //http response 拦截器
// axios.interceptors.response.use(
//   response => {
//     if(response.data.errCode ==2){
//       router.push({
//         path:"/login",
//         querry:{redirect:router.currentRoute.fullPath}//从哪个页面跳转
//       })
//     }
//     return response;
//   },
//   error => {
//     return Promise.reject(error)
//   }
// )
/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
      }).then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err)
      })
  })
}


export function get<TQuery = {},TRst = void>(url, data:TQuery = <any>{}) {
  console.log(" get data:", data);
  return new Promise<TRst>((resolve, reject) => {
    axios({
      url: url,
      //用data有bug,axios没修复,因此用params
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      params: data,
      method: 'get'
    }).then(response => {
      resolve(response.data);
    }, err => {
      reject(err);
    });
  });
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post<TBody = {}, TRst = void>(url, data:TBody = <any>{}) {
  return new Promise<TRst>((resolve, reject) => {
    axios({
      url: url,
      data: data,
      method: 'post',
      timeout: 4*1000
    }).then(response => {
      resolve(response.data);
    }, err => {
      reject(err);
    });
  })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}

/**
 * 封装delete请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function remove(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.delete(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}
