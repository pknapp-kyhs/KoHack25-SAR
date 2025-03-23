export function getFullDb(callback){
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function(){
      if(this.readyState == 4 && this.status == 200){
        callback(this.responseText);
      }
    };
    ajax.open("GET", `getDb`, true);
    ajax.send();
}
