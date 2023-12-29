//At this point, the values 
//retrieved from the id are passed by parameter to an object	
	
	class Despesa{
		constructor(ano,mes,dia,tipo,descricao,valor){
			this.ano = ano
			this.mes = mes
			this.dia = dia
			this.tipo = tipo
			this.descricao = descricao 
			this.valor = valor
		}
//--------------------------------------------------------------------------------
	//At this point are the conditions for the information 
		//to be accepted or not, before being stored
		
		validarDespesa() {
			for( let i in this) {
				if(this[i] == undefined || this[i] == ''|| this[i] == null ){
					return false }
		          }
                    return true
            }
	    }
//----------------------------------------------------------------------------------------------
   
   //At this point in the code, the information provided is transformed into JSON,
   //then the information is stored on the browser server, as well as its identification ID.
	
	class Bd {
 // Assigning the value 0 when the id is null
        constructor() {
		let id = localStorage.getItem('id')

		if(id === null) {
			localStorage.setItem('id', 0)
		  }
	  }
    // Retrieve the last id and concatenate 1 more
        getProximoId(){
        	let proximoId = localStorage.getItem('id')
        	return parseInt(proximoId) + 1
        }
  //Recording attribute of filled information, passed through parameter (d), 
       // and stored in localStorage
		gravar(d) { 
       console.log(d)
	   let id = this.getProximoId()
       localStorage.setItem(id,  JSON.stringify(d))
	   localStorage.setItem('id', id)
	   }

//------------------------------------------------------------------------------------------------------ 
	//At this point, a list of expenses is created using the information provided.  
	   recuperarTodosRegistros(){

	   	//array of expenses
       let expenses  = []	   

       	//recover all expenses registered in localStorage
       //By recovering all information recorded in locaStorage, it is possible to apply Filters
	  let id = localStorage.getItem('id')
	  for(let i = 1; i <= id; i++) {

	  	//recover the expenses in object literal
	  	let despesa = JSON.parse(localStorage.getItem(i))
	  	//console.log(i, despesa)
        
        //check if there is a possibility that there were indexes that were removed,
        // in these cases skip the indexes.
	  	if(despesa === null){
	  		continue
	  	}
        
        //At this point, the records retrieved from localStorage in the expense variable are assigned a new value 
	  	//id and the value of let (i) is assigned to it, which is the value of lopping (for) to retrieve the information. 
	  	//In other words, all expenses have an ID and their respective value.
        despesa.id = i
	  	
	  	expenses.push(despesa)
	    }
	     return expenses
	  }

//-----------------------------------------------------------------------------------------------------------

	//search method is receiving as a parameter all expense arrays stored in local storage,
   //retrieved previously, and comparing with the values requested in the filter components.
	
	pesquisar(despesa) {
		let despesasFiltradas = Array()
		despesasFiltradas = this.recuperarTodosRegistros()
	
      
      //The new array created through filter parameter access to the stored values, 
		//and updated with each comparison, assigning the new value to expenseFiltered
		
		//ano
		if(despesa.ano != ''){
			console.log("filtro de ano");
			despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
		}
			
		//mes
		if(despesa.mes != ''){
			console.log("filtro de mes");
			despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
		}

		//dia
		if(despesa.dia != ''){
			console.log("filtro de dia");
			despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
		}

	   
	    //tipo
		if(despesa.tipo != ''){
			console.log("filtro de tipo");
			despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
		}

		//descricao
		if(despesa.descricao != ''){
			console.log("filtro de descricao");
			despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
		}

		//valor
		if(despesa.valor != ''){
			console.log("filtro de valor");
			despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
		}

		//Returning the searched values to whoever requested the attribute
		return despesasFiltradas

	} 

	//This attribute of the object (bd) removes the desired expense, through the (id) of each one, 
	//passed as a parameter.
    remover(id){
    	localStorage.removeItem(id)
    	return true
    }
}



	let bd = new Bd()
//-----------------------------------------------------------------------------------------------------------
//At this point it retrieves the information values entered
	
	function cadastrarDespesa(){
		
		let ano = document.getElementById('ano') 
		let mes = document.getElementById('mes')
		let dia = document.getElementById('dia')
		let tipo = document.getElementById('tipo')
		let descricao = document.getElementById('descricao')
		let valor = document.getElementById('valor')

	    let despesa = new Despesa(
	    	ano.value,
	        mes.value,
	        dia.value,
	        tipo.value,
	        descricao.value, 
	        valor.value
	        )
   //----------------------------------------------------------------------------------------	     
	    //At this point, the message that appears on the browser screen is automatically edited,  
	    //depending on whether the information has been accepted and whether it was filled out correctly or not.
	   

	   //call the record attribute then show the positive modal
	     if(despesa.validarDespesa() === true){
	     	 bd.gravar(despesa)
	     	 document.getElementById('modal_title').innerHTML = 'Registro inserido com sucesso'
	     	 document.getElementById('Description').innerHTML = ' Despesa foi cadastrada com sucesso.'
	     	 document.getElementById('btn').innerHTML = ' Voltar'
	     	 document.getElementById('btn').className = "btn btn-success"
             document.getElementById('color').className = 'modal-header text-success'
	     	$('#modalRegistraDespesa').modal('show')
      
      //Clear the fields after saving information, and ready to receive new expenses
           ano.value = ""
           mes.value = ""
           dia.value = ""
           tipo.value = ""
           descricao.value = ""
           valor.value = ""
       // show the negative modal if the validateExpenses information is false
	     } else { 
	     	document.getElementById('modal_title').innerHTML = 'Erro ao Inserir as informações '
	     	 document.getElementById('Description').innerHTML = 'Erro na gravação, volte e preencha todos os campos de forma correta.'
	     	 document.getElementById('btn').innerHTML = ' Voltar e corrigir'
	     	 document.getElementById('btn').className = "btn btn-danger"
	     	 document.getElementById('color').className = 'modal-header text-danger'
	     	$('#modalRegistraDespesa').modal('show')
	     }
	}
     
//-------------------------------------------------------------------------------------------------------------------------
	//At this point, when loading the query.html page, the array with the information retrieved in the 
	//bd.recuperarTodosRegistros method is automatically requested.


     function carregarListaDespesas(despesas = Array(), filtro = false){
//At this point, through the logical comparison and relational operator, if no search field is filled in, 
//it shows all the records on the screen when the page loads, if the fields are filled in and the search is requested, 
//the expense receives an array per parameter, the response to the comparison of values, and length is not worth 0, 
//as a parameter it receives true. clearing the history and showing only what was searched.

     	     if(despesas.length == 0 && filtro == false){
		     despesas = bd.recuperarTodosRegistros() 
	}
	
     
   //Selecting the tbody element from the table(t/body)

     var listaDespesas = document.getElementById('listExpenses')
      listaDespesas.innerHTML = ''
   
   //Scroll through the expense array, listing each expense dynamically.
       despesas.forEach(function(d){
      
      // create the row (tr) 
     let linha = listaDespesas.insertRow()

      // create columns (td)
      linha.insertCell(0).innerHTML = `${d.dia} /${d.mes} / ${d.ano}`
      

      //Adjust type
      switch(d.tipo){
      case '1': d.tipo = 'Alimentação'
      	break
      case '2': d.tipo = 'Educação'
      		break
      case '3': d.tipo = 'Lazer'
      		break
      case '4': d.tipo = 'Saúde'
      		break
      case '5': d.tipo = 'Transporte'	
            break
      case '6': d.tipo = 'Pet'	
            break
      }
      linha.insertCell(1).innerHTML = d.tipo
      linha.insertCell(2).innerHTML = d.descricao
      linha.insertCell(3).innerHTML = d.valor

   //At this point is the delete button
     
      //Using the DOM, a new button is created in the browser
      let btn = document.createElement("button")
     
      //Through the bootstrap Class it is possible to style it in red.
      btn.className = 'btn btn-danger'
     
     //through the id of each array passed by parameter (d) and passed to btn.id along with a string
      btn.id = `id_despesa_${d.id}`
    
     //As the function executed by the button's onclick action is removed the concatenated string
     //then pass as a parameter the id value you want to exclude in the db object in the remove attribute, 
     //then automatically reload the page showing the expenses that were not deleted.
      btn.onclick = function(){      	
      	let id = this.id.replace('id_despesa_', '')
      	
        bd.remover(id)
      	window.location.reload()
       
      }
      btn.innerHTML ='<i class ="fas fa-times"></i>'
      linha.insertCell(4).append(btn)
     
       })    	
        
     }   
 //---------------------------------------------------------------------------------------------------------

//To filter a specific expense, it was necessary to retrieve the values 
     //being searched for by filling in the application fields.
    
     function pesquisarDespesas() {
       let ano = document.getElementById('ano').value
       let mes = document.getElementById('mes').value
       let dia = document.getElementById('dia').value
       let descricao = document.getElementById('descricao').value
       let tipo = document.getElementById('tipo').value
       let valor = document.getElementById('valor').value     
       
       let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)
     
     // filtered array return
         //At this point, the values that are not even purchased with those in the records are passed as a parameter, 
        //and through the return of the bd.pesquisa(expense) attribute, it then returns the specific array searched, 
       //then it is passed to the expense list that will be filled in and displayed in the browser
     
      let despesas = bd.pesquisar(despesa)
    carregarListaDespesas(despesas, true)	
     
     }

//----------------------------------------------------------------------------------------------------------------------