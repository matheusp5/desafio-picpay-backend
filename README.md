# PicPay Back-End

Solução do desafio técnico do PicPay: <a href='https://github.com/PicPay/picpay-desafio-backend'>https://github.com/PicPay/picpay-desafio-backend</a>.
Esse projeto não é um teste oficial para vaga do PicPay, ele foi feito apenas para quesitos educacionais.

<hr>

## Framework, tecnologias e bibliotecas 
- Foi utilizado Typescript como linguagem principal para o desenvolvimento.
- Express como servidor web
- MySQL como banco de dados
- Redis como servidor de cache
- Docker
- Nodemailer para envio de e-mails
- Morgan como HTTP Logger
- Winston como logger
- Axios para requisições HTTP
- TypeORM como ORM
- JWT para autenticação através do Bearer
- Bcrypt para criptografia de senha

## Docker
O Docker foi utilizado no projeto para facilitar o deploy da aplicação. Toda configuração pode ser encontrada na pasta 'docker'. A pasta 'application' possui o Dockerfile responsável por rodar o projeto Typescript, a pasta 'redis' possui o Dockerfile responsável por rodar o Redis, a pasta 'mysql' possui a pasta 'volume' para armazenamento e persistência do banco de dados e o Dockerfile responsável por rodar o banco de dados. O docker-compose.yaml faz a declaração de todas as imagens, faz a configuração dos volumes e faz a criação da network. Os arquivos start.bat e start.sh são utilizados para rodar a aplicação.

## SOLID
A orientação a objetos não é frequente nesse projeto, porém quando há a utilização de classes, o princípio de Interface Segregation é utilizado.

## Banco de Dados
Para armazenamento de dados, foi utilizado o MySQL para armazenar as informações principais, como as contas dos usuários e as transações. O Redis é utilizado para o Limit Rate.

## Requisições Demoradas
Todas as requisições tem um tempo de resposta em média de 30ms a 80ms. Porém, a requisição de criação de transação pode envolver até 600ms, isso ocorre por conta da utilização dos mocks do PicPay (parâmetro requisitado na documentação do desafio). São 2 mocks, um é utilizado como serviço de autorização (com tempo de resposta de 210ms) e outro de envio de notificação (com tempo de resposta de 210ms também), totalizando 420ms apenas dos mocks, a requisição sem os mocks dura cerca de 180ms. <b>Solução: </b> a requisição HTTP para o serviço de autorização externa é indispensável, sendo possível apenas otimizar. Pode ser utilizado um sistema de mensageria síncrono para o serviço de notificação, como o RabbitMQ, dessa forma a requisição para esse serviço não afetaria o resto da aplicação.

## ID único
Para essa aplicação, um algoritmo de geração de ID foi criado, com o intuíto de deixar os IDs mais amigáveis.

## Rate Limiter
Foi implementado um sistema de rate limiter para requisição de login, registro e criação de transação. Esse serviço limita um número máximo de 5 requisições por IP a cada 15 segundos.

## Autenticação
A autenticação é realizada através de e-mail e senha, que retorna um token JWT que pode ser utilizado no cabeçalho de autenticação para acessar as demais funcionalidades da aplicação. O registro do usuário é feito enviando nome, identificação (CPF ou CNPJ), email, senha e tipo (tipo de usuário, pode ser lojista ou usuário comum).
