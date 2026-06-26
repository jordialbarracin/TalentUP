import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, AlertCircle, ArrowUpRight, Filter, ChevronRight, Activity } from 'lucide-react';
import { cn } from './lib/utils';

export default function App() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('todas');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetch('./datos/noticias.json')
      .then(res => res.json())
      .then(data => {
        // Sort by date descending
        const sorted = data.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
        setNews(sorted);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching news:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-4"
        >
          <div className="h-16 w-16 bg-gradient-to-br from-google-blue to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/30">
            <span className="text-3xl text-white font-extrabold tracking-tighter">TU</span>
          </div>
          <p className="text-slate-400 font-mono tracking-[0.2em] uppercase text-xs">Sincronizando IA...</p>
        </motion.div>
      </div>
    );
  }

  const filteredNews = news.filter(n => category === 'todas' || n.categoria === category);
  const categories = ['todas', ...new Set(news.map(n => n.categoria))];

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-50 selection:bg-google-blue/20">
      
      {/* Liquid Glass Background Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ 
            x: [0, 100, 0], 
            y: [0, -100, 0],
            scale: [1, 1.2, 1] 
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="orb bg-google-blue w-[40vw] h-[40vw] top-[-10vw] left-[-10vw]"
        />
        <motion.div 
          animate={{ 
            x: [0, -50, 0], 
            y: [0, 100, 0],
            scale: [1, 1.5, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="orb bg-purple-400 w-[30vw] h-[30vw] bottom-[-5vw] right-[-5vw] opacity-30"
        />
        <motion.div 
          animate={{ 
            x: [0, 80, 0], 
            y: [0, 50, 0] 
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="orb bg-teal-300 w-[25vw] h-[25vw] top-[40vh] left-[20vw] opacity-20"
        />
      </div>

      {/* Sticky Navbar (Glassmorphic) */}
      <header className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500 border-b border-transparent",
        scrolled ? "bg-white/70 backdrop-blur-xl border-slate-200/50 shadow-sm py-3" : "bg-transparent py-6"
      )}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gradient-to-br from-google-blue to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-google-blue/20">
              <span className="text-lg text-white font-extrabold tracking-tighter">TU</span>
            </div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900 hidden sm:block">TalentUP News</span>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="./legacy_ui/leads.html" 
              className="group flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-google-blue text-white rounded-full text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-google-blue/30"
            >
              <Activity className="w-4 h-4 text-google-yellow" />
              <span>Radar B2B</span>
            </a>
          </div>
        </div>
      </header>

      <main className="relative z-10 pt-32 pb-24 max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Massive Hero Section */}
        <div className="mb-20 text-center md:text-left flex flex-col md:flex-row items-end justify-between gap-8">
          <div className="max-w-3xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-6 text-balance"
            >
              La inteligencia artificial <br className="hidden md:block"/> decodifica el mercado.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl text-balance"
            >
              Monitorizamos miles de fuentes en tiempo real para destilar el impacto y los riesgos del sector RRHH.
            </motion.p>
          </div>

          {/* Filter Pills */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-2 justify-center md:justify-end shrink-0"
          >
            {categories.map((cat, i) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 capitalize border backdrop-blur-sm",
                  category === cat 
                    ? "bg-slate-900 text-white border-slate-900 shadow-md" 
                    : "bg-white/50 text-slate-600 border-slate-200/60 hover:bg-white hover:text-slate-900 hover:border-slate-300"
                )}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Clean SaaS Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredNews.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="col-span-full py-32 flex flex-col items-center justify-center text-slate-400"
              >
                <Filter className="w-12 h-12 mb-4 opacity-20" />
                <p className="font-mono text-sm uppercase tracking-widest">Sin resultados</p>
              </motion.div>
            ) : (
              filteredNews.map((item, i) => (
                <NewsCard key={item.titulo + i} item={item} index={i} />
              ))
            )}
          </AnimatePresence>
        </div>

      </main>
    </div>
  );
}

function NewsCard({ item, index }) {
  // Parse date elegantly
  let dateStr = item.fecha;
  try {
    const d = new Date(item.fecha);
    if (!isNaN(d.getTime())) {
      dateStr = d.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
    }
  } catch (e) {}

  // Determine Badge Styling
  let badgeColor = "text-slate-600 bg-slate-100/50 border-slate-200/50 ring-slate-400/20";
  if (item.categoria === "Legislación") {
    badgeColor = "text-amber-700 bg-amber-50/50 border-amber-200/50 ring-amber-500/20";
  } else if (item.categoria === "Mercado") {
    badgeColor = "text-blue-700 bg-blue-50/50 border-blue-200/50 ring-blue-500/20";
  } else if (item.categoria === "ETTs") {
    badgeColor = "text-emerald-700 bg-emerald-50/50 border-emerald-200/50 ring-emerald-500/20";
  }

  // Clean AI text
  const tmp = document.createElement("DIV");
  tmp.innerHTML = item.resumen;
  const cleanSummary = tmp.textContent || tmp.innerText || "";
  
  const hasImpact = item.impacto && item.impacto !== "N/A" && item.impacto !== "Error al procesar con IA.";
  const iaImpact = hasImpact ? item.impacto : cleanSummary.substring(0, 150) + "...";
  const iaRisk = item.riesgos && item.riesgos !== "N/A" ? item.riesgos : null;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
      className="glass-panel glass-panel-hover rounded-[2rem] p-8 flex flex-col h-full group cursor-pointer transition-all duration-500"
      onClick={() => window.open(item.url, '_blank')}
    >
      <div className="flex items-center justify-between mb-6">
        <span className={cn("inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ring-1 ring-inset backdrop-blur-md", badgeColor)}>
          {item.categoria}
        </span>
        <span className="text-xs font-medium text-slate-400">{dateStr}</span>
      </div>

      <h2 className="text-2xl font-bold text-slate-900 leading-[1.3] tracking-tight mb-4 group-hover:text-google-blue transition-colors duration-300">
        {item.titulo}
      </h2>

      <div className="flex-1 flex flex-col gap-4 mt-4">
        {/* AI Insight Box (Glassy) */}
        <div className="bg-slate-50/60 backdrop-blur-sm rounded-2xl p-5 border border-slate-100/80 shadow-sm group-hover:bg-blue-50/40 group-hover:border-blue-100/50 transition-colors duration-500">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-google-blue" />
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Impacto IA</h4>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed font-medium">{iaImpact}</p>
        </div>
        
        {/* Optional Risk Box */}
        {hasImpact && iaRisk && (
          <div className="bg-orange-50/40 backdrop-blur-sm rounded-2xl p-5 border border-orange-100/50 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-orange-500" />
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Riesgos</h4>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">{iaRisk}</p>
          </div>
        )}
      </div>

      <div className="mt-8 pt-6 border-t border-slate-200/60 flex items-center justify-between">
        <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">{item.fuente}</span>
        <div className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all duration-300 transform group-hover:rotate-45">
          <ArrowUpRight className="w-5 h-5" />
        </div>
      </div>
    </motion.article>
  );
}
