	var Core = function(){
		this.arvoresCriadas=[];/*arvores criadas para controle*/
		this.elementosDasRaizes=[];/*contem os digitos das raizes das arvores criadas*/
		this.qtdDigitos=0; /*número de digitos utilizado*/
		this.ordens=[]; /*ordens que criam arvore*/
		this.ordemVerificacao=0;
		this.verificarProfundidade=true;
		//this.verificarProfundidade=true;
	}
	Core.prototype.recuperaElementos=function(){
		var elementosTextArea =document.getElementById("dados-entrada").value;
		var array =(elementosTextArea.replace(/\n/g," ")).split(" ");
		this.criarArvoreDigitos(array);
	};

	Core.prototype.criarArvoreDigitos= function(array){
		var nPessoas = array[0];
		//para inserir todos números de telefone 
		for (var i = 1; i < array.length; i++) {			
				var telEmUso = array[i];
				if(telEmUso!=""){
					this.qtdDigitos =this.qtdDigitos+telEmUso.length;
					this.verificarProfundidade=true;
					this.insereDigitosNaArvore(i,telEmUso,0);
			}
		};
	};

	Core.prototype.insereDigitosNaArvore=function(ordem,numero,posicaoDigito){
		var controle=false;
		if(posicaoDigito==0){
			var arvoreAtual=this.recuperaArvoreComNo(numero.charAt(0));
			controle=true;
		}

		/*criacao da arvore de dígitos apenas para o 1º telefone */
		/*caso seja ultimo dígito do telefone*/
		if(numero.length===posicaoDigito){
			var arvoreRecuperada =this.recuperaArvoreComNo(numero.charAt(0));
			this.exibeArvore(arvoreRecuperada);
			document.getElementById("resposta").innerHTML=this.qtdDigitos;
		
		/*caso seja demais dígito do telefone - chamada recursiva*/
		}else{		
			/*talvez seja necessário criar arvore*/
			if(controle){
				/*verifica se existe arvore com raiz de digito ja criado*/
				if(arvoreAtual==null) {
					this.elementosDasRaizes.push(numero.charAt(0));				
					var arvore =  this.criarArvore(numero.charAt(0));
					this.arvoresCriadas.push(arvore);
					this.ordens.push(ordem);
				}else{
					/*decrementa pois este digito naõ será utilizado*/
					this.qtdDigitos--;
					this.ordemVerificacao=ordem;
				}
				this.insereDigitosNaArvore(ordem,numero,posicaoDigito+1);
			}else{
				/*caso seja para inserir digitos do telefone diferentes do 1º*/
				var arvoreRecuperada = this.recuperaArvoreComNo(numero.charAt(0));
				arvoreRecuperada.isDigito(false);
				arvoreRecuperada.setUltimoNoAvaliado(arvoreRecuperada.raiz);

				/*caso seja o 1º telefone - simplesmente adicionar*/
				if(this.ordemEstaAtivada(ordem)){
					arvoreRecuperada.insereUltimoNoLinear(numero.charAt(posicaoDigito));
				}else{
					if(this.verificarProfundidade){
						arvoreRecuperada.setProfundidade();
						arvoreRecuperada.verificarFilhosBuscarEmLargura(function(node){},numero.charAt(posicaoDigito),posicaoDigito);
						if(arvoreRecuperada.existeDigito){
							this.qtdDigitos--;
							arvoreRecuperada.isDigito(false);
						}else{
							arvoreRecuperada.setNoComNoExistente(numero.charAt(posicaoDigito),arvoreRecuperada.ultimoNoAvaliado,arvoreRecuperada.buscarEmLargura);
							arvoreRecuperada.setUltimoNoAvaliado(arvoreRecuperada.noAdd);
							this.verificarProfundidade=false;
						}
					}else{
						arvoreRecuperada.setNoComNoExistente(numero.charAt(posicaoDigito),arvoreRecuperada.ultimoNoAvaliado,arvoreRecuperada.buscarEmLargura);
						arvoreRecuperada.setUltimoNoAvaliado(arvoreRecuperada.noAdd);
						this.verificarProfundidade=false;
					}
								//console.log("Existe? "+e);
				}
				this.exibeArvore(arvoreRecuperada);
				this.insereDigitosNaArvore(ordem,numero,posicaoDigito+1);
			}		
		}
	};
	Core.prototype.ordemEstaAtivada=function(ordem){
		for (var i = 0; i < this.ordens.length; i++) {
			if(this.ordens[i]==ordem){
				return true;
			}
		};
		return false;
	};
	Core.prototype.existeRaizComDigito=function(digito){
		for (var i = 0; i < this.elementosDasRaizes.length; i++) {
			if(this.elementosDasRaizes[i]==digito){
				return true;
			}
		};
		return false;
	};

	Core.prototype.criarArvore=function(digito){
		return new Arvore(digito);
	};

	Core.prototype.recuperaArvoreComNo=function(digito){
		for (var i = 0; i <this.arvoresCriadas.length; i++) {
			if(this.arvoresCriadas[i].raiz.digito==digito){
				return this.arvoresCriadas[i];
			}
		}
		return null;	
	};

	Core.prototype.exibeArvore=function(arvore){
		arvore.profundidade=0;
		var i=0;
		arvore.buscarEmLargura(function(node){
			console.log(node.digito)
		});
		arvore.profundidade=0;
	};