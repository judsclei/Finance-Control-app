onload = () => {
    let tabs = document.querySelectorAll('.navBar .tab');
    const mostra = (elem) => {
      if (elem) {
        for (let i = 0; i < tabs.length; i++) tabs[i].classList.remove('active');
        elem.classList.add('active');
      }
  
      for (let i = 0; i < tabs.length; i++) {
        let comp = tabs[i].getAttribute('for');
        if (tabs[i].classList.contains('active'))
          document.querySelector('#' + comp).classList.remove('hidden');
        else document.querySelector('#' + comp).classList.add('hidden');
      }
    };
  
    for (let i = 0; i < tabs.length; i++)
      tabs[i].onclick = (e) => {
        mostra(e.target);
      };
    carregaDados();

    document.querySelector('#add').onclick = () =>{
      ativaTela('#internoComponente1');
      telaCadastro('A');
    }
    document.querySelector('#addRecurso').onclick = () =>{
      ativaTela('#internoComponente1');
      telaCadastro('AR');
    }

    printContas();
    printRecebimentos();
    atualizaTotal();
    printFechamento();
    mostra();
  };

  /****************************************************************************************/
/*Template*/
const carregaAccordion = () => {
  const acc = document.getElementsByClassName("btnAccordion");
  
  for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      } 
    });
  }
}

let contas = [];
let receitas = [];

/*Util*/
const obterDataHoje = () => {
  const t = new Date();
  const date = ('0' + t.getDate()).slice(-2);
  const month = ('0' + (t.getMonth() + 1)).slice(-2);
  const year = t.getFullYear();
  
  return `${date}/${month}/${year}`;
}

const setCampos = (data) => {
  let nome = document.querySelector('#nome');
  let valor = document.querySelector('#valor');
  let date = document.querySelector('#data');
  nome.value = data.nome;
  nome.setAttribute('data-id', data.id)
  valor.value = data.valor.toFixed(2);
  valor.setAttribute('data-id', data.id)
  date.value = data.dataVencimento; 
  date.setAttribute('data-id', data.id)
}

const atualizaTotal = () =>
{
    let valorTotalContas = 0;
    let valorTotalRecebimentos = 0;
    let total = document.querySelector('#total');
    let totalRecebimento = document.querySelector('#totalRecebimento');
    for(let i in contas){ valorTotalContas += contas[i].valor;}
    for(let i in receitas){ valorTotalRecebimentos += receitas[i].valor;}

    if(valorTotalContas > valorTotalRecebimentos)
    {
       total.style["color"] = "#ef233c";
       totalRecebimento.style["color"] = "#ef233c";
       total.innerHTML = `R$ ${valorTotalContas.toFixed(2)} (Valor insuficiente para quitar todas as contas)`;
       totalRecebimento.innerHTML = `R$ ${valorTotalRecebimentos.toFixed(2)} (O valor insuficiente para quitar todas as contas)`;
    }
    else{
      total.style["color"] = "#4AB03E";
      totalRecebimento.style["color"] = "#4AB03E";
      total.innerHTML = `R$ ${valorTotalContas.toFixed(2)}`;
      totalRecebimento.innerHTML = `R$ ${valorTotalRecebimentos.toFixed(2)}`
    }
}

/*Carregamento de dados*/
const carregaDados = () =>{
  const c = JSON.parse(localStorage.getItem('contas'));
  if(c){ contas = c; }
  const r = JSON.parse(localStorage.getItem('receitas'));
  if(r){ receitas = r; }
}
const salvaAlteracoes = () =>{
    localStorage.setItem('contas', JSON.stringify(contas));
    localStorage.setItem('receitas', JSON.stringify(receitas));
}

/* dados contas*/
const printContas =() =>{
    const tabelaContas = document.querySelector('#tableGastos');
    let  bodyTabelaContas = document.querySelector('#tableGastos #tbody');
    bodyTabelaContas.innerHTML = '';
    for (let i = 0; i < contas.length; i++) {
        const elementTr = document.createElement('tr');
        bodyTabelaContas.appendChild(elementTr);
        const element = tabelaContas.insertRow(1);

        let tdNome = element.insertCell();
        let tdDataVencimento = element.insertCell();
        let tdValor = element.insertCell();
        let tdAcoes = element.insertCell();

        element.setAttribute('data-id', contas[i].id);
        tdNome.innerHTML = contas[i].nome;
        tdDataVencimento.innerHTML = contas[i].dataVencimento.split('-').reverse().join('/');
        tdValor.innerHTML = 'R$ '+ contas[i].valor.toFixed(2);
        tdAcoes.innerHTML = `
          <button id="editar" class="warning"><i class="bi bi-pencil-square"></i></button>
          <button id="excluir" class="danger"><i class="bi bi-trash-fill"></i></button>
        `;
        document.querySelector('#editar').onclick = () =>{
          ativaTela('#internoComponente1');
          telaCadastro('E');
          setCampos(contas[i]);
        };
        document.querySelector('#excluir').onclick = () =>{
          let resp = confirm(`Você deseja excluir a conta ${contas[i].nome}`);
          if(resp )
          {
            apagarItem('conta', contas[i]);
          }
        };
        corContaVencida = verificaContaVencida(contas[i]);
        if(corContaVencida == -1)
        {
          tdNome.style["color"] = "#ef233c"
          tdDataVencimento.style["color"] = "#ef233c";
          tdValor.style["color"] = "#ef233c";
        }
        if(corContaVencida == 0){
          tdNome.style["color"] = "#eee132"
          tdDataVencimento.style["color"] = "#eee132";
          tdValor.style["color"] = "#eee132";
        }

    }
    if(contas.length > 0){
        tabelaContas.classList.remove('hidden');
        document.querySelector('#telaLimpa').classList.add('hidden');
    } else{
        tabelaContas.classList.add('hidden');
        document.querySelector('#telaLimpa').classList.remove('hidden');
    }
    printFechamento();
}

/* dados recebimentos */
const printRecebimentos =() =>{
  const tabelaRecebimentos = document.querySelector('#tableRecebimentos');
  let  bodyTabelaRecebimentos = document.querySelector('#tableRecebimentos #tbody');
  bodyTabelaRecebimentos.innerHTML = '';
  for (let i = 0; i < receitas.length; i++) {
      const elementTr = document.createElement('tr');
      bodyTabelaRecebimentos.appendChild(elementTr);
      const element = tabelaRecebimentos.insertRow(1);

      let tdNome = element.insertCell();
      let tdDataRecebimento = element.insertCell();
      let tdValor = element.insertCell();
      let tdAcoes = element.insertCell();

      element.setAttribute('data-id', receitas[i].id);
      tdNome.innerHTML =receitas[i].nome;
      tdDataRecebimento.innerHTML = receitas[i].dataRecebimento.split('-').reverse().join('/');
      tdValor.innerHTML = 'R$ '+ receitas[i].valor.toFixed(2);
      tdAcoes.innerHTML = `
        <button id="editarReceitas" class="warning"><i class="bi bi-pencil-square"></i></button>
        <button id="excluirReceitas" class="danger"><i class="bi bi-trash-fill"></i></button>
      `;
      document.querySelector('#editarReceitas').onclick = () =>{
        ativaTela('#internoComponente1');
        telaCadastro('ER');
        setCampos(receitas[i]);
      };
      document.querySelector('#excluirReceitas').onclick = () =>{
        let resp = confirm(`Você deseja excluir esse recebimento ${receitas[i].nome}`);
        if(resp )
        {
          apagarItem('receitas', receitas[i]);
        }
      };
  }
  if(receitas.length > 0){
    tabelaRecebimentos.classList.remove('hidden');
      document.querySelector('#telaLimpaRecebimentos').classList.add('hidden');
  } else{
    tabelaRecebimentos.classList.add('hidden');
      document.querySelector('#telaLimpaRecebimentos').classList.remove('hidden');
  }
  printFechamento();
}

/*Fechamento*/
const printFechamento = () => {
  carregaAccordion();
    let valorTotalContas = 0;
    let valorTotalRecebimentos = 0;
    let entrada = document.querySelector('#valorEntrada');
    let saida = document.querySelector('#valorSaida');
    let total = document.querySelector('#valorTotal');
    let textoEntrada = document.querySelector('#textoEntrada');
    let textoSaida = document.querySelector('#textoSaida');
    let painelSaida = document.querySelector('#pSaida');
    let painelEntrada = document.querySelector('#pEntrada');
    let textoTotal = document.querySelector('#textoTotal');
    painelSaida.innerHTML ='';
    painelEntrada.innerHTML = '';

    for(let i in contas){ 
      let elementUl = document.createElement('ul');
      valorTotalContas += contas[i].valor;
      textoSaida.innerHTML = `
      O valor de saída representa total das contas a serem pagas que são relacionadas a: `;
      elementUl.innerHTML = `<li>${contas[i].nome} no valor de: R$${contas[i].valor.toFixed(2)} </li>`;
      painelSaida.appendChild(elementUl);
    }
    for(let i in receitas){ 
      let elementUl = document.createElement('ul');
      valorTotalRecebimentos += receitas[i].valor;
      textoEntrada.innerHTML =`
      O valor de entrada representa total que você arrecadou e cadastrou aqui eles são relacionadas a: `;
      elementUl.innerHTML = `<li>${receitas[i].nome} no valor de: R$${receitas[i].valor.toFixed(2)} </li>`
      painelEntrada.appendChild(elementUl);
    }
    textoTotal.innerHTML = `
    O total é resultante do valor de entrada menos o valor de saída. Se o mesmo estiver negativo significa que o valor de débitos é maior do que você arrecadou.
    `;
    let valorTotal = (valorTotalRecebimentos - valorTotalContas)
    entrada.innerHTML = `Entrada: R$ ${valorTotalRecebimentos.toFixed(2)}`;
    saida.innerHTML =`Saída: R$ ${valorTotalContas.toFixed(2)}`;
    total.innerHTML = `Total: R$ ${(valorTotal).toFixed(2)}`;
}

/*verificaçoes contas*/
const verificaContaVencida = (dataConta) => {

  let data =dataConta.dataVencimento.split('-').reverse().join('/')
  let dataHoje = obterDataHoje();
  let dataComparacao = data.split("/")
  let dataC = new Date(dataComparacao[2], dataComparacao[1] - 1, dataComparacao[0]);
  let dataHojeComparacao = dataHoje.split("/")
  let dataHC = new Date(dataHojeComparacao[2], dataHojeComparacao[1] - 1, dataHojeComparacao[0]);
  
  if(dataC < dataHC)
  {   
      alert(`A conta ${dataConta.nome} esta vencida.`);
      return -1;
  } 
  if(data == dataHoje)
  {
     alert(`A conta ${dataConta.nome} vence hoje.`);
     return 0;
  }
  else return 1;
}

const telaCadastro = (flag) =>
{
  if(flag.substring(1) == 'R')
  {
    document.querySelector('#lbNome').innerText = 'Nome do recebimento';
    document.querySelector('#lbData').innerText = 'Data do recebimento';

    document.querySelector('#cancelar').onclick = () =>{
      cancelaLimpaTela();
      ativaTela('#componente3');
    }
  }
  else
  {
    document.querySelector('#cancelar').onclick = () =>{
      cancelaLimpaTela();
      ativaTela('#componente1');
    }
  }

  if(flag == 'A')
  {
    document.querySelector('#tituloCadastro').innerText = 'Cadastrar Divida';

    document.querySelector('#salvar').onclick = () =>{
      adicionarItem('conta');
    }
  }
  if(flag == 'E')
  {
    document.querySelector('#tituloCadastro').innerText = 'Editar Divida';

    document.querySelector('#salvar').onclick = () =>{
      alteraItem('conta');
    }
  }
  if(flag == 'AR')
  {
    document.querySelector('#tituloCadastro').innerText = 'Cadastrar nova Receita';
    document.querySelector('#salvar').onclick = () =>{
      adicionarItem('receitas');
    }
  }
  if(flag == 'ER')
  {
    document.querySelector('#tituloCadastro').innerText = 'Editar Receita';
    document.querySelector('#salvar').onclick = () =>{
      alteraItem('receitas');
    }
  }

  document.querySelector('#nome').focus();
  document.querySelector('#data').value = obterDataHoje().split('/').reverse().join('-');

  
}

const cancelaLimpaTela = () => {
  document.querySelector('#nome').value = '';
  document.querySelector('#nome').removeAttribute('data-id');
  document.querySelector('#valor').value = '';
  document.querySelector('#valor').removeAttribute('data-id');
  document.querySelector('#data').value = '';
  document.querySelector('#data').removeAttribute('data-id');
}

const ativaTela = (componente) =>
{
  let listaTelas = document.querySelectorAll('body > .component');
  listaTelas.forEach((c) => c.classList.add('hidden'));
  document.querySelector(componente).classList.remove('hidden');
  desativaBotoes(componente);
}

const desativaBotoes = (componente) =>
{
  if(componente.substring(1,8) == 'interno')
  {
    document.querySelector('#tab1').disabled = true;
    document.querySelector('#tab2').disabled = true;
    document.querySelector('#tab3').disabled = true;
  }
  else{
    document.querySelector('#tab1').disabled = false;
    document.querySelector('#tab2').disabled = false;
    document.querySelector('#tab3').disabled = false;
  }
}

const adicionarItem = (tipo) =>
{
   let nome;
   let valor;
   let data;
   document.querySelector('#nome').value != '' ? (
     nome = document.querySelector('#nome').value
   ) :( alert('Insira o nome valido'));

   document.querySelector('#valor').value != '' && document.querySelector('#valor').value > 0 ? (
    valor = document.querySelector('#valor').value
  ) :( alert('Insira um valor valido'));

  document.querySelector('#data').value != '' ? (
    data = document.querySelector('#data').value
  ) :( alert('Insira uma data valida'));

  if(tipo == 'conta'){
    if(nome && valor && data)
    {
      contas.push({
        id: parseInt(Math.random()* (10000 - 1) + 1),
        nome: nome,
        dataVencimento: data,
        valor:parseFloat(valor)
      });
    }
    cancelaLimpaTela();
    salvaAlteracoes()
    ativaTela('#componente1');
    printContas();
  }
  else if (tipo == 'receitas'){
    if(nome && valor && data)
    {
      receitas.push({
        id: parseInt(Math.random()* (10000 - 1) + 1),
        nome: nome,
        dataRecebimento: data,
        valor:parseFloat(valor)
      });
    }
    cancelaLimpaTela();
    salvaAlteracoes()
    ativaTela('#componente3');
    printRecebimentos();
  }
  atualizaTotal();
}

const alteraItem = (tipo) => {
  let campo = document.querySelector('#nome')
  let id = campo.getAttribute('data-id');
  if(tipo == 'conta')
  {
    let i = contas.findIndex((t) => t.id == id);
    contas[i].nome = campo.value;
    contas[i].dataVencimento = document.querySelector('#data').value;
    contas[i].valor = parseFloat(document.querySelector('#valor').value);

    cancelaLimpaTela();
    salvaAlteracoes();
    ativaTela('#componente1');
    printContas();
  }
  else if (tipo == 'receitas'){
    let i = receitas.findIndex((t) => t.id == id);
    receitas[i].nome = campo.value;
    receitas[i].dataRecebimento = document.querySelector('#data').value;
    receitas[i].valor = parseFloat(document.querySelector('#valor').value);

    cancelaLimpaTela();
    salvaAlteracoes();
    ativaTela('#componente3');
    printRecebimentos();
  }
  
  atualizaTotal();
}

const apagarItem = (tipo , data) => {
  let id = data.id;
  if(tipo == 'conta')
  {
    contas = contas.filter( (t) => t.id != id);

    cancelaLimpaTela();
    salvaAlteracoes();
    ativaTela('#componente1');
    printContas();
  }
  else if(tipo == 'receitas')
  {
    receitas = receitas.filter( (t) => t.id != id);

    cancelaLimpaTela();
    salvaAlteracoes();
    ativaTela('#componente3');
    printRecebimentos();
  }
  atualizaTotal();
}