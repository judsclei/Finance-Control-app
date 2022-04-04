# Finance Control app - Seu app de controle de gastos
O Finance Control tem como objetivo auxiliar no controle de gastos de maneira fácil e rápida. Nele é possível cadastrar, editar e excluir as informações dos débitos a serem pagos, bem como os rendimentos do usuário. Quando um débito estiver prestes a vencer o usuário será notificado por meio de um alerta e se o usuário tiver contas em atraso também será emitido um alerta informando o nome da conta que está atrasada. É possível também visualizar o fechamento das contas onde será apresentado o valor de entrada e saída com uma lista de todos itens que foram adicionados referentes a cada tipo, essa lista será apresentada em forma de extrato. Ao fim também será apresentado o total que representa o total de entradas menos o total de saídas.

**Criado por Vinicius de Castro**

## :computer: Interfaces

#### :iphone: Lista de gastos

> Nessa tela existe um tabela com as dívidas a pagar do usuário, essa tabela possui 4 colunas sendo elas, referentes ao nome da conta data de vencimento, valor e ações que possui dois botões sendo um para editar as informações da conta e outro para excluir a conta. A última linha da tabela representa o valor total das contas, se esse valor estiver com a cor verde o valor de recebimentos será maior que o das contas, ou seja os recursos do usuário são suficientes para pagar as contas, se o total estiver com a cor vermelha significa que o usuário não tem recursos para pagar as contas.

#### :page_facing_up: Fechamento das contas

> Nessa tela existem 3 campos Accordions referentes ao valor de entrada, valor de saída, e total. Todos eles quando clicados apresentam as informações sobre cada valor e nos campos de entrada e saída é apresentado uma lista em formato de extrato com todas as contas e recebimentos do usuário respectivamente.

#### :iphone: Carteira (Entrada de recursos)

> Nessa tela existe um tabela com os recursos do usuário ou seja, rendimentos do mesmo como, salário dentre outros. Essa tela conta com uma tabela que possui 4 colunas sendo elas, referentes ao nome do rendimento, data de recebimento, valor e ações que possui dois botões sendo um para editar as informações do recebimento e outro para excluir o mesmo. A última linha da tabela representa o valor total dos recebimentos, se esse valor estiver com a cor verde o valor de recebimentos será maior que o das contas, ou seja os recursos do usuário são suficientes para pagar as contas, se o total estiver com a cor vermelha significa que o usuário não tem recursos para pagar as contas.

#### :black_nib: Cadastrar/ Editar

>Nessa tela é feita a adição e edição das informações referentes a conta e recebimentos do usuário, ela conta com os campos de nome, data, valor e possui dois botões sendo eles de cadastrar e cancelar.


## :open_file_folder: Dados do usuário

> Os dados do usuário são armazenados no local storage do navegador por meio da propriedade Window.localStorage.


## 🔨 Ferramentas utilizadas

> JavaScript, HTML5, CSS3


## :white_check_mark: Checklist de implementação

- A aplicação é original e não uma cópia da aplicação de um colega ou de uma aplicação já existente? **Sim**  :heavy_check_mark:
- A aplicação tem pelo menos duas interfaces (telas ou páginas) independentes? **Sim**  :heavy_check_mark:
- A aplicação armazena e usa de forma relevante dados complexos do usuário? **Sim**  :heavy_check_mark:
- A aplicação possui um manifesto para instalação no dispositivo do usuário? **Sim**  :heavy_check_mark:
- A aplicação possui um _service worker_ que permite o funcionamento off-line? **Sim**  :heavy_check_mark:
- O código da minha aplicação possui comentários explicando cada operação? **Sim**  :heavy_check_mark:
- A aplicação está funcionando corretamente? **Não pois terá mais funcionalidades implementadas**  :x:
- A aplicação está completa? **Não pois ainda há espaços para mais funcionalidades** :x: