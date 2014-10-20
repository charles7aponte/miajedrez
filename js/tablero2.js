/* 
 * maneja la parte logica y visual del tablero 
 * de juegos 2
 */

function tablero2(datos){
    
    var bandos=0;//1 --> blancas , 2 --> negras , 3 --> blancas y negras , 0 --> error 
    var fenAnteriorTablero="";
    var fenAnteriorGame="";
    var ultimoMoviento=null//{from, to}
    var banderaSiguiente=true;
    var banderaNuevoNodo=false;// si es true ,, indica que debe creace un nuevo nodo para guardar el valor 
    var contadorTurnos=0;//contador de turnos
    var fenInicial="";
    var coronaPeon=false;
    var miId="";
    var promocion='q';
    var callbackCoronacion=function(){};
    var ulimo_moviento_coronacion=null;//moviento de coronacion la utlima {from, to}
    var ultimo_moviento_coronacion_fen="";//guarda el fen completo de la antes de la ultimoa 
    
    
    if(!datos || !datos.id)
    {
        console.error("No existe  id ");
        
      
        //return false;
    }
    else{
        
       
        miId=datos.id;//ID DEL DOM
        if(datos.eventCoronacion)
        {
            callbackCoronacion=datos.eventCoronacion;
            
        }
        }
    
    
        var board,
         game = new Chess();

        // do not pick up pieces if the game is over
        // only pick up pieces for White
        var onDragStart = function(source, piece, position, orientation) {
          /*
            if (game.in_checkmate() === true || game.in_draw() === true ||
            piece.search(/^b/) !== -1) {
            return false;
          }*/
            
            
            
            console.info("onDragStart........... "+source+" -- "+piece+"--"+position+"-->"+orientation );
            coronaPeon=false;
            //validando si es peon que corona
            if((source.indexOf('7')!=-1  ||  source.indexOf('2')!=- 1) && piece.indexOf('P')!=-1)
            {
                coronaPeon=true;
            }   
         
         
         
         
            if(banderaSiguiente)
            {
                //guarda el fen anterio
                fenAnteriorGame=game.fen();
                fenAnteriorTablero=board.fen();




                //se debe turnar
                if(bandos==3)
                {


                    if(game.turn()=='w' &&   piece.search(/^b/) !== -1)//es trun blancas pero se move un negra
                        return false;

                      if(game.turn()=='b' &&   piece.search(/^w/) !== -1)//es trun negras pero se move un blanca
                        return false;
                }
            }
            else
            return false;
        };




        /**
         * 
         * @param {type} square
         * @param {type} piece
         * @returns {undefined}
         */
        var makeRandomMove = function() {
          var possibleMoves = game.moves();

          // game over
          if (possibleMoves.length === 0) return;

          var randomIndex = Math.floor(Math.random() * possibleMoves.length);
          game.move(possibleMoves[randomIndex]);
          board.position(game.fen());
        };




        /**
         * al momento de soltar la ficha
         * 
         * @param {type} source
         * @param {type} target
         * @returns {String}
         */
        var onDrop = function(source, target) {
            removeGreySquares();
          
            
           
            
            if(coronaPeon && (( source.indexOf('7')!=-1 && target.indexOf('8')!=-1 )||
                    ( source.indexOf('2')!=-1 && target.indexOf('1')!=-1 ))  )
            {
            
            coronaPeon=false;
            
            //cuando un peon corona ---(reclama ficha) debe ejecutar una froma de cambiar de ficha 
             //guarda el ultimo fen antes de la coronacion
             ultimo_moviento_coronacion_fen=game.fen();
             
             
             //guarda el utlimo moviento para la coronacion   
             ulimo_moviento_coronacion=  { from: source,
                        to: target} ;
           
           
           
                    
             var miGameValidacion = new Chess(game.fen());
             var movientoValicion=miGameValidacion.move({
                        from: source,
                        to: target,
                        promotion: promocion // NOTE: always promote to a queen for example simplicity
                      });
               ///al validar el momviento es esta bien llama la opcon de coroonacion 
                if(movientoValicion)        
                {
                        fenColoronacion=game.fen();
                        callbackCoronacion();
  
                }
                else{
                     return 'snapback'
                }
            
                //promocion=prompt('Q== reina ;R== torre; B== alfil; N== caballo');  
            
            }
           else{ 
            ///si el moviento no es coronacion es evaluado por la siguiente funcion
             return  moviento_interno(source,target);
            }
        };




         /***
          *moviento interno del ajedrez .. esta  funcio es privada solo es usada internamente por 
          *el js 
          * @returns {undefined}
          * 
          */
         function moviento_interno(source,target){
             
                
            console.info("moviento coronacion es .......... "+promocion);
            console.info("moviento coronacion es source .......... "+source);
            console.info("moviento coronacion es  target.......... "+target);
                     
               // see if the move is legal
                var move = game.move({
                  from: source,
                  to: target,
                  promotion: promocion // NOTE: always promote to a queen for example simplicity
                });


                 console.info("onDrop........... "+source+" -- "+target+"--");


                // illegal move
                if (move === null){ return 'snapback';}


                //cambiar de turno
               cambiaTurno();



               ultimoMoviento={from:source, to:target, promotion:promocion};
               banderaSiguiente=false;
           
          
             return true;
         }


        // update the board position after the piece snap
        // for castling, en passant, pawn promotion
        var onSnapEnd = function() {
              board.position(game.fen())
        };

        
        
        
        /******************
         * al entrar al cuadrado
         * mover el mouse dentro del cuadro
         */
        var onMouseoverSquare = function(square, piece) {
         
            // get list of possible moves for this square
            var moves = game.moves({
              square: square,
              verbose: true
            });
            
            console.info(moves);
            
             // exit if there are no moves available for this square
            if (moves.length === 0) return;

            // highlight the square they moused over
            greySquare(square);

            // highlight the possible squares for this piece
            for (var i = 0; i < moves.length; i++) {
              greySquare(moves[i].to);
            }
          };
          
          
          
          /***************************
           * al salir del cuadro
           * 
           */
          var onMouseoutSquare = function(square, piece) {
            removeGreySquares();
          };
          
          
          /*********************
           * 
           * dar color de gris 
           */
          
          var removeGreySquares = function() {
            $('#'+miId+' .square-55d63').css('background', '');
          };



          /*************************************
           * dibujar de gris 
           * los cuadros
           * @param {type} square
           * @returns {undefined}
           */
          var greySquare = function(square) {
            var squareEl = $('#'+miId+' .square-' + square);

            var background = '#a9a9a9';
            if (squareEl.hasClass('black-3c85d') === true) {
              background = '#696969';
            }

            squareEl.css('background', background);
          };
          
          
          
          
          
        /***
         * json de la configuracion 
         * @type type
         */  
        var cfg = {
          draggable: true,
          position: 'start',
          onDragStart: onDragStart,
          onDrop: onDrop,
          onSnapEnd: onSnapEnd,
          onMouseoutSquare:onMouseoutSquare,
          onMouseoverSquare:onMouseoverSquare
        };
        
         /****************** functiones publicas ***************************/
          function get_bando(){
              return bandos;
          }    
        this.getBando = get_bando;
         
    
   

        function elegir_promocion(valor)
        {

         promocion=valor;
         //alert('la promocion es '+promocion);
         
        }
        this.elegirPromocion=elegir_promocion;
   
    
    
    function get_game(){
         
         return game;
     }
    this.getGame=get_game;
    
    
    
    function get_board(){
         
         return board;
     }
    this.getBoard=get_board;
    
    
    
 
        
        //regresar a la juda anterior
        function jugada_anterior(){
            
            game.load(fenAnteriorGame);
            board.position(fenAnteriorTablero);
            banderaSiguiente=true;
            
        }
        this.judaAnterior=jugada_anterior;
        
        
        
        
        
        //mueve en formato algebraico
        //@param animar si se realiza o no animacion 
        function mover_ficha(from, to,animar,mipromotion)
        {
            
            if(animar)
                animar=true;
            
            if(!mipromotion)
                mipromotion='p';
            
            console.error("from:"+from+" to:"+to+" promotion:"+mipromotion);
            
            
            game.move({from:from, to:to,  promotion:mipromotion});
            var mifen=game.fen().split(" ");
            board.position(mifen[0],animar);
            
            
            cambiaTurno();
            
        }
        this.moverFicha=mover_ficha;
        
        
        
        
        
        // retorna el ultimo moviento en formato {from, to}
         function get_moviento(){             
             
             return  ultimoMoviento;
        }
        this.getMoviento=get_moviento;
        
        
        
        
        
        //habilita el moviento
        //recibe un booleano true--> para permitir jugar y false para no permitir
        function  habilita_moviento( valor){
            banderaSiguiente=valor;
            
        }
        this.habilitaMoviento=habilita_moviento;
        
        
        
        
        //si el moviento esta desahabliir o esta hablitoa 
        function  get_habilita_moviento( ){
           return  banderaSiguiente;
            
        }
        this.getHabilitaMoviento=get_habilita_moviento;
        
        
        
        
        
         //si el moviento esta desahabliir o esta hablitoa 
        function  get_fen( ){
           return  game.fen();           
        }
        this.genFen=get_fen;
        
        
        
        
        
        //el fen que recibe debe ser completo
        function cambiar_fen(fen)
        {
           var mifen=fen;
                    
            board.position(mifen);
            
            game = new Chess();
            game.load(mifen);
            
            
            
            
        }
        this.cambiarFen=cambiar_fen;
       
    
        
        /****
         * actualiza la ultima coronacion
         *
         * 
         * 
         */
        function actualiza_ultima_coronacion(){

            cambiar_fen(ultimo_moviento_coronacion_fen);
            
            if(ulimo_moviento_coronacion)
            {   
            moviento_interno(ulimo_moviento_coronacion.from,ulimo_moviento_coronacion.to);
            
            board.position(game.fen(),false);
            
            
              console.info("actualiza_ultima_coronacion----->");
             console.info(ulimo_moviento_coronacion);
               console.info(ultimo_moviento_coronacion_fen);
           }
           
            
        }
        this.actualizaUltimaCoronacion=actualiza_ultima_coronacion;
        
        
        
        
        
        // **** reinicia el juego a a su estado original**
        function reiniciar_juego(){
            
            var mifen=get_fen_inicial();
            cambiar_fen(mifen);
            
            
        }
        this.reiniciarJuego=reiniciar_juego;
        
        
        
        
        /*
         * obtiene el fen de la partida 
         * @param {type} fen
         * @returns {undefined}
         */
        function get_fen_inicial()
        {
          return fenInicial;
        }
        this.getFenInicial=get_fen_inicial;
        
        
        
        
        // retorna los bandos 
        //1 --> blancas , 2 --> negras , 3 --> blancas y negras , 0 --> error 
        function get_bandos_(){
            
            return bandos;
            
        }
        this.getBandos_=get_bandos_;
        
        
        
        
        /****************************************************/
        //inicializa
        function inicio(fen,oponenteInicio){
            
           
            var mifen=fen+" "+oponenteInicio+" KQkq - 0 1";
            
            
            fenInicial=mifen;
            
            board = new ChessBoard(miId, cfg);
            board.position(mifen);
            
            game = new Chess();
            game.load(mifen);
            
            
            
            //bandos
            bandos=getBandos(fen);
           
        }
        
    
    /***
     * 
     * saber el turno en el juego
     * @returns {string} w --> blancos o  b--> negros
     * 
     * 
     */
    function turno_juego(){
        
       return  game.turn();
    }
    this.turnoJuego= turno_juego;
        
    /**
     * *funcion para saber si se tiene blancas y/o negras
    *@return 1 --> blancas , 2 --> negras , 3 --> blancas y negras , 0 --> error 
    */    
    function getBandos(fen)
    {
        var  blancas=false;//blancas
        var  negras=false;//negreas
        
        //negras
        if(/[a-z]/.test(fen))
        {
            negras=true;
            
        }
        
        //blancas
        if(/[A-Z]/.test(fen))
        {
            blancas=true;
            
        }
        
        
        if(blancas && negras)
            return 3;
        else if(blancas)
            return 1;                
        else if(negras)
            return 2;
        
        return 0;
                
        
    }
      this.revisarBandos= getBandos;
              
              
        
        
        /// cambia el turno
        function cambiaTurno(){
            
          if(bandos==1)
           {

               game.load(game.fen().replace(" b "," w "));

           }
           else if(bandos==2)
           {

               game.load(game.fen().replace(" w "," b "));

           }
         
            
        }
        
        
    ///activar funciones 
    if(datos)
        inicio(datos.fen,datos.oponenteInicio);
    
    
    
    
    
    
}