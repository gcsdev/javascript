var Arvore =function(digito){
	var no = new No(digito);
	this.raiz=no;
	console.log("Objeto Arvore criado!");
};
function No(digito){
	this.digito=digito;
	this.noPai=null;
	this.noFilhos=[];
};

Arvore.prototype.buscarEmProfundidade =function(callback){
	(function recursivo(noAtual){
		for (var i = 0, tamanho = noAtual.noFilhos.length; i<tamanho; i++) {
			recursivo(noAtual.noFilhos[i]);
		};
		callback(noAtual);
	})(this.raiz);
};
Arvore.prototype.buscarEmLargura=function(callback){
	var fila = new Fila();
	fila.enfileirar(this.raiz);
	var noAtual =fila.desenfileirar();

	while(noAtual){
		for (var i = 0,tamanho=noAtual.noFilhos.length; i < tamanho; i++) {
			fila.enfileirar(noAtual.noFilhos[i]);
		}
		callback(noAtual);
		this.setProfundidade();
		noAtual=fila.desenfileirar();
	}
};

Arvore.prototype.verificarFilhosBuscarEmLargura=function(callback,digito,profundidade){
	var fila = new Fila();
	fila.enfileirar(this.raiz);
	var noAtual =fila.desenfileirar();

	while(noAtual){
		console.log("profundidade = "+this.profundidade);
		for (var i = 0,tamanho=noAtual.noFilhos.length; i < tamanho; i++) {
			fila.enfileirar(noAtual.noFilhos[i]);

			if(this.profundidade==profundidade){
				if((noAtual.noFilhos[i]!=null) && (noAtual.noFilhos[i].digito==digito)){
					console.log(noAtual.noFilhos[i].digito+"=="+digito);
					console.log("Digito: "+digito+" encontrado na prof :"+this.profundidade);
					this.setUltimoNoAvaliado(noAtual.noFilhos[i]);
					this.isDigito(true);
					console.log("ultimoNoAvaliado:"+this.ultimoNoAvaliado.digito);
					console.log("Filho NO 1 = "+noAtual.noFilhos[i].digito);
					return true;
				}
			}
			console.log("Filho NO 1 = "+noAtual.noFilhos[i].digito);
		}
		callback(noAtual);
		this.setProfundidade();
		noAtual=fila.desenfileirar();
	}
};

Arvore.prototype.verificarDigito=function(callback,busca){
	console.log("Verificar Digito");
	busca.call(this,callback);
};

Arvore.prototype.getNumeroNos=function(){
	var noAnt = this.raiz;
	var noAux = this.raiz;
	var qtdNos=0;
	var controle=true;
	while(controle){
		noAux = noAnt.noFilhos[0];		
		if(noAux==null){
			controle=false;
			qtdNos++;
		}else{
			console.log("Aux = "+noAux.digito);
			noAnt=noAux;
			qtdNos++;	
		}
	}
	return qtdNos;	
};

Arvore.prototype.insereUltimoNoLinear=function(digito){
	console.log("insereUltimoNoLinear");
	var newNo = new No(digito);	
	var noAnt = this.raiz;
	var noAux = this.raiz;
	console.log("Raiz = "+noAux.digito);

	var controle=true;
	while(controle){
		noAux = noAnt.noFilhos[0];		
		if(noAux==null){
			controle=false;
			noAnt.noFilhos.push(newNo);
			noAnt.noFilhos[0].noPai=noAnt;
		}else{
			console.log("Aux = "+noAux.digito);
			noAnt=noAux;	
		}
	}

};
Arvore.prototype.setNo=function(digito,paraNo,busca){
	var filho = new No(digito);
	var noPai =null;
	var callback =function(no){
		if(no.digito===paraNo){
			noPai=no;
		}
	};
	this.verificarDigito(callback,busca);
	if(noPai){
		noPai.noFilhos.push(filho);
		filho.noPai=noPai;
		this.retornaNoAdicionado(filho);
	}else{
		console.log("Não pode adicionar nó em um pai inexistente :C");
	}
};
Arvore.prototype.setNoComNoExistente=function(digito,no,busca){
	console.log("setNoComNoExistente!");
	console.log("Digito a ser adicionado:"+digito);
	console.log("No Pai"+no.digito);	
	
	var filho = new No(digito);
	var noPai =null;
	var callback =function(no_){
		console.log("callback");
		if(no_===no){
			noPai=no_;
		}
	};
	this.verificarDigito(callback,busca);
	if(noPai){
		noPai.noFilhos.push(filho);
		filho.noPai=noPai;
		this.retornaNoAdicionado(filho);
		console.log("Nó adicionado!");
	}else{
		console.log("Não pode adicionar nó em um pai inexistente :C");
	}
};

Arvore.prototype.retornaNoAdicionado=function(node){
	this.noAdd=node;
};
Arvore.prototype.isDigito=function(flag){
	this.existeDigito=flag;
};
Arvore.prototype.setUltimoNoAvaliado=function(no){
	this.ultimoNoAvaliado=no;
};
Arvore.prototype.setFila =function(fila){
	this.fila =fila;
};
Arvore.prototype.setProfundidade=function(){
	if(this.profundidade==null){
		this.profundidade=0;
	}else{
	    this.profundidade++;
	}
	
};