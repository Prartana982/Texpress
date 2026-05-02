import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="max-w-3xl space-y-8">
        <h1 className="text-6xl font-black uppercase tracking-tighter border-b-8 border-black pb-4 mb-8">
          Welcome to Texpress
        </h1>
        
        <p className="text-2xl font-bold leading-tight">
          YOUR DAILY SOURCE FOR ELITE TECH INTELLIGENCE. FAST. MINI-MAX. RELENTLESS.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 text-left mt-12">
          <div className="border-4 border-black p-6 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-xl font-black uppercase mb-2 border-b-2 border-black inline-block">The Purpose</h3>
            <p className="font-medium">
              Texpress is designed for the modern developer, tech enthusiast, and industry disruptor. 
              We aggregate the most critical technology updates into a high-speed, 
              no-nonsense feed.
            </p>
          </div>
          
          <div className="border-4 border-black p-6 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-xl font-black uppercase mb-2 border-b-2 border-black inline-block">The Access</h3>
            <p className="font-medium">
              Join our exclusive network to unlock real-time news across AI, DevOps, 
              Cybersecurity, and Emerging Tech. Stay ahead. Stay Texpress.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center pt-12">
          <Link 
            href="/signup" 
            className="px-10 py-4 bg-black text-white text-xl font-black uppercase hover:bg-zinc-800 transition-colors shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)]"
          >
            Join the Network
          </Link>
          <Link 
            href="/login" 
            className="px-10 py-4 border-4 border-black text-black text-xl font-black uppercase hover:bg-black hover:text-white transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
          >
            Sign In
          </Link>
        </div>
      </div>
      
      <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 w-full opacity-20 pointer-events-none select-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="border-2 border-black p-4 text-xs font-black uppercase">
            Data Stream {i+1} // Validated //
          </div>
        ))}
      </div>
    </div>
  );
}
