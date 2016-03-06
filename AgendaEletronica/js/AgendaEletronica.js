	var AgendaEletronica=function(){
		var pessoas =[];
	}

	AgendaEletronica.prototype.getNumeroPessoas = function(){
		return pessoas.length;
	};
	AgendaEletronica.prototype.cadastrarPessoa=function(pessoa){
		pessoas.push(pessoa);
	};
