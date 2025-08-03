# Minhas Finanças | Modeling

## Rules

### wishlist (Lista de Desejos)

- **Properties**
  - id
  - name
  - description ?
  - type -> unique, recurrent
  - recurrence ?
  - category ? -> (ex: Educação, Lazer, Transporte)
  - target_date ? -> Data desejada para realizar o gasto
  - priority: -> baixa: 1, normal: 2, alta: 3
  - estimated_cost ? -> Valor estimado
  - expected_location ? -> Loja, fornecedor ou local do gasto (ex: Shoprite, Kero, Online)
  - prices : [{location, amount}] -> wishlist_prices
  - quantity ? default 1
  - total ?
  - status -> pendente: pending, satisfeita: done, iniciado:started, convertido em despesa: expense
  - createdAt
  - updatedAt
- **Rules**:
  1.  Nos detalhes, inserir uma lista das transações efetuadas relacionadas a essa necessidade
  2.  Pode definir os preços da necessidade com base no local em que pode ser adquirido

### locations (Locais)

- **Properties**
  - id
  - name
  - type [physical, digital]
  - province ?
  - city ?
  - street ?
  - address ?
  - coordinates ?
  - contacts ? [9999, edi@eee.com]
  - createdAt
  - updatedAt

### Carteiras (wallets)

- **Properties**
  - id
  - title (ex.: Salário, Poupança, etc.)
  - details ?
  - account
  - reference
  - iban ?
  - currencies ? [kz, btc, etc...]
  - active
  - createdAt
  - updatedAt ?

- Rules:

### Contas (accounts)

- **Properties**:
  - id
  - name (ex: Banco BIC, PayPal, Bitcoin)
  - type -> (BANK, E_WALLET, CRYPTO)
  - currencies ? -> [kz, btc, usd]
  - site_url ?
  - swift_code ?
- **Rules**:

### expense (Despesas)

- **Properties**
  - id
  - wishlist (necessidade) ?
  - income (Renda) ?
  - description ?
  - estimated_date ?
  - priority -> (1 - Baixa, 2-Normal. 3-Alta)
  - type -> unique (única), recurrent (recorrente)
  - recurrence (recorrência) ?
  - status pendente: pending, feita: done, atrasado: delayed
  - prices: [{location, amount}] -> expenses_prices
  - estimated_amount ?
  - quantity ?
  - total ?
  - start_date ?
  - end_date ?
  - createdAt
  - updatedAt
- **Rules**:
  1.  Se eu definir a renda, quer dizer que esse gasto, vai ser feito assim que essa renda for efetuada

### income (Rendas)

- **Properties**
  - id
  - name
  - wallet
  - description ?
  - amount
  - type -> unique (única), recurrent (recorrente)
  - recurrence ?
  - duration ?
  - start_date ?
  - end_date ?
  - estimated_date_receipt ?
  - status pendente: pending, feita: done, parcial: partial
  - createdAt
  - updatedAt
- **Rules**:
  1.  Se for uma renda recorrente, adiciona nas transações com estado pendente durante 1 ano, e a cada ano ou mesmo nos detalhes dessa renda pode ser atualizada a recorrência, mas as recorrências que já forem feitas não são atualizadas.
  2.  Inserir uma lista de simulação dos dias em que essa renda será recebida
  3.  type ->
  4.  recurrence -> definir recorrência em dias, quer dizer que a cada x dias essa renda é feita
      obs: No formulário pode ter as opções: 1. daily Diária -> 1 2. weekly Semanal -> 7 3. monthly Mensal -> 30 4. annual Anual -> 365 5. custom Personalizado: definir os dias
  5.  duration: duração dessa renda em dias, quer dizer que em x dias, essa renda vai ser recebida, com alguma recorrência ou não (uma única vez)

### transactions (Transações)

- **Properties**:
  - id
  - type: (income, expense)
  - incomes (Rendas) ? -> [{income, amount}] transactions_incomes
  - expenses (Despesas) ? -> [{expense, amount, quantity, total, local, income?}] transactions_expenses
  - total_amount
  - date
  - created_at
  - updated_at

- **Rules**
  1.  Listar todas as despesas e rendas por pendentes
  2.  Quando for feita alguma despesa\renda, marcar como done, mas se for uma recorrente, marcar como done caso seja feita por completa e mostrar já a proxima como pendente
  3.  Quando a transação é do tipo expense, e for definido um income, quer dizer que essa gasto foi feito usando aquela renda especifica

### plans (Planos)
- **Properties**
  - id
  - wishlist ?
  - title
  - objective
  - incomes [id, amount, gastar, quantidade, data_estimada_recebimento]
  - estimativas [tempo, parcelas, valor, data]
  - note

- **Rules**
  1. As estimativas são criadas com base no desejo e nas rendas.
  2. Gerar nota com AI, e usar markdown

### General Rules

- Se for uma renda\despesa única, o estado mudará para done, quando forem feitas o valor total referentes a ela
- Ao listar, deve ter um campo com o valor e o total já efetuado ou gasto

## Mobile

- utilizar modal Bottom Sheet para o registro de tudo
