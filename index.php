<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->

<html>
    <head>
        
        <meta charset="UTF-8">
        
        <link rel="stylesheet"  type="text/css" href="css/chessboard-0.3.0.css" />
        <link rel="stylesheet"  type="text/css" href="css/bootstrap.min.css" />
        <link rel="stylesheet"  type="text/css" href="css/bootstrap-theme.css" />
        <link rel="stylesheet"  type="text/css" href="css/datepicker.css" />
        <link rel="stylesheet"  type="text/css" href="css/admicss.css" />
        
        
        <script type="text/javascript" src="js/jquery-1.10.1.min.js"></script>
        <script type="text/javascript" src="js/bootstrap.js"></script>
        <script type="text/javascript" src="js/chessboard-0.3.0.js"></script>
        <script type="text/javascript" src="js/chess.js"></script>
        <script type="text/javascript" src="js/bootstrap-datepicker.js"></script>   
        <script type="text/javascript" src="js/local/bootstrap-datepicker.es.js"></script>   
     
        
        
        <script type="text/javascript" src="js/administrador.js"></script> 
        <script type="text/javascript" src="js/tablero2.js"></script>
        <script type="text/javascript" src="js/nodo.js"></script>
        <script type="text/javascript" src="js/gestorEditor.js"></script>   
        
        
        
        
        <script type="text/javascript" src="js/alertify.js"></script>
        <script type="text/javascript" src="js/jquery.nicescroll.js"></script>
        <link rel="stylesheet" href="css/alertify.default.css" />
        <link rel="stylesheet" href="css/alertify.core.css" />
       
        <title></title>
    </head>
    <body>
        
        
        
        
    <div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
      <div class="container-fluid">
       
          <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#" id="mi_titulo_barra_lateral">Reinos del Ajedrez</a>
        </div>
          
        <!--  
        <div class="navbar-collapse collapse">
          <ul class="nav navbar-nav navbar-right">
            <li><a href="#">Dashboard</a></li>
            <li><a href="#">Settings</a></li>
            <li><a href="#">Profile</a></li>
            <li><a href="#">Help</a></li>
            
          </ul>
          <form class="navbar-form navbar-right">
            <input type="text" class="form-control" placeholder="Search...">
          </form>
        </div>
        -->
        
      </div>
        
       
    </div>

    <div class="container-fluid">
      
     
     <div class="row">
      
        <!-- barra izq-->   
        <div class=" col-md-2 col-sm-3 sidebar" id="mi_barra_izq_lat">
            <ul class="nav nav-sidebar" id="mi_barra_izq_lat_box">
                <li class="dropdown-submenu"> 
                    <a href="#"><i class="fa fa-list fa-lg"></i>
                        <span><font><font>Listas</font></font></span></a>
                             <ul class="dropdown-menu"> 
                                 <li><a href="list.html"><font><font>Cite los grupos</font></font></a></li> 
                                 <li><a href="table.html"><font><font>Tabla</font></font></a></li> 
                             </ul> 
                </li>

                 <li class="active"><a href="#"><span class="glyphicon glyphicon-tower"></span> Construir Juego</a></li>
                 <li ><a href="#"><span class="glyphicon glyphicon-pencil"></span> Editar Juego</a></li>
     
            
            </ul>
       
        </div>
         
        
        
       <!-- fin de barra izq -->   
          
        <div id="mi_main_edicion" class="col-md-10 col-sm-9 col-sm-offset-3  col-md-offset-2 main">
          <h1 class="page-header">Construir Juego</h1>
          
          <!-- botone de cabecera -->
          <section class="toolbar clearfix m-t-large m-b">
              
              <a href="#" class="btn btn-primary btn-circle active  btonMenu activoMio" data-bonmenu="1" onclick="irpaso_op1(this)">
                 <i class="fa fa-lightbulb-o"></i>
                 <font><font>Datos</font></font>
             </a> 
              
              
             <a href="#" class="btn btn-primary btn-circle active btonMenu " data-bonmenu="2" onclick="irpaso_op1(this)">
                 <i class="fa fa-lightbulb-o">
                     
                 </i>
                 <font><font>Tablero</font></font>
             </a> 
              
              
             <a href="#" class="btn btn-primary btn-circle btonMenu" data-bonmenu="3" onclick="irpaso_op1(this)">
                 <i class="fa fa-lightbulb-o">
                     
                 </i>
                 <font><font>Jugadas</font></font>
             </a>
          </section>
          

          
          
          
          <div class="table-responsive">
            
          


             <!-- DATOS GENERALES PARA LAS PARTIDAS -->
             <div class="panel panel-primary " id="paso1">
                 <div class="panel-heading">
                    <h3 class="panel-title">Datos Generales</h3>
                  </div>
                 
                 
                 <div class="input-group input-group-lg mi_input_1">
                    <span class="input-group-addon">Dificultad : </span>
                    <input type="text" class="form-control" id="dificultad" placeholder="dificultad">
                 </div>
                
                  <div class="input-group input-group-lg mi_input_1">
                    <span class="input-group-addon">Torneo : </span>
                    <input type="text" class="form-control" id="torneo" placeholder="Torneo">
                 </div>
                
                 
                  <div class="input-group input-group-lg mi_input_1">
                    <span class="input-group-addon">Tema : </span>
                    <input type="text" class="form-control" id="tema" placeholder="tema">
                 </div>
                
                 
                  <div class="input-group input-group-lg  input-append date mi_input_1">
                    <span class="input-group-addon">Año : </span>
                    <input type="text" readonly class="form-control " id="year" placeholder="aaaa-mm-dd"  style="width:200px; cursor:pointer ">
                  
                  </div>
                
              
                 
                 
                  <div class="input-group input-group-lg mi_input_1">
                    <span class="input-group-addon">Palabras Claves : </span>
                    <input type="text" class="form-control" id="palabras_claves" placeholder="Palabras Claves">
                 </div>
                
                 
                  <div class="input-group input-group-lg mi_input_1">
                    <span class="input-group-addon">Objetivo : </span>
                    <input type="text" class="form-control" id="objetivo" placeholder="Objetivo">
                 </div>
                
                 
                 
                 <div class="input-group input-group-lg mi mi_input_1">
                    <span class="input-group-addon">Puntos : </span>
                    <input type="number" class="form-control" id="puntos" placeholder="Puntos" style="width:200px">
                 </div>
                 
                 
                 <div class="input-group input-group-lg mi_input_1">
                    <span class="input-group-addon">Puntos de Castigo : </span>
                    <input type="number" class="form-control" id="castigo" placeholder="Puntos de Castigo" style="width:200px">
                 </div>
                 
                 
                 
                   <div class="panel-footer" style="background-color: #357ebd">
                       <div class="btn-group">
                          
                            <button type="button" class="btn btn-default btn-lg" id="paso1_bton_siguiente" data-bonmenu2="2"
                                    onclick="irpaso_op2(this)">
                               <span class="glyphicon glyphicon-arrow-right"></span> Siguiente
                             </button>
                      </div>     
                 </div>
       
             </div>
             <hr>
             
             
             
             
             
             <!-- ESTRUCTURA DE TABLERO AJEDREZ -->
             <div class="row panel panel-primary"  id="paso2">
                   <div class="panel-heading">
                    <h3 class="panel-title">Estructura del Tablero</h3>
                  </div>
                 

                       <div class="alert alert-warning alert-dismissable">
                            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                            <strong>Seleccione las fichas </strong>
                        </div>
                    
                        

                    <!-- tablero para fichas--> 
                    <div class="row">
                          <div class="col-md-12">                
                            <div id="tableroPiezas" style="width: 400px"></div>

                         </div>
                     </div>  


                     <!-- selecciona inici de partidad -->
                     <div class="row">
                        <div class="col-md-6"> 

                            <div class="form-group">
                                <label for="edicion_oponente" class="col-sm-2 control-label">jugador Incicial : </label>
                                <div class="col-sm-10">
                                    <select id="edicion_oponente">
                                            <option value="w" >&#9816; &#9815; &#9814; &#9813; &#9812; &#9817</option>
                                            <option value="b">&#9822; &#9821; &#9820; &#9819; &#9818; &#9818;</option>
                                     </select>

                                </div>
                            </div>    

                          
                        </div>

                         <div class="col-md-6 ">
                            <!--  <input type="text" value="r" id="mi_id" >
                          <input type="button" value="cambio promocion" id="bton_cambio_promocion">-->
                         </div>

                     </div>





                        <!-- botones de siguiente-->
                      <div class="panel-footer" style="background-color: #357ebd">
                           <div class="btn-group">
                               <button type="button" class="btn btn-default btn-lg" id="paso2_bton_anterior" data-bonmenu2="1"
                                       onclick="irpaso_op2(this)" >
                                   <span class="glyphicon glyphicon-arrow-left"></span> Anterior
                                 </button>

                                <button type="button" id="cargarfen" class="btn btn-default btn-lg" data-bonmenu2="3"
                                        onclick="irpaso_op2(this)">
                                   <span class="glyphicon glyphicon-arrow-right"></span> Siguiente
                                 </button>
                          </div>     
                     </div>
             </div>
             <hr>
             
             
             
             
             <!-- CONTENIDO --->
             
             <div class="panel panel-primary" id="paso3">
                 
                  <div class="panel-heading">
                    <h3 class="panel-title">Pasos o Movientos</h3>
                  </div>
                 
                 
                 <div class="row">
                     <div class="col-md-8">
                         <div id="board" style="width: 400px"></div>
                     </div>
                     
                    
                     <div class="col-md-4 ">
                         
                         <br><input type="button" id="guardar" value="guardar">
                            <input type="button" id="variante" value="variante">
                             <hr>
                             <div id="menu_ajedrez" onContextMenu="return false;"></div>
                             <hr>
                             paso final <br>
                             <input type="button" id="guardar_ejercicio" value="guardar ejercicio">


                         
                         <div id="rama"></div> 
                     </div>
                </div>  
                     
                
               
                     
                   
                <div class="panel-footer" style="background-color: #357ebd">
                       <div class="btn-group">
                           <button type="button" class="btn btn-default btn-lg" id="paso3_bton_anterior" data-bonmenu2="2"
                                   onclick="irpaso_op2(this)">
                               <span class="glyphicon glyphicon-arrow-left"></span> Anterior
                             </button>
                           
                            <button type="button" class="btn btn-default btn-lg" data-bonmenu2="4" onclick="irpaso_op2(this)">
                                    <span class="glyphicon glyphicon-arrow-right" id="paso3_bton_siguiente" ></span> Guardar
                             </button>
                      </div>     
                 </div>
                  
             </div>
             <hr>
             
             
             
              
          </div><!-- fin de la tabla -->
        </div><!-- fin del panel contendio col main-->
       
       
       
      </div><!-- row -->
    </div> <!-- container fluid-->
        
        
        
           <!-- contenido --->
           <div id="menu_click">
                  <ul>
                      <li id="menu_click_variante">nueva Variante</li>
                      <li id="menu_click_mover">Mover</li>
                      <li id="menu_click_eliminar" >Eliminar</li>
                  </ul>
              </div>
        
        
        
        
        
        </body>
    
    
    <script type="text/javascript" >
      

         </script>
        
        
        <script type="text/javascript">
        //para le tablero de piezas
        
          $("#paso1").show();
            $("#paso2").hide();
            $("#paso3").hide();
  
        
        
        
       $("#paso1_bton_siguiente").click(function(){
           
       });

        
        
        //scroll
        
        $("#mi_barra_izq_lat").niceScroll("#mi_barra_izq_lat_box",{styler:"fb",
            cursorcolor:"#428bca",cursorwidth:'10px'
        ,cursorborder:'1px solid rgb(39, 86, 128)'});  
    
    
        
        
        $('#year').datepicker({
                format: 'yyyy-mm-dd',
                startDate: '-3d',
                language:'es',
                todayBtn: 'linked',
                
                days: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
		daysShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
		daysMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"],
		months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
		monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
		today: "Hoy"
            });

    
       

       
       $("#mi_titulo_barra_lateral").click(function(){
         
        var miDisplay=   $("#mi_barra_izq_lat").css("display"); 
         
         
           if(miDisplay=="none")
           {
            //mostrar   el   
               $("#mi_barra_izq_lat").animate({opacity:1,height: "toggle"},600);
               $("#mi_main_edicion").addClass("col-md-offset-2");
               $("#mi_main_edicion").addClass("col-md-10");
                
            
               $("#mi_main_edicion").removeClass("col-md-offset-0");
               $("#mi_main_edicion").removeClass("col-md-12");
             //  banderaLateral=2;
              
              
           }
           else{
               //ocultyar menu izq lateral
               $("#mi_barra_izq_lat").animate({opacity:0,height: "toggle"},600);
               $("#mi_main_edicion").addClass("col-md-offset-0");
               $("#mi_main_edicion").removeClass("col-md-offset-2");
               
               $("#mi_main_edicion").addClass("col-md-12");
               $("#mi_main_edicion").removeClass("col-md-10");
               
            
           //     banderaLateral=1; 
               
           }
           
           
           
       });
       
        
        
          var tableroPiezas=null;
    
    var optioTableroPiezas={
          draggable: true,
          sparePieces:true,
         
        onDragStart : function(source, piece, position, orientation) {
         
         //si vienen por fuera
            if(source=='spare')
            {          var mifen=tableroPiezas.fen();
                    var tipo=piece[0];
                    var pieza=piece[1];
                    var cantidadMaximaPermitidas=cantidadMaximaPieza(pieza);
              
              
                    if(tipo=='w')// es blanca el fen esta en mayusccula 
                    {
                         pieza= pieza.toUpperCase();           
                    }     
                    else{
                        pieza= pieza.toLocaleLowerCase()
                       
                    }
                    
                  
                  //pregunta si pasa la cantidad maxima de piezas (cantidapiezasActuales >= piezaMaximasPermitidads)
                  if(contarLetras(mifen,pieza)>=cantidadMaximaPermitidas )
                  {
                      
                      return false;
                  }
                    
            }
          
          },
          
          
         onDrop : function(source, target) {
            // return 'snapback';


          } ,
          
          
          onMouseoutSquare:function (square, piece)
          {
             // console.log("");
              //console.info(square);
              //console.info(piece);
              
              
          }
            
        };
        
        // limitee maximo de piezas por el tipo de ficha
        /*K--> rey
                Q--> reina
                R--> torre
                B-> alfil
                N-->caballo
                P--> peon*/
        function cantidadMaximaPieza(pieza)
        {
            var cantidad=0;
            
            pieza=pieza.toUpperCase();
            
            switch(pieza)
            {
                case 'K': cantidad=1; break;
                case 'Q': cantidad=1; break;
                case 'R': cantidad=2; break;
                case 'B': cantidad=2; break;
                case 'N': cantidad=2; break;
                case 'P': cantidad=8; break;
                
            }
            
            return cantidad;
            
        }
        
        
        
        //cuenta la cantidad de letras que hay en la cadena
        function contarLetras(cadena,letra){
            var cantidad=0;
            
            for(var i=0;i<cadena.length;i++)
            {
                
                if(cadena[i]==letra)
                {
                    cantidad++;
                    
                }
                
            }
            
            return cantidad;
        }
        
        
       
       
       
       
       tableroPiezas=new ChessBoard('tableroPiezas',optioTableroPiezas);
        
       
       /****************************************************/
     
       //al dar clikc cargar
       
       //cargar fen
        document.getElementById('cargarfen').addEventListener('click',function(){
            
           // clickCargaFen();
        });
        
        
       document.getElementById('guardar').addEventListener('click',function(){
         //menu_ajedrez
         guardaPaso();
    
    });
        
        
        
     document.getElementById('variante').addEventListener('click',function(){
     
        
        var seguirVariante=libresMovientoPendientes(); 
        
            nuevaVariante();
        
    });
        
        
        
        
        
        
     document.getElementById('guardar_ejercicio').addEventListener('click',function(){
         //menu_ajedrez 
        guardarDatosBasicosJuego();
        
        
        
    });   
     
     
    /* document.getElementById('bton_cambio_promocion').addEventListener('click',function(){
        solicitarDatos(); 
     });*/
 
        
        
        
        
        </script>
        
        
</html>
