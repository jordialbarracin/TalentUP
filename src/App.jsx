import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, AlertCircle, ArrowUpRight, Filter, Activity } from 'lucide-react';
import { cn } from './lib/utils';
import { MagicCard } from './components/ui/magic-card';
import { DotPattern } from './components/ui/dot-pattern';

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
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center relative">
        <DotPattern className="[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]" />
        <div className="flex flex-col items-center gap-6 relative z-10">
          <div className="h-16 w-16 bg-slate-900 rounded-2xl flex items-center justify-center shadow-2xl animate-pulse">
            <span className="text-3xl text-white font-extrabold tracking-tighter">TU</span>
          </div>
        </div>
      </div>
    );
  }

  const filteredNews = news.filter(n => category === 'todas' || n.categoria === category);
  const categories = ['todas', ...new Set(news.map(n => n.categoria))];

  return (
    <div className="min-h-screen relative bg-[#FAFAFA] text-slate-900 selection:bg-slate-200">
      
      {/* Magic UI Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <DotPattern 
          className={cn(
            "[mask-image:radial-gradient(100vw_circle_at_top_center,white,transparent)]"
          )}
        />
      </div>

      {/* Sticky Premium Navbar */}
      <header className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled ? "bg-white/70 backdrop-blur-xl border-b border-slate-200/50 shadow-sm py-4" : "bg-transparent py-8"
      )}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-lg text-white font-extrabold tracking-tighter">TU</span>
            </div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900">TalentUP News</span>
          </div>

          <a 
            href="./legacy_ui/leads.html" 
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-full text-sm font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            <Activity className="w-4 h-4 text-emerald-400" />
            <span>Radar B2B</span>
          </a>
        </div>
      </header>

      <main className="relative z-10 pt-40 pb-32 max-w-6xl mx-auto px-6">
        
        {/* Startup Hero Section */}
        <div className="mb-20 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 mb-8"
          >
            <Sparkles className="w-4 h-4 text-google-blue" />
            <span className="text-xs font-semibold text-slate-600 tracking-wide uppercase">Motor IA v2.0 Activo</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tighter text-slate-900 leading-[1.1] mb-6 text-balance max-w-4xl"
          >
            Decodificando el futuro de los Recursos Humanos.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl text-balance mb-12"
          >
            Inteligencia Artificial analizando miles de fuentes en tiempo real para predecir tendencias, riesgos y movimientos del mercado B2B.
          </motion.p>

          {/* Filter Pills */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={cn(
                  "px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 capitalize",
                  category === cat 
                    ? "bg-slate-900 text-white shadow-md scale-105" 
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Magic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredNews.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="col-span-full py-32 flex flex-col items-center text-slate-400"
              >
                <Filter className="w-12 h-12 mb-4 opacity-20" />
                <p className="font-mono text-sm uppercase tracking-widest">Sin resultados</p>
              </motion.div>
            ) : (
              filteredNews.map((item, i) => (
                <NewsMagicCard key={item.titulo + i} item={item} index={i} />
              ))
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function NewsMagicCard({ item, index }) {
  // Format Date Elegantly
  let dateStr = item.fecha;
  try {
    const d = new Date(item.fecha);
    if (!isNaN(d.getTime())) {
      dateStr = d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
    }
  } catch (e) {}

  // Parse AI Content
  const tmp = document.createElement("DIV");
  tmp.innerHTML = item.resumen;
  const cleanSummary = tmp.textContent || tmp.innerText || "";
  const hasImpact = item.impacto && item.impacto !== "N/A" && item.impacto !== "Error al procesar con IA.";
  const iaImpact = hasImpact ? item.impacto : cleanSummary.substring(0, 150) + "...";
  const iaRisk = item.riesgos && item.riesgos !== "N/A" ? item.riesgos : null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.5) }}
      className="h-full"
    >
      <MagicCard
        className="cursor-pointer"
        gradientColor="rgba(15, 23, 42, 0.04)"
        onClick={() => window.open(item.url, '_blank')}
      >
        <div className="flex flex-col h-full">
          
          <div className="flex justify-between items-start mb-6">
            <span className="inline-flex px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest bg-slate-100 text-slate-600 border border-slate-200">
              {item.categoria}
            </span>
            <span className="text-xs font-mono text-slate-400">{dateStr}</span>
          </div>

          <h2 className="text-xl font-bold text-slate-900 leading-snug tracking-tight mb-4 group-hover:text-blue-600 transition-colors">
            {item.titulo}
          </h2>

          <div className="flex-1 mt-2 mb-6">
            <p className="text-sm text-slate-600 leading-relaxed font-medium line-clamp-4">
              {iaImpact}
            </p>
            {iaRisk && (
              <div className="mt-4 flex gap-2 items-start text-xs text-orange-600/80 font-medium bg-orange-50/50 p-3 rounded-lg border border-orange-100/50">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="line-clamp-2">{iaRisk}</span>
              </div>
            )}
          </div>

          <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.fuente}</span>
            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </div>

        </div>
      </MagicCard>
    </motion.div>
  );
}
