import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Termos & Condições',
  description:
    'Leia atentamente os Termos e Condições do Minhas Finanças. Entenda as regras de uso, responsabilidades, privacidade e limitações aplicáveis ao serviço.',
};

export default function Page() {
  return (
    <div className="relative w-full rounded-b-[52px] rounded-t-[52px] bg-green-500 p-8 py-16 text-white">
      <div className="flex flex-col items-center justify-center gap-1">
        <h1 className="text-4xl font-bold text-white">Termos & Condições</h1>
        <span className="text-sx text-white">Atualizado em 26/08/2025</span>
      </div>
      <div className="mt-3 flex w-full flex-col gap-8 text-white">
        <section className="flex flex-col gap-3">
          <h2 className="text-2xl font-semibold">1. Introdução</h2>
          <p>
            Bem-vindo ao <strong>Minhas Finanças</strong> ("Plataforma"). Ao acessar ou utilizar
            nossos serviços web e mobile, você concorda com estes Termos e Condições ("Termos").
            Caso não concorde, recomendamos não utilizar a Plataforma.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-2xl font-semibold">2. Definições</h2>
          <ul className="list-disc pl-6 marker:text-foreground/70">
            <li>
              <strong>Usuário</strong>: pessoa que cria conta ou utiliza a Plataforma.
            </li>
            <li>
              <strong>Conteúdo</strong>: informações inseridas pelo Usuário (ex.: receitas,
              despesas, transações, categorias, metas, lista de desejos).
            </li>
            <li>
              <strong>Serviços</strong>: funcionalidades de registro, visualização, categorização e
              análise de finanças pessoais disponibilizadas pela Plataforma.
            </li>
          </ul>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-2xl font-semibold">3. Elegibilidade e Conta</h2>
          <ul className="list-disc pl-6 marker:text-foreground/70">
            <li>Você deve ter capacidade legal para aceitar estes Termos.</li>
            <li>As credenciais de acesso são pessoais e intransferíveis; mantenha-as em sigilo.</li>
            <li>Você é responsável por todas as atividades realizadas em sua conta.</li>
          </ul>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-2xl font-semibold">4. Uso Aceitável</h2>
          <ul className="list-disc pl-6 marker:text-foreground/70">
            <li>Não utilize a Plataforma para fins ilegais ou que violem direitos de terceiros.</li>
            <li>
              Não tente contornar medidas de segurança, realizar engenharia reversa ou explorar
              falhas.
            </li>
            <li>Não publique conteúdo ofensivo, discriminatório ou que viole leis aplicáveis.</li>
          </ul>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-2xl font-semibold">5. Conteúdo do Usuário</h2>
          <p>
            Você mantém a titularidade do Conteúdo que inserir. Ao utilizar a Plataforma, você nos
            concede autorização para processar seus dados com a finalidade exclusiva de operar e
            melhorar os Serviços, conforme nossa Política de Privacidade.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-2xl font-semibold">6. Privacidade e Proteção de Dados</h2>
          <p>
            Tratamos seus dados pessoais conforme a legislação aplicável e práticas descritas em
            nossa Política de Privacidade. Podemos utilizar serviços de terceiros (como provedores
            de autenticação e banco de dados) para operar a Plataforma. Consulte as configurações da
            aplicação e documentos de credenciais para mais detalhes.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-2xl font-semibold">7. Serviços, Funcionalidades e Limitações</h2>
          <p>
            Oferecemos funcionalidades como registro de receitas e despesas, transações, categorias,
            contas, locais e lista de desejos, com visualizações e relatórios. Esforçamo-nos para
            manter a disponibilidade, mas não garantimos funcionamento livre de erros, interrupções
            ou perda de dados. Utilize exportações e backups quando disponíveis.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-2xl font-semibold">8. Propriedade Intelectual</h2>
          <p>
            A Plataforma, suas marcas, logos, interfaces, componentes de UI e código fonte são de
            nossa titularidade ou licenciados. Você recebe uma licença limitada, não exclusiva e
            intransferível para uso pessoal, nos termos destes Termos.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-2xl font-semibold">9. Planos, Pagamentos e Terceiros</h2>
          <p>
            Caso ofereçamos planos pagos, os termos de cobrança, renovação, reembolso e impostos
            serão exibidos no momento da contratação. Integrações com terceiros podem estar sujeitas
            a termos próprios desses provedores.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-2xl font-semibold">10. Isenções e Limitação de Responsabilidade</h2>
          <ul className="list-disc pl-6 marker:text-foreground/70">
            <li>
              Os Serviços são fornecidos "no estado em que se encontram" sem garantias de
              comerciabilidade, adequação a um propósito específico ou não violação.
            </li>
            <li>
              Na máxima extensão permitida por lei, não nos responsabilizamos por danos indiretos,
              incidentais, especiais, consequentes ou lucros cessantes decorrentes do uso da
              Plataforma.
            </li>
          </ul>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-2xl font-semibold">11. Suspensão e Encerramento</h2>
          <p>
            Podemos suspender ou encerrar o acesso do Usuário em caso de violação destes Termos,
            ordem judicial ou para proteger a segurança da Plataforma e de outros Usuários.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-2xl font-semibold">12. Alterações destes Termos</h2>
          <p>
            Podemos atualizar estes Termos periodicamente. Alterações materiais serão comunicadas
            por meio da própria Plataforma. O uso contínuo após a atualização implica aceitação.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-2xl font-semibold">13. Lei Aplicável e Foro</h2>
          <p>
            Estes Termos são regidos pelas leis do seu país ou região de residência, respeitadas as
            normas de proteção ao consumidor e de proteção de dados. Na ausência de acordo, fica
            eleito o foro do domicílio do Usuário para dirimir controvérsias.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-2xl font-semibold">14. Contato</h2>
          <p>
            Em caso de dúvidas, sugestões ou solicitações relacionadas a estes Termos, entre em
            contato pelos canais oficiais disponibilizados na Plataforma.
          </p>
        </section>
      </div>
    </div>
  );
}
