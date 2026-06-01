import { motion } from "motion/react";
import { Heart, Menu, X, Phone, Mail, MapPin } from "lucide-react";
import { useState, FormEvent, ChangeEvent, useRef, useEffect } from "react";
import { PRODUCTS, Product } from "./data";
import emailjs from '@emailjs/browser';
import { ShengXinKangLogo } from "./components/ShengXinKangLogo";

export default function App() {
  const [activeTab, setActiveTab] = useState<"home" | "products" | "about">("home");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const navigateToProduct = (product: Product) => {
    setSelectedProduct(product);
    setActiveTab("products");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openContact = () => {
    setIsContactModalOpen(true);
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-800">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setActiveTab("home"); setSelectedProduct(null); }}>
              <ShengXinKangLogo className="w-12 h-12 flex-shrink-0" />
              <span className="text-2xl font-bold tracking-tight text-sky-900">勝心康 <span className="font-light text-slate-400 text-lg ml-1">SHENG SHIN KANG</span></span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <button 
                onClick={() => { setActiveTab("home"); setSelectedProduct(null); }}
                className={`text-sm font-medium transition-colors ${activeTab === 'home' ? 'text-sky-600' : 'text-slate-500 hover:text-sky-600'}`}
              >
                首頁
              </button>
              <div className="group relative">
                <button 
                  className={`text-sm font-medium transition-colors flex items-center gap-1 ${activeTab === 'products' ? 'text-sky-600' : 'text-slate-500 hover:text-sky-600'}`}
                >
                  核心產品
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-slate-100 shadow-xl rounded-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  {PRODUCTS.map(p => (
                    <button 
                      key={p.id}
                      onClick={() => navigateToProduct(p)}
                      className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-sky-600"
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>
              <button 
                onClick={() => setActiveTab("about")}
                className={`text-sm font-medium transition-colors ${activeTab === 'about' ? 'text-sky-600' : 'text-slate-500 hover:text-sky-600'}`}
              >
                關於我們
              </button>
              <button 
                onClick={openContact}
                className="bg-sky-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-sky-700 transition-all shadow-lg shadow-sky-600/20"
              >
                立即諮詢
              </button>
            </div>

            {/* Mobile Toggle */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white border-b border-gray-100 px-4 py-6"
          >
            <div className="flex flex-col gap-4">
              <button onClick={() => { setActiveTab("home"); setSelectedProduct(null); setIsMenuOpen(false); }} className="text-left py-2 font-medium text-slate-900">首頁</button>
              <div className="py-2">
                <p className="text-slate-400 text-xs uppercase tracking-widest mb-2 font-bold">產品列表</p>
                {PRODUCTS.map(p => (
                  <button key={p.id} onClick={() => { navigateToProduct(p); setIsMenuOpen(false); }} className="w-full text-left py-2 text-slate-600 hover:text-sky-600">{p.name}</button>
                ))}
              </div>
              <button onClick={() => { setActiveTab("about"); setIsMenuOpen(false); }} className="text-left py-2 font-medium text-slate-900">關於我們</button>
              <button 
                onClick={openContact}
                className="bg-sky-600 text-white py-3 rounded-xl font-bold mt-2 shadow-lg shadow-sky-600/20"
              >
                立即諮詢
              </button>
            </div>
          </motion.div>
        )}
      </nav>

      <main className="pt-20">
        {activeTab === "home" && <HomePage onSelectProduct={navigateToProduct} onOpenContact={openContact} />}
        {activeTab === "products" && selectedProduct && <ProductDetailPage product={selectedProduct} onOpenContact={openContact} />}
        {activeTab === "products" && !selectedProduct && <AllProductsPage onSelectProduct={navigateToProduct} />}
        {activeTab === "about" && <AboutPage />}
      </main>

      {/* Contact Modal */}
      {isContactModalOpen && <ContactModal onClose={() => setIsContactModalOpen(false)} />}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-slate-100 pb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <ShengXinKangLogo className="w-10 h-10 flex-shrink-0" />
                <span className="text-2xl font-bold tracking-tight text-sky-900">勝心康</span>
              </div>
              <p className="text-slate-500 max-w-sm leading-relaxed">
                專注於尖端醫療科技與精準的基因檢測產品。您的健康，是我們最珍視的承諾。
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900 mb-6 font-sans">快速連結</h4>
              <ul className="space-y-4 text-slate-500 text-sm font-medium">
                <li><button onClick={() => setActiveTab("home")} className="hover:text-sky-600 transition-colors">產品首頁</button></li>
                <li><button onClick={() => setActiveTab("about")} className="hover:text-sky-600 transition-colors">關於勝心康</button></li>
                <li><button className="hover:text-sky-600 transition-colors">常見問題</button></li>
                <li><button className="hover:text-sky-600 transition-colors">服務建議</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900 mb-6 font-sans">聯絡資訊</h4>
              <ul className="space-y-4 text-slate-500 text-sm font-medium">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-sky-600" />
                  <span>台中市北屯區興安路２段449號12樓</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 shrink-0 text-sky-600" />
                  <span>04-22428103</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 shrink-0 text-sky-600" />
                  <span>marble8682@gmail.com</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-xs font-bold">
            <span>© 2026 勝心康 (Sheng Shin Kang) Healthcare.</span>
            <div className="flex gap-6">
                <span>隱私權政策</span>
                <span>使用條款</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function HomePage({ onSelectProduct, onOpenContact }: { onSelectProduct: (p: Product) => void, onOpenContact: () => void }) {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden bg-slate-50">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/science/1920/1080" 
            alt="Healthcare Hero" 
            className="w-full h-full object-cover opacity-10"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/90 to-transparent" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="inline-block px-4 py-1.5 bg-sky-100 text-sky-600 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              Precision Health · Quality Life
            </span>
            <h1 className="text-6xl md:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-8">
              用科學守護 <br />
              <span className="text-sky-600">您的健康</span>
            </h1>
            <p className="text-xl text-slate-500 mb-10 leading-relaxed max-w-lg">
              勝心康專注於預防醫學與精準檢測，為您量身打造專屬的健康防護體系。
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-sky-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-sky-700 transition-all shadow-xl shadow-sky-600/30"
              >
                探索產品
              </button>
              <button 
                onClick={onOpenContact}
                className="border border-slate-200 text-slate-600 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 transition-all bg-white"
              >
                預約諮詢
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4">核心醫療保健產品</h2>
            <div className="w-20 h-1.5 bg-sky-600 mx-auto rounded-full mb-6 shadow-sm" />

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {PRODUCTS.map((p, idx) => (
              <motion.div 
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                viewport={{ once: true }}
                onClick={() => onSelectProduct(p)}
                className={`group cursor-pointer bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm transition-all duration-500 ${
                  p.id === 'yufutong' ? 'hover:border-sky-200 bg-gradient-to-b from-white to-sky-50/30' :
                  p.id === 'yuanhuayi' ? 'hover:border-emerald-200 bg-gradient-to-b from-white to-emerald-50/30' :
                  p.id === 'laser' ? 'hover:border-rose-200 bg-gradient-to-b from-white to-rose-50/30' :
                  p.id === 'genetesting' ? 'hover:border-indigo-200 bg-gradient-to-b from-white to-indigo-50/30' :
                  'hover:border-slate-200'
                }`}
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img 
                    src={p.image} 
                    alt={p.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-900">
                    {p.category}
                  </div>
                </div>
                <div className="p-10">
                  <h3 className={`text-2xl font-bold mb-3 transition-colors text-slate-900 ${
                    p.id === 'yufutong' ? 'group-hover:text-sky-600' :
                    p.id === 'yuanhuayi' ? 'group-hover:text-emerald-600' :
                    p.id === 'laser' ? 'group-hover:text-rose-600' :
                    'group-hover:text-indigo-600'
                  }`}>
                    {p.name}
                  </h3>
                  <p className="text-sm mb-8 line-clamp-3 leading-relaxed text-slate-500">
                    {p.description}
                  </p>
                  <div className={`flex items-center gap-2 font-bold text-sm ${
                    p.id === 'yufutong' ? 'text-sky-600' :
                    p.id === 'yuanhuayi' ? 'text-emerald-600' :
                    p.id === 'laser' ? 'text-rose-600' :
                    'text-indigo-600'
                  }`}>
                    了解內容詳情 
                    <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>→</motion.span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


    </div>
  );
}

function ProductDetailPage({ product, onOpenContact }: { product: Product, onOpenContact: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pb-32"
    >
      <div className="relative h-[50vh] overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <span className="text-white/70 text-sm font-bold tracking-[0.3em] uppercase mb-4 block">詳盡解說 · 專業守護</span>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">{product.name}</h1>
            {product.tagline && <p className="text-white/90 text-xl font-light">{product.tagline}</p>}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="space-y-16">
          <div className="text-center">
            <h2 className="text-slate-400 text-xs font-bold uppercase tracking-[0.3em] mb-8">產品概覽</h2>
            <p className="text-3xl md:text-4xl text-slate-900 font-extrabold leading-tight">
              {product.description}
            </p>
          </div>

          <div className="bg-slate-900 text-white p-12 md:p-16 rounded-[3rem] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full -mr-32 -mt-32 blur-3xl" />
            <div className="relative z-10 max-w-2xl mx-auto text-center">
              <h4 className="text-3xl font-bold mb-6">對此服務感興趣？</h4>
              <p className="text-slate-400 mb-10 text-lg leading-relaxed">
                每位客戶的健康狀況不盡相同，我們的專業團隊隨時待命，為您提供最適合的建議。
              </p>
              <button 
                onClick={onOpenContact}
                className="w-full md:w-auto px-12 bg-sky-500 text-white font-bold py-5 rounded-xl hover:bg-sky-600 transition-all shadow-xl shadow-sky-500/20"
              >
                立即預約諮詢
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function AllProductsPage({ onSelectProduct }: { onSelectProduct: (p: Product) => void }) {
  return (
    <div className="py-20 max-w-7xl mx-auto px-4">
       <div className="text-center mb-16">
         <h1 className="text-4xl font-extrabold mb-4 text-slate-900">所有產品方案</h1>
         <div className="w-16 h-1 bg-sky-600 mx-auto rounded-full" />
       </div>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
         {PRODUCTS.map(p => (
           <div 
             key={p.id}
             onClick={() => onSelectProduct(p)}
             className="cursor-pointer group relative bg-white border border-slate-100 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:border-sky-100 transition-all"
           >
             <div className="mb-6 h-48 rounded-2xl overflow-hidden shadow-inner">
               <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" referrerPolicy="no-referrer" />
             </div>
             <h3 className="text-2xl font-bold text-slate-900 mb-2">{p.name}</h3>
             {p.tagline && <p className="text-sky-600 text-sm font-bold mb-4">{p.tagline}</p>}
             <p className="text-slate-500 text-sm mb-6 line-clamp-3 leading-relaxed">{productDescriptionsShort[p.id] || p.description}</p>
             <button className="text-sky-600 font-bold flex items-center gap-2 group-hover:translate-x-1 transition-transform">
               查看詳細說明 <span>→</span>
             </button>
           </div>
         ))}
       </div>
    </div>
  );
}

const productDescriptionsShort: Record<string, string> = {
  yufutong: "專業級血液循環優化，維護心血管彈性與通暢。",
  yuanhuayi: "全方位代謝健康守護，平衡生理機能。",
  genetesting: "勝心康經銷美國Myriad乳癌基因檢測EndoPredict，獲國際權威學會推薦認可。",
  laser: "引進低能量紅色光能照射，促進血氧、活化細胞，重塑自癒力。"
};

function AboutPage() {
  return (
    <div className="py-24">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-slate-900 mb-6">關於 勝心康</h1>
          <p className="text-sky-600 font-bold tracking-widest uppercase text-sm">Science · Heart · Health</p>
        </div>
        <div className="prose prose-slate prose-lg max-w-none text-slate-600 space-y-12">
          <p className="leading-relaxed">
            勝心康成立於2020年，致力於精準醫學與保健產品的經銷。我們的核心價值在於「以科學為翼，成就極致健康」。
          </p>
          <div className="h-[450px] rounded-[2.5rem] overflow-hidden my-16 shadow-2xl relative">
            <img src="https://picsum.photos/seed/lab/1200/800" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactModal({ onClose }: { onClose: () => void }) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    from_name: '',
    reply_to: '',
    message: ''
  });

  useEffect(() => {
    emailjs.init("ZEzF86C4s2sL6GN4v");
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    
    setStatus('submitting');
    
    try {
      await emailjs.sendForm(
        "service_vo93afm",
        "template_ktxyfib",
        formRef.current
      );
      
      setFormData({ from_name: '', reply_to: '', message: '' });
      setStatus('success');
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
      alert('發送失敗，請稍後再試。');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {status === 'success' ? (
          <div className="p-16 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-green-600"
              >
                 <Heart className="w-10 h-10 fill-current" />
              </motion.div>
            </div>
            <h3 className="text-3xl font-extrabold text-slate-900 mb-4">發送成功！</h3>
            <p className="text-slate-500 leading-relaxed font-medium">
              您的留言已成功送出。<br />
              專業顧問將會盡快與您聯繫。
            </p>
            <button 
              onClick={onClose}
              className="mt-10 bg-slate-900 text-white px-12 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
            >
              返回
            </button>
          </div>
        ) : (
          <div className="p-10 md:p-12">
            <h3 className="text-3xl font-extrabold text-slate-900 mb-2">預約專業諮詢</h3>
            <p className="text-slate-500 mb-8 font-medium">請留下您的聯絡資訊與需求，我們將由專人為您服務。</p>
            
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              {status === 'error' && (
                <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-bold animate-pulse">
                  送出失敗，請檢查網路連線或稍後再試。
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">您的姓名</label>
                  <input 
                    name="from_name"
                    required 
                    type="text" 
                    value={formData.from_name}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-4 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" 
                    placeholder="請輸入姓名" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">電子信箱</label>
                  <input 
                    name="reply_to"
                    required 
                    type="email" 
                    value={formData.reply_to}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-4 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" 
                    placeholder="example@email.com" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">留言內容</label>
                <textarea 
                  name="message"
                  required 
                  rows={4} 
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-4 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all resize-none text-slate-700" 
                  placeholder="請輸入留言內容..." 
                />
              </div>

              <button 
                disabled={status === 'submitting'}
                className="w-full bg-slate-900 text-white font-bold py-5 rounded-2xl shadow-xl shadow-slate-200 hover:bg-slate-800 active:scale-[0.98] transition-all disabled:opacity-50 mt-4 flex items-center justify-center gap-3"
              >
                {status === 'submitting' ? (
                  <>
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                    傳送中...
                  </>
                ) : '確認送出'}
              </button>
            </form>
          </div>
        )}
      </motion.div>
    </div>
  );
}
