	var Telefone = function(numero,operadora){
		this.numero=numero;
		this.operadora=operadora;
	}
	Telefone.prototype.getNumero =function(){
		return numero;
	};
	Telefone.prototype.getOperadora= function(){
		return operadora;
	};	
