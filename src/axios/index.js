import Jsonp from 'jsonp'
export default class Axios{
  static jsonp(options){
    return new Promise((resolve,reject) => {
      Jsonp(options.url,{  //eslint-disable-line
        params:'callback'
      },function(err,response) {
          if(response.status === 'success'){
            resolve(response);
          } else {
            reject(response.message);
          }
      })
    })
  }
}