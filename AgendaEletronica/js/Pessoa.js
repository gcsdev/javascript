	var Pessoa = function (identificador,nome,telefone){
		this.identificador=identificador;
		this.nome=nome;
		this.telefone=telefone;
	}
	Pessoa.prototype.getIdentificador=function(){
		return this.identificador;
	};
	Pessoa.prototype.getNome=function(){
		return this.nome;
	};
	Pessoa.prototype.getTelefone=function(){
		return this.telefone;
	};