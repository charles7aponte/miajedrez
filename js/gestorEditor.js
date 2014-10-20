/* 
edicion del arbol de posibles 
jugadas en el modo de entrenamiento

 */

   var idArbol='menu_ajedrez';
   var NodoPrincipal=null;//nodo principal
   var listaTotal=[];
   var html="";
   var nodo=new Nodo();
   var idvariante=0;
   var controlGuardado=0;//indica los movientos hechos 0 .. 1 primer o 2 segundo moviento .. en un paso
   var $elementoPasoHtmlSeleccionado=null;//dentor de html del arbol es el elemento seleccionado actualamen
   var misBandos=null;
   var listaJson;
   var maximosPasos=0;
   var ultimoOponente=2;//indica si el tablero en que opoente esta pintado el tablero 1 o el 2
       
    

/***
 * adiciona una nueva  variante
 * @returns {undefined}
 */
   function addVariante(){
           
       
     

            var miArray=[];
            var miNivel=nodo.array.length;
            var nodo_principal=nodo.arrayPadre[0];// primer nodo del array donde estan contenidos
            var idArrayPadre=nodo_principal.idMiArray;// id del array padre
            var profundidadNodo=nodo_principal.profundidad;
            var nodoAnterior=nodo;
           profundidadNodo++;



            nodo.array.push(miArray);
            nodo=new Nodo();

            miArray.push(nodo);
            nodo.idArrayPadre=idArrayPadre;
            nodo.profundidad=profundidadNodo;
            nodo.nodoPadre = nodoAnterior;  


            nodo.idMiArray="d"+idvariante;
            nodo.arrayPadre=miArray;
            nodo.fen=mitablero2.genFen();
            nodo.posicion=miNivel;
            listaTotal['d'+idvariante]=miArray;
            idvariante++;
            
            
            
            ///define donde debe empezar el nuevo
            if(mitablero2.getBandos_()==3 && ultimoOponente==1)
            { 
                controlGuardado=1;
            }
            else {
               controlGuardado=0;
         
            }
       
       
           
       mitablero2.habilitaMoviento(true);
       
    
    }
       
       


/*
 * recorre la lista para generar el html del arbol
 * 
 * @param {type} lista
 * @param {type} numeroPaso
 * @returns {undefined}
 */
function recorrer (lista,numeroPaso){
        
        var siEstaVacio=html;
        var htmlIdMiArray="";
          
        html+="<ul>";         
        if(!numeroPaso)
            numeroPaso = 1;
                    
           for(var i=0;i<lista.length; i++)
           {
            
             if(lista[i].idMiArray)
                 htmlIdMiArray=" data-idarray='"+lista[i].idMiArray+"' ";
             
             var miNodo=lista[i];
             
             if(miNodo==nodo)
             {
             
                html+=" <li class='list-group-item' onContextMenu='return false;' style='color:#FF6A00'  id='seleccion_paso' "+htmlIdMiArray+" data-posicion_nodo='"+i+"'> "+numeroPaso+" . " ;
                html+= "<b   ondblclick='eliminarPaso()' onclick='irNodo(this,1)' onContextMenu='mostrarMenu(this,1,event)' style='cursor:pointer' >"+  lista[i].p1.to+"</b> - ";
                html+= "<b   ondblclick='eliminarPaso()' onclick='irNodo(this,2)' onContextMenu='mostrarMenu(this,2,event)' style='cursor:pointer' >"+ lista[i].p2.to+"</b> </li> " ;   
                
                
             }
             else{
             
                html+=" <li class='list-group-item' "+htmlIdMiArray+" data-posicion_nodo='"+i+"'> "+numeroPaso+" . "+ 
                   "<b   ondblclick='eliminarPaso()' onclick='irNodo(this,1)'  onContextMenu='mostrarMenu(this,1,event)' style='cursor:pointer' >"+ lista[i].p1.to+"</b> - "+
                   "<b   ondblclick='eliminarPaso()' onclick='irNodo(this,2)'  onContextMenu='mostrarMenu(this,2,event)' style='cursor:pointer' >"+ lista[i].p2.to+"</b> </li> " ;   
                
             }
                 
                 
             numeroPaso++;   
             
            if(lista[i].array && lista[i].array.length>0)
                {
                    for(var i2=0;i2<lista[i].array.length; i2++)
                    {
                        recorrer(lista[i].array[i2],numeroPaso);
                    }

                }
             
           }//fin del for
          
         html+=" <li class='list-group-item' "+htmlIdMiArray+" onclick='nuevoPaso(this)'><a onContextMenu='return false;' href='' onclick='return false' >... </a></li>";  
         html+="</ul>"; 
       }
       
       
       
       
       
       
       
       
       
       
     /***
      *  elimina el nodo acutal 
      * @param {type} lista
      * @param {type} posicion
      * @returns {undefined}
      */
     function eliminarPaso(){
 
 
      if(nodo!=NodoPrincipal && !listaTotal && listaTotal.length==0)
      { 
         
         console.info("error en listaTotal");   
         return false;
      }
 
    
 
 
 
        var arrayNodo= listaTotal[nodo.idMiArray];
        var nodo_principal=null;
        var posicion_nodo=-1;
       
        if(arrayNodo &&  arrayNodo.length>0)
        {
            nodo_principal=arrayNodo[0];
            
        }
        
        
    
    console.log(arrayNodo);
        //verifica que el array tiene datos
      if(arrayNodo.length>0 && nodo)
      {
          
          
          var nodoAnterior=null;
          var banderaHallo=false;
          var posicionNodoEncontrado=-1;
            
             ///busca   el nodo          y elimina los nodos que lo siguen
             for(i=0; i< arrayNodo.length; i++)
             {
                 if( arrayNodo[i]==nodo)
                 {
                    console.log("se elmin el nodo ");
                 
                    banderaHallo=true;
                 }
                 
                 
                 //elimina 
                 if(banderaHallo==true)
                 {
                   posicionNodoEncontrado=i;   
                   arrayNodo.splice(i,arrayNodo.length-i);
                     break;
                       
                 }
                 else{//almacena el utimo nodo que no saco 
                     nodoAnterior= arrayNodo[i];
                     
                 }
                 
             }//fin del for recorre los nodos para encontrarlo y eliminar el nodo y los q lo siguen
             
          
       
          
          
          
          
          //existe un nodo anterior en la misma lista 
          if(nodoAnterior)
          {
              nodo=nodoAnterior;
          }
          else{
              
              
            // la lista esta vacia--> se debe elimna y apunta a la nater 
            //finalizo y quedan mas movientos anterior al array destruido  
            
            if(nodo_principal.nodoPadre && nodo_principal.nodoPadre.array)
            {  
              eliminarArrayNodos(nodo_principal.posicion, nodo_principal.nodoPadre.array);
              nodo=nodo_principal.nodoPadre;
            }
            else {
              //no tiene mas array anterior al el
              
              
              console.error("NO debe ir al linea 210")
                //mitablero2.reiniciarJuego();
                //cargarFen();
                }
              
          }
          
         
      
     actualizaArbol();
     mitablero2.habilitaMoviento(false);
     
     
     ///actualiza la parte grafica el tablero
     if(nodo)
     {
         
         var posicionNodo=-1;//posicoin del nodo actual
         var arrayNodos=listaTotal[nodo.idMiArray];
         for(var i1=0;i1<arrayNodos.length; i1++)
         {
             if(arrayNodos[i1]===nodo)
             {
                 posicionNodo= i1;
                 break;
             }
             
         }
         
         actualizaTableroHasta(nodo.idMiArray,posicionNodo,2);
     
     }
    
    }//fin del if ... verifica que el array tiene datos
       
       
 }    
       
       
       
       
       //elminar un array de nodos dentro del array padre nodo
       function eliminarArrayNodos(posicion, array_padre){
          
           var arrayAuxiliar;
           
           array_padre.splice(posicion,1);
           
           for(var i=0;i<array_padre.length; i++ )
           {
               if(array_padre[i] && array_padre[i][0])
               {
                   
                  array_padre[i][0].posicion=i; 
                   
               }
               
               
           }
       }
       
       
       
       
       
       /**
        * actualiza todo el arbol del html
        * @returns {undefined}
        */
       function actualizaArbol(){
           
           
            html="<ul >";
          
            var htmlIdMiArray="";
           
             if(NodoPrincipal.idMiArray)
                 htmlIdMiArray=" data-idarray='"+NodoPrincipal.idMiArray+"' ";
            
            
            html+=" <li class='list-group-item active' "+htmlIdMiArray+" data-posicion_nodo='"+0+"'> "+ 
                   "<b   onclick='irNodo(this,1)' style='cursor:pointer' >INICIO</b>  "+
                   "</li>";
               
            
            if(NodoPrincipal.array && NodoPrincipal.array.length>0)
                {
                    for(var i2=0;i2<NodoPrincipal.array.length; i2++)
                    {
                        recorrer(NodoPrincipal.array[i2],1);
                    }
                }
                
            html+="</ul>";
            
            document.getElementById(idArbol).innerHTML =html;
           
       }
       
       
       
       
       /****
        * 
        * @param {Nodo} el nodo a validar si esta vacio
        * * @returns {int} -1 no tiene ni un moviento 
        *               2 tiene moviento en solo en el primer openente 
        *               3 tiene moviento en los dos oponentes
        *               4 tiene moviento solo en segundo oponente
        * 
        * 
        */
       
       function elNodoVacio(nodo)
       {
           
           if(nodo.p1 &&  nodo.p2)
           {
               if(nodo.p1.from!='-'  && nodo.p2.from!='-' )
                 return 3;
               else if(nodo.p1.from!='-' )
                   return 2;
               
               else if(nodo.p2.from!='-' )
                   return 4;
               
             
               
           }
           
           
          
           return -1;
       }
       
       
       
       // elemento al que se le dio click
       // pos 1 ,,, si p1 o  2 ->p2
       function irNodo(elemento,pos)
       {
           // bandera para saber si existe un moviento pendiente
         var tengoMovientosPendientes =  !libresMovientoPendientes(); 
         
         
         //en caso de tener movientos pendientes se elimina para saltar y evitar eliminar el nodo principal
         if(nodo!=NodoPrincipal && tengoMovientosPendientes)  
         {

              /* alert("no debio entrar"+elNodoVacio(nodo)+"-->"+tengoMovientosPendientes);
               eliminarPaso();
               mitablero2.habilitaMoviento(false);
               */
              
              alert("No ha realizado el moviento");
              return false;
         }
           
           
           
           var $padre=$(elemento).parent();
           var idArray=$padre.attr("data-idarray");
           var posicionNodo=$padre.attr("data-posicion_nodo");
           var datoMuestraUsuario=$(elemento).html(); 
       
       
            posicionNodo=parseInt(posicionNodo);
       
       if(datoMuestraUsuario != '-')
       {
            //dar color a la seleccion
            if($elementoPasoHtmlSeleccionado)
                $elementoPasoHtmlSeleccionado.css({color:""});
            
            var $ultimoNodoCreado=$("#seleccion_paso");
            if($ultimoNodoCreado.length>0)
            {
                $ultimoNodoCreado.css({color:''});
            }
            
            $(elemento).css({color:"#FF6A00"});
            $elementoPasoHtmlSeleccionado=$(elemento);
                
             var miNodo = actualizaTableroHasta(idArray,posicionNodo,pos);
                

               if(miNodo)
                nodo=miNodo;
        } 
           return false;
       }



/**
 * actualiza de forma grafica el tablero
 * 
 * @param {String} idArray del array dentro de listaTotal
 * @param {int} posicionNodo del nodo hasta donde se debe actualizar
 * @param {int} posccion del nodo 1 --> oponente 1 o 2 el segundo oponente
 * @returns {miNodo} retorna el nodo si lo encuentra en caso contrario retorna null
 */
function actualizaTableroHasta(idArray,posicionNodo, pos){
    
    

           var miFen="";
           var miNodo=null;

           console.log("");
            console.log(listaTotal[idArray]);


           if(listaTotal[idArray] &&  listaTotal[idArray][0])
           {
                console.log("el  1");
               miFen=listaTotal[idArray][0].fen;

           }


           console.log("el fen a cabiar er "+miFen);
           mitablero2.cambiarFen(miFen);


           for(var i=0;i<=posicionNodo && i<listaTotal[idArray].length; i++)
           {
               miNodo = listaTotal[idArray][i];

               if(mitablero2.getBandos_()==3)
               {
                   if(posicionNodo!=i)// si no esl el ultmo moviento
                   {
                    mitablero2.moverFicha(miNodo.p1.from, miNodo.p1.to, false,miNodo.promotion);
                    mitablero2.moverFicha(miNodo.p2.from, miNodo.p2.to, false,miNodo.promotion);
                    
                    }
                    else{// el ultmo moviento valida si toka uno o los dos
                        if(pos==1)
                        {
                         mitablero2.moverFicha(miNodo.p1.from,miNodo.p1.to,true,miNodo.promotion);
                         ultimoOponente=1;
                        }
                        else{
                         mitablero2.moverFicha(miNodo.p1.from,miNodo.p1.to,false,miNodo.p1.promotion);
                         mitablero2.moverFicha(miNodo.p2.from,miNodo.p2.to,true,miNodo.p2.promotion);
                        
                            ultimoOponente=2;
                            }

                    }
               }
               else if (mitablero2.getBandos_()==1 || mitablero2.getBandos_()==2  )
               {

                   if(posicionNodo!=i)
                   { 
                       mitablero2.moverFicha(miNodo.p1.from,miNodo.p1.to,false,miNodo.p1.promotion);
                   }
                   else // si es el ulimo moviento
                   {
                     mitablero2.moverFicha(miNodo.p1.from,miNodo.p1.to,true,miNodo.p1.promotion);  
                   }
                   
                   ultimoOponente=1;

               }


           }//fin del for
           
    return miNodo;
    
}




/*************
 * saber si tiene movientos pendientes  veficando si el nodo actual esta vacio o no
 * @returns {boolean} retorna true si no tiene moviento pendientes actualmente o 
 * false si tiene movientos pendientes
 * 
 * 
 */
function libresMovientoPendientes(){
        
                //menu_ajedrez 
                //if(!mitablero2.getHabilitaMoviento()) 
                
                {
                    //valida si el nodo actual esta vacio 
                    if((mitablero2.getBandos_()==1 ||  mitablero2.getBandos_()==2) && elNodoVacio(nodo)==2 )
                    {   return true;
                    }
                    else if( mitablero2.getBandos_()==3  && (elNodoVacio(nodo)==3 || elNodoVacio(nodo)==4) )
                    {
                        return true;
                    } 
                    //caso de excepcion nodo principal
                    else if(nodo==NodoPrincipal)
                    {
                        
                        return true;
                    }
                }  
      return false;
}




       //genera la lista de Json
       // un json de la forma maximosPasos
       function generarListaJson()
       {
        listaJson=[];
        maximosPasos=0;
      
        if(NodoPrincipal.array && NodoPrincipal.array.length>0)
                {
                    for(var i2=0;i2<NodoPrincipal.array.length; i2++)
                    {
                       generarJSONNodos(NodoPrincipal.array[i2],1,0);
                    }
                }
             
        return {maximos_pasos:maximosPasos, pasos:listaJson};
       }





       
       /**
        * json a ser guardado
        * guarda los datos generados de los pasos en la variables listaJson
        */
       function generarJSONNodos(lista,pasos,posicionNodoPadre)
       {
          var miJson={};
          miJson.id=null;// ide del array
          miJson.ayuda1="[";
          miJson.pasos="[";
          miJson.fen="";
          miJson.idPadre="";
          miJson.nivel;
          miJson.promocion="[";
         
          listaJson.push(miJson);
        
        var nodoAuxiliar=null;
            
          
          // datos en el nodo principal
          if(lista.length>0)
          {
             
               var pasosTotales=0;
                pasosTotales=pasos; 

               // guarda la maxima cantidad de pasos
               if(maximosPasos<pasosTotales)
                   maximosPasos=pasosTotales;
       
               
               
               
               nodoAuxiliar=lista[0];
             
             miJson.id=nodoAuxiliar.idMiArray;
             miJson.ayuda1+= nodoAuxiliar.ayuda1;
             miJson.fen= nodoAuxiliar.fen;
             miJson.idPadre= nodoAuxiliar.idArrayPadre;
             miJson.nivel= nodoAuxiliar.profundidad;
             
                if(misBandos==3)
                {
                    miJson.pasos+="{"+nodoAuxiliar.p1.from+","+nodoAuxiliar.p1.to+"}"
                                 +";{"+nodoAuxiliar.p2.from+","+nodoAuxiliar.p2.to+"}";
                    miJson.promocion+= nodoAuxiliar.p1.promotion+","+nodoAuxiliar.p2.promotion;    
               }
                else{
                    miJson.pasos+="{"+nodoAuxiliar.p1.from+","+nodoAuxiliar.p1.to+"}";
                    
                   miJson.promocion+= nodoAuxiliar.p1.promotion;    
              
               }
                
                //recursiviadad
                if(nodoAuxiliar && nodoAuxiliar.array.length>0)
                {
                  
                   for(i1=0;i1< nodoAuxiliar.array.length; i1++)
                   {
                    generarJSONNodos(nodoAuxiliar.array[i1],pasosTotales,0);
                    }
                }
                
          }
           
           
           for(var i=1; i< lista.length ; i++)
           {

               
               var pasosTotales=0;
                pasosTotales=i+pasos; 

               // guarda la maxima cantidad de pasos
               if(maximosPasos<pasosTotales)
                   maximosPasos=pasosTotales;
       
               
               nodoAuxiliar=lista[i];
                miJson.ayuda1+=","+nodoAuxiliar.ayuda1;
                
                if(misBandos==3)
                {
                    miJson.pasos+=";{"+nodoAuxiliar.p1.from+","+nodoAuxiliar.p1.to+"}"
                                 +";{"+nodoAuxiliar.p2.from+","+nodoAuxiliar.p2.to+"}"; 
                    miJson.promocion+=","+nodoAuxiliar.p1.promotion+","+nodoAuxiliar.p2.promotion;    
                    
               }
                else{
                    miJson.pasos+=";{"+nodoAuxiliar.p1.from+","+nodoAuxiliar.p1.to+"}";
                    miJson.promocion+=","+nodoAuxiliar.p1.promotion;    
          
               
               }
                
                
                //recursiviadad
                if(nodoAuxiliar && nodoAuxiliar.array.length>0)
                {
                  
                   for(i1=0;i1< nodoAuxiliar.array.length; i1++)
                   {
                    generarJSONNodos(nodoAuxiliar.array[i1],pasosTotales,i);
                    }
                }
                
                
           }//fin del for recorrido
           
         
          miJson.ayuda1+="]";
          miJson.pasos+="]";
          miJson.posicionNodoPadre= posicionNodoPadre;
          
          miJson.promocion+="]";
       }
       
       
       
       
       
       
       
       
       /***
        * 
        * genera un nuevo nodo el cual representa un nuevo paso
        * @param {type} elemento
        * @returns {undefined}
        */
       function nuevoPaso(elemento){
           
          //falta la validacion que el paso anterior este terminado
          
        var seguir = false;
        if(mitablero2.getBandos_()==3)
          {
              if(nodo.p2.from!='-' )
                 seguir=true;
              
          }
          else if (mitablero2.getBandos_()==1 || mitablero2.getBandos_()==2  )
          {
            if(nodo.p1.from!='-')   
               seguir = true;
          }
          
                 
          
          
         if(seguir)
         { 
            var idArray= $(elemento).attr('data-idarray');
            var posicionNodo=listaTotal[idArray].length-1;
            var oponenteFinal=''
            //se obtiene la poscion del nnodo 
            
            
            nodo =new Nodo();
            
            nodo.idMiArray=idArray;
         
            
               
            //un nuevo paso siempre debe ejecutar cuando todo este terminado   
            controlGuardado=0;
          
            nodo.arrayPadre=listaTotal[idArray];
            mitablero2.habilitaMoviento(true);
            listaTotal[idArray].push(nodo);


            actualizaTableroHasta(idArray,posicionNodo,2);//debe mostrar el ultimo moviento    

            actualizaArbol();

         } 
           
         
   }
   
   
   
/**********************
 * 
 * guadara el paso que se ha realizado desde el tablero
 * @returns {undefined}
 */   
function guardaPaso(){
       
     if(mitablero2.getHabilitaMoviento()==false)
     {
        if(mitablero2.getBandos_()==3 )//juega negras y blancas
        {


           if(controlGuardado==0)
           { 
               nodo.p1=mitablero2.getMoviento();
               controlGuardado++; 
               mitablero2.habilitaMoviento(true); 
               console.error("contron gura =0 ");
            }     
            else if(controlGuardado==1)
            { nodo.p2=mitablero2.getMoviento();
              controlGuardado++; 
               console.error("contron gura =1 ");
            }
                else 
                alert("hizo todos los movientos cree otro paso");
        }// solo juego uno
        else  if(mitablero2.getBandos_()==1 || mitablero2.getBandos_()==2)
        {
            if(controlGuardado==0)
            {

                nodo.p1=mitablero2.getMoviento();
                controlGuardado++;
            }
            else 
                alert("gener otro paso");


        }


     }
     else {
          alert("realice un moviento ");
     }



    actualizaArbol();

   }
       
       
       
  function cargarFen()
  {
      
     
     
     misBandos= mitablero2.getBandos_();     


   //INCIIO
    NodoPrincipal=new Nodo();

    var miNivel=0;
    var listaPadre=[];




    listaPadre.push(NodoPrincipal);
    NodoPrincipal.idArrayPadre=0;
    NodoPrincipal.profundidad=0;

    NodoPrincipal.idMiArray="d"+idvariante;
    NodoPrincipal.arrayPadre=listaPadre;
     
    NodoPrincipal.fen=mitablero2.genFen();
    NodoPrincipal.posicion=miNivel;
    nodo=NodoPrincipal;

   
    listaTotal=[];
    listaTotal['d'+idvariante]=listaPadre;
    idvariante++;




    addVariante();

    actualizaArbol();


      
      
  }
  
  
  
  
  
  /******************  MENU AL DAR CLICK CON EL MOUSE **************************/
$(document).ready(function(){
		
		//Ocultamos el menú al cargar la página
		$("#menu_click").hide();
		
		
		
		//cuando hagamos click, el menú desaparecerá
		$(document).click(function(e){
                   
			if(e.button == 0){
				$("#menu_click").css("display", "none");
			}
		});
		
		//si pulsamos escape, el menú desaparecerá
		$(document).keydown(function(e){
			if(e.keyCode == 27){
				$("#menu_click").css("display", "none");
			}
		});
		
		//controlamos los botones del menú
		$("#menu_click").click(function(e){
			
			// El switch utiliza los IDs de los <li> del menú
			switch(e.target.id){
				case "menu_click_variante":
					
                                        nuevaVariante();
                                        
					break;	
				case "menu_click_mover":
					//alert("movido!");
					break;
				case "menu_click_eliminar":
                                            
                                            eliminarPaso();
                                        //alert("eliminado!");
					break;
			}
			
		});
		
				
	});
        
       

function elegirPromotion(){
   var html="";
   
   if(mitablero2.turnoJuego()=='b')
   {
   html="<div>  "
            +"<img class=\"img_piezas_promotion\" src=\"img/chesspieces/wikipedia/bQ.png\" onclick=\"seleccionarPromotion(this,\'q\')\"> "
            +"<img src=\"img/chesspieces/wikipedia/bB.png\" class=\"img_piezas_promotion\" onclick=\"seleccionarPromotion(this,\'b\')\"> "
            +"<img src=\"img/chesspieces/wikipedia/bN.png\" class=\"img_piezas_promotion\" onclick=\"seleccionarPromotion(this,\'n\')\"> "
            +"<img src=\"img/chesspieces/wikipedia/bR.png\" class=\"img_piezas_promotion\" onclick=\"seleccionarPromotion(this,\'r\')\"> "
            +"</div>";
   }else{
    
     html="<div>  "
            +"<img src=\"img/chesspieces/wikipedia/wQ.png\" class=\"img_piezas_promotion\" onclick=\"seleccionarPromotion(this,\'q\')\"> "
            +"<img src=\"img/chesspieces/wikipedia/wB.png\" class=\"img_piezas_promotion\" onclick=\"seleccionarPromotion(this,\'b\')\"> "
            +"<img src=\"img/chesspieces/wikipedia/wN.png\" class=\"img_piezas_promotion\" onclick=\"seleccionarPromotion(this,\'n\')\"> "
            +"<img src=\"img/chesspieces/wikipedia/wR.png\" class=\"img_piezas_promotion\" onclick=\"seleccionarPromotion(this,\'r\')\"> "
           +"</div>";
   }
   
   
   
   alertify.alert(html, function () {
                        mitablero2.actualizaUltimaCoronacion(); 
       
				});
    
}

 function seleccionarPromotion(elemento,promocion){
    var $padre=$(elemento).parent();
     
    $padre.find(".sel_img_piezas_promotion").removeClass("sel_img_piezas_promotion");
    $(elemento).addClass("sel_img_piezas_promotion");
    
     mitablero2.elegirPromocion(promocion);
     
     
     
 }

/**********
 * muestra el menu de seleccion de opciones sobre el paso
 * @param {type} elemento
 * @param {type} posicion
 * @param {type} e
 * @returns {Boolean}
 */
   function mostrarMenu(elemento, posicion ,e){
       
       irNodo(elemento, posicion);       
       console.log("la posicion "+e.pageX+" "+e.pageY);
       $("#menu_click").css({posicion:'absolute','display':'block', 'left':e.pageX, 'top':e.pageY});
       return false;
       
   }     
     
     
     /**
      * retonorna la coleccion de nodos 
      * @param {type} cantidad_jugadores
      * @param {type} pasos
      * @param {type} ayuda
      * @param {type} promocion
      * @returns {undefined}
      */
     function reconstruccionNodosPorArray(cantidad_jugadores, pasos, ayuda,promocion){
         
         var misPasos= pasos.substring(1,pasos.length-1).split(";");
         var miAyuda=  ayuda.substring(1,ayuda.length-1).split(",");
         var miPromocion= promocion.substring(1,promocion.length-1).split(",");
         
         var arrayNodos=[];
         
         var i=0;
         
         while( i< miPromocion.length)
         {
             if(cantidad_jugadores==2)
             {
               var paso=eval(agregarComillasPasos(misPasos[i]+""));
               var miNodo= new Nodo();
               miNodo.p1.from= paso[0];
               miNodo.p1.to= paso[1];
               miNodo.p1.promotion = miPromocion[i];
               
               i++;
               var paso=eval(agregarComillasPasos(misPasos[i]+""));
               miNodo.p1.from= paso[0];
               miNodo.p1.to= paso[1];
               miNodo.p1.promotion = miPromocion[i];
               
               miNodo.ayuda1 = miAyuda[i];
                
               
              arrayNodos.push(miNodo);
              i++;
             }
             else{
               console.log("............ miNodo");
               console.log("............ misPasos[i]"+misPasos[i]);
              console.log("..."+agregarComillasPasos(misPasos[i]));
                 
                 
               var paso=eval(agregarComillasPasos(misPasos[i]));
               var miNodo= new Nodo();
               
                console.log(paso);
               
               
               miNodo.p1.from= paso[0];
               miNodo.p1.to= paso[1];
               miNodo.p1.promotion = miPromocion[i];
               miNodo.ayuda1 = miAyuda[i];
               
               i++;
              arrayNodos.push(miNodo);
                 
                 
             }
             
         }//fin de while
       return arrayNodos;  
     }
     
     
     
     /****
      * ingresal comilas simples a el string de pasos
      */
     function agregarComillasPasos(mipaso){
      var salida="";
         for(var i=0; i<mipaso.length; i++)   
         {
             
              if(mipaso[i]==':')
             {
                 salida+="':'";
             }else if(mipaso[i]=='{')
             {
                 salida+="['";
             }else if(mipaso[i]=='}'){
                 salida+="']"; 
             }else if(mipaso[i]==','){
                 salida+="','"; 
             }else {
                 salida+=mipaso[i];
             }
         }
         return salida;
     }
     
     
     
     /***
      * adiciona una nueva variante
      */
     function nuevaVariante(){
              
        var seguirVariante=libresMovientoPendientes(); 
        
             
               
        // realiza acccion si paso la validacion para crear otra variante       
        if( seguirVariante)
        {
            addVariante();
            mitablero2.habilitaMoviento(true);
        }
        else{
            alert("Tiene un moviento pendiente"); 
        }
        actualizaArbol();
     }