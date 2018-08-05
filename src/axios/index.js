import JsonP from 'jsonp'
export default class Axios{
  static jsonp(options){
    new Promise((resolve,reject) => {
      JsonP(options.url),{
        params:'callback'
      },function(err,response) {

      }
    })
  }
}