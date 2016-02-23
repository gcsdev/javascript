		var cartas =[];
		var escolha_competidor0;
		var escolha_competidor1;
		var rodada=0;
		var mao=1;
		var pontos =[0,0];
		var pontos_mao=[0,0];
		var historico_ganhador=[];
		var cartas_escolhidas=[];
		var pontos_partida=1;
		var competidor_vez="0";
		var quemComeca="0";
		var carta_virada=0;
		var aceitar=false;
		var quem_pediu="-1";
		var quem_aceitou="-1";
		var historico_jogadas=[];
		var n_jogadas=0;
		var maior_carta=false;

		window.onload = function(){
				/*desabilitar_botoes_aceitar_recusar(0);
				desabilitar_botoes_truco(1)*/
		};

		function verificar_ganhador(carta1,carta2){
			if(carta1[2]>carta2[2]){
				return 0;
			}else if(carta1[2]<carta2[2]) {
				return 1;
			}else{
				return -1;
			}
		};
		function embaralha_distribui(){
			var monte = embaralhar_truco();
			cartas = distribuir(monte,1);	
			alterar_imagem(cartas[0],cartas[1]);
		};
		function tempo_usuário1(bool){
				var tempoView = document.getElementById("tempo_u1");
				var tempo =120000;
				var tempo_total=120000;
				var tempo_inicial = new Date().getTime();
				while(tempo>=0 && bool){
					var tempo_atual = new Date().getTime();
					tempo = tempo_total - (tempo_atual-tempo_inicial);
					tempoView.innerHTML=tempo;
				}
		};
		function alterar_imagem_mesa(carta,rodada_arg,usuario){
			var elemento_img =	document.getElementById("img_mesa"+""+rodada_arg+""+usuario);
		 
		 	elemento_img.src=cartas[usuario][carta][3];
		}

		function processa_escolha(element){
			if(competidor_vez===element.id.charAt(7)){
			if(!verifica_carta_jogada(element.id)){
			if(element.id.charAt(7)==="0"){
				escolha_competidor0 = element.id.charAt(6);
				mudar_imagem_carta_jogada(element.id);
				alterar_imagem_mesa(escolha_competidor0,rodada,0);
				add_id_carta_escolhida(element.id);
				competidor_vez="1";
			}else if(element.id.charAt(7)==="1"){
				escolha_competidor1 = element.id.charAt(6);
				mudar_imagem_carta_jogada(element.id);
				alterar_imagem_mesa(escolha_competidor1,rodada,1);
				competidor_vez="0";
			}
			carta_virada++;

			if(carta_virada===2 && !maior_carta){
				var ganhador_rodada = verificar_ganhador(cartas[0][escolha_competidor0],cartas[1][escolha_competidor1]);
				
				if(ganhador_rodada!=-1){
					console.log(ganhador_rodada);
					pontos[ganhador_rodada]++;
					historico_ganhador[rodada]=(Number(ganhador_rodada));
				/*Verificar se competidor ja ganhou duas veses*/
					add_img_pontos(ganhador_rodada);
					add_id_carta_escolhida(element.id);
					if(pontos[ganhador_rodada]==2){
					    console.log("Rodada = "+rodada+" Quem ganhou = "+ historico_ganhador[rodada]+"º competidor");
						console.log(historico_ganhador);
						alert("O competidor "+ (ganhador_rodada+1)+" ganhou a mão "+mao+"!");
						pontos_mao[ganhador_rodada]=pontos_partida+pontos_mao[ganhador_rodada];
						add_img_mao(ganhador_rodada);
						resetar_estado();					
					}else{
						rodada=rodada+1;
						exibe_imagem_mesa(rodada);
						if(ganhador_rodada===0){
							competidor_vez="0";
						}else{
							competidor_vez="1";
						}
						carta_virada=0;
						
					    console.log("Rodada = "+rodada+" Quem ganhou = "+ historico_ganhador[rodada-1]+"º competidor");
					}
					
				}else{
					if(rodada==0){
						alert("Competidores apresentem sua maior carta!");
						rodada=rodada+1;
						exibe_imagem_mesa(rodada);
						if(element.id.charAt(7)==="0"){
							competidor_vez="1";
						}else{
							competidor_vez="0";
						}
						carta_virada=0;
						maior_carta=true;
					}else if(rodada==1){
						alert("O competidor "+ (historico_ganhador[0]+1)+" ganhou a mão "+mao+"!");
						pontos_mao[(historico_ganhador[0])]=pontos_partida+pontos_mao[(historico_ganhador[0])];
						add_img_mao(historico_ganhador[0]);
						resetar_estado();
					}else if(rodada==2){
						alert("O competidor "+ (historico_ganhador[0]+1)+" ganhou a mão "+mao+"!");
						pontos_mao[(historico_ganhador[0])]=pontos_partida+pontos_mao[(historico_ganhador[0])];
						add_img_mao(historico_ganhador[0]);
						resetar_estado();
					}	

				}

				
			}else if(carta_virada===2 && maior_carta){
				var ganhador_rodada = verificar_ganhador(cartas[0][escolha_competidor0],cartas[1][escolha_competidor1]);
				
				if(ganhador_rodada!=-1){
					console.log(ganhador_rodada);
					pontos[ganhador_rodada]++;
					historico_ganhador[rodada]=(Number(ganhador_rodada));
					/*Verificar se competidor ja ganhou duas veses*/
					add_img_pontos(ganhador_rodada);
					add_id_carta_escolhida(element.id);
					console.log("Rodada = "+rodada+" Quem ganhou = "+ historico_ganhador[rodada]+"º competidor");
					console.log(historico_ganhador);
					alert("O competidor "+ (ganhador_rodada+1)+" ganhou a mão "+mao+"!");
					pontos_mao[ganhador_rodada]=pontos_partida+pontos_mao[ganhador_rodada];
					add_img_mao(ganhador_rodada);
					resetar_estado();	
			}else{
				if(rodada==2){
					alert("Ninguém ganhou o jogo!");	
				}else{
					rodada=rodada+1;
					exibe_imagem_mesa(rodada);
				if(element.id.charAt(7)==="0"){
						competidor_vez="1";
				}else{
						competidor_vez="0";
				}
					carta_virada=0;
				}
			}


			}else if(carta_virada===1){
				
				//exibir_botao_truco(1);
			}

			}else{
				console.log("Carta já escolhida");
				//exibir_botao_truco(1);
			}
			n_jogadas++;
			console.log("N jogadas = "+n_jogadas);
		}else{
			alert("Aguarde a vez do competidor adversário!");
		}
		};
		function verifica_carta_jogada(idElemento){
			for (var i = 0; i < cartas_escolhidas.length; i++) {
				if(cartas_escolhidas[i]===idElemento){
					return true;
				}
			};
			return false;
		};
		function add_id_carta_escolhida(idElemento){
			cartas_escolhidas.push(idElemento);
		};
		function exibe_imagem_mesa(rodada_local){
			var img_mesa_0 = document.getElementById("img_mesa"+rodada_local+"0");
			var img_mesa_1 = document.getElementById("img_mesa"+rodada_local+"1");
			img_mesa_0.style.display="inline";
			img_mesa_1.style.display="inline";
		};
		function mudar_imagem_carta_jogada(idElemento){
			var img_carta_jogada = document.getElementById(idElemento);
			img_carta_jogada.src="./img/carta_jogada.png";
		};

		function add_img_pontos(ganhador){	
			if (ganhador==0){
				var img_dinamico="";
				for (var i = 0; i < pontos[ganhador]; i++) {
					img_dinamico =img_dinamico+"<img id='estrela_pontos'"+i+"0"+ " src='./img/estrela.jpeg'/>"
				};
				var div_img_pontos = document.getElementById("img_de_pontos0");
				div_img_pontos.innerHTML=img_dinamico;
			}else{
				var img_dinamico="";
				for (var i = 0; i < pontos[ganhador]; i++) {
					img_dinamico =img_dinamico+"<img id='estrela_pontos'"+i+"1"+ " src='./img/estrela.jpeg'/>"
				};
				var div_img_pontos = document.getElementById("img_de_pontos1");
				div_img_pontos.innerHTML=img_dinamico;
			}
		};
		function add_img_mao(ganhador){
			if (ganhador==0){
				var img_dinamico="";
				for (var i = 0; i < pontos_mao[ganhador]; i++) {
					img_dinamico =img_dinamico+"<img id='coroa_pontos'"+i+"0"+ " src='./img/coroa.png'/>"
				};
				var div_img_pontos = document.getElementById("img_de_mao0");
				div_img_pontos.innerHTML=img_dinamico;
			}else{
				var img_dinamico="";
				for (var i = 0; i < pontos_mao[ganhador]; i++) {
					img_dinamico =img_dinamico+"<img id='coroa_pontos'"+i+"1"+ " src='./img/coroa.png'/>"
				};
				var div_img_pontos = document.getElementById("img_de_mao1");
				div_img_pontos.innerHTML=img_dinamico;
			}
		}; 
		function retirar_img_pontos(){
				var div_img_pontos_0 = document.getElementById("img_de_pontos0");
				div_img_pontos_0.innerHTML="";
				var div_img_pontos_1 = document.getElementById("img_de_pontos1");
				div_img_pontos_1.innerHTML="";
		};
		function resetar_estado(){
			resetar_imagens();
			resetar_pontos_rodada();
			retirar_img_pontos();
			embaralha_distribui();
			reseta_cartas_escolhidas();
			encontrar_jogador_vez();
			competidor_vez=quemComeca;
			carta_virada=0;
			pontos_partida=1;
			resetar_botoes_truco();
			quem_pediu="-1";
			quem_aceitou="-1";
			historico_jogadas=[];
			maior_carta=false;
			historico_ganhador=[];
			mao++;
			n_jogadas=0;
		};

		function encontrar_jogador_vez(){
			if(quemComeca==="0"){
				quemComeca="1";
			}else if(quemComeca==="1"){
				quemComeca="0";
			}
		}



		function reseta_monte(){
			cartas = [];
		};
		function reseta_cartas_escolhidas(){
			cartas_escolhidas=[];
		};
		function resetar_pontos_rodada(){
			pontos[0]=0;
			pontos[1]=0;
			rodada=0;
		};
		function resetar_imagens(){
			for (var i = 0; i <3 ; i++) {
				if(i!=0){
					var img_mesa_0 = document.getElementById("img_mesa"+i+"0");
					var img_mesa_1 = document.getElementById("img_mesa"+i+"1");
					img_mesa_0.src="./img/carta_jogada.png"
					img_mesa_1.src="./img/carta_jogada.png"
					img_mesa_0.style.display="none";
					img_mesa_1.style.display="none";		
				}else{
					var img_mesa_0 = document.getElementById("img_mesa"+i+"0");
					var img_mesa_1 = document.getElementById("img_mesa"+i+"1");
					img_mesa_0.src="./img/carta_jogada.png"
					img_mesa_1.src="./img/carta_jogada.png"
				}
			}
		};
		function resetar_botoes_truco(){
			for (var c = 0; c < 2; c++) {
			var btn_truco = document.getElementById("truco"+c);
			btn_truco.value="Pedir Truco";
		};	


		};
		function truco(element){
			var label = element.value;
			var competidor = element.id.charAt(5);	

			if(competidor===competidor_vez && competidor!=quem_pediu){
				n_jogadas++;
				if(label==="Pedir Truco"){
					if (competidor==='0'){
						msg_truco(0,1);
						mudar_botao_truco(2,1);
						competidor_vez="1";
						pontos_partida=3;
					}else if(competidor==='1'){
						msg_truco(0,2);
						mudar_botao_truco(2,0);
						competidor_vez="0";
						pontos_partida=3;
					}					
					historico_jogadas[historico_jogadas.length]=competidor+"-"+"0-3-"+n_jogadas;
				}else if(label==="Pedir 6"){
							if (competidor==0){
									msg_truco(1,1);
									mudar_botao_truco(3,1);
									competidor_vez="1";
									pontos_partida=6;
							}else if(competidor==1){
									msg_truco(1,2);
									mudar_botao_truco(3,0);
									competidor_vez="0";
									pontos_partida=6;
							}
    				historico_jogadas[historico_jogadas.length]=competidor+"-"+"0-6-"+n_jogadas;
					}else if(label==="Pedir 9"){
							if (competidor==0){
									msg_truco(2,1);
									mudar_botao_truco(4,1);
									competidor_vez="1";
									pontos_partida=9;
							}else if(competidor==1){
									msg_truco(2,2);
									mudar_botao_truco(4,0);
									competidor_vez="0";
									pontos_partida=9;
							}
					historico_jogadas[historico_jogadas.length]=competidor+"-"+"0-9-"+n_jogadas;
						}else if(label==="Pedir 12"){
							if (competidor==0){
									msg_truco(3,1);
									competidor_vez="1";
									pontos_partida=12;
									retirar_botao_truco_dois_competidores();
							}else if(competidor==1){
									msg_truco(3,2);
									competidor_vez="0";
									pontos_partida=12;
									retirar_botao_truco_dois_competidores();
							}	
						historico_jogadas[historico_jogadas.length]=competidor+"-"+"0-12-"+n_jogadas;
						}
						
						quem_pediu=competidor;
						console.log("N jogadas =="+n_jogadas);
			}else if (competidor===quem_pediu){

				var pontos_local;
				if(pontos_partida===3){
					pontos_local="truco"
				}else{
					pontos_local=pontos_partida;
				}
				alert("Você já fez o pedido de "+pontos_local+"! Apenas o adversário deve fazer o pedido!");
			}else{
				alert("Aguarde a vez do competidor adversário!");
			}
		};
		function msg_truco(n,competidor){
			switch(n){
				case 0: 
					alert("O competidor "+competidor+" está pedindo truco!");	
					break;
				case 1:	
					alert("O competidor "+competidor+" está pedindo 6!");	
					break;
				case 2:	
					alert("O competidor "+competidor+" está pedindo 9!");	
					break;	
				case 3:	
					alert("O competidor "+competidor+" está pedindo 12!");	
					break;		
					}
		};

		function msg_truco_aceitar(n,competidor){
			switch(n){
				case 3: 
					alert("O competidor "+competidor+" aceitou o truco!");	
					break;
				case 6:	
					alert("O competidor "+competidor+" aceitou o  pedido de 6!");	
					break;
				case 9:	
					alert("O competidor "+competidor+" aceitou o pedido de 9!");	
					break;	
				case 12:	
					alert("O competidor "+competidor+" aceitou o pedido de 12!");	
					break;		
					}
		};

		function mudar_botao_truco(multiplo,competidor){
			var button_truco = document.getElementById("truco"+competidor);
			switch(multiplo){
				case 2:
					button_truco.value="Pedir 6";
					break;
				case 3:	
					button_truco.value="Pedir 9";
					break;
				case 4:	
					button_truco.value="Pedir 12";
					break;			
			}
			
		};
		
		function desabilitar_botoes_aceitar_recusar(competidor){
			var btn_aceitar = document.getElementById('btn_aceitar'+competidor);
			var btn_recusar = document.getElementById('btn_recusar'+competidor);
			btn_aceitar.disabled="true";
			btn_recusar.disabled="true";
		}; 


		function desabilitar_botoes_truco(competidor){
			var btn_truco = document.getElementById("truco"+competidor);
			var btn_aceitar = document.getElementById("btn_aceitar"+competidor);
			var btn_recusar = document.getElementById("btn_recusar"+competidor);
			btn_truco.disabled="true";
			btn_aceitar.disabled="true";
			btn_recusar.disabled="true";
		}; 


		function retirar_botao_truco(competidor){
			var btn_truco = document.getElementById("truco"+competidor);
			btn_truco.disabled="true";
		};

		function exibir_botao_truco(competidor){
			var btn_truco = document.getElementById("truco"+competidor);
			btn_truco.disabled="false";
		};

		function retirar_botao_truco_dois_competidores(){
			retirar_botao_truco(0);
			retirar_botao_truco(1);
		};

		function aceitar_truco(element){
			var competidor = element.id.charAt(11);	
			if(competidor===competidor_vez && e_possivel_aceitar_recusar(competidor)){
				if(competidor==='0'){
					msg_truco_aceitar(pontos_partida,'1');
					if(!verifica_sequencia_pedidos()){
						competidor_vez="1";
				    }
			
				}else if(competidor==='1'){
					msg_truco_aceitar(pontos_partida,'2');
					if(!verifica_sequencia_pedidos()){
						competidor_vez="0";
					}
			
				}
					historico_jogadas[historico_jogadas.length]=competidor+"-"+"1-"+pontos_partida+"-"+n_jogadas;
					quem_aceitou=competidor_vez;	
					n_jogadas++;
					console.log("N jogadas =="+n_jogadas);
			}else if(!e_possivel_aceitar_recusar(competidor)){
				alert("Apenas o competidor adversário deve aceitar o seu pedido!");
			}else{
				alert("Aguarde a vez do competidor adversário!");
			}	
		};

		function verifica_sequencia_pedidos(){
			for (var i = 0; i < historico_jogadas.length-1; i++) {
				console.log(historico_jogadas[i].charAt(2)+"=="+historico_jogadas[i+1].charAt(2));
				console.log((Number(historico_jogadas[i].charAt(6))+1)+"=="+historico_jogadas[i+1].charAt(6) );
				console.log((Number(historico_jogadas[i+1].charAt(6)))+"=="+(Number(n_jogadas)));
				if(historico_jogadas[i].charAt(2)==historico_jogadas[i+1].charAt(2) && (Number(historico_jogadas[i].charAt(6))+1)==historico_jogadas[i+1].charAt(6) && (Number(historico_jogadas[i+1].charAt(6)))==(Number(n_jogadas))){
					console.log("Sequencia detectada!");
					return true;
				}
				
			};
			console.log(historico_jogadas);
				console.log("Sequencia Não detectada!");
			
				return false;
		};



		function e_possivel_aceitar_recusar(competidor){
				var i=0;
				while(i<historico_jogadas.length){
					if(historico_jogadas[i].charAt(0)===competidor && historico_jogadas[i].charAt(2)==='0'){
					if (historico_jogadas[i].charAt(4)==pontos_partida){
		    			return false;
		     		}
				}
					i++;
				}
				return true;
		};

		function habilitar_botoes_truco(competidor){
			var btn_truco = document.getElementById("truco"+competidor);
			var btn_aceitar = document.getElementById("btn_aceitar"+competidor);
			var btn_recusar = document.getElementById("btn_recusar"+competidor);
			btn_truco.disabled="false";
			btn_aceitar.disabled="false";
			btn_recusar.disabled="false";
		}; 

		function recusar(element){
			var competidor  = element.id.charAt(11);
			if(competidor===competidor_vez && e_possivel_aceitar_recusar(competidor)){
			if(competidor==="0"){
				if(pontos_partida===3){
					pontos_mao[1]=1;
				}else{
					pontos_mao[1]=(pontos_partida-3);
				}
				resetar_estado();
				add_img_mao(1);
			}else if(competidor==="1"){
				
				if(pontos_partida===3){
					pontos_mao[0]=1;
				}else{
					pontos_mao[0]=(pontos_partida-3);
				}			
				resetar_estado();
				add_img_mao(0);
			}
			}else if(!e_possivel_aceitar_recusar(competidor)){
				alert("Apenas o competidor adversário deve recusar o seu pedido!");	
			}else{
				alert("Aguarde a vez do competidor adversário!");
			}
		};


		


		