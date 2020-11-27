# Passo-a-passo docker + mysql + node

Projeto gerado com intuito de aprendizado para a disciplina de so2

### Criando mySql
Criar pasta api > db
Entrar na pasta db > Criar arquivo Dokerfile para configurar a imagem do banco

<p aling="center"><image src="image/dockerfile-mysql.png"></p>

Acesse a pasta `./api` no terminal e execute:
```
sudo docker build -t mysql-image -f api/db/Dockerfile .
```

Para ver a imagem basta:
```
sudo docker image ls
```

A partir daí rodar o comando para criar o container com o nome dbfaeterj:
```
sudo docker run -d -v $(pwd)/api/db/data:/var/lib/mysql --rm --name dbfaeterj mysql-image
```

Para ver o container criado:
```
sudo docker ps 
```

Após isso crio dentro da pasta db um arquivo chamado script.sql criando o banco em mySql

<p aling="center"><image src="image/db.scriptsql.png"></p>

Vamos executar agora comandos dentro de um container que está rodando, após esse comando ele vai criar a tabela e seus valores
```
sudo docker exec -i dbfaeterj mysql -uroot -pdbfaeterj < api/db/script.sql
```

Após isso vai entrar no terminal do container
```
sudo docker exec -it dbfaeterj /bin/bash
```

Entrando no mySql
```
mysql -u root -pdbfaeterj
```

```
use dbfaeterjso2
```

Verificando se a tabela foi criada:
```
select * from users
```

<image>

Trabalhando com volumes para os dados não sumir e refletir no outro container, para que não perca as informações do banco.

### Criando api com node

Criando o arquivo package.json:
```
npm init -y
```

Instalando depêndencia:
```
npm install express
```

Após isso criar a pasta src > com arquivo index.js
Trabalhando conexão

<image>

Agora para adicionar o ip do container rode o comando:
```
sudo docker inspect dbfaeterj
```

<p aling="center"><image src="image/inspect.png"></p>

Depois vamos criar a imagem do node com o comando:
```
docker build -t node-image -f api/Dockerfile .
```

Para ver a imagem basta:
```
sudo docker image ls 
```

<p aling="center"><image src="image/docker-image.png"></p>

Rodando o container na porta 9002 mapeando:
```
docker run -d -v $(pwd)/api:/home/node/app -p 9002:9002 --link dbfaeterj --rm --name apifaeterj node-image
```

Criando docker-compose (defini como cada container deve se comportar dentro da aplicação):
Volumes defini para qual pasta eu quero refletir minhas alterações

<image>

Instalando nodemon:
```
npm install nodemon
```
<p aling="center"><image src="image/nodemon.png"></p>

Utilizando docker compose:
```
sudo docker-compose up
```
<p aling="center"><image src="image/deploy.png"></p>


Estrutura do projeto

<p aling="center"><image src="image/estrutura.png"></p>