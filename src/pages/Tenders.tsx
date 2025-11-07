import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Tender {
  id: number;
  title: string;
  region: string;
  budget: string;
  endDate: string;
  participants: number;
  currentBid?: string;
}

interface Procurement {
  id: number;
  title: string;
  category: string;
  budget: string;
  endDate: string;
  participants: number;
  currentBid?: string;
}

const Tenders = () => {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authData, setAuthData] = useState({ inn: '', phone: '' });

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (authData.inn && authData.phone) {
      setIsAuthenticated(true);
      toast({
        title: "Авторизация успешна",
        description: "Добро пожаловать в систему тендеров H&C Logistics",
      });
    }
  };

  const calculateTimeLeft = (endDate: string) => {
    const difference = new Date(endDate).getTime() - new Date().getTime();
    
    if (difference <= 0) return 'Завершен';
    
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}д ${hours}ч`;
    if (hours > 0) return `${hours}ч ${minutes}м`;
    return `${minutes}м`;
  };

  const regionalTenders: Tender[] = [
    {
      id: 1,
      title: 'Логистическое покрытие Центрального ФО',
      region: 'Москва, Московская область',
      budget: '15 000 000 ₽',
      endDate: '2025-11-15T18:00:00',
      participants: 8,
      currentBid: '14 200 000 ₽'
    },
    {
      id: 2,
      title: 'Покрытие Уральского региона',
      region: 'Екатеринбург, Челябинск, Тюмень',
      budget: '8 500 000 ₽',
      endDate: '2025-11-12T15:00:00',
      participants: 5,
      currentBid: '8 100 000 ₽'
    },
    {
      id: 3,
      title: 'Сибирский ФО - комплексная логистика',
      region: 'Новосибирск, Красноярск, Иркутск',
      budget: '12 000 000 ₽',
      endDate: '2025-11-20T12:00:00',
      participants: 6,
      currentBid: '11 500 000 ₽'
    },
    {
      id: 4,
      title: 'Дальневосточный регион',
      region: 'Владивосток, Хабаровск',
      budget: '10 500 000 ₽',
      endDate: '2025-11-18T16:00:00',
      participants: 4,
      currentBid: '10 200 000 ₽'
    }
  ];

  const procurementTenders: Procurement[] = [
    {
      id: 1,
      title: 'Закупка грузового транспорта',
      category: 'Транспорт',
      budget: '25 000 000 ₽',
      endDate: '2025-11-25T18:00:00',
      participants: 12,
      currentBid: '23 500 000 ₽'
    },
    {
      id: 2,
      title: 'Складское оборудование',
      category: 'Оборудование',
      budget: '8 000 000 ₽',
      endDate: '2025-11-14T14:00:00',
      participants: 9,
      currentBid: '7 600 000 ₽'
    },
    {
      id: 3,
      title: 'IT системы управления логистикой',
      category: 'Программное обеспечение',
      budget: '15 000 000 ₽',
      endDate: '2025-11-22T12:00:00',
      participants: 7,
      currentBid: '14 200 000 ₽'
    },
    {
      id: 4,
      title: 'Упаковочные материалы',
      category: 'Материалы',
      budget: '3 500 000 ₽',
      endDate: '2025-11-16T10:00:00',
      participants: 15,
      currentBid: '3 200 000 ₽'
    },
    {
      id: 5,
      title: 'Холодильное оборудование',
      category: 'Оборудование',
      budget: '12 000 000 ₽',
      endDate: '2025-11-28T15:00:00',
      participants: 6,
      currentBid: '11 400 000 ₽'
    }
  ];

  const TenderTimer = ({ endDate }: { endDate: string }) => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(endDate));
    
    useEffect(() => {
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft(endDate));
      }, 60000);
      
      return () => clearInterval(timer);
    }, [endDate]);
    
    const isUrgent = new Date(endDate).getTime() - new Date().getTime() < 24 * 60 * 60 * 1000;
    
    return (
      <div className={`flex items-center space-x-2 ${isUrgent ? 'text-red-400' : 'text-[#C9A961]'}`}>
        <Icon name="Clock" size={16} />
        <span className="font-semibold">{timeLeft}</span>
      </div>
    );
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050A14] flex items-center justify-center px-6">
        <Card className="w-full max-w-md bg-gradient-to-br from-[#0A1220] to-[#050A14] border-[#C9A961]/40 backdrop-blur">
          <CardHeader className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-[#C9A961]/20 to-[#D4B574]/20 border border-[#C9A961]/40 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Icon name="Lock" size={40} className="text-[#C9A961]" />
            </div>
            <CardTitle className="text-white text-3xl mb-3">Вход в систему тендеров</CardTitle>
            <CardDescription className="text-white/60 text-base">
              Для доступа к тендерам необходима авторизация
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAuth} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="inn" className="text-[#C9A961]">
                  ИНН организации <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="inn"
                  value={authData.inn}
                  onChange={(e) => setAuthData({ ...authData, inn: e.target.value })}
                  required
                  className="bg-[#050A14] border-[#C9A961]/30 text-white focus:border-[#C9A961]"
                  placeholder="1234567890"
                  maxLength={12}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-[#C9A961]">
                  Номер телефона представителя <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={authData.phone}
                  onChange={(e) => setAuthData({ ...authData, phone: e.target.value })}
                  required
                  className="bg-[#050A14] border-[#C9A961]/30 text-white focus:border-[#C9A961]"
                  placeholder="+7 (___) ___-__-__"
                />
              </div>

              <Button 
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-[#C9A961] via-[#D4B574] to-[#C9A961] text-[#050A14] hover:shadow-xl hover:shadow-[#C9A961]/30 text-lg"
              >
                Войти в систему
                <Icon name="LogIn" className="ml-2" size={20} />
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link to="/">
                <Button variant="ghost" className="text-[#C9A961] hover:text-[#D4B574]">
                  <Icon name="ArrowLeft" size={16} className="mr-2" />
                  Вернуться на главную
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050A14]">
      <nav className="fixed top-0 w-full z-50 bg-[#050A14]/98 backdrop-blur-md border-b border-[#C9A961]/20">
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src="https://cdn.poehali.dev/files/5632c509-b4ab-4718-b0b4-0952338ca95a.png" 
                alt="H&C Logo" 
                className="w-12 h-12"
              />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-[#C9A961] via-[#D4B574] to-[#C9A961] bg-clip-text text-transparent">
                  H&C Logistics
                </h1>
                <p className="text-xs text-[#C9A961]/60">Система тендеров</p>
              </div>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Badge className="bg-[#C9A961]/20 text-[#C9A961] border-[#C9A961]/40">
                <Icon name="CheckCircle2" size={14} className="mr-1" />
                Авторизован
              </Badge>
              <Link to="/career">
                <Button variant="outline" className="border-[#C9A961]/40 text-[#C9A961] hover:bg-[#C9A961]/10 hover:border-[#C9A961]">
                  Карьера
                </Button>
              </Link>
              <Button
                onClick={() => setIsAuthenticated(false)}
                variant="outline"
                className="border-[#C9A961]/40 text-[#C9A961] hover:bg-[#C9A961]/10 hover:border-[#C9A961]"
              >
                <Icon name="LogOut" size={16} className="mr-2" />
                Выйти
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#C9A961] via-[#D4B574] to-[#C9A961] bg-clip-text text-transparent">
                Тендеры H&C Logistics
              </span>
            </h1>
            <div className="w-32 h-1.5 bg-gradient-to-r from-transparent via-[#C9A961] to-transparent mx-auto mb-6"></div>
            <p className="text-white/60 text-xl mb-4">
              Аукционная система определения победителей
            </p>
            <div className="bg-[#C9A961]/10 border border-[#C9A961]/30 rounded-xl p-4 max-w-3xl mx-auto">
              <div className="flex items-start space-x-3">
                <Icon name="Info" size={20} className="text-[#C9A961] flex-shrink-0 mt-1" />
                <p className="text-white/70 text-sm text-left">
                  Все тендеры проводятся в соответствии с законодательством Российской Федерации. 
                  Участие принимают только юридические лица, зарегистрированные в РФ.
                </p>
              </div>
            </div>
          </div>

          <Tabs defaultValue="regions" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 bg-[#0A1220]/80 border border-[#C9A961]/30 p-1 max-w-2xl mx-auto">
              <TabsTrigger 
                value="regions" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#C9A961] data-[state=active]:to-[#D4B574] data-[state=active]:text-[#050A14] text-white/70 data-[state=active]:shadow-lg"
              >
                <Icon name="MapPin" size={18} className="mr-2" />
                Покрытие регионов
              </TabsTrigger>
              <TabsTrigger 
                value="procurement"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#C9A961] data-[state=active]:to-[#D4B574] data-[state=active]:text-[#050A14] text-white/70 data-[state=active]:shadow-lg"
              >
                <Icon name="ShoppingCart" size={18} className="mr-2" />
                Закупки H&C
              </TabsTrigger>
            </TabsList>

            <TabsContent value="regions" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Тендеры на покрытие регионов</h2>
                <p className="text-white/60">Конкурсы на организацию логистических операций в федеральных округах</p>
              </div>

              <div className="grid gap-6">
                {regionalTenders.map((tender) => (
                  <Card key={tender.id} className="bg-gradient-to-br from-[#0A1220] to-[#050A14] border-[#C9A961]/30 hover:border-[#C9A961]/50 transition-all">
                    <CardHeader>
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start gap-3 mb-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-[#C9A961]/20 to-[#D4B574]/20 border border-[#C9A961]/40 rounded-xl flex items-center justify-center flex-shrink-0">
                              <Icon name="MapPin" size={24} className="text-[#C9A961]" />
                            </div>
                            <div>
                              <CardTitle className="text-white text-2xl mb-2">{tender.title}</CardTitle>
                              <p className="text-white/60 text-sm">{tender.region}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end gap-2">
                          <Badge className="bg-[#C9A961]/20 text-[#C9A961] border-[#C9A961]/40">
                            <Icon name="Gavel" size={14} className="mr-1" />
                            Аукцион
                          </Badge>
                          <TenderTimer endDate={tender.endDate} />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-6 mb-6">
                        <div className="bg-[#050A14]/60 border border-[#C9A961]/20 p-4 rounded-xl">
                          <p className="text-white/50 text-xs mb-1">Начальная цена</p>
                          <p className="text-white font-bold text-xl">{tender.budget}</p>
                        </div>
                        <div className="bg-[#050A14]/60 border border-[#C9A961]/20 p-4 rounded-xl">
                          <p className="text-white/50 text-xs mb-1">Текущая ставка</p>
                          <p className="text-[#C9A961] font-bold text-xl">{tender.currentBid}</p>
                        </div>
                        <div className="bg-[#050A14]/60 border border-[#C9A961]/20 p-4 rounded-xl">
                          <p className="text-white/50 text-xs mb-1">Участников</p>
                          <p className="text-white font-bold text-xl">{tender.participants}</p>
                        </div>
                      </div>
                      
                      <Button className="w-full bg-gradient-to-r from-[#C9A961] via-[#D4B574] to-[#C9A961] text-[#050A14] hover:shadow-lg hover:shadow-[#C9A961]/30">
                        <Icon name="Gavel" size={18} className="mr-2" />
                        Принять участие в аукционе
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="procurement" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Закупки H&C Logistics</h2>
                <p className="text-white/60">Тендеры на поставку товаров и услуг для компании</p>
              </div>

              <div className="grid gap-6">
                {procurementTenders.map((procurement) => (
                  <Card key={procurement.id} className="bg-gradient-to-br from-[#0A1220] to-[#050A14] border-[#C9A961]/30 hover:border-[#C9A961]/50 transition-all">
                    <CardHeader>
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start gap-3 mb-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-[#C9A961]/20 to-[#D4B574]/20 border border-[#C9A961]/40 rounded-xl flex items-center justify-center flex-shrink-0">
                              <Icon name="ShoppingCart" size={24} className="text-[#C9A961]" />
                            </div>
                            <div>
                              <CardTitle className="text-white text-2xl mb-2">{procurement.title}</CardTitle>
                              <Badge variant="outline" className="text-white/60 border-white/20">
                                {procurement.category}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end gap-2">
                          <Badge className="bg-[#C9A961]/20 text-[#C9A961] border-[#C9A961]/40">
                            <Icon name="Gavel" size={14} className="mr-1" />
                            Аукцион
                          </Badge>
                          <TenderTimer endDate={procurement.endDate} />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-6 mb-6">
                        <div className="bg-[#050A14]/60 border border-[#C9A961]/20 p-4 rounded-xl">
                          <p className="text-white/50 text-xs mb-1">Начальная цена</p>
                          <p className="text-white font-bold text-xl">{procurement.budget}</p>
                        </div>
                        <div className="bg-[#050A14]/60 border border-[#C9A961]/20 p-4 rounded-xl">
                          <p className="text-white/50 text-xs mb-1">Текущая ставка</p>
                          <p className="text-[#C9A961] font-bold text-xl">{procurement.currentBid}</p>
                        </div>
                        <div className="bg-[#050A14]/60 border border-[#C9A961]/20 p-4 rounded-xl">
                          <p className="text-white/50 text-xs mb-1">Участников</p>
                          <p className="text-white font-bold text-xl">{procurement.participants}</p>
                        </div>
                      </div>
                      
                      <Button className="w-full bg-gradient-to-r from-[#C9A961] via-[#D4B574] to-[#C9A961] text-[#050A14] hover:shadow-lg hover:shadow-[#C9A961]/30">
                        <Icon name="Gavel" size={18} className="mr-2" />
                        Принять участие в аукционе
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-12 bg-gradient-to-br from-[#0A1220] to-[#050A14] border border-[#C9A961]/30 rounded-2xl p-8">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-[#C9A961]/20 to-[#D4B574]/20 border border-[#C9A961]/40 rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon name="Scale" size={28} className="text-[#C9A961]" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-3">Правовая информация</h3>
                <p className="text-white/70 leading-relaxed mb-4">
                  Все тендеры проводятся в строгом соответствии с Федеральным законом от 18.07.2011 № 223-ФЗ 
                  "О закупках товаров, работ, услуг отдельными видами юридических лиц" и положением о закупках H&C Logistics.
                </p>
                <ul className="space-y-2 text-white/60">
                  <li className="flex items-start gap-2">
                    <Icon name="CheckCircle" size={18} className="text-[#C9A961] flex-shrink-0 mt-0.5" />
                    <span>Участие принимают только юридические лица, зарегистрированные в Российской Федерации</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="CheckCircle" size={18} className="text-[#C9A961] flex-shrink-0 mt-0.5" />
                    <span>Победитель определяется по принципу аукциона — наименьшая цена при соблюдении требований</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="CheckCircle" size={18} className="text-[#C9A961] flex-shrink-0 mt-0.5" />
                    <span>Все участники должны предоставить обеспечение заявки в размере 1-5% от начальной цены</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-[#0A1220] border-t border-[#C9A961]/20 py-8 px-6">
        <div className="container mx-auto text-center text-white/40 text-sm">
          <p>© 2024 H&C Logistics. Все права защищены. Тендерная система.</p>
        </div>
      </footer>
    </div>
  );
};

export default Tenders;
