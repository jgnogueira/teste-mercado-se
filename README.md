# Teste Técnico SoftExpert

- Windows
- PHP 8.0
- Composer 2.5
- PHPUnit
- PostgreSQL 15
- pdo_pgsql

---

## Como executar a aplicação

É esperado que tenha o PHP na versão 8, o Composer na versão 2.5 e o PostgreSQL na versão 15 instalados em um ambiente Windows. Além disso, será necessário habilitar a extensão `pdo_pgsql` no arquivo `php.ini`.

Após clonar o repositório, basta navegar para dentro dele e executar o seguinte comando no terminal da aplicação:
- `composer install` para instalar as dependências da aplicação.

Feito isso, será necessário criar duas bases de dados. A primeira chamada `mercado` e a segunda chamada `test_mercado`. Após criar a primeira base, será necessário restaurar o backup que se encontra no diretório `infra/SQL/backup.sql`. Após criar a segunda base, será novamente necessário restaurar um novo backup, porém dessa vez localizado no diretório `infra/SQL/test_backup.sql`.

Exemplo de comando para restaurar o backup utilizando `pg_restore`:
- `pg_restore --host <host_banco> --port <porta_banco> --verbose --clean --no-acl -U <usuario_banco> -d <nome_base_de_dados> <caminho_para_o_backup>`.

Completando os passos anterios, basta executar no terminal o seguinte comando para iniciar a aplicação:
- `php -S localhost:8080 -t public` para iniciar o servidor.

Após iniciar o servidor, a aplicação estará disponível no endereço `http://localhost:8080`.

---

## Utilizando a aplicação

Para utilizar a aplicação, o usuário pode acessar a página de cadastro `http://localhost:8080/cadastro` para criar um novo usuário ou pode simplesmente utilizar as seguintes informações de usuários já existentes para realizar o login no sistema:

### Usuário Administrador

- E-mail: **admin@email.com**
- Senha: admin1234

### Usuário Padrão

- E-mail: **usuario@email.com**
- Senha: user1234

---

## Executando testes

Para executar os testes da aplicação, é necessário trocar o ambiente de conexão com o banco de dados. Para isso bastar localizar o arquivo `ConexaoHelper.php` que está no diretório `src/Helper/` e setar como `true` o valor da propriedade `$ambienteTest` na linha 5.

**Observação:** após setar a propriedade como true, o sistema utilizará a base de teste. Para voltar a utilizar a base padrão, a propriedade deverá ser definida como false. Caso os testes sejam executados com o valor da propriedade como false, será necessário restaurar o backup principal novamente.

Após fazer as modificações necessárias, execute o seguinte comando no terminal para executar os testes:
- `./vendor/bin/phpunit --colors tests/`.