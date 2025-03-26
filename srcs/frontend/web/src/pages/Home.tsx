import { Link } from 'react-router-dom';
import { ChevronRight, Users, Trophy, Zap, BarChart } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-gradient-to-b from-gray-900 to-gray-950">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-40 h-40 bg-indigo-500 rounded-full opacity-10 blur-3xl -top-10 -left-10"></div>
          <div className="absolute w-60 h-60 bg-purple-500 rounded-full opacity-10 blur-3xl top-1/4 right-1/4"></div>
          <div className="absolute w-40 h-40 bg-blue-500 rounded-full opacity-10 blur-3xl bottom-1/4 left-1/3"></div>
        </div>
        
        <div className="container-custom relative z-10 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
                  Welcome to <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
                    transcendence
                  </span>
                </h1>
                <p className="text-xl text-gray-300 max-w-lg">
                  The ultimate gaming experience. Challenge your friends, climb the leaderboard, and prove your skills.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/game" className="btn-primary text-center flex items-center justify-center gap-2">
                  Play Now <ChevronRight size={16} />
                </Link>
                <Link to="/register" className="btn-secondary text-center">
                  Create Account
                </Link>
              </div>
              
              <div className="flex flex-wrap gap-6 pt-4 text-gray-300">
                <div className="flex items-center gap-2">
                  <Users size={18} />
                  <span>Active Players: 2,500+</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy size={18} />
                  <span>Daily Tournaments</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap size={18} />
                  <span>Real-time Gameplay</span>
                </div>
              </div>
            </div>
            
            {/* Hero Image */}
            <div className="relative">
              <div className="relative w-full h-96 md:h-[400px] bg-gray-800 rounded-xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white rounded-full animate-float"></div>
                  <div className="absolute h-16 w-4 bg-indigo-500 rounded-md left-1/4 animate-float" style={{ animationDelay: '0.5s' }}></div>
                  <div className="absolute h-16 w-4 bg-indigo-500 rounded-md right-1/4 animate-float" style={{ animationDelay: '1s' }}></div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-50"></div>
                <div className="absolute bottom-4 left-0 right-0 text-center">
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-indigo-600 rounded-lg opacity-30 blur-xl animate-pulse-glow"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-950">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Awesome Features</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Experience the next level of online gaming with our innovative features and immersive gameplay.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 transition-all hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10">
              <div className="w-12 h-12 bg-indigo-900/30 rounded-lg flex items-center justify-center mb-4">
                <Zap size={24} className="text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Multiplayer</h3>
              <p className="text-gray-400">
                Challenge your friends or random opponents to exciting duels with zero lag and smooth gameplay.
              </p>
            </div>
            
            {/* Feature Card 2 */}
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 transition-all hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10">
              <div className="w-12 h-12 bg-indigo-900/30 rounded-lg flex items-center justify-center mb-4">
                <Trophy size={24} className="text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Tournaments</h3>
              <p className="text-gray-400">
                Participate in daily and weekly tournaments to win exclusive rewards and climb the global rankings.
              </p>
            </div>
            
            {/* Feature Card 3 */}
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 transition-all hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10">
              <div className="w-12 h-12 bg-indigo-900/30 rounded-lg flex items-center justify-center mb-4">
                <BarChart size={24} className="text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Stats Tracking</h3>
              <p className="text-gray-400">
                Track your performance with detailed statistics, match history, and personal achievements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-indigo-500 rounded-full opacity-10 blur-3xl -bottom-20 -right-20"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 md:p-12 rounded-2xl border border-gray-700">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
              <div className="lg:col-span-3">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Playing?</h2>
                <p className="text-gray-300 mb-6 lg:mb-0">
                  Join thousands of players worldwide and experience the most exciting online game of the year.
                </p>
              </div>
              <div className="lg:col-span-2 flex flex-col sm:flex-row gap-4">
                <Link to="/game" className="btn-primary flex-1 text-center">
                  Play as Guest
                </Link>
                <Link to="/register" className="btn-secondary flex-1 text-center">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;