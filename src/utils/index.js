export default {
  formateDate(time){
      if(!time) return '';
      let date = new Date(time);
      let month = (date.getMonth()+1) < 10 ? '0'+(date.getMonth()+1) : (date.getMonth()+1);
      let day = date.getDate() < 10 ? '0'+date.getDate() :date.getDate();
      let hours = date.getHours() < 10 ? '0'+date.getHours() : date.getHours();
      let seconds = date.getSeconds() <10 ? '0'+date.getSeconds():date.getSeconds();
      let minutes = date.getMinutes() < 10 ? '0'+date.getMinutes():date.getMinutes();
    return date.getFullYear()+"-"+month+"-"+day+' '+hours+":"+minutes+":"+seconds;
  }
}