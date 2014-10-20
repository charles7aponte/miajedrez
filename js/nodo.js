/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Nodo(){
      var self=this;
      
      
    this.idMiArray;// el id del array en el lista total
    this.p1={from:'-', to:'-',promotion:'q'};
    this.p2={from:'-', to:'-',promotion:'q'};
    this.array=[];
  
    
    this.fen;
    this.arrayPadre;// direccion al array que contiene el nodo
    this.posicion;// posicon en el array del nodo padre ,, direcciona a otro array donde esta contenido el nodo--> el nivel dentro del array superiro
    this.nodoPadre=null; //el nodo donde esta ubiado el array ---> del array de los nodos .. solo en  primer nodo del array a la que pertenece
    this.profundidad;// nivel de profundida indica la profunida del nodo (falta)
    this.idArrayPadre;
    this.ayuda1="";
}
