var carta ={
	nype:function() {return ["copas", "ouros","paus","espadas"];},
	valor:function(){return [1,2,3,4,5,6,7,8,9,10,11,12,13];}
};

function embaralhar(monteAtual){
	var monte=[];
	var baralho_truco = controle_embaralhar(monteAtual);
	while(monte.length<40){
		var indice = (Math.floor(Math.random()*40));
		if(baralho_truco[indice][1]==0){
			monte.push(baralho_truco[indice][0]);
			baralho_truco[indice][1]=1;
		}
	}
	return monte;
};

function alterar_imagem(cartas_1,cartas_2){
	
	for (var i = 0; i <cartas_1.length; i++) {
		var edit_save_1 = document.getElementById("img_bg"+i+"0");
		edit_save_1.src = cartas_1[i][3]; 
		var edit_save_2 = document.getElementById("img_bg"+i+"1");
		edit_save_2.src = cartas_2[i][3]; 
	};
};



function controle_embaralhar(monteLocal){
	var monte_controle =[];
	for (var i = monteLocal.length - 1; i >= 0; i--) {
		monte_controle[i] = [monteLocal[i],0]; 
	};
	return monte_controle;
}

function embaralhar_truco(){
	var monte=[];
	var baralho_truco = criar_baralho_truco();
	for (var i = 0;i<=(baralho_truco.length/2) ; i++) {
		if(i!=0 && i!=(baralho_truco.length/2) ){
			monte.push(baralho_truco[baralho_truco.length-i]);		
			monte.push(baralho_truco[i]);
		}else{
			monte.push(baralho_truco[i]);
		}
	};

	var n_vezes =(Math.floor(Math.random()*11));
	for (var i = 0; i <= n_vezes; i++) {
		monte = embaralhar(monte);
	};

	return monte;
};

function criar_baralho_truco (){
	var baralho_truco=[];
	var baralho = criar_cartas_jogo();
	for (var i = baralho.length - 1; i >= 0; i--) {
		if(baralho[i][0]!==8 && baralho[i][0]!==9 && baralho[i][0]!==10){
			baralho_truco.push(baralho[i]);	
		}
	};
	return baralho_truco;
};

function criar_cartas_jogo(){
	var baralho = [];
	var valores = carta.valor();
	var nypes   = carta.nype();
	for (var i = valores.length - 1; i >= 0; i--) {
		 for (var j = nypes.length - 1; j >= 0; j--) {
			var objeto_carta = [valores[i],nypes[j],pontualizar_truco(valores[i],nypes[j]),"./img/"+valores[i]+nypes[j]+".png"];
			baralho.push(objeto_carta);		 	
		 };
	};
	return baralho;
};

function pontualizar_truco(valor,nype){
	switch(valor){
		case 4: 
			if(nype==="paus"){
				return 140;
			}else{
				return 10;
			}
		case 7:
			if(nype==="copas"){
				return 130;	
			}else if(nype==="ouros") {
				return 110;
			}else{
				return 40;
			}
		case 1:
			if(nype==="espadas"){
				return 120;
			}else{
				return 80;
			}
		case 3:
			return 100;
		case 2:
			return 90;
		case 13:
			return 70;
		case 11:
			return 60;						
		case 12:
			return 50;	
		case 6:
			return 30;
		case 5:
			return 20;
		case 4:
			return 10;		
	}
};
