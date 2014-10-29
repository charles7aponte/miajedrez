<?php 

include_once 'php/ConectarBD.php';
include_once 'php/EjerciciosBase.php';


?>


<!DOCTYPE html>
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
        
        <style>
            .lista_tema:hover{
                cursor: pointer;
                background:rgb(207, 208, 219);
                
                
            }
            
            
        </style>
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
                <li class="active" class="dropdown-submenu"> 
                    <a href="#">
                        <i class="fa fa-list fa-lg"></i>
                        <span ><font><font>Listas </font></font></span>
                    </a>
                           
                </li>

                 <li ><a href="index.php"><span class="glyphicon glyphicon-tower"></span> Construir Juego</a></li>
                 <li ><a href="#"><span class="glyphicon glyphicon-pencil"></span>Editar Juego</a></li>
     
            
            </ul>
       
        </div>
         
        
        
       <!-- fin de barra izq -->   
          
        <div id="mi_main_edicion" class="col-md-10 col-sm-9 col-sm-offset-3  col-md-offset-2 main">
          <h1 class="page-header">Lista de juegos</h1>
          
          
          <div class="table-responsive">
            
             
             <!-- CONTENIDO --->
                 
             <div class="panel panel-primary" id="paso1">
                  <div class="panel-heading">
                    <h3 class="panel-title">Lista</h3>
                  </div>
                 <?php 

                    $ejercicio = new EjerciciosBase();
                    $lista  = $ejercicio->getAllEjercicios();
                 
                 
                 ?>
                 
                 
                 <ul class="list-group">
                     
                 <?php  for($i=0; $i< count($lista) ; $i++) { ?>    
                    <li class="list-group-item lista_tema">
                      <span class="badge"><?php echo $lista[$i]['id'] ?></span>
                      tema :<?php echo $lista[$i]['tema'] ?>
                    </li>
                   
                  <?php  
                  
                    }
                  ?>  
                 </ul>
             </div>    
             
             
             
             <div class="panel panel-primary" id="paso3">
                 
                  <div class="panel-heading">
                    <h3 class="panel-title">Pasos o Movientos</h3>
                  </div>
                 
                 
                 <div class="row">
                     <div class="col-md-8">
                         <div id="board" style="width: 400px"></div>
                     </div>
                     
                    
                     <div class="col-md-4 ">
                         
                         <br><hr>
                             <div id="menu_ajedrez" onContextMenu="return false;"></div>
                             <hr>
                             paso final <br>
                                
                             
                             <hr>
                             Refrescar <br>
                             <button type="button" class="btn btn-default btn-lg" onclick="location.reload();">
                                <span class="glyphicon glyphicon-repeat"></span> 
                              </button>

                         
                         <div id="rama"></div> 
                     </div>
                </div>  
                     
                
               
                    
                <div class="panel-footer" style="background-color: #357ebd">
                      
                </div>
                  
             </div>
             <hr>
             
             
             
              
          </div><!-- fin de la tabla -->
        </div><!-- fin del panel contendio col main-->
       
       
       
      </div><!-- row -->
    </div> <!-- container fluid-->
        
        
        
          
        
        
        
        </body>
    
    
    <script type="text/javascript" >
      

         </script>
        
        
        <script type="text/javascript">
            
            
        
        
        </script>
        
        
</html>
