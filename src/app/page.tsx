export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center gap-8">
      <h1 className="text-2xl font-bold text-black">Technical Assessment</h1>
      
      <div className="flex flex-col gap-4">
        <a href="/q1">
          <button className="w-64 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            Question 1 - Email Client
          </button>
        </a>

        <a href="/q2">
          <button className="w-64 py-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
            Question 2 - Charts
          </button>
        </a>
      </div>
    </div>
  );
}