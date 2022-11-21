export enum LoginMessage {
  'Usuário e/ou senha inválida.' = 401,
  'Login efetuado com sucesso!' = 200,
}

export enum RegisterMessage {
  'Usuário já cadastrado.' = 409,
}

export enum TransferMessage {
  'Transferência Realizada com sucesso!' = 201,
  'Transferência Inválida.' = 400,
  'A conta não tem saldo suficiente para esta transação.' = 403,
  'Usuário não encontrado' = 404,
}
