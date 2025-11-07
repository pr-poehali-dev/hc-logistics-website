import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
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

interface UserProfile {
  companyName: string;
  inn: string;
  phone: string;
  legalAddress: string;
  director: string;
  hasEDO: boolean;
}

const ALLOWED_CREDENTIALS = [
  { inn: '7743013902', phone: '+79991234567' },
  { inn: '7707083893', phone: '+79999876543' }
];

const ADMIN_CODE = '72rus726zR#4-@1';

const Tenders = () => {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authData, setAuthData] = useState({ inn: '', phone: '' });
  const [showAuthError, setShowAuthError] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showEmployeeLogin, setShowEmployeeLogin] = useState(false);
  const [employeeCode, setEmployeeCode] = useState('');
  const [showCodeError, setShowCodeError] = useState(false);
  
  const [userProfile] = useState<UserProfile>({
    companyName: 'ООО "Логистические Решения"',
    inn: '7743013902',
    phone: '+7 (999) 123-45-67',
    legalAddress: '119991, г. Москва, ул. Ленинские Горы, д. 1',
    director: 'Иванов Иван Иванович',
    hasEDO: false
  });

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    
    const isAllowed = ALLOWED_CREDENTIALS.some(
      cred => cred.inn === authData.inn && cred.phone === authData.phone
    );

    if (isAllowed) {
      setIsAuthenticated(true);
      setShowWelcome(true);
      
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
    } else {
      setShowAuthError(true);
      
      if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
      }
      
      setTimeout(() => setShowAuthError(false), 600);
      
      toast({
        title: "Доступ запрещен",
        description: "Обратитесь к администратору для получения доступа",
        variant: "destructive"
      });
    }
  };

  const handleEmployeeAuth = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (employeeCode === ADMIN_CODE) {
      setIsAuthenticated(true);
      setShowEmployeeLogin(false);
      setShowWelcome(true);
      setEmployeeCode('');
      
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
      
      toast({
        title: "Вход выполнен",
        description: "Добро пожаловать, сотрудник H&C Logistics",
      });
    } else {
      setShowCodeError(true);
      
      if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
      }
      
      setTimeout(() => setShowCodeError(false), 600);
      
      toast({
        title: "Неверный код",
        description: "Проверьте правильность введенного кода администратора",
        variant: "destructive"
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

  const russiaRegions: Tender[] = [
    { id: 1, title: 'Центральный ФО', region: 'Москва, Московская обл., Тула', budget: '15 000 000 ₽', endDate: '2025-11-15T18:00:00', participants: 8, currentBid: '14 200 000 ₽' },
    { id: 2, title: 'Северо-Западный ФО', region: 'Санкт-Петербург, Мурманск', budget: '10 000 000 ₽', endDate: '2025-11-20T15:00:00', participants: 6, currentBid: '9 500 000 ₽' },
    { id: 3, title: 'Южный ФО', region: 'Ростов-на-Дону, Краснодар', budget: '9 500 000 ₽', endDate: '2025-11-18T12:00:00', participants: 7, currentBid: '9 100 000 ₽' },
    { id: 4, title: 'Уральский ФО', region: 'Екатеринбург, Челябинск, Тюмень', budget: '8 500 000 ₽', endDate: '2025-11-12T15:00:00', participants: 5, currentBid: '8 100 000 ₽' },
    { id: 5, title: 'Сибирский ФО', region: 'Новосибирск, Красноярск, Иркутск', budget: '12 000 000 ₽', endDate: '2025-11-22T12:00:00', participants: 6, currentBid: '11 500 000 ₽' },
    { id: 6, title: 'Дальневосточный ФО', region: 'Владивосток, Хабаровск', budget: '10 500 000 ₽', endDate: '2025-11-25T16:00:00', participants: 4, currentBid: '10 200 000 ₽' }
  ];

  const asiaTenders: Tender[] = [
    { id: 7, title: 'Китай', region: 'Пекин, Шанхай, Гуанчжоу', budget: '50 000 000 ₽', endDate: '2025-12-01T12:00:00', participants: 15, currentBid: '48 000 000 ₽' },
    { id: 8, title: 'Казахстан', region: 'Алматы, Нур-Султан, Шымкент', budget: '18 000 000 ₽', endDate: '2025-11-28T15:00:00', participants: 8, currentBid: '17 200 000 ₽' },
    { id: 9, title: 'Узбекистан', region: 'Ташкент, Самарканд, Бухара', budget: '12 000 000 ₽', endDate: '2025-11-30T14:00:00', participants: 5, currentBid: '11 500 000 ₽' },
    { id: 10, title: 'Монголия', region: 'Улан-Батор, Дархан', budget: '8 000 000 ₽', endDate: '2025-12-05T10:00:00', participants: 3, currentBid: '7 800 000 ₽' }
  ];

  const europeTenders: Tender[] = [
    { id: 11, title: 'Германия', region: 'Берлин, Мюнхен, Гамбург', budget: '45 000 000 ₽', endDate: '2025-12-10T16:00:00', participants: 12, currentBid: '43 000 000 ₽' },
    { id: 12, title: 'Польша', region: 'Варшава, Краков, Гданьск', budget: '22 000 000 ₽', endDate: '2025-12-08T14:00:00', participants: 9, currentBid: '21 000 000 ₽' },
    { id: 13, title: 'Чехия', region: 'Прага, Брно', budget: '15 000 000 ₽', endDate: '2025-12-12T12:00:00', participants: 6, currentBid: '14 500 000 ₽' }
  ];

  const middleEastTenders: Tender[] = [
    { id: 14, title: 'ОАЭ', region: 'Дубай, Абу-Даби, Шарджа', budget: '60 000 000 ₽', endDate: '2025-12-15T18:00:00', participants: 18, currentBid: '57 000 000 ₽' },
    { id: 15, title: 'Турция', region: 'Стамбул, Анкара, Измир', budget: '28 000 000 ₽', endDate: '2025-12-12T15:00:00', participants: 10, currentBid: '26 500 000 ₽' },
    { id: 16, title: 'Иран', region: 'Тегеран, Исфахан, Шираз', budget: '20 000 000 ₽', endDate: '2025-12-18T14:00:00', participants: 7, currentBid: '19 200 000 ₽' }
  ];

  const northAmericaTenders: Tender[] = [
    { id: 17, title: 'США', region: 'Нью-Йорк, Лос-Анджелес, Чикаго', budget: '85 000 000 ₽', endDate: '2025-12-20T20:00:00', participants: 20, currentBid: '82 000 000 ₽' },
    { id: 18, title: 'Канада', region: 'Торонто, Ванкувер, Монреаль', budget: '55 000 000 ₽', endDate: '2025-12-22T18:00:00', participants: 14, currentBid: '53 000 000 ₽' }
  ];

  const southAmericaTenders: Tender[] = [
    { id: 19, title: 'Бразилия', region: 'Сан-Паулу, Рио-де-Жанейро, Бразилиа', budget: '42 000 000 ₽', endDate: '2025-12-25T16:00:00', participants: 11, currentBid: '40 000 000 ₽' },
    { id: 20, title: 'Аргентина', region: 'Буэнос-Айрес, Кордова', budget: '25 000 000 ₽', endDate: '2025-12-28T14:00:00', participants: 7, currentBid: '24 000 000 ₽' }
  ];

  const redZoneTenders: Tender[] = [
    { id: 21, title: 'Зона СВО', region: 'Донецк, Луганск, Мариуполь', budget: '35 000 000 ₽', endDate: '2025-11-30T18:00:00', participants: 4, currentBid: '33 000 000 ₽' },
    { id: 22, title: 'Афганистан', region: 'Кабул, Герат', budget: '28 000 000 ₽', endDate: '2025-12-05T12:00:00', participants: 2, currentBid: '27 000 000 ₽' },
    { id: 23, title: 'Ирак', region: 'Багдад, Басра', budget: '32 000 000 ₽', endDate: '2025-12-08T15:00:00', participants: 3, currentBid: '30 500 000 ₽' }
  ];

  const procurementTenders: Tender[] = [
    { id: 24, title: 'Закупка грузового транспорта', region: 'Транспорт', budget: '25 000 000 ₽', endDate: '2025-11-25T18:00:00', participants: 12, currentBid: '23 500 000 ₽' },
    { id: 25, title: 'Складское оборудование', region: 'Оборудование', budget: '8 000 000 ₽', endDate: '2025-11-14T14:00:00', participants: 9, currentBid: '7 600 000 ₽' },
    { id: 26, title: 'IT системы управления логистикой', region: 'ПО', budget: '15 000 000 ₽', endDate: '2025-11-22T12:00:00', participants: 7, currentBid: '14 200 000 ₽' },
    { id: 27, title: 'Упаковочные материалы', region: 'Материалы', budget: '3 500 000 ₽', endDate: '2025-11-16T10:00:00', participants: 15, currentBid: '3 200 000 ₽' },
    { id: 28, title: 'Холодильное оборудование', region: 'Оборудование', budget: '12 000 000 ₽', endDate: '2025-11-28T15:00:00', participants: 6, currentBid: '11 400 000 ₽' }
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

  const TenderCard = ({ tender, isRedZone = false }: { tender: Tender; isRedZone?: boolean }) => (
    <Card className={`bg-gradient-to-br from-[#0A1220] to-[#050A14] ${isRedZone ? 'border-red-500/50' : 'border-[#C9A961]/30'} hover:border-[#C9A961]/50 transition-all`}>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-start gap-3 mb-3">
              <div className={`w-12 h-12 bg-gradient-to-br ${isRedZone ? 'from-red-500/20 to-red-600/20 border-red-500/40' : 'from-[#C9A961]/20 to-[#D4B574]/20 border-[#C9A961]/40'} border rounded-xl flex items-center justify-center flex-shrink-0`}>
                <Icon name={isRedZone ? "AlertTriangle" : "MapPin"} size={24} className={isRedZone ? "text-red-400" : "text-[#C9A961]"} />
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
        {isRedZone && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-4">
            <div className="flex items-start gap-3">
              <Icon name="ShieldAlert" size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="text-red-400 font-semibold mb-1">Красная зона повышенного риска</p>
                <p className="text-white/70">
                  Требуется подтверждение готовности к работе в опасных условиях и наличие всего необходимого оборудования
                </p>
              </div>
            </div>
          </div>
        )}
        
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
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050A14] flex items-center justify-center px-6">
        <Card className={`w-full max-w-md bg-gradient-to-br from-[#0A1220] to-[#050A14] border-[#C9A961]/40 backdrop-blur transition-all duration-300 ${
          showAuthError ? 'animate-shake border-red-500 shadow-xl shadow-red-500/50' : ''
        }`}>
          <CardHeader className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-[#C9A961]/20 to-[#D4B574]/20 border border-[#C9A961]/40 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Icon name="Lock" size={40} className="text-[#C9A961]" />
            </div>
            <CardTitle className="text-white text-3xl mb-3">Вход в систему тендеров</CardTitle>
            <CardDescription className="text-white/60 text-base">
              Доступ выдается администратором
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
                  className={`bg-[#050A14] border-[#C9A961]/30 text-white focus:border-[#C9A961] transition-all ${
                    showAuthError ? 'border-red-500 animate-pulse-red' : ''
                  }`}
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
                  className={`bg-[#050A14] border-[#C9A961]/30 text-white focus:border-[#C9A961] transition-all ${
                    showAuthError ? 'border-red-500 animate-pulse-red' : ''
                  }`}
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

        <Button
          onClick={() => setShowEmployeeLogin(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-[#C9A961]/90 via-[#D4B574]/90 to-[#C9A961]/90 text-[#050A14] hover:shadow-xl hover:shadow-[#C9A961]/40 backdrop-blur z-50"
          size="lg"
        >
          <Icon name="UserCog" size={20} className="mr-2" />
          Сотрудник
        </Button>

        <Dialog open={showEmployeeLogin} onOpenChange={setShowEmployeeLogin}>
          <DialogContent className={`bg-gradient-to-br from-[#0A1220] to-[#050A14] border-[#C9A961]/40 text-white transition-all duration-300 ${
            showCodeError ? 'animate-shake border-red-500 shadow-xl shadow-red-500/50' : ''
          }`}>
            <DialogHeader>
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#C9A961]/20 to-[#D4B574]/20 border border-[#C9A961]/40 rounded-xl flex items-center justify-center">
                  <Icon name="UserCog" size={32} className="text-[#C9A961]" />
                </div>
              </div>
              <DialogTitle className="text-center text-2xl text-white">
                Вход для сотрудников
              </DialogTitle>
              <DialogDescription className="text-center text-white/70">
                Введите код администратора для доступа
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleEmployeeAuth} className="space-y-6 pt-4">
              <div className="space-y-2">
                <Label htmlFor="employee-code" className="text-[#C9A961]">
                  Код администратора <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="employee-code"
                  type="password"
                  value={employeeCode}
                  onChange={(e) => setEmployeeCode(e.target.value)}
                  required
                  className={`bg-[#050A14] border-[#C9A961]/30 text-white focus:border-[#C9A961] transition-all ${
                    showCodeError ? 'border-red-500 animate-pulse-red' : ''
                  }`}
                  placeholder="••••••••••••"
                  autoComplete="off"
                />
              </div>

              <Button 
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-[#C9A961] via-[#D4B574] to-[#C9A961] text-[#050A14] hover:shadow-xl hover:shadow-[#C9A961]/30"
              >
                <Icon name="LogIn" size={20} className="mr-2" />
                Войти
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        <style>{`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
            20%, 40%, 60%, 80% { transform: translateX(10px); }
          }
          @keyframes pulseRed {
            0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
            50% { box-shadow: 0 0 20px 10px rgba(239, 68, 68, 0); }
          }
          .animate-shake {
            animation: shake 0.6s;
          }
          .animate-pulse-red {
            animation: pulseRed 0.6s;
          }
        `}</style>
      </div>
    );
  }

  return (
    <>
      <Dialog open={showWelcome} onOpenChange={setShowWelcome}>
        <DialogContent className="bg-gradient-to-br from-[#0A1220] to-[#050A14] border-[#C9A961]/40 text-white">
          <DialogHeader>
            <div className="flex items-center justify-center mb-4">
              <img 
                src="https://cdn.poehali.dev/files/5632c509-b4ab-4718-b0b4-0952338ca95a.png" 
                alt="H&C Logo" 
                className="w-16 h-16"
              />
            </div>
            <DialogTitle className="text-center text-2xl text-white">
              Добро пожаловать в систему тендеров!
            </DialogTitle>
            <DialogDescription className="text-center text-white/70 text-base">
              H&C Logistics рад видеть вас в системе электронных торгов
            </DialogDescription>
          </DialogHeader>
          <div className="pt-4">
            <Button 
              onClick={() => setShowWelcome(false)}
              className="w-full bg-gradient-to-r from-[#C9A961] via-[#D4B574] to-[#C9A961] text-[#050A14]"
            >
              Перейти к тендерам
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showProfile} onOpenChange={setShowProfile}>
        <DialogContent className="bg-gradient-to-br from-[#0A1220] to-[#050A14] border-[#C9A961]/40 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl text-white flex items-center gap-3">
              <Icon name="User" size={28} className="text-[#C9A961]" />
              Профиль участника
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#050A14]/60 border border-[#C9A961]/20 p-4 rounded-xl">
                <p className="text-white/50 text-xs mb-1">Наименование</p>
                <p className="text-white font-semibold">{userProfile.companyName}</p>
              </div>
              <div className="bg-[#050A14]/60 border border-[#C9A961]/20 p-4 rounded-xl">
                <p className="text-white/50 text-xs mb-1">ИНН</p>
                <p className="text-white font-semibold">{userProfile.inn}</p>
              </div>
              <div className="bg-[#050A14]/60 border border-[#C9A961]/20 p-4 rounded-xl">
                <p className="text-white/50 text-xs mb-1">Телефон</p>
                <p className="text-white font-semibold">{userProfile.phone}</p>
              </div>
              <div className="bg-[#050A14]/60 border border-[#C9A961]/20 p-4 rounded-xl">
                <p className="text-white/50 text-xs mb-1">Генеральный директор</p>
                <p className="text-white font-semibold">{userProfile.director}</p>
              </div>
            </div>

            <div className="bg-[#050A14]/60 border border-[#C9A961]/20 p-4 rounded-xl">
              <p className="text-white/50 text-xs mb-1">Юридический адрес</p>
              <p className="text-white font-semibold">{userProfile.legalAddress}</p>
            </div>

            <div className="bg-gradient-to-br from-[#C9A961]/10 to-[#D4B574]/10 border border-[#C9A961]/30 p-6 rounded-xl">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#C9A961]/20 to-[#D4B574]/20 border border-[#C9A961]/40 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon name="FileSignature" size={24} className="text-[#C9A961]" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg mb-1">
                      Электронный документооборот
                    </h4>
                    <p className="text-white/60 text-sm">
                      {userProfile.hasEDO 
                        ? 'ЭДО подключен и активен' 
                        : 'Подключите ЭДО для участия в тендерах и быстрого обмена документами'}
                    </p>
                  </div>
                </div>
                {!userProfile.hasEDO && (
                  <Button className="bg-gradient-to-r from-[#C9A961] via-[#D4B574] to-[#C9A961] text-[#050A14] whitespace-nowrap">
                    <Icon name="Link" size={18} className="mr-2" />
                    Подключить ЭДО
                  </Button>
                )}
                {userProfile.hasEDO && (
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/40">
                    <Icon name="CheckCircle" size={14} className="mr-1" />
                    Активно
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

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
                <Button
                  onClick={() => setShowProfile(true)}
                  variant="outline"
                  className="border-[#C9A961]/40 text-[#C9A961] hover:bg-[#C9A961]/10 hover:border-[#C9A961]"
                >
                  <Icon name="User" size={16} className="mr-2" />
                  Профиль
                </Button>
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
              <p className="text-white/60 text-xl mb-6">
                Аукционная система определения победителей
              </p>
              <div className="bg-[#C9A961]/10 border border-[#C9A961]/30 rounded-xl p-4 max-w-4xl mx-auto">
                <div className="flex items-start space-x-3">
                  <Icon name="Scale" size={20} className="text-[#C9A961] flex-shrink-0 mt-1" />
                  <div className="text-left text-sm text-white/70">
                    <p className="mb-2">
                      <strong className="text-white">Все тендеры проводятся в соответствии с законодательством Российской Федерации:</strong>
                    </p>
                    <ul className="space-y-1 ml-4">
                      <li>• Федеральный закон № 223-ФЗ "О закупках товаров, работ, услуг отдельными видами юридических лиц"</li>
                      <li>• Федеральный закон № 44-ФЗ "О контрактной системе в сфере закупок"</li>
                      <li>• Статья 4 и Статья 15 Конституции Российской Федерации</li>
                    </ul>
                    <p className="mt-2 text-[#C9A961]">
                      Участие принимают только юридические лица, зарегистрированные в РФ
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Tabs defaultValue="russia" className="space-y-8">
              <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 bg-[#0A1220]/80 border border-[#C9A961]/30 p-1">
                <TabsTrigger value="russia" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#C9A961] data-[state=active]:to-[#D4B574] data-[state=active]:text-[#050A14] text-white/70">
                  Россия
                </TabsTrigger>
                <TabsTrigger value="asia" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#C9A961] data-[state=active]:to-[#D4B574] data-[state=active]:text-[#050A14] text-white/70">
                  Азия
                </TabsTrigger>
                <TabsTrigger value="europe" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#C9A961] data-[state=active]:to-[#D4B574] data-[state=active]:text-[#050A14] text-white/70">
                  Европа
                </TabsTrigger>
                <TabsTrigger value="middle-east" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#C9A961] data-[state=active]:to-[#D4B574] data-[state=active]:text-[#050A14] text-white/70">
                  Ближний Восток
                </TabsTrigger>
                <TabsTrigger value="north-america" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#C9A961] data-[state=active]:to-[#D4B574] data-[state=active]:text-[#050A14] text-white/70">
                  Сев. Америка
                </TabsTrigger>
                <TabsTrigger value="south-america" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#C9A961] data-[state=active]:to-[#D4B574] data-[state=active]:text-[#050A14] text-white/70">
                  Юж. Америка
                </TabsTrigger>
                <TabsTrigger value="red-zones" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-red-600 data-[state=active]:text-white text-red-400/70">
                  Красные зоны
                </TabsTrigger>
                <TabsTrigger value="procurement" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#C9A961] data-[state=active]:to-[#D4B574] data-[state=active]:text-[#050A14] text-white/70">
                  Закупки
                </TabsTrigger>
              </TabsList>

              <TabsContent value="russia" className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-2">Российские регионы</h2>
                  <p className="text-white/60">Федеральные округа Российской Федерации</p>
                </div>
                <div className="grid gap-6">
                  {russiaRegions.map((tender) => <TenderCard key={tender.id} tender={tender} />)}
                </div>
              </TabsContent>

              <TabsContent value="asia" className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-2">Страны Азии</h2>
                  <p className="text-white/60">Логистическое покрытие азиатского региона</p>
                </div>
                <div className="grid gap-6">
                  {asiaTenders.map((tender) => <TenderCard key={tender.id} tender={tender} />)}
                </div>
              </TabsContent>

              <TabsContent value="europe" className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-2">Страны Европы</h2>
                  <p className="text-white/60">Европейский логистический коридор</p>
                </div>
                <div className="grid gap-6">
                  {europeTenders.map((tender) => <TenderCard key={tender.id} tender={tender} />)}
                </div>
              </TabsContent>

              <TabsContent value="middle-east" className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-2">Ближний Восток</h2>
                  <p className="text-white/60">Стратегические направления Ближнего Востока</p>
                </div>
                <div className="grid gap-6">
                  {middleEastTenders.map((tender) => <TenderCard key={tender.id} tender={tender} />)}
                </div>
              </TabsContent>

              <TabsContent value="north-america" className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-2">Северная Америка</h2>
                  <p className="text-white/60">США и Канада</p>
                </div>
                <div className="grid gap-6">
                  {northAmericaTenders.map((tender) => <TenderCard key={tender.id} tender={tender} />)}
                </div>
              </TabsContent>

              <TabsContent value="south-america" className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-2">Южная Америка</h2>
                  <p className="text-white/60">Латиноамериканский рынок</p>
                </div>
                <div className="grid gap-6">
                  {southAmericaTenders.map((tender) => <TenderCard key={tender.id} tender={tender} />)}
                </div>
              </TabsContent>

              <TabsContent value="red-zones" className="space-y-6">
                <div className="text-center mb-8">
                  <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 max-w-4xl mx-auto mb-6">
                    <div className="flex items-start gap-4">
                      <Icon name="ShieldAlert" size={32} className="text-red-400 flex-shrink-0" />
                      <div className="text-left">
                        <h2 className="text-2xl font-bold text-red-400 mb-3">Красные зоны повышенного риска</h2>
                        <p className="text-white/70 mb-4">
                          Работа в красных зонах требует специальной подготовки, оборудования и подтверждения готовности к выполнению задач в условиях повышенного риска.
                        </p>
                        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                          <p className="text-sm text-white/80">
                            <strong className="text-red-400">Обязательные требования:</strong>
                          </p>
                          <ul className="mt-2 space-y-1 text-sm text-white/70 ml-4">
                            <li>• Документальное подтверждение опыта работы в опасных зонах</li>
                            <li>• Наличие специального оборудования и средств защиты</li>
                            <li>• Страхование персонала и грузов</li>
                            <li>• Система безопасности и связи</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid gap-6">
                  {redZoneTenders.map((tender) => <TenderCard key={tender.id} tender={tender} isRedZone />)}
                </div>
              </TabsContent>

              <TabsContent value="procurement" className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-2">Закупки H&C Logistics</h2>
                  <p className="text-white/60">Тендеры на поставку товаров и услуг для компании</p>
                </div>
                <div className="grid gap-6">
                  {procurementTenders.map((tender) => <TenderCard key={tender.id} tender={tender} />)}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <footer className="bg-[#0A1220] border-t border-[#C9A961]/20 py-8 px-6">
          <div className="container mx-auto text-center text-white/40 text-sm">
            <p>© 2024 H&C Logistics. Все права защищены. Тендерная система.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Tenders;