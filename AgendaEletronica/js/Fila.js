	var Fila = function(){
		this.indiceAnterior =1;
		this.indiceAtual=1;
		this.elementos=[];
	}
	Fila.prototype.size=function(){
		return this.indiceAtual-this.indiceAnterior;
	};
	Fila.prototype.enfileirar=function(digito){
		this.elementos[this.indiceAtual]=digito;
		this.indiceAtual++;
	};
	Fila.prototype.desenfileirar=function(){
		var indiceAnterior=this.indiceAnterior,
		indiceAtual=this.indiceAtual,
		deletaDigito;
		if(indiceAnterior!==indiceAtual){
			deletaDigito=this.elementos[indiceAnterior];
			delete this.elementos[indiceAnterior];
			this.indiceAnterior++;
			return deletaDigito;
		}
	};