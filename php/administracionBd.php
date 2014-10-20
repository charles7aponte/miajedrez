<?php
        // put your code here
   
       require_once 'EjerciciosBase.php';

        $opcion=null;
            $datos=array();
    
    if($_POST['opcion'])
        $opcion=$_POST['opcion'];
    
  
    


    switch ($opcion)
    {
        case "guardar_ejercicio":
            
            $ejerciciosBase = new EjerciciosBase();
            
            $dificultad= $_POST['dificultad'];
            $jugadores= $_POST['jugadores'];
            $torneo= $_POST['torneo'];
            $year= $_POST['year'];
            $cantidad_jugadas= $_POST['cantidad_jugadas'];
            $temas= $_POST['temas'];
            $palabras= $_POST['palabras'];
            $objetivo= $_POST['objetivo'];
            $puntos= $_POST['puntos'];
            $quitar_puntos= $_POST['quitar_puntos']; 
            
            $pasos=$_POST['pasos'];
            
            
            
            
            
           $idEjercicio= $ejerciciosBase->ejercicio($dificultad, $temas, $year, $palabras, $objetivo, $puntos, $quitar_puntos
                                        ,$jugadores,$torneo,$cantidad_jugadas);
            
            
           
            //por cada paso
           if($idEjercicio!="")
            foreach ($pasos as $nodo) {
                
                
                 $ejerciciosBase->pasos(
                         $idEjercicio, 
                         $nodo['posicionNodoPadre'],
                         $nodo['nivel'],
                         $nodo['idPadre'], 
                         $nodo['id'],
                         $nodo['pasos'],
                         $nodo['ayuda1'],
                         $nodo['promocion'],
                         $nodo['fen']);
            
                 
            }
            
            
          $datos=  array('id_ejercicio'=>$idEjercicio)  ;
          
        break;
        
        
        
        //solicitar los datos del modulo de administracion
        case "solicitud_pasos":
            
         $id_ejercicio = $_POST['id'];  
            
            
         $ejerciciosBase = new EjerciciosBase();         
         $datos=array();
         $datos['general']=$ejerciciosBase->getEjercicio($id_ejercicio);  
         $datos['pasos']=$ejerciciosBase->getPasos($id_ejercicio);
            
            break;
        
        
        
    }//fin del switch  
        

    
    

   
echo json_encode($datos);


?>
