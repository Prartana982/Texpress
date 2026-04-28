import { Article } from '@/lib/news';

export default function Loading() {
  return (
    <div className="space-y-16">
      <section className="text-left space-y-6">
        <div className="inline-block border-4 border-black bg-gray-200 px-6 py-2 shadow-neo-lg -rotate-1 w-2/3 h-24 animate-pulse">
        </div>
        <div className="h-20 border-4 border-black bg-white p-6 shadow-neo max-w-2xl rotate-1 animate-pulse"></div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="neo-box group flex flex-col h-[500px] overflow-visible animate-pulse">
            <div className="h-64 w-full border-b-4 border-black bg-gray-200"></div>
            <div className="p-6 flex-grow flex flex-col space-y-4">
              <div className="h-4 bg-gray-200 w-1/4"></div>
              <div className="h-8 bg-gray-200 w-full"></div>
              <div className="h-20 bg-gray-200 w-full"></div>
              <div className="h-10 bg-gray-200 w-full mt-auto"></div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}