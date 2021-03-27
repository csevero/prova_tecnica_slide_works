Primeiramente agradeço a equipe da Slide Works pelo desafio, foi uma boa experiência que me fez aprender diversas coisas novas, mas vamos ao que interessa! :grinning:

## Primeiramente você precisa fazer parte do board público

[Entrar no board](https://trello.com/invite/b/fq0LD0xB/4a03e1086def5bef2b1741cb7b14a068/prova-t%C3%A9cnica-slide-works)

## Rodando o server localmente

1. Para que funcione normalmente localmente, você precisará estar dentro do board que foi citado acima.\

2. Dentro da pasta server, crie um arquivo chamado **.env** (onde ficará armazenado nossas variáveis de ambiente).\

3. Agora dentro do arquivo **.env** você irá criar 2 variáveis:

   - A primeira terá o nome de **KEY**
     - O valor da variável será gerado automaticamente no site [Gerar Key Trello](https://trello.com/app-key). (Você precisa estar logado na mesma conta que ingressou no Board público)\
   - A segunda terá o nome de **TOKEN**
     - Para obter seu token, na mesma página citada acima, em baixo da Key gerada automaticamente, você verá um Título com nome Token, um pouco mais abaixo terá um link para você gerar o seu Token.
       Clique em cima role até o final da página e você verá que terá acesso aos seus boards, inclusive ao que você ingressou. Clique em permitir e será gerado seu token.\

   **Importante**: As duas variáveis precisam ser MAIÚSCULAS, e você deve definir ela e seu valor como no exemplo: `KEY = VALOR`\

4. Com o arquivo **.env** gerado e configurado você pode através do seu terminal, navegar até a pasta /server e rodar o comando:\ -`yarn` - para instalar todos as libs para o server funcionar;\ -`npm run dev || yarn dev` - para rodar o server localmente.\

5. Se tudo der certo, no seu terminal irá aparecer a mensagem **server is running** e você poderá acessá-lo pelo endereço [http://localhost:3333](http://localhost:3333).\

## Rodando o projeto web localmente

1. Acesse pelo seu terminal a pasta /web e rode os comando: -`yarn` - para instalar todas as libs para o projeto web funcionar;\
   -`yarn start` - para rodar o projeto web localmente.\

2. Se tudo der certo irá aparecer no seu terminal **Compiled successfully!** e você poderá acessá-lo pelo endereço [http://localhost:3000](http://localhost:3000)
