import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] py-12 text-center overflow-hidden relative bg-grid opacity-90">
      <div className="max-w-6xl w-full px-4 space-y-16 relative">
        {/* Floating Decorative Elements */}
        <div className="absolute -top-40 -left-20 w-64 h-64 bg-neo-green/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute top-40 -right-20 w-96 h-96 bg-black/5 rounded-full blur-3xl -z-10"></div>

        {/* Hero Section */}
        <div className="relative pt-12">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -rotate-2 bg-black text-white px-4 py-1 text-[10px] font-black uppercase tracking-[0.3em] shadow-neo-sm">
            Accessing Neural Link...
          </div>
          
          <div className="relative inline-block group mt-8">
            <h1 className="text-8xl md:text-[12rem] font-black uppercase tracking-tighter leading-none border-b-[12px] border-black pb-2 mb-2 relative z-10 transition-all group-hover:-translate-x-2 group-hover:-translate-y-2 duration-300">
              Texpress
            </h1>
            <div className="absolute top-6 -right-6 w-full h-full bg-neo-green -z-10 border-4 border-black transition-all group-hover:translate-x-4 group-hover:translate-y-4"></div>
            <div className="absolute -top-4 -left-4 w-full h-full border-4 border-black -z-20"></div>
          </div>
          
          <div className="mt-12 space-y-4 max-w-3xl mx-auto">
            <p className="text-4xl md:text-6xl font-black leading-[0.9] uppercase tracking-tighter italic">
              The <span className="bg-black text-neo-green px-3 py-1 -rotate-1 inline-block">Future</span> <br className="hidden md:block"/> as a Service.
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="h-[2px] w-12 bg-black"></div>
              <p className="text-sm md:text-base font-black text-black/40 uppercase tracking-[0.5em]">
                Fast // Relentless // Minimal
              </p>
              <div className="h-[2px] w-12 bg-black"></div>
            </div>
          </div>
        </div>
        
        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-6 text-left relative z-10">
          <div className="border-4 border-black p-8 bg-white shadow-neo hover:-translate-y-2 transition-all duration-300 group hover:bg-neo-green">
            <div className="text-4xl mb-4 font-black transition-transform group-hover:scale-125 duration-300">⚡</div>
            <h3 className="text-2xl font-black uppercase mb-3 border-b-4 border-black inline-block">Aggregated</h3>
            <p className="font-bold leading-tight text-sm">
              We slice through the noise of 500+ sources to bring you the 1% that actually matters. No fluff.
            </p>
          </div>
          
          <div className="border-4 border-black p-8 bg-white shadow-neo hover:-translate-y-2 transition-all duration-300 group md:-translate-y-4 hover:bg-black hover:text-white">
            <div className="text-4xl mb-4 font-black transition-transform group-hover:rotate-12 duration-300">🧠</div>
            <h3 className="text-2xl font-black uppercase mb-3 border-b-4 border-black group-hover:border-white inline-block">AI Optimized</h3>
            <p className="font-bold leading-tight text-sm opacity-80">
              Neural summaries provided for every headline. Digest an entire industry report in 30 seconds.
            </p>
          </div>

          <div className="border-4 border-black p-8 bg-white shadow-neo hover:-translate-y-2 transition-all duration-300 group hover:bg-neo-green">
            <div className="text-4xl mb-4 font-black transition-transform group-hover:-rotate-12 duration-300">🛠️</div>
            <h3 className="text-2xl font-black uppercase mb-3 border-b-4 border-black inline-block">Dev First</h3>
            <p className="font-bold leading-tight text-sm">
              Built for the terminal-obsessed. High density information, low density distractions.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center py-10 relative z-10">
          <Link 
            href="/signup" 
            className="neo-button bg-neo-green text-black text-2xl md:text-3xl px-16 py-8 border-[4px] hover:bg-black hover:text-white transition-all transform hover:scale-105 active:scale-95 group relative"
          >
            <span className="relative z-10 uppercase tracking-tighter">Enter the Network</span>
            <div className="absolute inset-0 bg-white/20 translate-x-2 translate-y-2 -z-10"></div>
          </Link>
          <Link 
            href="/login" 
            className="text-xl font-black uppercase tracking-widest hover:bg-black hover:text-white px-8 py-4 border-4 border-transparent hover:border-black transition-all"
          >
            Existing Entity? [_Log_In]
          </Link>
        </div>

        {/* Technical Footer Decoration */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 opacity-30">
          {[
            { label: 'Uptime', value: '99.99%' },
            { label: 'Latency', value: '14ms' },
            { label: 'Protocols', value: 'HTTP/3' },
            { label: 'Encryption', value: 'AES-256' }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-[10px] uppercase font-black tracking-widest">{stat.label}</span>
              <span className="text-lg font-black">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Marquee remains the same but with enhanced styling */}
      <div className="fixed bottom-0 left-0 w-full overflow-hidden whitespace-nowrap border-t-4 border-black py-3 bg-white z-40">
        <div className="flex gap-12 animate-marquee font-black uppercase tracking-[0.2em] text-[10px] italic">
          {Array.from({ length: 20 }).map((_, i) => (
            <span key={i} className="flex items-center gap-4">
              <span className="w-1.5 h-1.5 bg-black rounded-full animate-ping"></span>
              Live Link: 10.0.42.{i} // Status: Secure // {new Date().toLocaleTimeString()} //
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
