Este boilerplate foi desenvolvido utilizando **TypeScript** como linguagem principal, usando **Fastify** para a criação de rotas e gerenciamento de requisições. Para o banco de dados, foi utilizado o **TypeORM** como ORM, permitindo uma integração eficiente e tipagem segura.

## Principais Características

- **TypeScript**: Utilizado para garantir tipagem estática e melhorar a manutenção e escalabilidade do código.
- **Fastify**: Escolhido como framework web pela sua performance e flexibilidade.
- **TypeORM**: Facilita a manipulação de dados no banco de dados, com suporte a migrations, entidades e repositórios.

## Estrutura do Projeto
O projeto foi organizado de forma a separar responsabilidades e seguir boas práticas de desenvolvimento. Abaixo está uma visão geral da estrutura:

```
src/
├── common/
│   ├── database/
│   │   ├── ts-typeorm.ts
│   ├── utils/
│   │   ├── client/
│   │   │   ├── config.ts
│   │   │   ├── error.ts
│   │   │   ├── jwt.ts
│   │   ├── database/
│   │   │   ├── baseRepository.ts
│   │   │   ├── databaseErrors.ts
├── core/
│   ├── http/
│   │   ├── routes.ts
│   │   ├── server.ts
├── modules/
│   ├── user/
│   │   ├── mappers/
│   │   ├── mapperts/
│   │   ├── models/
│   │   │   ├── dto/
│   │   │   ├── entities/
│   │   ├── controller.ts
│   │   ├── docs.md
│   │   ├── repository.ts
│   │   ├── routes.ts
│   │   ├── bootstrap.ts
```

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.
