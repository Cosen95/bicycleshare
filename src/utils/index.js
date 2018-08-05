export default {
  formateDate(time){
      if(!time) return '';
      let date = new Date(time);
      let month = (date.getMonth()+1) < 10 ? '0'+(date.getMonth()+1) : (date.getMonth()+1);
      let day = date.getDate() < 10 ? '0'+date.getDate() :date.getDate();
    return date.getFullYear()+"-"+month+"-"+day+' '+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
  }
}