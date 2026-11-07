# todo-prioridades
O projeto todo: prioridades è uma projeto pessoal contendo uma API REST e uma aplicação web (Front e back). Construida em java Spring boot via back end. HTML, CSS e JavaScript, prioriza codigo limpo e implementação de padrões de projetos MVC sendo model e control pela API e view pelo front end

## Problemas a serem soluciondos

essa api serve para resolver problemas simples na hora de criar uma lista de tarefas como

- decidir qual tarefa é mais importante
- agrupamento de tarefas, por exemplo, tarefa a, b e c podem ser feitas simultaneamente enquanto tarefa d demora mais
- verificar quais tarefas foram concluidas

## modelo conceitual
Diagrama de classe

## Stacks utilizadas

- Java 17
- Spring boot
- Spring data JPA
- Spring boot starter web
- Spring book dev tools
- lombok
- H2 database

## Endpoints
| Método | Endpoint           | Descrição                                                       |
|--------|--------------------|------------------------------------------------------------------|
| GET    | `/`    | Retorna a pagina da aplicação               |
| GET    | `/itens/listar`    | Retorna a lista completa de tarefas cadastradas                 |
| POST   | `/itens/cadastrar` | Cadastra uma nova tarefa com os dados enviados                  |
| GET    | `/tarefa/{id}`     | Consulta os detalhes de uma tarefa específica pelo ID           |
| DELETE | `/tarefa/remover/{id}`  | Remove uma tarefa existente com base no ID fornecido            |
| DELETE | `/tarefa/remover`  | Remove todas as tarefas            |
| PUT    | `/tarefa/alterar`  | Atualiza os dados de uma tarefa existente                       |


