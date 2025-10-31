import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const services = [
    {
      icon: 'Truck',
      title: 'FTL/LTL Перевозки',
      description: 'Полная и частичная загрузка по всей России и странам СНГ с гарантией сохранности',
      features: ['Экспресс-доставка', 'Контроль 24/7', 'Страхование груза']
    },
    {
      icon: 'Warehouse',
      title: 'Надежное Хранение',
      description: 'Современные складские комплексы класса А с системой климат-контроля',
      features: ['WMS система', 'Безопасность', 'Гибкие тарифы']
    },
    {
      icon: 'Plane',
      title: 'Авиационная Доставка',
      description: 'Срочная доставка грузов авиатранспортом по всему миру за 24-48 часов',
      features: ['Любая точка мира', 'Таможенное оформление', 'Трекинг в реальном времени']
    },
    {
      icon: 'Ship',
      title: 'Судоходная Доставка',
      description: 'Морские контейнерные перевозки FCL и LCL с оптимальными маршрутами',
      features: ['Все типы контейнеров', 'Прямые линии', 'Консолидация грузов']
    },
    {
      icon: 'Shield',
      title: 'Страхование Груза',
      description: 'Полная защита вашего груза через проверенную сеть страховых партнеров',
      features: ['До 100% стоимости', 'Быстрая компенсация', 'Все виды рисков']
    },
    {
      icon: 'Package',
      title: 'Фулфилмент',
      description: 'Комплексное управление складской логистикой для интернет-магазинов',
      features: ['Приемка товара', 'Упаковка и отгрузка', 'Интеграция с CRM']
    },
    {
      icon: 'Thermometer',
      title: 'Температурный Контроль',
      description: 'Доставка грузов с соблюдением температурного режима от -25°C до +25°C',
      features: ['Рефрижераторы', 'Мониторинг температуры', 'Фармацевтика']
    },
    {
      icon: 'Crown',
      title: 'Ценные Грузы',
      description: 'Специализированная доставка с повышенной безопасностью и вооруженным сопровождением',
      features: ['Бронетранспорт', 'Охрана 24/7', 'Спутниковый мониторинг']
    },
    {
      icon: 'Settings',
      title: 'Аутсорсинг Логистики',
      description: 'Полная оптимизация логистических процессов и управление цепочками поставок',
      features: ['Снижение затрат до 30%', 'Выделенная команда', 'Прозрачная отчетность']
    }
  ];

  const stats = [
    { value: '1000+', label: 'Доставок ежемесячно', icon: 'Package' },
    { value: '150+', label: 'Партнеров по России', icon: 'Handshake' },
    { value: '98%', label: 'Доставлено в срок', icon: 'CheckCircle' },
    { value: '24/7', label: 'Служба поддержки', icon: 'Headphones' }
  ];

  return (
    <div className="min-h-screen bg-[#050A14]">
      <nav className="fixed top-0 w-full z-50 bg-[#050A14]/98 backdrop-blur-md border-b border-[#C9A961]/20">
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src="https://cdn.poehali.dev/files/5632c509-b4ab-4718-b0b4-0952338ca95a.png" 
                alt="H&C Logo" 
                className="w-12 h-12"
              />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-[#C9A961] via-[#D4B574] to-[#C9A961] bg-clip-text text-transparent">
                  H&C Logistics
                </h1>
                <p className="text-xs text-[#C9A961]/60">Part of H&C Group</p>
              </div>
            </div>
            
            <div className="hidden lg:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('home')}
                className={`text-sm font-medium transition-all relative ${activeSection === 'home' ? 'text-[#C9A961]' : 'text-white/70 hover:text-[#C9A961]'}`}
              >
                Главная
                {activeSection === 'home' && <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#C9A961] to-transparent" />}
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className={`text-sm font-medium transition-all relative ${activeSection === 'about' ? 'text-[#C9A961]' : 'text-white/70 hover:text-[#C9A961]'}`}
              >
                О компании
                {activeSection === 'about' && <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#C9A961] to-transparent" />}
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className={`text-sm font-medium transition-all relative ${activeSection === 'services' ? 'text-[#C9A961]' : 'text-white/70 hover:text-[#C9A961]'}`}
              >
                Услуги
                {activeSection === 'services' && <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#C9A961] to-transparent" />}
              </button>
              <Link to="/career">
                <Button variant="outline" className="border-[#C9A961]/40 text-[#C9A961] hover:bg-[#C9A961]/10 hover:border-[#C9A961]">
                  Карьера
                </Button>
              </Link>
              <Link to="/tenders">
                <Button className="bg-gradient-to-r from-[#C9A961] via-[#D4B574] to-[#C9A961] text-[#050A14] hover:shadow-lg hover:shadow-[#C9A961]/20 transition-all">
                  Тендеры
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section id="home" className="relative pt-40 pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1220] via-[#050A14] to-[#050A14]" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#C9A961]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-[#C9A961]/10 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="text-center max-w-5xl mx-auto mb-20">
            <div className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#C9A961]/10 border border-[#C9A961]/30 rounded-full mb-8 backdrop-blur-sm">
              <div className="w-2 h-2 bg-[#C9A961] rounded-full animate-pulse" />
              <span className="text-[#C9A961] text-sm font-semibold tracking-wide">5PL ОПЕРАТОР ЛОГИСТИКИ</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white via-[#C9A961] to-white bg-clip-text text-transparent">
                Управляем
              </span>
              <br />
              <span className="bg-gradient-to-r from-[#C9A961] via-[#D4B574] to-[#C9A961] bg-clip-text text-transparent">
                логистикой будущего
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/60 mb-12 leading-relaxed max-w-3xl mx-auto">
              Премиальные логистические решения полного цикла. 
              Штаб-квартира в Тюмени, присутствие по всей России и СНГ.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-[#C9A961] via-[#D4B574] to-[#C9A961] text-[#050A14] hover:shadow-xl hover:shadow-[#C9A961]/30 text-lg px-10 py-7 transition-all hover:scale-105"
                onClick={() => scrollToSection('services')}
              >
                Наши услуги
                <Icon name="ArrowRight" className="ml-2" size={22} />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-[#C9A961]/40 text-[#C9A961] hover:bg-[#C9A961]/10 hover:border-[#C9A961] text-lg px-10 py-7 backdrop-blur-sm"
                onClick={() => scrollToSection('about')}
              >
                О компании
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-gradient-to-br from-[#0A1220] to-[#050A14] border-[#C9A961]/20 backdrop-blur-sm hover:border-[#C9A961]/40 transition-all hover:scale-105 group">
                <CardContent className="p-6 text-center">
                  <Icon name={stat.icon as any} size={32} className="text-[#C9A961] mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <div className="text-4xl font-bold bg-gradient-to-r from-[#C9A961] to-[#D4B574] bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-white/50 text-sm">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-32 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050A14] via-[#0A1220] to-[#050A14]" />
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#C9A961] via-[#D4B574] to-[#C9A961] bg-clip-text text-transparent">
                О компании
              </span>
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-transparent via-[#C9A961] to-transparent mx-auto" />
          </div>

          <div className="mb-20">
            <Card className="bg-gradient-to-br from-[#0A1220] to-[#050A14] border-[#C9A961]/30 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#C9A961]/5 to-transparent" />
              <CardContent className="p-12 relative z-10">
                <div className="max-w-4xl mx-auto">
                  <h3 className="text-4xl font-bold text-white mb-8 text-center">H&C Group</h3>
                  <p className="text-white/70 text-xl leading-relaxed mb-8 text-center">
                    Многопрофильный холдинг, объединяющий передовые компании в ключевых отраслях экономики
                  </p>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    <div className="flex items-center space-x-3 p-4 bg-[#050A14]/60 border border-[#C9A961]/20 rounded-xl">
                      <Icon name="Truck" size={24} className="text-[#C9A961] flex-shrink-0" />
                      <span className="text-white/80 font-medium">Логистика</span>
                    </div>
                    <div className="flex items-center space-x-3 p-4 bg-[#050A14]/60 border border-[#C9A961]/20 rounded-xl">
                      <Icon name="Tv" size={24} className="text-[#C9A961] flex-shrink-0" />
                      <span className="text-white/80 font-medium">Медиа</span>
                    </div>
                    <div className="flex items-center space-x-3 p-4 bg-[#050A14]/60 border border-[#C9A961]/20 rounded-xl">
                      <Icon name="Building2" size={24} className="text-[#C9A961] flex-shrink-0" />
                      <span className="text-white/80 font-medium">Строительство</span>
                    </div>
                    <div className="flex items-center space-x-3 p-4 bg-[#050A14]/60 border border-[#C9A961]/20 rounded-xl">
                      <Icon name="HeartPulse" size={24} className="text-[#C9A961] flex-shrink-0" />
                      <span className="text-white/80 font-medium">Медицина</span>
                    </div>
                    <div className="flex items-center space-x-3 p-4 bg-[#050A14]/60 border border-[#C9A961]/20 rounded-xl">
                      <Icon name="ShieldCheck" size={24} className="text-[#C9A961] flex-shrink-0" />
                      <span className="text-white/80 font-medium">Безопасность</span>
                    </div>
                    <div className="flex items-center space-x-3 p-4 bg-[#050A14]/60 border border-[#C9A961]/20 rounded-xl">
                      <Icon name="Briefcase" size={24} className="text-[#C9A961] flex-shrink-0" />
                      <span className="text-white/80 font-medium">Консалтинг</span>
                    </div>
                    <div className="flex items-center space-x-3 p-4 bg-[#050A14]/60 border border-[#C9A961]/20 rounded-xl">
                      <Icon name="GraduationCap" size={24} className="text-[#C9A961] flex-shrink-0" />
                      <span className="text-white/80 font-medium">Образование</span>
                    </div>
                    <div className="flex items-center space-x-3 p-4 bg-[#050A14]/60 border border-[#C9A961]/20 rounded-xl">
                      <Icon name="ShoppingCart" size={24} className="text-[#C9A961] flex-shrink-0" />
                      <span className="text-white/80 font-medium">Торговля</span>
                    </div>
                    <div className="flex items-center space-x-3 p-4 bg-[#050A14]/60 border border-[#C9A961]/20 rounded-xl">
                      <Icon name="Factory" size={24} className="text-[#C9A961] flex-shrink-0" />
                      <span className="text-white/80 font-medium">Производство</span>
                    </div>
                    <div className="flex items-center space-x-3 p-4 bg-[#050A14]/60 border border-[#C9A961]/20 rounded-xl">
                      <Icon name="Zap" size={24} className="text-[#C9A961] flex-shrink-0" />
                      <span className="text-white/80 font-medium">Двойное назначение</span>
                    </div>
                    <div className="flex items-center space-x-3 p-4 bg-[#050A14]/60 border border-[#C9A961]/20 rounded-xl">
                      <Icon name="Laptop" size={24} className="text-[#C9A961] flex-shrink-0" />
                      <span className="text-white/80 font-medium">IT-разработки</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <div className="space-y-8">
              <div>
                <h3 className="text-4xl font-bold text-white mb-6">H&C Logistics</h3>
                <p className="text-white/70 text-lg leading-relaxed mb-6">
                  Мы являемся <span className="text-[#C9A961] font-semibold">5PL оператором логистики</span> с штаб-квартирой в Тюмени. 
                  Компания входит в состав многопрофильного холдинга H&C Group.
                </p>
                <p className="text-white/70 text-lg leading-relaxed">
                  Благодаря партнерским контрактам с федеральными 3PL и 2PL операторами, распределительными центрами, 
                  судоходными службами и грузовыми авиаперевозчиками, мы обеспечиваем комплексные логистические решения любой сложности.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-4 bg-[#0A1220]/50 border border-[#C9A961]/20 rounded-xl hover:border-[#C9A961]/40 transition-all">
                  <Icon name="CheckCircle2" className="text-[#C9A961] flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h4 className="text-white font-semibold mb-1">Полный электронный документооборот</h4>
                    <p className="text-white/60 text-sm">Российское ПО с полным ЭДО с 2021 года</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-4 bg-[#0A1220]/50 border border-[#C9A961]/20 rounded-xl hover:border-[#C9A961]/40 transition-all">
                  <Icon name="TrendingUp" className="text-[#C9A961] flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h4 className="text-white font-semibold mb-1">Инновационные IT-решения</h4>
                    <p className="text-white/60 text-sm">Собственные разработки и интеграции с лучшими системами</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-4 bg-[#0A1220]/50 border border-[#C9A961]/20 rounded-xl hover:border-[#C9A961]/40 transition-all">
                  <Icon name="Globe" className="text-[#C9A961] flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h4 className="text-white font-semibold mb-1">Международное присутствие</h4>
                    <p className="text-white/60 text-sm">Партнеры в России, Азии и на Ближнем Востоке</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-[#0A1220] to-[#050A14] border-[#C9A961]/30 hover:scale-105 transition-all col-span-2">
                <CardContent className="p-8">
                  <Icon name="Zap" size={48} className="text-[#C9A961] mb-4" />
                  <div className="text-5xl font-bold bg-gradient-to-r from-[#C9A961] to-[#D4B574] bg-clip-text text-transparent mb-3">
                    100%
                  </div>
                  <div className="text-white/70 text-lg">Прозрачность процессов</div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-[#0A1220] to-[#050A14] border-[#C9A961]/30 hover:scale-105 transition-all">
                <CardContent className="p-8">
                  <Icon name="Award" size={40} className="text-[#C9A961] mb-4" />
                  <div className="text-4xl font-bold bg-gradient-to-r from-[#C9A961] to-[#D4B574] bg-clip-text text-transparent mb-2">
                    #1
                  </div>
                  <div className="text-white/70">В регионе</div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-[#0A1220] to-[#050A14] border-[#C9A961]/30 hover:scale-105 transition-all">
                <CardContent className="p-8">
                  <Icon name="Users" size={40} className="text-[#C9A961] mb-4" />
                  <div className="text-4xl font-bold bg-gradient-to-r from-[#C9A961] to-[#D4B574] bg-clip-text text-transparent mb-2">
                    500+
                  </div>
                  <div className="text-white/70">Клиентов</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-32 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050A14] via-[#0A1220] to-[#050A14]" />
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#C9A961] via-[#D4B574] to-[#C9A961] bg-clip-text text-transparent">
                Наши услуги
              </span>
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-transparent via-[#C9A961] to-transparent mx-auto mb-6" />
            <p className="text-white/60 text-xl max-w-3xl mx-auto">
              Комплексные логистические решения для вашего бизнеса
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {services.map((service, index) => (
              <Card 
                key={index}
                className="bg-gradient-to-br from-[#0A1220] to-[#050A14] border-[#C9A961]/20 backdrop-blur-sm hover:border-[#C9A961]/50 transition-all hover:scale-105 group cursor-pointer"
              >
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-[#C9A961]/20 to-[#D4B574]/20 border border-[#C9A961]/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon name={service.icon as any} size={32} className="text-[#C9A961]" />
                  </div>
                  <CardTitle className="text-white text-2xl mb-3 group-hover:text-[#C9A961] transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-white/60 text-base leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 pt-4 border-t border-[#C9A961]/10">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-[#C9A961] rounded-full" />
                        <span className="text-white/50 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-gradient-to-br from-[#0A1220] via-[#050A14] to-[#0A1220] border-[#C9A961]/40 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#C9A961]/5 to-transparent" />
            <CardContent className="p-12 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <Icon name="Sparkles" size={56} className="text-[#C9A961] mx-auto mb-6" />
                <CardTitle className="text-4xl font-bold text-white mb-4">
                  Специализированная логистика
                </CardTitle>
                <CardDescription className="text-white/70 text-xl mb-8 leading-relaxed">
                  Индивидуальные решения для нестандартных задач любой сложности. 
                  Полный расчет маршрута, оптимизация затрат и персональный менеджер проекта.
                </CardDescription>
                <Button size="lg" className="bg-gradient-to-r from-[#C9A961] via-[#D4B574] to-[#C9A961] text-[#050A14] hover:shadow-xl hover:shadow-[#C9A961]/30 text-lg px-10 py-7">
                  Запросить индивидуальный расчет
                  <Icon name="Calculator" className="ml-2" size={22} />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="bg-[#030609] border-t border-[#C9A961]/20 py-16 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <img 
                  src="https://cdn.poehali.dev/files/5632c509-b4ab-4718-b0b4-0952338ca95a.png" 
                  alt="H&C Logo" 
                  className="w-12 h-12"
                />
                <div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-[#C9A961] to-[#D4B574] bg-clip-text text-transparent">
                    H&C Logistics
                  </h3>
                  <p className="text-xs text-[#C9A961]/60">Part of H&C Group</p>
                </div>
              </div>
              <p className="text-white/50 leading-relaxed max-w-md mb-6">
                Премиальный 5PL оператор логистики с штаб-квартирой в Тюмени. 
                Комплексные решения для бизнеса любого масштаба.
              </p>
            </div>
            
            <div>
              <h4 className="text-[#C9A961] font-semibold mb-6 text-lg">Контакты</h4>
              <div className="space-y-4">
                <a href="mailto:info.HCLogistics@yandex.com" className="flex items-center space-x-3 text-white/60 hover:text-[#C9A961] transition-colors group">
                  <Icon name="Mail" size={18} className="text-[#C9A961]" />
                  <span className="text-sm group-hover:translate-x-1 transition-transform">info.HCLogistics@yandex.com</span>
                </a>
                <div className="flex items-center space-x-3 text-white/60">
                  <Icon name="MapPin" size={18} className="text-[#C9A961]" />
                  <span className="text-sm">Тюмень, Россия</span>
                </div>
                <div className="flex items-center space-x-3 text-white/60">
                  <Icon name="Phone" size={18} className="text-[#C9A961]" />
                  <span className="text-sm">+7 (3452) XXX-XXX</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-[#C9A961] font-semibold mb-6 text-lg">Быстрые ссылки</h4>
              <div className="space-y-3">
                <Link to="/career" className="block text-white/60 hover:text-[#C9A961] transition-colors text-sm hover:translate-x-1">
                  Карьера
                </Link>
                <Link to="/tenders" className="block text-white/60 hover:text-[#C9A961] transition-colors text-sm hover:translate-x-1">
                  Тендеры
                </Link>
                <button onClick={() => scrollToSection('services')} className="block text-white/60 hover:text-[#C9A961] transition-colors text-sm hover:translate-x-1">
                  Услуги
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-[#C9A961]/10 pt-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-6">Руководство компании</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="bg-gradient-to-br from-[#0A1220] to-[#050A14] border-[#C9A961]/30">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-[#C9A961]/20 to-[#D4B574]/20 border border-[#C9A961]/40 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Icon name="User" size={40} className="text-[#C9A961]" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">Плесовских Илья Александрович</h4>
                      <p className="text-[#C9A961] text-sm font-medium">Генеральный директор</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-[#0A1220] to-[#050A14] border-[#C9A961]/30">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-6">
                    <img 
                      src="https://cdn.poehali.dev/projects/b41d1d11-f90f-41e3-81fb-a9b3498f9ba3/files/0f0f5bcd-7bef-48e0-b0cb-23a38de0b58b.jpg" 
                      alt="Коко Де-ла-Серра" 
                      className="w-24 h-24 rounded-2xl object-cover border-2 border-[#C9A961]/40 flex-shrink-0"
                    />
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">Коко Де-ла-Серра</h4>
                      <p className="text-[#C9A961] text-sm font-medium">Заместитель генерального директора</p>
                      <p className="text-white/50 text-xs mt-1">Стратегическое планирование и операции</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="border-t border-[#C9A961]/10 pt-8 mt-12 text-center text-white/40 text-sm">
            <p>© 2024 H&C Logistics. Все права защищены. Часть холдинга H&C Group.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;