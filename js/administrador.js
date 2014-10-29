  var mitablero2 =null;
  var numeroPasoActual=1;





function guardarDatosBasicosJuego(){
    
    
    var dificultad;
    var jugadores;
    var torneo;
    var year;
    var cantidad_jugadas;
    var temas;
    var palabras;
    var objetivo;
    var puntos;
    var quitar_puntos;
    var pasos;
    
    if(mitablero2 == null)
    {
        alert("Error no se han cargado los datos");
       return false;
    }
    
    
    dificultad=$("#dificultad").val();
    
    
    if(mitablero2.getBandos_()==3)
        { 
        jugadores=2;
        }
    else{
        
        jugadores=1;
        }
    
    
    torneo=$("#torneo").val();
    year=$("#year").val();
    
   var  jsonDatos=generarListaJson();
    cantidad_jugadas= jsonDatos.maximos_pasos;
    pasos=jsonDatos.pasos;
    
    
    temas=$("#tema").val();
    palabras=$("#palabras_claves").val();
    objetivo=$("#objetivo").val();
    puntos=$("#puntos").val();
    quitar_puntos=$("#castigo").val();;
    
    
    
    $.ajax({
            url:'php/administracionBd.php'
            ,type:'POST'
            ,data:{
                
            opcion:'guardar_ejercicio',
                dificultad:dificultad,
                jugadores:jugadores,
                torneo:torneo,
                year:year,
                cantidad_jugadas:cantidad_jugadas,
                temas:temas,
                palabras:palabras,
                objetivo:objetivo,
                puntos:puntos,
                quitar_puntos:quitar_puntos,
                pasos:pasos
                }
            ,dataType:'json'
            ,beforeSend:function(  jqXHR, settings ){
                                                
            }
            ,success: function(data,textStatus,jqXHR){
                    console.log(data);
                    
                    
                    if(data && /[0-9]+/.test(data.id_ejercicio))
                    {
                        
                        alert("la nueva partida ha sido guardada");
                    }
                    else
                    {
                        alert(":( error en la conexión");
                    }
            }
        });
    
    
    
}





/****
 * soliicta los datos para formar los nodos
 * 
 */
function solicitarDatos(miId){
    //var miId= $("#mi_id").val();
    
    
    $.ajax({
            url:'php/administracionBd.php'
            ,type:'POST'
            ,data:{
                
                opcion:'solicitud_pasos',
                id:miId,
                }
            ,dataType:'json'
            ,beforeSend:function(  jqXHR, settings ){
                                                
            }
            ,success: function(data,textStatus,jqXHR){
                    console.info(data);
                    
                    if(data)
                    {
                      idvariante=0;  
                      NodoPrincipal=new Nodo();   
                      NodoPrincipal.idArrayPadre=0;
                      NodoPrincipal.profundidad=0;

                      NodoPrincipal.idMiArray="d"+idvariante;

                      var general=data['general'][0];
                      var misPasos=data['pasos'];
                      
                      console.log(general);
                      console.log(misPasos);
                        
                        listaTotal=[];
                        //listaTotal['d0']=[NodoPrincipal];
                        //primer recorrido
                        for(var i=0;i<misPasos.length; i++)
                        {
                           listaTotal[misPasos[i].id] = reconstruccionNodosPorArray(
                                 general.jugadores
                                 ,misPasos[i].pasos
                                 ,misPasos[i].ayuda1
                                 ,misPasos[i].promocion
                                 , misPasos[i].piezas
                                );   
                                 
                            console.log("...........");
                            console.log(listaTotal[misPasos[i].id]);
                         

                        }// fin del for 1
                        
                        
                        for(var i=0; i<misPasos.length; i++)
                            {
                                var nodoPadreSeleccionado;
                                var miContadorVariante;
                                //si existe 
                                if(listaTotal[misPasos[i].idPadre])
                                {
                                     nodoPadreSeleccionado = listaTotal[misPasos[i].idPadre][misPasos[i].posicion];   
                                }
                                else{
                                    nodoPadreSeleccionado = NodoPrincipal;
                                    NodoPrincipal.fen =   misPasos[i].fen;
                                    NodoPrincipal.fen =   misPasos[i].fen;
                                }
                                
                                
                                //guarda el numero de mayor variante
                                miContadorVariante= misPasos[i].id.substring(1,misPasos[i].id.length);
                                if(idvariante<miContadorVariante)
                                {
                                    idvariante = miContadorVariante;
                                }
                                
                                //se une al nodo para la cual ingresa datos al primer nodo
                                if(listaTotal[misPasos[i].id] && listaTotal[misPasos[i].id][0])
                                {   var nodoUno= listaTotal[misPasos[i].id][0];
                                    nodoUno.idMiArray= misPasos[i].id;
                                    nodoUno.fen=  misPasos[i].fen;
                                  
                                    
                                    nodoUno.arrayPadre =   nodoPadreSeleccionado.array;
                                    nodoUno.posicion= nodoPadreSeleccionado.array.length;
                                    nodoUno.nodoPadre= nodoPadreSeleccionado;
                                    nodoUno.idArrayPadre= misPasos[i].idPadre;
                                    nodoUno.profundidad = parseInt(misPasos[i].profundidad); 
                        
                                 }
                                nodoPadreSeleccionado.array.push(listaTotal[misPasos[i].id]);
                                
                            }//finalizo de crear el arbol
                            
                            
                            if(NodoPrincipal &&  NodoPrincipal.fen)
                            {
                               var tableroAuxiliar = new tablero2();
                               var arrayFen=NodoPrincipal.fen.split(" ");/// 1 --> blancas , 2 --> negras , 3 --> blancas y negras , 0 --> error 


                                    idvariante=0;
                                    mitablero2 = new tablero2({id:'board',fen:arrayFen[0], oponenteInicio:arrayFen[1], eventCoronacion:'q'});
                                    listaTotal['d0']=[NodoPrincipal];
                                    nodo=NodoPrincipal;
                                    actualizaArbol();
                                    

                            }//fin de cargar la parte grafica  
                            else{alert("eror en nodo Principal"+NodoPrincipal +"-->"+NodoPrincipal.fen);}
                    
                    }///si data existe 
                    else 
                    {
                        
                        alert("Error en la comunicacion");
                    }
            }
        });
    
}





//manejoe de botones y de menus 
function irpaso_op1(elemento){
    var numeroPaso= $(elemento).attr("data-bonmenu");
   saltaPaso(numeroPaso);
    
    

}

//manejoe de botones y de menus 
function irpaso_op2(elemento){
    var numeroPaso= $(elemento).attr("data-bonmenu2");
    
   saltaPaso(numeroPaso);
    
    

}



/**
 *  muestra valida el paso que correpsonde al numero numeroPaso .. salta a (numeroPaso + 1)
 * @param {int} numeroPaso a saltra 1 -3 
 * @returns {undefined}
 */
function saltaPaso(numeroPaso)
{
    
    var validacion=false; 
    
    if(numeroPaso<=(numeroPasoActual+1))
    {    validacion=true;
   
        switch (numeroPaso){



            //validacion segun el caso 
            case "1":


            break;


            case "2":
                  var valor = $("#tema").val(); 
                  if(valor=="")
                  {
                      
                      alert("Por favor ingrese un valor en tema");
                      return false;
                  }
               
                break;


              case "3":
                   validacion=clickCargaFen();
                break


        }
    }
    //
    if (validacion)
    {
        
        
        
            $("#paso1").hide();
            $("#paso2").hide();
            $("#paso3").hide();
            
            $
            
            var pasoMostrar=parseInt(numeroPaso);
            
            
            if(pasoMostrar<=0)
                $("#paso1").show();
            else if(pasoMostrar>=4)
                $("#paso3").show();
            else 
                $("#paso"+pasoMostrar).show();
            
            
            
            $("[data-bonmenu='"+(pasoMostrar-1)+"']").addClass("activoMio").find("i").html("<span class='glyphicon glyphicon-ok'></span>");
        
             
            for(var i=1;i<pasoMostrar;i++)
             {
                   $("[data-bonmenu='"+(i)+"']").removeClass("activoMio2"); 
             }
        
            for(var ii=pasoMostrar;ii<=3;ii++)
            {
              $("[data-bonmenu='"+(ii)+"']").removeClass("activoMio").removeClass("activoMio2").find("i").html("");
        
            }
            $("[data-bonmenu='"+(pasoMostrar)+"']").addClass("activoMio2").find("i").html("");
        
        numeroPasoActual=parseInt(numeroPaso);
    }
    
    
}



/**
 * cargar fen al darle click
 * @returns {boolean} true si se puede cargar o false si no se puede cargar el fen
 */
function clickCargaFen(){
    
    var oponenteInicio=$("#edicion_oponente").val();
            
            tableroAuxiliar = new tablero2();
            var oponenteInicioN=tableroAuxiliar.revisarBandos(tableroPiezas.fen());/// 1 --> blancas , 2 --> negras , 3 --> blancas y negras , 0 --> error 
            
            
            if((oponenteInicio=="w" && (oponenteInicioN==1 || oponenteInicioN==3)) ||
                    (oponenteInicio=="b" && (oponenteInicioN==2 || oponenteInicioN==3)))
            {
            
                idvariante=0;
                mitablero2 = new tablero2({id:'board',fen:tableroPiezas.fen(), oponenteInicio:oponenteInicio, eventCoronacion:elegirPromotion});
                cargarFen();
                return true;
                
            }
            else {
                
                alert("Verifique al usurio de inicio y el tablero");
                return false;
            }
           
    
    
}




