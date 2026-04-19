import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 flex items-center justify-center px-6">
      <div className="max-w-3xl text-center">

        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Добредојдовте на crowdsoursing платформата на Везилка
        </h1>

        <p className="text-lg md:text-xl text-gray-600 mb-10">
          Споделување на текстуални и аудио документи кои ќе се искористат за тренирање на Везилка.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/login" className="px-6 py-3 rounded-xl bg-black text-white hover:bg-gray-800 transition">
            Најави се
          </Link>

          <Link to="/register" className="px-6 py-3 rounded-xl bg-white border border-gray-300 hover:bg-gray-100 transition">
            Регистрирај се
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">

          <div className="p-6 bg-white rounded-2xl shadow-sm">
            <h3 className="font-semibold text-lg mb-2">Брзо и едноставно</h3>
            <p className="text-gray-600 text-sm">
              Прикачи документ за неколку секунди.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-sm">
            <h3 className="font-semibold text-lg mb-2">Награди</h3>
            <p className="text-gray-600 text-sm">
              Собирај поени и добиј вредни награди.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-sm">
            <h3 className="font-semibold text-lg mb-2">Учество</h3>
            <p className="text-gray-600 text-sm">
              На Везилка и е потребна твојата помош.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
