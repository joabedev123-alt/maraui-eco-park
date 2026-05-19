'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Calendar, 
  Users, 
  Tent, 
  MapPin, 
  ChevronRight, 
  Star, 
  TreePine, 
  Flame, 
  Wifi, 
  ShieldCheck, 
  Play,
  Menu,
  X,
  Phone
} from 'lucide-react';

const FADE_UP = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
};

export default function MarauiEcoPark() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);

  const [isMobile, setIsMobile] = useState(false);

  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2 Hóspedes');
  const [accommodation, setAccommodation] = useState('Chalé Premium');

  const handleQuery = () => {
    const formatDate = (dateStr: string) => {
      if (!dateStr) return 'Não informado';
      const [year, month, day] = dateStr.split('-');
      return `${day}/${month}/${year}`;
    };

    const message = `Olá, gostaria de solicitar informações sobre o passeio e reserva no camping do Maraui Eco Park.

Seguem os dados da minha solicitação:
- Acomodação: ${accommodation}
- Check-in: ${formatDate(checkIn)}
- Check-out: ${formatDate(checkOut)}
- Hóspedes: ${guests}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5586999999999?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <main className="min-h-screen bg-brand-white selection:bg-brand-orange selection:text-white font-sans overflow-x-hidden">
      
      {/* NAVBAR */}
      <nav className={`fixed w-full z-50 transition-all duration-500 transform ${isScrolled ? 'bg-brand-black/95 backdrop-blur-md py-2 shadow-lg -translate-y-full' : 'bg-transparent py-4 translate-y-0'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex-1 flex justify-start">
            <a href="#home" className="flex items-center gap-2">
              <Image 
                src="/logo preferencial_page-0001.png" 
                alt="Maraui Eco Park" 
                width={320} 
                height={100} 
                className="h-16 md:h-24 w-auto object-contain" 
              />
            </a>
          </div>
          
          <div className="hidden md:flex items-center justify-center gap-8">
            {['Home', 'Hospedagem', 'Natureza', 'Eventos', 'Provas', 'Estrutura', 'Contato'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-white/90 hover:text-brand-gold text-sm font-medium transition-colors uppercase tracking-widest">
                {item}
              </a>
            ))}
          </div>

          <div className="flex-1 flex justify-end">
            <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-brand-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden">
          {['Home', 'Hospedagem', 'Natureza', 'Eventos', 'Provas', 'Estrutura', 'Contato'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)} className="text-white text-2xl font-heading tracking-widest hover:text-brand-gold transition-colors">
              {item}
            </a>
          ))}
          <button className="bg-brand-orange text-white px-10 py-4 rounded-full font-bold text-lg tracking-widest uppercase mt-4">
            Reservar Agora
          </button>
        </div>
      )}

      {/* 1. HERO SECTION CINEMATOGRÁFICA */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={isMobile ? {} : { y: y1 }} className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1510853675132-58241c941e4f?q=80&w=2000&auto=format&fit=crop" 
            alt="Maraui Eco Park Natureza" 
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-black/90 via-brand-black/60 to-brand-black/95"></div>
        </motion.div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-20">
          <motion.div initial="hidden" animate="visible" variants={FADE_UP}>
            <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl text-white mb-6 drop-shadow-2xl leading-none">
              NATUREZA, AVENTURA E <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-brand-orange">EXPERIÊNCIAS REAIS</span>
            </h1>
            <p className="text-lg md:text-2xl text-brand-sand mb-10 max-w-3xl mx-auto font-light leading-relaxed">
              Camping, chalés, eventos, esportes e conexão verdadeira com a natureza a apenas <strong className="text-white font-semibold">7km de Teresina</strong>, no povoado Sagrador.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-brand-orange hover:bg-brand-orange/90 text-white px-10 py-5 rounded-full font-bold text-sm tracking-widest uppercase transition-all transform hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(201,106,43,0.5)] flex items-center gap-2 w-full sm:w-auto justify-center">
                Reservar Agora <ChevronRight className="w-5 h-5" />
              </button>
              <a 
                href="https://wa.me/5586999999999?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es%20sobre%20as%20hospedagens%20e%20atividades%20do%20Maraui%20Eco%20Park."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-full font-bold text-sm tracking-widest uppercase transition-all transform hover:-translate-y-1 w-full sm:w-auto justify-center flex items-center gap-2"
              >
                <Phone className="w-5 h-5" /> Falar no WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
        
        {/* Torn Edge Effect Bottom */}
        <div className="absolute bottom-0 w-full h-16 bg-repeat-x z-20" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1000 100\' preserveAspectRatio=\'none\'%3E%3Cpath d=\'M0,100 L1000,100 L1000,0 C850,80 750,20 500,60 C250,100 150,20 0,60 Z\' fill=\'%23F8F8F8\'/%3E%3C/svg%3E")', backgroundSize: '100% 100%' }}></div>
      </section>

      {/* 2. BUSCA / RESERVA (FLOATING BAR) */}
      <div className="relative z-30 max-w-6xl mx-auto px-4 -mt-10 sm:-mt-16 mb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/80 backdrop-blur-xl border border-white/40 p-4 md:p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex flex-col md:flex-row gap-4 items-center justify-between"
        >
          <div className="flex flex-col w-full md:w-auto">
            <span className="text-xs uppercase tracking-widest text-brand-green-dark font-bold mb-1 flex items-center gap-2"><Calendar className="w-4 h-4" /> Check-in</span>
            <input 
              type="date" 
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="bg-transparent border-b border-gray-300 py-2 focus:outline-none focus:border-brand-orange text-brand-black" 
            />
          </div>
          <div className="flex flex-col w-full md:w-auto">
            <span className="text-xs uppercase tracking-widest text-brand-green-dark font-bold mb-1 flex items-center gap-2"><Calendar className="w-4 h-4" /> Check-out</span>
            <input 
              type="date" 
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="bg-transparent border-b border-gray-300 py-2 focus:outline-none focus:border-brand-orange text-brand-black" 
            />
          </div>
          <div className="flex flex-col w-full md:w-auto">
            <span className="text-xs uppercase tracking-widest text-brand-green-dark font-bold mb-1 flex items-center gap-2"><Users className="w-4 h-4" /> Pessoas</span>
            <select 
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full bg-transparent border-b border-gray-300 py-2 focus:outline-none focus:border-brand-orange text-brand-black appearance-none cursor-pointer"
            >
              <option value="2 Hóspedes">2 Hóspedes</option>
              <option value="3 Hóspedes">3 Hóspedes</option>
              <option value="4+ Hóspedes">4+ Hóspedes</option>
              <option value="Grupo / Evento">Grupo / Evento</option>
            </select>
          </div>
          <div className="flex flex-col w-full md:w-auto">
            <span className="text-xs uppercase tracking-widest text-brand-green-dark font-bold mb-1 flex items-center gap-2"><Tent className="w-4 h-4" /> Acomodação</span>
            <select 
              value={accommodation}
              onChange={(e) => setAccommodation(e.target.value)}
              className="w-full bg-transparent border-b border-gray-300 py-2 focus:outline-none focus:border-brand-orange text-brand-black appearance-none cursor-pointer"
            >
              <option value="Chalé Premium">Chalé Premium</option>
              <option value="Área de Camping">Área de Camping</option>
              <option value="Day Use">Day Use</option>
            </select>
          </div>
          <button 
            onClick={handleQuery}
            className="bg-brand-green-dark hover:bg-brand-green text-white px-8 py-4 rounded-xl font-bold text-sm tracking-widest uppercase transition-all w-full md:w-auto mt-4 md:mt-0 shadow-lg"
          >
            Consultar
          </button>
        </motion.div>
      </div>

      {/* 3. SOBRE O MARAUI ECO PARK */}
      <section id="sobre" className="py-20 px-6 overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="lg:w-1/2 space-y-8"
            >
              <div className="flex items-center gap-4 text-brand-orange font-bold tracking-widest uppercase text-sm">
                <span className="w-12 h-px bg-brand-orange"></span>
                Sobre o Parque
              </div>
              <h2 className="font-heading text-5xl md:text-7xl text-brand-green-dark leading-none">
                Refúgio Perfeito <br/><span className="text-brand-orange">Perto da Cidade</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                O Maraui Eco Park é um espaço criado para quem deseja viver experiências reais em meio à natureza. Localizado no povoado Sagrador, em Timon - Maranhão, oferecemos hospedagem, aventuras, eventos e experiências inesquecíveis para famílias, grupos, igrejas e atletas.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Aqui você encontra conforto, adrenalina, liberdade e contato verdadeiro com a natureza em um ambiente seguro, familiar e acolhedor.
              </p>
              <button className="border-2 border-brand-green-dark text-brand-green-dark hover:bg-brand-green-dark hover:text-white px-8 py-4 rounded-full font-bold tracking-widest uppercase transition-colors flex items-center gap-2">
                Conhecer Experiências <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
            
            <div className="lg:w-1/2 w-full relative">
              <motion.div 
                style={isMobile ? {} : { y: y2 }}
                className="grid grid-cols-2 gap-4"
              >
                <div className="space-y-4 pt-6 md:pt-12">
                  <div className="relative h-40 md:h-64 rounded-3xl overflow-hidden shadow-2xl">
                    <Image src="https://images.unsplash.com/photo-1536431311719-398b6704d4cc?q=80&w=800&auto=format&fit=crop" alt="Natureza" fill className="object-cover hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="relative h-48 md:h-80 rounded-3xl overflow-hidden shadow-2xl">
                    <Image src="https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=80&w=800&auto=format&fit=crop" alt="Aventura" fill className="object-cover hover:scale-110 transition-transform duration-700" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="relative h-48 md:h-80 rounded-3xl overflow-hidden shadow-2xl">
                    <Image src="https://images.unsplash.com/photo-1515444744559-7be63e1600de?q=80&w=800&auto=format&fit=crop" alt="Camping" fill className="object-cover hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="relative h-40 md:h-64 rounded-3xl overflow-hidden shadow-2xl bg-brand-gold flex items-center justify-center text-center p-4 md:p-8">
                     <div>
                       <MapPin className="w-8 h-8 md:w-12 md:h-12 text-white mx-auto mb-2 md:mb-4" />
                       <h3 className="font-heading text-xl md:text-3xl text-white">A APENAS 7KM DE TERESINA</h3>
                       <p className="text-white/80 mt-1 md:mt-2 text-xs md:text-sm font-medium">Fácil acesso</p>
                     </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. EXPERIÊNCIAS & AVENTURAS */}
      <section id="natureza" className="py-24 bg-brand-black text-white relative">
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
        
        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-heading text-6xl md:text-7xl mb-4">Escolha sua <span className="text-brand-orange">Aventura</span></h2>
            <p className="text-brand-sand text-lg max-w-2xl mx-auto">Temos opções perfeitas tanto para quem busca relaxamento profundo quanto para quem tem sede de adrenalina.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { title: "Trilhas Ecológicas", img: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=600&auto=format&fit=crop", badge: "Aventura" },
              { title: "Camping", img: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=600&auto=format&fit=crop", badge: "Hospedagem" },
              { title: "Fogueira", img: "https://images.unsplash.com/photo-1525253013412-55c1a69a5738?q=80&w=600&auto=format&fit=crop", badge: "Noturno" },
              { title: "Casa na Árvore", img: "https://images.unsplash.com/photo-1520608552146-248107579603?q=80&w=600&auto=format&fit=crop", badge: "Kids/Família" },
              { title: "Mirantes Naturais", img: "https://images.unsplash.com/photo-1502465771179-51f3535da42c?q=80&w=600&auto=format&fit=crop", badge: "Contemplação" },
              { title: "Espaço Kids", img: "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?q=80&w=600&auto=format&fit=crop", badge: "Lazer" },
              { title: "Experiências Outdoor", img: "https://images.unsplash.com/photo-1533587851505-d119e131927f?q=80&w=600&auto=format&fit=crop", badge: "Esporte" },
              { title: "Sobrevivência", img: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600&auto=format&fit=crop", badge: "Radical" }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: isMobile ? 0 : idx * 0.05 }}
                viewport={{ once: true }}
                className="group relative h-48 md:h-80 rounded-2xl overflow-hidden cursor-pointer"
              >
                <Image src={item.img} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-brand-orange/90 backdrop-blur-sm text-white text-[10px] md:text-xs font-bold px-2 py-0.5 md:px-3 md:py-1 rounded-full uppercase tracking-widest">
                  {item.badge}
                </div>
                <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6">
                  <h3 className="font-heading text-xl md:text-3xl text-white group-hover:text-brand-gold transition-colors leading-none">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <button className="bg-brand-green hover:bg-brand-green/90 text-white px-10 py-5 rounded-full font-bold text-sm tracking-widest uppercase transition-all shadow-[0_0_30px_rgba(47,107,69,0.4)] inline-flex items-center gap-3">
              <Phone className="w-5 h-5" /> Quero falar no WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* 5. HOSPEDAGEM PREMIUM */}
      <section id="hospedagem" className="py-24 px-6 bg-brand-sand overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:w-1/2 relative h-[300px] md:h-[600px] w-full rounded-3xl overflow-hidden shadow-2xl"
            >
              <Image src="https://images.unsplash.com/photo-1587061949409-02df41d5e562?q=80&w=1000&auto=format&fit=crop" alt="Chalés Premium" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 bg-white/20 backdrop-blur-md p-4 md:p-6 rounded-2xl border border-white/30 text-white">
                <Star className="w-6 h-6 md:w-8 md:h-8 text-brand-gold mb-1 md:mb-2 fill-brand-gold" />
                <p className="font-heading text-xl md:text-3xl">Conforto Rústico</p>
                <p className="font-light text-xs md:text-sm">Integração perfeita com a natureza</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2 space-y-8"
            >
              <h2 className="font-heading text-5xl md:text-7xl text-brand-black leading-none">
                Conforto em <br/><span className="text-brand-orange">Meio à Natureza</span>
              </h2>
              <p className="text-gray-700 text-lg">
                Desperte com o canto dos pássaros e durma sob um céu estrelado. Nossas acomodações foram desenhadas para oferecer o equilíbrio perfeito entre o rústico e o conforto moderno.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: <Tent className="w-5 h-5 md:w-6 md:h-6" />, text: "Camping" },
                  { icon: <TreePine className="w-5 h-5 md:w-6 md:h-6" />, text: "Chalés" },
                  { icon: <Users className="w-5 h-5 md:w-6 md:h-6" />, text: "Área Familiar" },
                  { icon: <Wifi className="w-5 h-5 md:w-6 md:h-6" />, text: "Wi-Fi Comum" },
                  { icon: <Flame className="w-5 h-5 md:w-6 md:h-6" />, text: "Fogueira" },
                  { icon: <ShieldCheck className="w-5 h-5 md:w-6 md:h-6" />, text: "Segurança" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 md:gap-3 text-brand-black font-semibold text-sm md:text-base">
                    <div className="bg-brand-green/10 p-2 md:p-3 rounded-full text-brand-green">
                      {item.icon}
                    </div>
                    {item.text}
                  </div>
                ))}
              </div>

              <div className="pt-6">
                <button className="bg-brand-black hover:bg-brand-black/90 text-white px-10 py-5 rounded-full font-bold text-sm tracking-widest uppercase transition-all shadow-xl">
                  Garantir Reserva
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. EVENTOS & LOCAÇÕES */}
      <section id="eventos" className="py-24 px-6 bg-brand-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="font-heading text-5xl md:text-7xl text-brand-black mb-4">Cenário Perfeito para <span className="text-brand-gold">Seu Evento</span></h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">De celebrações íntimas a grandes encontros, o Maraui Eco Park oferece a infraestrutura e a beleza natural para momentos marcantes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Casamentos ao Ar Livre", img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800&auto=format&fit=crop" },
              { title: "Igrejas e Retiros", img: "https://images.unsplash.com/photo-1438283173091-5dbf5c5a3206?q=80&w=800&auto=format&fit=crop" },
              { title: "Centro de Instrução", img: "https://images.unsplash.com/photo-1510925758641-869d353cecc7?q=80&w=800&auto=format&fit=crop" }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative h-64 md:h-96 rounded-3xl overflow-hidden cursor-pointer shadow-xl"
              >
                <Image src={item.img} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-brand-black/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8">
                  <h3 className="font-heading text-2xl md:text-3xl text-white mb-2 leading-none">{item.title}</h3>
                  <div className="h-1 w-12 bg-brand-gold transition-all duration-300 group-hover:w-full"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PROVAS OFICIAIS MARAUI */}
      <section id="provas" className="py-24 px-6 bg-brand-green-dark text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none">
          <svg width="800" height="800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        </div>
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <div className="flex items-center gap-4 text-brand-gold font-bold tracking-widest uppercase text-sm mb-4">
                <span className="w-12 h-px bg-brand-gold"></span>
                Adrenalina Pura
              </div>
              <h2 className="font-heading text-6xl md:text-8xl leading-none">PROVAS <br/><span className="text-brand-orange">OFICIAIS</span></h2>
            </div>
            <p className="text-brand-sand max-w-md text-lg">
              Sediamos as competições mais desafiadoras da região. Teste seus limites em nossos percursos exclusivos na natureza.
            </p>
          </div>

          <div className="space-y-6">
            {[
              { title: "Maraui Race", desc: "Corrida de obstáculos extrema na lama e selva.", type: "Obstáculos" },
              { title: "Pequenos Guerreiros Kids", desc: "Aventura e superação para os pequenos aventureiros.", type: "Kids" },
              { title: "Maraui Ultra Backyard", desc: "O Último de Pé. Resistência mental e física extrema.", type: "Ultra Maratona" },
              { title: "Maraui Timon Bike", desc: "Trilhas técnicas e velozes para mountain bike.", type: "MTB" }
            ].map((prova, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white/5 border border-white/10 hover:bg-white/10 p-4 md:p-8 rounded-2xl flex justify-between items-center gap-4 transition-colors group cursor-pointer"
              >
                <div>
                  <span className="text-brand-gold text-xs md:text-sm font-bold uppercase tracking-widest mb-1 md:mb-2 block">{prova.type}</span>
                  <h3 className="font-heading text-2xl md:text-4xl text-white group-hover:text-brand-orange transition-colors leading-none">{prova.title}</h3>
                  <p className="text-brand-sand mt-2 text-xs md:text-base leading-relaxed">{prova.desc}</p>
                </div>
                <button className="flex-shrink-0 w-10 h-10 md:w-16 md:h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-brand-orange group-hover:border-brand-orange transition-all">
                  <ChevronRight className="w-5 h-5 md:w-8 md:h-8" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. SUSTENTABILIDADE & NATUREZA */}
      <section className="py-24 px-6 bg-brand-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="font-heading text-5xl md:text-7xl text-brand-black mb-4">Nosso Compromisso com a <span className="text-brand-green">Natureza</span></h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {['Preservação Ambiental', 'Proteção da Fauna', 'Reflorestamento', 'Educação Ecológica'].map((item, idx) => (
              <div key={idx} className="bg-brand-sand/50 p-4 md:p-8 rounded-3xl text-center hover:bg-brand-sand transition-colors border border-brand-sand flex flex-col justify-center items-center">
                <TreePine className="w-8 h-8 md:w-12 md:h-12 text-brand-green mx-auto mb-2 md:mb-4" />
                <h3 className="font-heading text-lg md:text-2xl text-brand-black leading-tight">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. DEPOIMENTOS */}
      <section className="py-24 px-6 bg-brand-sand relative overflow-hidden">
        <div className="container mx-auto max-w-7xl relative z-10">
          <h2 className="font-heading text-5xl md:text-7xl text-brand-black text-center mb-16">O que dizem nossos <span className="text-brand-orange">Aventureiros</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white/60 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white"
              >
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(star => <Star key={star} className="w-5 h-5 text-brand-gold fill-brand-gold" />)}
                </div>
                <p className="text-gray-700 mb-6 italic">"Lugar incrível! A infraestrutura dos chalés superou minhas expectativas e as trilhas são maravilhosas. Excelente para desligar da cidade e conectar com a família."</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-gray bg-gray-300"></div>
                  <div>
                    <h4 className="font-bold text-brand-black">Carlos Eduardo</h4>
                    <span className="text-sm text-gray-500">Teresina, PI</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. CTA FINAL */}
      <section className="relative py-32 px-6 overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1504280741564-f20387b9cc0f?q=80&w=2000&auto=format&fit=crop" alt="Campfire" fill className="object-cover" />
        <div className="absolute inset-0 bg-brand-black/70"></div>
        <div className="container mx-auto relative z-10 text-center max-w-4xl">
          <h2 className="font-heading text-6xl md:text-8xl text-white mb-6">Viva momentos inesquecíveis em meio à <span className="text-brand-orange">natureza</span>.</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <button className="bg-brand-orange hover:bg-brand-orange/90 text-white px-10 py-5 rounded-full font-bold text-sm tracking-widest uppercase transition-all shadow-2xl hover:scale-105">
              Reservar Agora
            </button>
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-full font-bold text-sm tracking-widest uppercase transition-all hover:scale-105 flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" /> Falar no WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* 11. RODAPÉ PREMIUM */}
      <footer className="bg-brand-black pt-20 pb-10 px-6 text-brand-sand border-t border-white/10">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <Image 
                  src="/logo preferencial_page-0001.png" 
                  alt="Maraui Eco Park" 
                  width={360} 
                  height={120} 
                  className="h-24 md:h-32 w-auto object-contain" 
                />
              </div>
              <p className="text-white/60 mb-6">Hospedagem, ecoturismo e eventos em Timon - MA. Sua conexão premium com a natureza.</p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-orange hover:text-white transition-colors font-bold text-xs">IG</a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-orange hover:text-white transition-colors font-bold text-xs">FB</a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-orange hover:text-white transition-colors font-bold text-xs">YT</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-white uppercase tracking-widest mb-6">Links Rápidos</h4>
              <ul className="space-y-3">
                {['Home', 'Hospedagem', 'Natureza', 'Provas Oficiais', 'Contato'].map(link => (
                  <li key={link}><a href="#" className="text-white/60 hover:text-brand-gold transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white uppercase tracking-widest mb-6">Contato</h4>
              <ul className="space-y-3 text-white/60">
                <li>+55 (86) 99999-9999</li>
                <li>contato@marauiecopark.com.br</li>
                <li>Povoado Sagrador, Timon - MA</li>
                <li>Apenas 7km de Teresina</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white uppercase tracking-widest mb-6">Localização</h4>
              <div className="w-full h-32 bg-white/10 rounded-xl overflow-hidden relative">
                {/* Placeholder for map */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-brand-gold" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-white/40">
            <p>&copy; {new Date().getFullYear()} Maraui Eco Park. Todos os direitos reservados.</p>
            <p className="mt-2 md:mt-0">Design Premium por Jody</p>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP */}
      <a 
        href="https://wa.me/5586999999999?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es%20sobre%20o%20Maraui%20Eco%20Park."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-16 h-16 bg-green-500 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.5)] flex items-center justify-center text-white z-50 hover:scale-110 transition-transform"
      >
        <Phone className="w-8 h-8" />
      </a>
    </main>
  );
}
