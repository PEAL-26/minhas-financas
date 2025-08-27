import { Badge } from '@repo/ui/badge';
import { Button } from '@repo/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/ui/card';
import {
  ArrowRight,
  CheckCircle,
  Cloud,
  DollarSign,
  PiggyBank,
  Shield,
  Smartphone,
  Star,
  Target,
  TrendingUp,
  Users,
  Zap,
} from '@repo/ui/lib/lucide';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Exemplo Landing Page | Minhas Finanças',
  description: 'Uma landing page de exemplo para demonstrar as funcionalidades do Minhas Finanças',
};

export default function ExemplePage() {
  return (
    <div className="flex flex-1 flex-col bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[600px] w-full bg-gradient-to-br from-green-500 via-green-600 to-green-700 pb-16 pt-20 text-center text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center text-center">
            <Badge variant="secondary" className="mb-6 border-white/30 bg-white/20 text-white">
              ✨ Nova Funcionalidade
            </Badge>

            <h1 className="mb-6 max-w-4xl text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
              Transforme sua
              <span className="block text-green-200">vida financeira</span>
            </h1>

            <p className="mb-8 max-w-2xl text-xl leading-relaxed text-green-100">
              O Minhas Finanças é a solução completa para você controlar suas despesas, planejar
              investimentos e alcançar seus objetivos financeiros com facilidade.
            </p>

            <div className="mb-8 flex flex-col gap-4 sm:flex-row">
              <Button
                size="lg"
                className="bg-white px-8 py-3 text-lg text-green-700 hover:bg-green-50"
              >
                Começar Agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 px-8 py-3 text-lg text-white hover:bg-white/10"
              >
                Ver Demonstração
              </Button>
            </div>

            <div className="flex items-center gap-8 text-sm text-green-100">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                <span>100% Gratuito</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <span>Dados Seguros</span>
              </div>
              <div className="flex items-center gap-2">
                <Cloud className="h-5 w-5" />
                <span>Sincronização</span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-full overflow-hidden">
          <div className="absolute left-10 top-20 h-20 w-20 rounded-full bg-white/10"></div>
          <div className="absolute right-20 top-40 h-16 w-16 rounded-full bg-white/10"></div>
          <div className="absolute bottom-20 left-1/4 h-12 w-12 rounded-full bg-white/10"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">
              Por que escolher o Minhas Finanças?
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              Descubra as funcionalidades que tornam nosso app a escolha ideal para gerenciar suas
              finanças pessoais
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-0 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">Controle Total</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base">
                  Monitore suas despesas e receitas em tempo real, com categorização inteligente e
                  relatórios detalhados.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <Smartphone className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Multiplataforma</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base">
                  Acesse suas finanças de qualquer lugar: web, mobile iOS e Android. Seus dados
                  sincronizam automaticamente.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                  <Target className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Metas Financeiras</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base">
                  Defina e acompanhe suas metas financeiras. Visualize seu progresso com gráficos
                  intuitivos e motivadores.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
                  <PiggyBank className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle className="text-xl">Economia Inteligente</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base">
                  Identifique oportunidades de economia com insights baseados em IA e sugestões
                  personalizadas.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                  <Shield className="h-8 w-8 text-red-600" />
                </div>
                <CardTitle className="text-xl">Segurança Total</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base">
                  Seus dados são protegidos com criptografia de ponta a ponta e backup automático na
                  nuvem.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
                  <Zap className="h-8 w-8 text-indigo-600" />
                </div>
                <CardTitle className="text-xl">Offline First</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base">
                  Funciona mesmo sem internet. Seus dados são salvos localmente e sincronizam quando
                  a conexão retorna.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-green-600 py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-4">
            <div>
              <div className="mb-2 text-4xl font-bold">50K+</div>
              <div className="text-green-100">Usuários Ativos</div>
            </div>
            <div>
              <div className="mb-2 text-4xl font-bold">R$ 2M+</div>
              <div className="text-green-100">Economia Gerada</div>
            </div>
            <div>
              <div className="mb-2 text-4xl font-bold">4.9</div>
              <div className="flex items-center justify-center gap-1 text-green-100">
                <Star className="h-5 w-5 fill-current" />
                Avaliação
              </div>
            </div>
            <div>
              <div className="mb-2 text-4xl font-bold">24/7</div>
              <div className="text-green-100">Suporte Disponível</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-4xl font-bold text-gray-900">
            Pronto para transformar suas finanças?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600">
            Junte-se a milhares de usuários que já conquistaram o controle financeiro com o Minhas
            Finanças. É gratuito e sempre será.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" className="bg-green-600 px-8 py-3 text-lg hover:bg-green-700">
              <DollarSign className="mr-2 h-5 w-5" />
              Começar Gratuitamente
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-3 text-lg">
              <Users className="mr-2 h-5 w-5" />
              Ver Depoimentos
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-semibold">Minhas Finanças</h3>
              <p className="text-gray-400">
                A solução completa para gerenciar suas finanças pessoais de forma simples e
                eficiente.
              </p>
            </div>
            <div>
              <h4 className="mb-4 text-lg font-semibold">Produto</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Funcionalidades</li>
                <li>Preços</li>
                <li>Integrações</li>
                <li>API</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-lg font-semibold">Suporte</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Central de Ajuda</li>
                <li>Contato</li>
                <li>Status</li>
                <li>Comunidade</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-lg font-semibold">Empresa</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Sobre</li>
                <li>Blog</li>
                <li>Carreiras</li>
                <li>Imprensa</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Minhas Finanças. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
