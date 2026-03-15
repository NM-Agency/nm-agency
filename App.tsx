import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';

import { 
  ArrowRight, 
  BarChart3, 
  Camera, 
  CheckCircle2, 
  Globe, 
  Instagram, 
  Mail, 
  Menu, 
  MessageSquare, 
  Rocket, 
  Smartphone, 
  Target, 
  X,
  Facebook,
  ChevronRight,
  ChevronDown
} from 'lucide-react';

const Logo = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    {/* Laptop Body */}
    <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0a2 2 0 0 1 2 2v1H2v-1a2 2 0 0 1 2-2" />
    {/* Screen Line */}
    <path d="M7 17h10" />
    {/* Chart Line */}
    <path d="M6 13l4-4 4 3 6-6" />
    {/* Chart Points */}
    <circle cx="6" cy="13" r="1" fill="currentColor" />
    <circle cx="10" cy="9" r="1" fill="currentColor" />
    <circle cx="14" cy="12" r="1" fill="currentColor" />
    {/* Arrow Head */}
    <path d="M17 3h3v3" />
  </svg>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Tjänster', href: '#tjanster' },
    { name: 'Om oss', href: '#om' },
    { name: 'Kontakt', href: '#kontakt' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 flex items-center justify-center">
            <Logo className="text-brand w-8 h-8" />
          </div>
          <span className="text-xl font-bold tracking-tight">NM <span className="text-brand">Agency</span></span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium hover:text-brand transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a href="#kontakt" className="text-sm font-bold hover:text-brand transition-all active:scale-95">
            Boka möte
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-zinc-900 border-t border-zinc-800 p-6 shadow-xl md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-lg font-medium text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#kontakt" 
                className="text-lg font-bold text-brand"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Boka möte
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SplineBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-zinc-950">
      <iframe 
        src="https://my.spline.design/interfaceii-ySSoYt7OwRMe2FmJroVGNTJQ/" 
        frameBorder="0" 
        width="100%" 
        height="100%"
        title="Spline Background"
        className="absolute w-[calc(100%+150px)] h-[calc(100%+150px)] -bottom-[75px] -right-[75px] pointer-events-none object-cover"
      />
      <div className="absolute inset-0 bg-zinc-950/40 pointer-events-none" />
    </div>
  );
};

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-6xl md:text-9xl font-bold leading-[1] mb-8 tracking-tight text-white">
              Vi bygger <span className="text-brand italic">framtidens</span> varumärken.
            </h1>
            <p className="text-xl text-zinc-300 mb-10 max-w-2xl leading-relaxed mx-auto">
              NM Agency hjälper ambitiösa företag att dominera sin nisch genom datadriven strategi och kreativt innehåll.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#kontakt" className="btn-primary group">
                Starta ditt projekt 
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#tjanster" className="px-8 py-4 rounded-full text-lg font-medium border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all text-center text-white">
                Våra tjänster
              </a>
            </div>
            
            <div className="mt-16 flex flex-col items-center gap-4">
              <div className="flex items-center -space-x-2">
                <div className="w-10 h-10 rounded-full bg-brand-light border-2 border-zinc-900" />
                <div className="w-10 h-10 rounded-full bg-brand border-2 border-zinc-900" />
                <div className="w-10 h-10 rounded-full bg-brand-dark border-2 border-zinc-900" />
              </div>
              <p className="text-sm text-zinc-400">
                Fokuserad på att leverera <span className="font-bold text-white uppercase tracking-widest">resultat</span> för din verksamhet
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      icon: <Facebook className="w-6 h-6 text-brand" />,
      title: <><span className="text-brand">Facebook</span> Annonsering</>,
      desc: "Vi skapar och optimerar högkonverterande annonskampanjer på Facebook för att driva försäljning och leads."
    },
    {
      icon: <Instagram className="w-6 h-6 text-brand" />,
      title: <><span className="text-brand">Instagram</span> Annonsering</>,
      desc: "Vi bygger visuellt tilltalande kampanjer på Instagram som fångar din målgrupps uppmärksamhet och bygger varumärke."
    }
  ];

  return (
    <section id="tjanster" className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8 text-center md:text-left">
          <div className="max-w-2xl">
            <h2 className="text-5xl font-bold mb-6 tracking-tight text-brand">Våra Tjänster</h2>
            <p className="text-xl text-zinc-400 leading-relaxed">
              Vi specialiserar oss på datadriven annonsering för att ge dig bästa möjliga resultat och avkastning på din marknadsföringsbudget.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="bg-zinc-900/40 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/5 shadow-sm hover:shadow-xl hover:shadow-brand/5 transition-all group"
            >
              <div className="w-16 h-16 bg-brand/5 rounded-2xl flex items-center justify-center mb-8 transition-colors">
                <div className="text-brand">
                  {s.icon}
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">{s.title}</h3>
              <p className="text-zinc-400 leading-relaxed">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="om" className="py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl font-bold mb-10 tracking-tight text-white">Vi är din <span className="text-brand">förlängda</span> marknadsavdelning.</h2>
            <div className="space-y-8 text-xl text-zinc-300 leading-relaxed">
              <p>
                NM Agency grundades med en enkel vision: att göra högkvalitativ digital marknadsföring tillgänglig för företag som vill växa på riktigt.
              </p>
              <p>
                Vi tror inte på standardlösningar. Varje företag är unikt, och därför skräddarsyr vi varje kampanj för att maximera din tillväxt. Med fokus på data och kreativitet bygger vi varumärken som håller över tid.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Facebook Annonsering',
    message: ''
  });
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | 'loading' | null, message: string }>({ type: null, message: '' });

  const services = [
    "Facebook Annonsering",
    "Instagram Annonsering",
    "Både Facebook & Instagram",
    "Annat"
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Skickar meddelande...' });
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: data.message || 'Meddelandet har skickats!' });
        setFormData({ name: '', email: '', service: 'Facebook Annonsering', message: '' });
      } else {
        setStatus({ type: 'error', message: data.error || 'Något gick fel. Försök igen.' });
      }
    } catch (error) {
      console.error('Submit error:', error);
      setStatus({ type: 'error', message: 'Kunde inte ansluta till servern. Försök igen senare.' });
    }
  };

  return (
    <section id="kontakt" className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-6xl font-bold mb-8 tracking-tight leading-[1.1] text-brand">Redo att ta <span className="text-brand italic">nästa steg?</span></h2>
            <p className="text-zinc-400 text-xl mb-12 leading-relaxed">
              Vi är alltid sugna på nya utmaningar. Hör av dig så bokar vi ett förutsättningslöst möte där vi pratar om dina mål.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6 group cursor-pointer">
                <div className="w-16 h-16 bg-brand/10 backdrop-blur-md rounded-[1.5rem] flex items-center justify-center group-hover:bg-brand group-hover:text-white transition-all text-brand">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm text-brand font-medium uppercase tracking-widest mb-1">Maila oss</div>
                  <div className="text-2xl font-bold text-brand transition-colors">agencymarketingnm@gmail.com</div>
                </div>
              </div>
              <div className="flex items-center gap-6 group cursor-pointer">
                <div className="w-16 h-16 bg-brand/10 backdrop-blur-md rounded-[1.5rem] flex items-center justify-center group-hover:bg-brand group-hover:text-white transition-all text-brand">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm text-brand font-medium uppercase tracking-widest mb-1">Ring oss</div>
                  <div className="text-2xl font-bold text-brand transition-colors">076 318 81 10</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-transparent text-white p-12 rounded-[3rem]">
            <form className="space-y-8" onSubmit={handleSubmit}>
              {status.type && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl text-sm font-medium ${
                    status.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                    status.type === 'error' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 
                    'bg-brand/10 text-brand border border-brand/20'
                  }`}
                >
                  {status.message}
                </motion.div>
              )}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-brand">Namn</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-transparent border-b border-white/20 px-2 py-4 focus:outline-none focus:border-brand transition-all text-white" 
                    placeholder="Ditt namn" 
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-brand">E-post</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-transparent border-b border-white/20 px-2 py-4 focus:outline-none focus:border-brand transition-all text-white" 
                    placeholder="din@mail.se" 
                  />
                </div>
              </div>
              <div className="space-y-3 relative">
                <label className="text-xs font-bold uppercase tracking-widest text-brand">Tjänst</label>
                <div 
                  onClick={() => setIsSelectOpen(!isSelectOpen)}
                  className="w-full bg-transparent border-b border-white/20 px-2 py-4 focus:outline-none focus:border-brand transition-all cursor-pointer text-white flex justify-between items-center"
                >
                  <span>{formData.service}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isSelectOpen ? 'rotate-180' : ''}`} />
                </div>
                
                {isSelectOpen && (
                  <div className="absolute top-full left-0 right-0 z-50 bg-black border border-white/10 mt-2 rounded-xl overflow-hidden shadow-2xl">
                    {services.map((service) => (
                      <div 
                        key={service}
                        onClick={() => {
                          setFormData({...formData, service});
                          setIsSelectOpen(false);
                        }}
                        className="px-6 py-4 text-white hover:text-brand cursor-pointer transition-colors bg-black"
                      >
                        {service}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-brand">Meddelande</label>
                <textarea 
                  rows={4} 
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-transparent border-b border-white/20 px-2 py-4 focus:outline-none focus:border-brand transition-all resize-none text-white" 
                  placeholder="Berätta lite om ditt projekt..." 
                />
              </div>
              <button 
                type="submit"
                disabled={status.type === 'loading'}
                className="w-full text-brand py-2 font-bold text-lg hover:text-brand-dark transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status.type === 'loading' ? 'Skickar...' : 'Skicka meddelande'}
              </button>
              <p className="text-center text-[10px] text-zinc-500 mt-4">
                Genom att skicka meddelandet godkänner du vår integritetspolicy.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 flex items-center justify-center">
              <Logo className="text-brand w-8 h-8" />
            </div>
            <span className="font-bold tracking-tight text-xl text-white">NM <span className="text-brand">Agency</span></span>
          </div>
          
          <div className="flex gap-8 text-sm font-medium text-zinc-500">
            <a href="#" className="hover:text-brand transition-colors">Integritetspolicy</a>
            <a href="#" className="hover:text-brand transition-colors">Cookies</a>
            <a href="#" className="hover:text-brand transition-colors">Villkor</a>
          </div>

          <div className="flex gap-4">
            <a href="https://www.instagram.com/noel_oggesjo/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-zinc-800 rounded-full flex items-center justify-center hover:bg-zinc-900 transition-all text-white">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61588110825001" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-zinc-800 rounded-full flex items-center justify-center hover:bg-zinc-900 transition-all text-white">
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>
        <div className="mt-12 text-center text-xs text-zinc-500">
          © {new Date().getFullYear()} NM Agency AB. Alla rättigheter förbehållna.
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen selection:bg-brand selection:text-white">
      <SplineBackground />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
