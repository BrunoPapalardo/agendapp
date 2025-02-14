import Login from '@/components/Login/Login';
import { Scissors, Star, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <main>
        {/* Hero Section */}
        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Agende seus serviços </span>
                <span className="block text-purple-600">online</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Encontre os melhores profissionais da sua região e agende seu horário em poucos cliques.
              </p>
              <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                <Link
                  href="/home"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
                >
                  Agendar agora
                </Link>
              </div>
              <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                <Link
                  href="/login"
                  className="inline-flex items-center px-2 py-1 border border-transparent text-base font-medium rounded-md text-white bg-purple-950 hover:bg-purple-900"
                >
                  Tenho um estabelecimento
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900">
                Como funciona
              </h2>
            </div>

            <div className="mt-10">
              <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
                <div className="text-center">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white mx-auto">
                    <Scissors className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">Escolha o serviço</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Selecione entre diversos serviços disponíveis
                  </p>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white mx-auto">
                    <Star className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">Encontre profissionais</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Compare avaliações e escolha o melhor estabelecimento e profissional
                  </p>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white mx-auto">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">Agende online</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Escolha o melhor horário e agende com facilidade
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );

}
