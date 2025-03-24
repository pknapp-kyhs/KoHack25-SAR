// Use AJAX to get the database from the server and invoke callback with the database as an argument
export function getFullDb(callback){
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function(){
      if(this.readyState == 4 && this.status == 200){
        callback(JSON.parse(this.responseText));
      }
    };
    ajax.open("GET", `getDb`, true);
    ajax.send();
}


export function updateDb(dbEntry) {
  var ajax = new XMLHttpRequest();
  ajax.open("POST", `updateDb`, true);
  ajax.send(JSON.stringify(dbEntry));
}
