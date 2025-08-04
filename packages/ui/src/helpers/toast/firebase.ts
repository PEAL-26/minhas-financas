export const firebaseAuthErrorMap: Record<string, string> = {
  'auth/account-exists-with-different-credential':
    'Já existe uma conta com este e-mail usando um provedor diferente.',
  'auth/auth-domain-config-required': 'A configuração do domínio de autenticação está ausente.',
  'auth/cancelled-popup-request': 'A solicitação do pop-up foi cancelada.',
  'auth/operation-not-allowed': 'O provedor de autenticação não está habilitado.',
  'auth/popup-blocked': 'O pop-up foi bloqueado pelo navegador.',
  'auth/popup-closed-by-user': 'O pop-up foi fechado antes da conclusão do login.',
  'auth/unauthorized-domain': 'Este domínio não está autorizado para autenticação.',
  'auth/user-disabled': 'Esta conta foi desativada.',
  'auth/user-not-found': 'Nenhum usuário encontrado com essas credenciais.',
  'auth/wrong-password': 'Senha incorreta.',
  'auth/invalid-credential': 'As credenciais fornecidas são inválidas.',
  'auth/network-request-failed': 'Falha na conexão de rede.',
  'auth/too-many-requests': 'Muitas tentativas de login. Tente novamente mais tarde.',
  'auth/internal-error': 'Ocorreu um erro interno. Tente novamente.',
};

export function getFirebaseAuthErrorMessage(errorCode: string): string {
  return firebaseAuthErrorMap[errorCode] || 'Ocorreu um erro desconhecido ao autenticar.';
}
