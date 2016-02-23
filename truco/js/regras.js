function distribuir(monte,comeca){
	var monte_corte = realizar_corte(monte,1);
	var aux = distribuir_carta(comeca,monte_corte);
	return aux;
};

function distribuir_carta(comeca,monte_corte){
	var cartas_jogadorA=[];
	var cartas_jogadorB=[];

	for (var i = 0;i < monte_corte.length; i++) {
		if(i<3){
			if(comeca==1){
				cartas_jogadorA.push(monte_corte[i]);
			}else{
				cartas_jogadorB.push(monte_corte[i]);
			}
		}else{
			if(comeca==1){
				cartas_jogadorB.push(monte_corte[i]);
			}else{
				cartas_jogadorA.push(monte_corte[i]);
			}
		}
	};
	var triade =[cartas_jogadorA,cartas_jogadorB];
	return triade;
};

	/*
	tipo = 1: subir
	tipo = 2: descer
	tipo = 3: cortar,monte de cima, subir
	tipo = 4: cortar,monte de baixo, descer
	*/
function realizar_corte(monte,tipo){
	var monte_corte =[];
	switch(tipo){
		case 1:
			for (var i = 0;i<6 ; i++) {
				monte_corte.push(monte[i]);
			};
		break;
		case 2:
			for (var i = monte.length - 1; i >= 33; i--) {
				monte_corte.push(monte[i]);
			};
		break;		
	}
	return monte_corte;
};
