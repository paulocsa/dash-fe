# Sistema de Votação para Representantes de Turma e Projetos Acadêmicos

Este repositório contém o desenvolvimento do Front-End do Sistema de Votação para Representantes de Turma e Projetos Acadêmicos da Fatec-SP. O sistema visa facilitar o processo de votação tanto para os alunos da unidade quanto para os visitantes, com funcionalidades específicas para cada perfil de usuário.



## Estrutura do Sistema

O sistema será dividido em dois perfis principais:

1. Administrador
A visão do administrador será voltada para dashboards interativos e estatísticas detalhadas sobre o andamento da votação. O administrador terá a capacidade de gerenciar as votações, acompanhar resultados em tempo real e gerar relatórios.

2. Usuário
Os usuários são divididos em duas categorias, com funcionalidades específicas:

- Aluno da Unidade: O aluno da Fatec-SP terá a função de votar para escolher os representantes de turma. Ele terá acesso a uma interface de votação simples e objetiva.

- Visitante: O usuário visitante terá a função de votar nos melhores projetos apresentados nas feiras de projetos promovidas pela unidade. A votação será realizada de maneira intuitiva, permitindo ao visitante escolher os projetos que considera mais inovadores e interessantes.


## Fluxo de Navegação

### Administrador
1. O administrador acessa o Dashboard do sistema.

2. O administrador escolhe entre Votação Interna ou Votação Externa.

3. Dentro de cada seção, o administrador pode:

- Visualizar cards com estatísticas resumidas de cada votação.

- Ao clicar em um card, o administrador acessa a tela detalhada, com gráficos e rankings dos candidatos ou projetos.

4. O administrador pode acessar o Histórico de Votações para consultar os registros de votos realizados, incluindo detalhes sobre quem votou e em quem.

### Usuário (Aluno ou Visitante)

1. O usuário faz o login no sistema.

2. Se o usuário for aluno, ele escolhe entre Votação Interna ou Votação Externa:

3. Caso escolha Votação Interna, o aluno visualiza os candidatos de sua sala e realiza seu voto.

4. Caso escolha Votação Externa, o aluno visualiza os projetos e pode votar neles, ou optar por não votar.

5. Se o usuário for visitante, ele é redirecionado diretamente para a Votação Externa, onde pode visualizar os projetos e votar neles.


## Tecnologias Utilizadas Para o Front-End

- React: Para o desenvolvimento da interface de usuário.

- HTML5 e CSS3: Para a estruturação e estilização do layout.


## Para Iniciar o Projeto

No diretório do projeto, você pode rodar:

### `npm start`

Roda o app no modo de desenvolvimento.\
Abra [http://localhost:3000](http://localhost:3000) para visualizá-lo no seu navegador.

A página será recarregada sempre que você fizer alterações.\
Você também poderá ver quaisquer erros de lint no console.

### `npm test`

Lança o runner de testes no modo interativo de observação.\
Veja a seção sobre [running tests](https://facebook.github.io/create-react-app/docs/running-tests) para mais informações.

### `npm run build`

Cria o app para produção na pasta `build`.\
Ele empacota o React corretamente no modo de produção e otimiza a construção para melhor desempenho.

A construção é minificada e os nomes dos arquivos incluem os hashes.\
Seu app está pronto para ser implantado!
Veja a seção sobre [deployment](https://facebook.github.io/create-react-app/docs/deployment) para mais informações.

