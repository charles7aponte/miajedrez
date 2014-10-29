<?php
require_once 'ConectarBD.php';
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of EjerciciosBase
 *
 * @author windows
 */
class EjerciciosBase {
    //put your code here
    
   /**
    * guarda la informacion del juego en general 
    * 
    * @param int $dificultad
    * @param int $tema
    * @param type $year
    * @param String $palabras
    * @param String $objetivo
    * @param int $puntos
    * @param int $castigo
    * @return String represntando el  id del ejercicio o "" un string vacio en caso de no haber realizado el guardado
    */ 
   public function ejercicio($dificultad,$tema,$year, $palabras,
           $objetivo,$puntos,$castigo
           ,$jugadores,$torneo,$cantidad_jugadas)
   {
       $id="no";    
       
       $base= new ConectarBD(); 
       $sql="insert into ejercicio (objetivo, dificultad, tema, palabras, puntos, castigo
           ,jugadores, torneo ,cantidad_jugadas, year ) 
          values ('{$objetivo}','{$dificultad}','{$tema}','{$palabras}','{$puntos}','{$castigo}' "
          . " ,'{$jugadores}','{$torneo}','{$cantidad_jugadas}','{$year}') ";
       
       $base->consultaSQL($sql);
             
       $id=$base->_ultimoID;
       
       
 
       
      if($base->Error!="")
      {
          $fecha=  date("Y-m-d");
          $base->guardarArchivo3 ("$fecha : $sql \n", "a","log.txt");
      }
      
      
      
       return $id;
   }
    
   
   /**
    * guarda los pasos 
    * @param int $id_ejercicio
    * @param int $profundidad
    * @param int $id_padre
    * @param int $id_cadena
    * @param String $pasos
    * @param String $ayuda
    * @param String $fen
    */
   public function pasos($id_ejercicio,$posicion_nodo_padre, $profundidad, $id_padre, $id_cadena,$pasos, $ayuda,$promocion, $fen,$piezas)
   { 
       $base=new ConectarBD();
       $sql="insert into pasos (id_ejercicio,posicion_nodo_padre ,profundidad, id_padre_nodo, id_cadena, pasos, ayuda1,promocion, fen, piesas) 
          values ('{$id_ejercicio}','{$posicion_nodo_padre}','{$profundidad}','{$id_padre}','{$id_cadena}','{$pasos}','{$ayuda}','{$promocion}','{$fen}','{$piezas}' ) ";
      $base->consultaSQL($sql);
      
      if($base->Error!="")
      {
          $fecha=  date("Y-m-d");
          $base->guardarArchivo3 ("$fecha : $sql \n", "a","log.txt");
      }
      
      
       
    
  }
  
  
  
  /***
   * consulta los pasos 
   * @param {int} $id_ejercicio  id_ejercicio para traer los pasos que le corresponde
   * @return array de los datos de la base   
   */
  
  public function getPasos($id_ejercicio){
     $base=new ConectarBD();
     $sql="SELECT id_cadena as id
                ,profundidad as profundidad
                 ,id_padre_nodo as idPadre
                 ,posicion_nodo_padre as posicion
                 ,ayuda1 as ayuda1
                 ,pasos as pasos
                 ,promocion as promocion
                  ,fen as fen
                  , piesas as piezas
          FROM pasos
         where id_ejercicio='{$id_ejercicio}'";
         
      $base->consultaSQL($sql);
      
      if($base->Error!="")
      {
          $fecha=  date("Y-m-d");
          $base->guardarArchivo3 ("$fecha : $sql \n", "a","logConsulta.txt");
      }  
     
      
      return $base->_datosRegistros;
      
  }
  
  
  /***
   * los datos generales de la partida .
   * @param {int} $id_ejercicio  id_ejercicio para traer los pasos que le corresponde
   * @return array de los datos de la base   
   */
  
  public function getEjercicio($id_ejercicio){
     $base=new ConectarBD();
     $sql="SELECT * FROM ejercicio 
         where id='{$id_ejercicio}'";
         
      $base->consultaSQL($sql);
      
      if($base->Error!="")
      {
          $fecha=  date("Y-m-d");
          $base->guardarArchivo3 ("$fecha : $sql \n", "a","logConsulta.txt");
      }  
     
      
      return $base->_datosRegistros;
      
  }
  
  
  
  /***
   * los datos generales de la partida .
   * @param {int} $id_ejercicio  id_ejercicio para traer los pasos que le corresponde
   * @return array de los datos de la base   
   */
  
  public function getAllEjercicios(){
     $base=new ConectarBD();
     $sql="SELECT * FROM ejercicio";
         
      $base->consultaSQL($sql);
      
      if($base->Error!="")
      {
          $fecha=  date("Y-m-d");
          $base->guardarArchivo3 ("$fecha : $sql \n", "a","logConsulta.txt");
      }  
     
      
      return $base->_datosRegistros;
      
  }
  
  
}
    