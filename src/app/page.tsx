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
  ChevronLeft, 
  Star, 
  TreePine, 
  Flame, 
  Wifi, 
  ShieldCheck, 
  Menu,
  X,
  Phone,
  Mail
} from 'lucide-react';

const FADE_UP = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
};

interface AdventureCardProps {
  title: string;
  img: string[];
  badge: string;
  idx: number;
  isMobile: boolean;
}

function AdventureCard({ title, img, badge, idx, isMobile }: AdventureCardProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [autoPlayActive, setAutoPlayActive] = useState(true);

  // Carrossel automático
  useEffect(() => {
    if (!autoPlayActive) {
      // Se desativar (devido a clique manual), reativa após 8 segundos
      const reactivateTimeout = setTimeout(() => {
        setAutoPlayActive(true);
      }, 8000);
      return () => clearTimeout(reactivateTimeout);
    }

    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % img.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [autoPlayActive, img.length]);

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setAutoPlayActive(false);
    setCurrentIdx((prev) => (prev + 1) % img.length);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setAutoPlayActive(false);
    setCurrentIdx((prev) => (prev - 1 + img.length) % img.length);
  };

  // Atalhos de teclado no Lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setCurrentIdx((prev) => (prev + 1) % img.length);
      } else if (e.key === 'ArrowLeft') {
        setCurrentIdx((prev) => (prev - 1 + img.length) % img.length);
      } else if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, img.length]);

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: isMobile ? 0 : idx * 0.05 }}
        viewport={{ once: true }}
        onClick={() => setIsLightboxOpen(true)}
        className="group relative h-48 md:h-80 rounded-2xl overflow-hidden cursor-pointer w-[calc(50%-0.5rem)] md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] select-none shadow-lg border border-white/5"
      >
        {img.map((src, i) => (
          <motion.div
            key={src}
            initial={{ opacity: 0 }}
            animate={{ opacity: i === currentIdx ? 1 : 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <Image 
              src={src} 
              alt={`${title} - ${i}`} 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-110" 
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </motion.div>
        ))}

        {/* Gradiente Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-300 z-10"></div>
        
        {/* Categoria Badge */}
        <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-brand-orange/90 backdrop-blur-sm text-white text-[10px] md:text-xs font-bold px-2 py-0.5 md:px-3 md:py-1 rounded-full uppercase tracking-widest z-20">
          {badge}
        </div>

        {/* Título */}
        <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 z-20">
          <h3 className="font-heading text-xl md:text-3xl text-white group-hover:text-brand-gold transition-colors leading-none">{title}</h3>
        </div>

        {/* Setas pequenas manuais no card */}
        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-brand-orange text-white p-1 rounded-full transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100 focus:opacity-100"
          aria-label="Imagem anterior"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-brand-orange text-white p-1 rounded-full transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100 focus:opacity-100"
          aria-label="Próxima imagem"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Dots indicadores de imagem */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex gap-1">
          {img.map((_, i) => (
            <span 
              key={i} 
              className={`w-1 h-1 md:w-1.5 md:h-1.5 rounded-full transition-all ${i === currentIdx ? 'bg-brand-gold w-2 md:w-3' : 'bg-white/40'}`}
            />
          ))}
        </div>
      </motion.div>

      {/* LIGHTBOX TELA CHEIA */}
      {isLightboxOpen && (
        <div 
          onClick={() => setIsLightboxOpen(false)}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 select-none cursor-zoom-out"
        >
          {/* Botão de Fechar */}
          <button 
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 md:top-8 md:right-8 z-[110] bg-white/10 hover:bg-brand-orange text-white p-2 rounded-full transition-all cursor-pointer"
            aria-label="Fechar tela cheia"
          >
            <X className="w-6 h-6 md:w-8 md:h-8" />
          </button>

          {/* Seta Esquerda no Lightbox */}
          <button 
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-[110] bg-white/10 hover:bg-brand-orange text-white p-2 md:p-3 rounded-full transition-all cursor-pointer"
            aria-label="Imagem anterior"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
          </button>

          {/* Conteúdo de Imagem Centralizado */}
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="relative w-full max-w-5xl h-[70vh] md:h-[80vh] flex flex-col justify-center items-center cursor-default"
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
              <Image 
                src={img[currentIdx]} 
                alt={`${title} - ${currentIdx}`} 
                fill 
                className="object-contain"
                priority
              />
            </div>
            
            {/* Texto Descritivo no Rodapé */}
            <div className="mt-4 text-center text-white">
              <span className="bg-brand-orange text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                {badge}
              </span>
              <h4 className="font-heading text-2xl md:text-3xl text-brand-gold mt-2 leading-none">{title}</h4>
              <p className="text-gray-400 text-xs md:text-sm mt-1">Imagem {currentIdx + 1} de {img.length}</p>
            </div>
          </div>

          {/* Seta Direita no Lightbox */}
          <button 
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-[110] bg-white/10 hover:bg-brand-orange text-white p-2 md:p-3 rounded-full transition-all cursor-pointer"
            aria-label="Próxima imagem"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
          </button>
        </div>
      )}
    </>
  );
}

const hospedagemMedia = [
  { type: 'image', src: '/Iamgens ECO/Camping/eco03.jpg' },
  { type: 'image', src: '/Iamgens ECO/Camping/ec3.jpg' },
  { type: 'image', src: '/Iamgens ECO/Camping/ec4.jpg' },
  { type: 'image', src: '/Iamgens ECO/Camping/ec5.jpeg' },
  { type: 'image', src: '/Iamgens ECO/espaço kids/eco12.jpeg' },
  { type: 'image', src: '/Iamgens ECO/espaço kids/eco13.jpeg' },
  { type: 'image', src: '/Iamgens ECO/espaço kids/eco14.jpeg' }
];

export default function MarauiEcoPark() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hospedagemIdx, setHospedagemIdx] = useState(0);

  const [adventureImages, setAdventureImages] = useState({
    trilhas: [
      "/Iamgens ECO/Trilhas Ecologicas/eco01.PNG",
      "/Iamgens ECO/Trilhas Ecologicas/eco02.PNG",
      "/Iamgens ECO/Trilhas Ecologicas/WhatsApp Image 2026-05-20 at 08.51.17.jpeg",
      "/Iamgens ECO/Trilhas Ecologicas/WhatsApp Image 2026-05-20 at 08.51.18 (1).jpeg",
      "/Iamgens ECO/Trilhas Ecologicas/WhatsApp Image 2026-05-20 at 08.51.18 (2).jpeg",
      "/Iamgens ECO/Trilhas Ecologicas/WhatsApp Image 2026-05-20 at 09.00.33.jpeg"
    ],
    camping: [
      "/Iamgens ECO/Camping/WhatsApp Image 2026-05-20 at 08.51.14 (1).jpeg",
      "/Iamgens ECO/Camping/WhatsApp Image 2026-05-20 at 08.51.14 (2).jpeg",
      "/Iamgens ECO/Camping/WhatsApp Image 2026-05-20 at 08.51.14 (3).jpeg",
      "/Iamgens ECO/Camping/WhatsApp Image 2026-05-20 at 08.51.18 (3).jpeg",
      "/Iamgens ECO/Camping/WhatsApp Image 2026-05-20 at 09.00.36 (2).jpeg",
      "/Iamgens ECO/Camping/ec3.jpg",
      "/Iamgens ECO/Camping/ec4.jpg"
    ],
    fogueira: [
      "/Iamgens ECO/Fogueira/WhatsApp Image 2026-05-20 at 08.51.13.jpeg",
      "/Iamgens ECO/Fogueira/WhatsApp Image 2026-05-20 at 08.51.15 (1).jpeg",
      "/Iamgens ECO/Fogueira/WhatsApp Image 2026-05-20 at 08.51.15 (2).jpeg",
      "/Iamgens ECO/Fogueira/WhatsApp Image 2026-05-20 at 08.51.15.jpeg",
      "/Iamgens ECO/Fogueira/WhatsApp Image 2026-05-20 at 08.51.18.jpeg",
      "/Iamgens ECO/Fogueira/ec1.jpg"
    ],
    kids: [
      "/Iamgens ECO/espaço kids/WhatsApp Image 2026-05-20 at 08.51.15 (3).jpeg",
      "/Iamgens ECO/espaço kids/WhatsApp Image 2026-05-20 at 08.51.16 (1).jpeg",
      "/Iamgens ECO/espaço kids/WhatsApp Image 2026-05-20 at 08.51.16 (2).jpeg",
      "/Iamgens ECO/espaço kids/WhatsApp Image 2026-05-20 at 08.51.16.jpeg",
      "/Iamgens ECO/espaço kids/WhatsApp Image 2026-05-20 at 08.51.19.jpeg",
      "/Iamgens ECO/espaço kids/eco12.jpeg",
      "/Iamgens ECO/espaço kids/eco13.jpeg"
    ],
    sobrevivencia: [
      "/Iamgens ECO/sobrevivencia/WhatsApp Image 2026-05-20 at 08.51.13 (1).jpeg",
      "/Iamgens ECO/sobrevivencia/WhatsApp Image 2026-05-20 at 08.51.13 (2).jpeg",
      "/Iamgens ECO/sobrevivencia/WhatsApp Image 2026-05-20 at 08.51.14.jpeg",
      "/Iamgens ECO/sobrevivencia/WhatsApp Image 2026-05-20 at 08.51.21 (1).jpeg",
      "/Iamgens ECO/sobrevivencia/WhatsApp Image 2026-05-20 at 09.00.39.jpeg",
      "/Iamgens ECO/sobrevivencia/eco20.jpg"
    ]
  });

  useEffect(() => {
    fetch('/api/images')
      .then(res => res.json())
      .then(data => {
        if (data && !data.error) {
          setAdventureImages(data);
        }
      })
      .catch(err => console.error("Erro ao buscar imagens dinâmicas:", err));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setHospedagemIdx((prev) => (prev + 1) % hospedagemMedia.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);
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
    const whatsappUrl = `https://wa.me/5586988759200?text=${encodedMessage}`;
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
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          {/* Logo + nome (desktop) */}
          <div className="flex-shrink-0">
            <a href="#home" className="flex items-center gap-2">
              <Image
                src="/logo preferencial_page-0001.png"
                alt="Maraui Eco Park"
                width={280}
                height={96}
                className="h-12 sm:h-16 md:h-24 w-auto object-contain"
              />
              <span className="hidden md:inline font-heading text-xl md:text-2xl tracking-wider text-white">MARAUI <span className="text-brand-gold">ECO PARK</span></span>
            </a>
          </div>

          {/* Centro: nome centralizado no mobile | links no desktop */}
          <div className="flex-1 flex items-center justify-center">
            <span className="md:hidden font-heading text-lg tracking-wider text-white">MARAUI <span className="text-brand-gold">ECO PARK</span></span>
            <div className="hidden md:flex items-center gap-8">
              {['Home', 'Hospedagem', 'Natureza', 'Eventos', 'Provas', 'Estrutura', 'Contato'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-white/90 hover:text-brand-gold text-sm font-medium transition-colors uppercase tracking-widest">
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Direita: hamburger no mobile */}
          <div className="flex-shrink-0">
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
        </motion.div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-20">
          <motion.div initial="hidden" animate="visible" variants={FADE_UP}>
            <h1 className="font-heading text-3xl sm:text-6xl md:text-8xl lg:text-9xl text-white mb-4 md:mb-6 drop-shadow-2xl leading-none">
              NATUREZA, AVENTURA E <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-brand-orange">EXPERIÊNCIAS REAIS</span>
            </h1>
            <p className="text-base md:text-2xl text-white mb-6 md:mb-10 max-w-3xl mx-auto font-bold leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] [text-shadow:_0_2px_6px_rgb(0_0_0_/_90%)]">
              Camping, chalés, eventos, esportes e conexão verdadeira com a natureza a apenas <span className="text-brand-gold font-black">7km de Teresina</span>, no povoado Sagrador.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center mt-6 md:mt-10">
              <a
                href="https://wa.me/5586988759200?text=Ol%C3%A1!%20Gostaria%20de%20fazer%20uma%20reserva%20no%20Maraui%20Eco%20Park."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-orange hover:bg-brand-orange/90 text-white px-8 md:px-10 py-4 md:py-5 rounded-full font-bold text-sm tracking-widest uppercase transition-all hover:shadow-[0_10px_40px_rgba(201,106,43,0.5)] flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                Reservar Agora <ChevronRight className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/5586988759200?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es%20sobre%20as%20hospedagens%20e%20atividades%20do%20Maraui%20Eco%20Park."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-8 md:px-10 py-4 md:py-5 rounded-full font-bold text-sm tracking-widest uppercase transition-all w-full sm:w-auto justify-center flex items-center gap-2"
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
      <div className="relative z-30 max-w-6xl mx-auto px-4 -mt-6 sm:-mt-16 mb-12 md:mb-20">
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
              className="bg-transparent border-b border-gray-300 py-2 focus:outline-none focus:border-brand-orange text-brand-black w-full" 
            />
          </div>
          <div className="flex flex-col w-full md:w-auto">
            <span className="text-xs uppercase tracking-widest text-brand-green-dark font-bold mb-1 flex items-center gap-2"><Calendar className="w-4 h-4" /> Check-out</span>
            <input 
              type="date" 
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="bg-transparent border-b border-gray-300 py-2 focus:outline-none focus:border-brand-orange text-brand-black w-full" 
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
      <section id="sobre" className="py-12 md:py-20 px-4 md:px-6 overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="lg:w-1/2 space-y-5 md:space-y-8"
            >
              <div className="flex items-center gap-4 text-brand-orange font-bold tracking-widest uppercase text-sm">
                <span className="w-12 h-px bg-brand-orange"></span>
                Sobre o Parque
              </div>
              <h2 className="font-heading text-3xl sm:text-5xl md:text-7xl text-brand-green-dark leading-none">
                Refúgio Perfeito <br/><span className="text-brand-orange">Perto da Cidade</span>
              </h2>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                O Maraui Eco Park é um espaço criado para quem deseja viver experiências reais em meio à natureza. Localizado no povoado Sagrador, em Timon - Maranhão, oferecemos hospedagem, aventuras, eventos e experiências inesquecíveis para famílias, grupos, igrejas e atletas.
              </p>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                Aqui você encontra conforto, adrenalina, liberdade e contato verdadeiro com a natureza em um ambiente seguro, familiar e acolhedor.
              </p>
              <a
                href="https://wa.me/5586988759200?text=Ol%C3%A1!%20Gostaria%20de%20conhecer%20mais%20experi%C3%AAncias%20de%20ecoturismo%20no%20Maraui%20Eco%20Park."
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-brand-green-dark text-brand-green-dark hover:bg-brand-green-dark hover:text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-bold tracking-widest uppercase transition-colors flex items-center gap-2 inline-flex w-fit text-sm"
              >
                Conhecer Experiências <ChevronRight className="w-5 h-5" />
              </a>
            </motion.div>
            
            <div className="lg:w-1/2 w-full relative">
              <motion.div 
                style={isMobile ? {} : { y: y2 }}
                className="grid grid-cols-2 gap-4"
              >
                <div className="space-y-4 pt-6 md:pt-12">
                  <div className="relative h-40 md:h-64 rounded-3xl overflow-hidden shadow-2xl">
                    <Image src="/Iamgens ECO/eco04.jpg" alt="Natureza" fill className="object-cover hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="relative h-48 md:h-80 rounded-3xl overflow-hidden shadow-2xl">
                    <Image src="/Iamgens ECO/eco09.jpg" alt="Aventura" fill className="object-cover hover:scale-110 transition-transform duration-700" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="relative h-48 md:h-80 rounded-3xl overflow-hidden shadow-2xl">
                    <Image src="/Iamgens ECO/eco07.jpg" alt="Camping" fill className="object-cover hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="relative h-40 md:h-64 rounded-3xl overflow-hidden shadow-2xl bg-brand-gold flex items-center justify-center text-center p-4 md:p-8">
                     <div>
                       <MapPin className="w-6 h-6 md:w-12 md:h-12 text-white mx-auto mb-2 md:mb-4" />
                       <h3 className="font-heading text-sm sm:text-lg md:text-3xl text-white leading-tight">A APENAS 7KM DE TERESINA</h3>
                       <p className="text-white/80 mt-1 md:mt-2 text-[10px] sm:text-xs md:text-sm font-medium">Fácil acesso</p>
                     </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. EXPERIÊNCIAS & AVENTURAS */}
      <section id="natureza" className="py-14 md:py-24 bg-brand-black text-white relative">
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
        
        <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="font-heading text-3xl sm:text-6xl md:text-7xl mb-3 md:mb-4">Escolha sua <span className="text-brand-orange">Aventura</span></h2>
            <p className="text-brand-sand text-base md:text-lg max-w-2xl mx-auto">Temos opções perfeitas tanto para quem busca relaxamento profundo quanto para quem tem sede de adrenalina.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {[
              { 
                title: "Trilhas Ecológicas", 
                img: adventureImages.trilhas, 
                badge: "Aventura" 
              },
              { 
                title: "Camping", 
                img: adventureImages.camping, 
                badge: "Hospedagem" 
              },
              { 
                title: "Fogueira", 
                img: adventureImages.fogueira, 
                badge: "Noturno" 
              },
              { 
                title: "Espaço Kids", 
                img: adventureImages.kids, 
                badge: "Lazer" 
              },
              { 
                title: "Sobrevivência", 
                img: adventureImages.sobrevivencia, 
                badge: "Radical" 
              }
            ].map((item, idx) => (
              <AdventureCard 
                key={idx}
                title={item.title}
                img={item.img}
                badge={item.badge}
                idx={idx}
                isMobile={isMobile}
              />
            ))}
          </div>

          <div className="mt-8 md:mt-16 text-center">
            <a
              href="https://wa.me/5586988759200?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20aventura%20no%20Maraui%20Eco%20Park."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-green hover:bg-brand-green/90 text-white px-8 md:px-10 py-4 md:py-5 rounded-full font-bold text-sm tracking-widest uppercase transition-all shadow-[0_0_30px_rgba(47,107,69,0.4)] inline-flex items-center gap-3"
            >
              <Phone className="w-5 h-5" /> Quero falar no WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* SEÇÃO PROVAS OFICIAIS */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-brand-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-8 md:mb-12">
            <div className="flex items-center justify-center gap-3 md:gap-4 text-brand-orange font-bold tracking-widest uppercase text-xs md:text-sm mb-3">
              <span className="w-8 md:w-12 h-px bg-brand-orange"></span>
              Integração e Comunidade
              <span className="w-8 md:w-12 h-px bg-brand-orange"></span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl md:text-7xl text-brand-black leading-none">
              Provas Oficiais <span className="text-brand-gold">Marauí Eco Park</span>
            </h2>
            <p className="text-gray-600 mt-3 text-base md:text-lg max-w-2xl mx-auto">
              Eventos oficiais organizados pelo Marauí Eco Park
            </p>
          </div>

          {/* Grid de Eventos / Provas em Ordem */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-6xl mx-auto">
            {[
              {
                imgSrc: "/Iamgens ECO/eventos/WhatsApp Image 2026-05-20 at 15.20.42.jpeg",
                alt: "maraui race - Prova Oficial Vertical 4",
                aspect: "aspect-[3/4]"
              },
              {
                imgSrc: "/Iamgens ECO/eventos/WhatsApp Image 2026-05-20 at 15.15.23.jpeg",
                alt: "pequenos kids - Prova Oficial Vertical 1",
                aspect: "aspect-[3/4]"
              },
              {
                imgSrc: "/Iamgens ECO/eventos/WhatsApp Image 2026-05-20 at 17.12.19.jpeg",
                alt: "maraui nigt Prova - Oficial Horizontal 1",
                aspect: "aspect-[3/2]"
              },
              {
                imgSrc: "/Iamgens ECO/eventos/WhatsApp Image 2026-05-20 at 15.16.33.jpeg",
                alt: "ultra - Prova Oficial Vertical 2",
                aspect: "aspect-[3/4]"
              },
              {
                imgSrc: "/Iamgens ECO/eventos/WhatsApp Image 2026-05-20 at 15.17.29.jpeg",
                alt: "maraui timon bike - Prova Oficial Vertical 3",
                aspect: "aspect-[3/4]"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`group relative rounded-3xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 bg-gray-50 w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] ${item.aspect}`}
              >
                <Image 
                  src={item.imgSrc} 
                  alt={item.alt} 
                  fill 
                  className="object-contain transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. HOSPEDAGEM PREMIUM */}
      <section id="hospedagem" className="py-14 md:py-24 px-4 md:px-6 bg-brand-sand overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:w-1/2 relative h-[300px] md:h-[600px] w-full rounded-3xl overflow-hidden shadow-2xl"
            >
              {hospedagemMedia.map((media, i) => (
                <motion.div
                  key={media.src}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: i === hospedagemIdx ? 1 : 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0"
                >
                  {media.type === 'video' ? (
                    <video 
                      src={media.src} 
                      autoPlay 
                      loop 
                      muted 
                      playsInline 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Image 
                      src={media.src} 
                      alt={`Hospedagem - ${i}`} 
                      fill 
                      className="object-cover" 
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  )}
                </motion.div>
              ))}
              <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 bg-white/20 backdrop-blur-md p-4 md:p-6 rounded-2xl border border-white/30 text-white z-20">
                <Star className="w-6 h-6 md:w-8 md:h-8 text-brand-gold mb-1 md:mb-2 fill-brand-gold" />
                <p className="font-heading text-xl md:text-3xl">Conforto Rústico</p>
                <p className="font-light text-xs md:text-sm">Integração perfeita com a natureza</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2 space-y-5 md:space-y-8"
            >
              <h2 className="font-heading text-3xl sm:text-5xl md:text-7xl text-brand-black leading-none">
                Conforto em <br/><span className="text-brand-orange">Meio à Natureza</span>
              </h2>
              <p className="text-gray-700 text-base md:text-lg">
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

              <div className="pt-4 md:pt-6">
                <a
                  href="https://wa.me/5586988759200?text=Ol%C3%A1!%20Gostaria%20de%20garantir%20minha%20reserva%20de%20hospedagem%20no%20Maraui%20Eco%20Park."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-black hover:bg-brand-black/90 text-white px-8 md:px-10 py-4 md:py-5 rounded-full font-bold text-sm tracking-widest uppercase transition-all shadow-xl inline-block"
                >
                  Garantir Reserva
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. EVENTOS & LOCAÇÕES */}
      <section id="eventos" className="py-14 md:py-24 px-4 md:px-6 bg-brand-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="font-heading text-3xl sm:text-5xl md:text-7xl text-brand-black mb-3 md:mb-4">Cenário Perfeito para <span className="text-brand-gold">Seu Evento</span></h2>
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">De celebrações íntimas a grandes encontros, o Maraui Eco Park oferece a infraestrutura e a beleza natural para momentos marcantes.</p>
          </div>

          {/* Linha 1 — 3 cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {[
              {
                title: "Casamentos ao Ar Livre",
                img: "/Iamgens ECO/casamento.jpeg",
                waLink: "https://wa.me/5586988759200?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es%20e%20or%C3%A7amentos%20sobre%20a%20realiza%C3%A7%C3%A3o%20de%20Casamentos%20ao%20Ar%20Livre%20no%20Maraui%20Eco%20Park."
              },
              {
                title: "Igrejas e Retiros",
                img: "/Iamgens ECO/igreja.jpeg",
                waLink: "https://wa.me/5586988759200?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es%20e%20or%C3%A7amentos%20para%20eventos%20de%20Igrejas%20e%20Retiros%20no%20Maraui%20Eco%20Park."
              },
              {
                title: "Centro de Instrução",
                img: "/Iamgens ECO/centro de instrução.jpeg",
                waLink: "https://wa.me/5586988759200?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es%20sobre%20o%20Centro%20de%20Instru%C3%A7%C3%A3o%20no%20Maraui%20Eco%20Park%20para%20cursos%2Ftreinamentos."
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative h-60 md:h-[300px] rounded-3xl overflow-hidden shadow-xl"
              >
                <Image src={item.img} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/95 via-brand-black/30 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8 flex flex-col items-start z-20">
                  <h3 className="font-heading text-2xl md:text-3xl text-white mb-2 leading-none">{item.title}</h3>
                  <div className="h-1 w-12 bg-brand-gold transition-all duration-300 group-hover:w-full mb-4"></div>
                  <a
                    href={item.waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 bg-brand-orange hover:bg-brand-orange/90 text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full flex items-center gap-2 shadow-lg"
                  >
                    <span>Orçamento / Info</span>
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.437.002 9.761-4.318 9.764-9.756.002-2.63-1.02-5.101-2.877-6.96C16.3 2.03 13.827 1.008 11.97 1.008c-5.436 0-9.76 4.317-9.763 9.757-.001 2.038.547 4.027 1.588 5.825l-.949 3.466 3.791-.994z" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Linha 2 — card destaque com imagem inteira */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative w-full rounded-3xl overflow-hidden shadow-xl max-h-[420px] md:max-h-[500px]"
          >
            <Image
              src="/Iamgens ECO/corrida do choque.jpeg"
              alt="Faça sua Prova no Nosso Espaço"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto block transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-brand-black/20 to-transparent flex flex-col items-center justify-end pb-8 md:pb-12 text-center px-6">
              <h3 className="font-heading text-2xl md:text-4xl text-white mb-2 leading-none">Faça sua Prova no Nosso Espaço</h3>
              <div className="h-1 w-12 bg-brand-gold transition-all duration-300 group-hover:w-48 mb-4 mx-auto"></div>
              <a
                href="https://wa.me/5586988759200?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es%20para%20realizar%20uma%20prova%20ou%20evento%20esportivo%20no%20Maraui%20Eco%20Park."
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 bg-brand-orange hover:bg-brand-orange/90 text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full inline-flex items-center gap-2 shadow-lg"
              >
                <span>Orçamento / Info</span>
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.437.002 9.761-4.318 9.764-9.756.002-2.63-1.02-5.101-2.877-6.96C16.3 2.03 13.827 1.008 11.97 1.008c-5.436 0-9.76 4.317-9.763 9.757-.001 2.038.547 4.027 1.588 5.825l-.949 3.466 3.791-.994z" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 7. PROVAS OFICIAIS MARAUI */}
      <section id="provas" className="py-14 md:py-24 px-4 md:px-6 bg-brand-green-dark text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none">
          <svg width="800" height="800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        </div>
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-16 gap-4 md:gap-6">
            <div>
              <div className="flex items-center gap-4 text-brand-gold font-bold tracking-widest uppercase text-sm mb-3 md:mb-4">
                <span className="w-12 h-px bg-brand-gold"></span>
                Adrenalina Pura
              </div>
              <h2 className="font-heading text-3xl sm:text-6xl md:text-8xl leading-none">PROVAS <br/><span className="text-brand-orange">OFICIAIS</span></h2>
            </div>
            <p className="text-brand-sand max-w-md text-lg">
              Sediamos as competições mais desafiadoras da região. Teste seus limites em nossos percursos exclusivos na natureza.
            </p>
          </div>

          <div className="space-y-6">
            {[
              { 
                title: "Maraui Race", 
                desc: "Corrida de obstáculos extrema na lama e selva. Prova de obstáculos OCR de Nível Nacional.", 
                type: "Obstáculos",
                badgeExtra: "Nível Nacional" 
              },
              { 
                title: "Pequenos Guerreiros Kids", 
                desc: "Aventura e superação para os pequenos aventureiros.", 
                type: "Kids" 
              },
              { 
                title: "Maraui Ultra Backyard", 
                desc: "O Último de Pé. Resistência mental e física extrema. Backyard Ultra é uma modalidade de nível internacional.", 
                type: "Ultra Maratona",
                badgeExtra: "Nível Internacional" 
              },
              { 
                title: "Maraui Timon Bike", 
                desc: "Trilhas técnicas e velozes para mountain bike.", 
                type: "MTB" 
              }
            ].map((prova, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white/5 border border-white/10 hover:bg-white/10 p-4 md:p-8 rounded-2xl flex justify-between items-center gap-4 transition-colors group cursor-pointer"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="text-brand-gold text-xs md:text-sm font-bold uppercase tracking-widest block">{prova.type}</span>
                    {prova.badgeExtra && (
                      <span className="bg-brand-orange/20 text-brand-orange border border-brand-orange/30 text-[10px] md:text-xs font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
                        {prova.badgeExtra}
                      </span>
                    )}
                  </div>
                  <h3 className="font-heading text-xl sm:text-2xl md:text-4xl text-white group-hover:text-brand-orange transition-colors leading-none">{prova.title}</h3>
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
      <section className="py-14 md:py-24 px-4 md:px-6 bg-brand-black text-white relative overflow-hidden">
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>

        <div className="container mx-auto max-w-7xl relative z-20">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
            {/* Imagem Lateral */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2 w-full relative aspect-[3/2] rounded-3xl overflow-hidden shadow-2xl"
            >
              <Image 
                src="/Iamgens ECO/eventos/WhatsApp Image 2026-05-20 at 17.11.22.jpeg" 
                alt="Nosso Compromisso com a Natureza" 
                fill 
                className="object-cover hover:scale-105 transition-transform duration-700" 
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/40 via-transparent to-transparent"></div>
            </motion.div>

            {/* Conteúdo */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2 w-full space-y-8"
            >
              <div>
                <div className="flex items-center gap-4 text-brand-gold font-bold tracking-widest uppercase text-sm mb-3 md:mb-4">
                  <span className="w-12 h-px bg-brand-gold"></span>
                  Sustentabilidade
                </div>
                <h2 className="font-heading text-3xl sm:text-5xl md:text-7xl text-white leading-none">
                  Nosso Compromisso com a <span className="text-brand-gold">Natureza</span>
                </h2>
                <p className="text-gray-400 mt-4 md:mt-6 text-base md:text-lg leading-relaxed">
                  Buscamos equilibrar o ecoturismo com a preservação. Nossa missão é manter o ecossistema local vivo, oferecendo um espaço onde a natureza e o ser humano convivam em perfeita harmonia.
                </p>
              </div>

              {/* Cards de Compromisso */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {[
                  'Preservação Ambiental', 
                  'Proteção da Fauna', 
                  'Reflorestamento', 
                  'Educação Ecológica'
                ].map((item, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-2xl hover:bg-white/10 transition-colors flex flex-col justify-start items-start">
                    <TreePine className="w-8 h-8 text-brand-gold mb-3" />
                    <h3 className="font-heading text-base sm:text-lg md:text-xl text-white leading-snug">{item}</h3>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 9. DEPOIMENTOS */}
      <section className="py-14 md:py-24 px-4 md:px-6 bg-brand-sand relative overflow-hidden">
        <div className="container mx-auto max-w-7xl relative z-10">
          <h2 className="font-heading text-3xl sm:text-5xl md:text-7xl text-brand-black text-center mb-8 md:mb-16">O que dizem nossos <span className="text-brand-orange">Aventureiros</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white/60 backdrop-blur-lg p-5 md:p-8 rounded-3xl shadow-xl border border-white"
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
      <section className="relative py-20 md:py-32 px-4 md:px-6 overflow-hidden">
        <Image src="/Iamgens ECO/comunidadde.jpeg" alt="Comunidade Maraui Eco Park" fill className="object-cover" />
        <div className="absolute inset-0 bg-brand-black/40"></div>
        <div className="container mx-auto relative z-10 text-center max-w-4xl">
          <h2 className="font-heading text-3xl sm:text-6xl md:text-8xl text-white mb-4 md:mb-6">Viva momentos inesquecíveis em meio à <span className="text-brand-orange">natureza</span>.</h2>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mt-6 md:mt-10">
            <a
              href="https://wa.me/5586988759200?text=Ol%C3%A1!%20Quero%20fazer%20uma%20reserva%20no%20Maraui%20Eco%20Park."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-orange hover:bg-brand-orange/90 text-white px-8 md:px-10 py-4 md:py-5 rounded-full font-bold text-sm tracking-widest uppercase transition-all shadow-2xl hover:scale-105 flex items-center justify-center"
            >
              Reservar Agora
            </a>
            <a
              href="https://wa.me/5586988759200?text=Ol%C3%A1!%20Gostaria%20de%20falar%20conosco%20sobre%20o%20Maraui%20Eco%20Park."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-8 md:px-10 py-4 md:py-5 rounded-full font-bold text-sm tracking-widest uppercase transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" /> Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* 11. RODAPÉ PREMIUM */}
      <footer className="bg-brand-black pt-10 md:pt-12 pb-6 px-4 md:px-6 text-brand-sand border-t border-white/10">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-10">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <Image 
                  src="/logo preferencial_page-0001.png" 
                  alt="Maraui Eco Park" 
                  width={270} 
                  height={90} 
                  className="h-16 w-auto object-contain" 
                />
              </div>
              <p className="text-xs text-white/50 leading-relaxed mb-4">Hospedagem, ecoturismo e eventos em Timon - MA. Sua conexão premium com a natureza.</p>
              <div className="flex gap-4 items-center">
                <a 
                  href="https://www.instagram.com/reel/DOXFG0pjpmj/?igsh=MW90aWlmYnZzY2tuaA==" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#f9ce3f] via-[#e1306c] to-[#833ab4] flex items-center justify-center hover:scale-110 transition-all shadow-[0_0_15px_rgba(225,48,108,0.4)]"
                >
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-heading text-xs font-bold text-brand-gold uppercase tracking-wider mb-4">Links Rápidos</h4>
              <ul className="space-y-2">
                {['Home', 'Hospedagem', 'Natureza', 'Provas Oficiais', 'Contato'].map(link => (
                  <li key={link}>
                    <a href="#" className="text-xs text-white/50 hover:text-brand-gold transition-colors flex items-center gap-1.5">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-heading text-xs font-bold text-brand-gold uppercase tracking-wider mb-4">Contato</h4>
              <ul className="space-y-2 text-xs text-white/50">
                <li className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                  <span>+55 (86) 98875-9200</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                  <a href="mailto:contato@marauiecopark.com.br" className="hover:text-brand-gold transition-colors">contato@marauiecopark.com.br</a>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-brand-gold flex-shrink-0 mt-0.5" />
                  <span>Povoado Sagrador, Timon - MA <br /><span className="text-[10px] text-white/35">(Apenas 7km de Teresina)</span></span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading text-xs font-bold text-brand-gold uppercase tracking-wider mb-4">Localização</h4>
              <div className="w-full h-32 bg-white/5 border border-white/10 rounded-2xl overflow-hidden relative group hover:border-brand-gold/30 transition-all">
                <iframe
                  src="https://maps.google.com/maps?q=-5.1337614,-42.8915558&z=15&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  title="Maraui Eco Park Localização"
                ></iframe>
                <a 
                  href="https://www.google.com/maps/place/5%C2%B008'01.5%22S+42%C2%B053'29.6%22W/@-5.1337614,-42.8941307,17z/data=!3m1!4b1!4m4!3m3!8m2!3d-5.1337614!4d-42.8915558?hl=pt-BR&entry=ttu&g_ep=EgoyMDI2MDUxMy4wIKXMDSoASAFQAw%3D%3D" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="absolute bottom-2 right-2 bg-brand-black/80 hover:bg-brand-orange text-white text-[9px] font-bold px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 shadow-md"
                >
                  <MapPin className="w-3 h-3 text-brand-gold" />
                  <span>Ver no Google Maps</span>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center text-[10px] text-white/35">
            <p>&copy; {new Date().getFullYear()} Maraui Eco Park. Todos os direitos reservados.</p>
            <div className="mt-2 md:mt-0 flex flex-wrap gap-x-2 justify-center">
              <span>Design Premium por Jody</span>
              <span>|</span>
              <a 
                href="https://camaly.com.br/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-brand-gold transition-colors"
              >
                Produzida com 💚 por CAMALY
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* FLOATING BUTTONS */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        <a
          href="https://www.google.com/maps/place/5%C2%B008'01.5%22S+42%C2%B053'29.6%22W/@-5.1337614,-42.8941307,17z/data=!3m1!4b1!4m4!3m3!8m2!3d-5.1337614!4d-42.8915558?hl=pt-BR&entry=ttu&g_ep=EgoyMDI2MDUxMy4wIKXMDSoASAFQAw%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-white rounded-full shadow-[0_0_20px_rgba(66,133,244,0.5)] flex items-center justify-center hover:scale-110 transition-transform"
          aria-label="Ver no Google Maps"
        >
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#EA4335"/>
            <circle cx="12" cy="9" r="2.5" fill="white"/>
          </svg>
        </a>
        <a
          href="https://wa.me/5586988759200?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es%20sobre%20o%20Maraui%20Eco%20Park."
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-green-500 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.5)] flex items-center justify-center text-white hover:scale-110 transition-transform"
          aria-label="Falar no WhatsApp"
        >
          <Phone className="w-7 h-7" />
        </a>
      </div>
    </main>
  );
}
