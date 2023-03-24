# SINGEP-API
Backend of the project SINGEP made for a conclusion work to the private university ENIAC in Guarulhos - São Paulo, Brasil.
 
# API-REST SINGEP
Esta API-REST é utilizada para Tal e Tals...
Obs: Este projeto foi criado com o intuito de se desenvolver apenas os endpoints de uma API, sendo assim, não há um banco de dados real implementado.
## Endpoints



### Post /singep/signup
Este endpoint é responsável por cadastrar um novo usuário no sistema
#### Parâmetros

```
{
    "name": "José Alvez",
    "email": "josealvez@gmail",
    "whatsapp": "5511959050869",
    "ownerof": "kkk",
    "password": "01011010",
    "confirmPassword": "01011010"
}
```
#### Resposta
##### Created! 201
Em caso de sucesso:
```
{
    "Usuário criado com sucesso!"
}
```
##### Bad Request! 400
Em caso de já houver conta criada com o número de whatsapp:
```
{
    "Whatsapp já cadastrado, faça o login."
}
```
##### Bad Request! 400
Em caso de já houver conta criada com o email:
```
{
    "Email já cadastrado, faça o login."
}
```


### Post /singep/signin
Este endpoint é reponsável por gerar um token válido por um dia. Este token será necessário para você acessar os outros endpoints.
Nele há o parâmetro user que pode ser o email ou número de whatsapp cadastrado.
#### Parametros

```
{
  "user": "email@gmail.com",
  "senha":"senha123"
}
```
#### Respostas

##### OK! 200
```
{
    "message": "login realizado com sucesso!",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjU1MTE5NTkwNTA4NjgiLCJpYXQiOjE2Nzk2OTkxOTUsImV4cCI6MTY3OTcwMjc5NX0.li4YmICEHm-mPovzeqeevA3UJxtca_IIXOxoth3vXhE"
}
```



### GET /singep/product/products
Este endpoint é responsável por retornar a listagem de todos os produtos cadastrados no banco de dados.
#### Parametros
Nenhum.
#### Respostas
##### OK! 200
Caso esta resposta aconteça você vai receber a listagem de todos os produtos.

```
[
    {
        "_id": "641c8f77ba8aa6fbe0958a86",
        "name": "Torrada Bauducco multi-grãos",
        "price": "19.99",
        "lote": "HY897LL",
        "expiry": "20/06/2023",
        "totalun": 0,
        "totalkg": 70,
        "created_at": "2023-03-23T17:42:15.510Z",
        "updated_at": "2023-03-23T21:04:49.126Z",
        "__v": 0
    },
    {
        "_id": "641cbf148c22cd8a031ec7a3",
        "name": "Torrada Bauducco integral",
        "price": "12.99",
        "lote": "HYpolL",
        "expiry": "20/06/2027",
        "totalun": 350,
        "totalkg": 0,
        "created_at": "2023-03-23T21:05:23.998Z",
        "updated_at": "2023-03-24T19:55:46.521Z",
        "__v": 0
    }
]
```

##### Falha interna no servidor! 500
```
{
    "Erro no servidor. Por favor tente de novo mais tarde"
}
```