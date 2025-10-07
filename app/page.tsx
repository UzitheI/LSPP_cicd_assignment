import Calculator from '../components/Calculator';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-2">
          Uzi ko Calculator
        </h1>
        <p className="text-gray-300 mb-8">
          A simple calculator built with Next.js for CI/CD demonstration
        </p>
        <Calculator />
      </div>
    </div>
  );
}
