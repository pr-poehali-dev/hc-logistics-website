import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

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

  const russianRegions = [
    { name: 'Центральный ФО', count: 12, status: 'active' },
    { name: 'Северо-Западный ФО', count: 8, status: 'active' },
    { name: 'Южный ФО', count: 15, status: 'active' },
    { name: 'Сибирский ФО', count: 10, status: 'active' },
    { name: 'Уральский ФО', count: 6, status: 'active' },
    { name: 'Дальневосточный ФО', count: 4, status: 'active' }
  ];

  const asiaCountries = [
    { name: 'Китай', regions: ['Пекин', 'Шанхай', 'Гуанчжоу'], count: 18 },
    { name: 'Казахстан', regions: ['Алматы', 'Нур-Султан', 'Шымкент'], count: 8 },
    { name: 'Узбекистан', regions: ['Ташкент', 'Самарканд', 'Бухара'], count: 5 },
    { name: 'Монголия', regions: ['Улан-Батор', 'Дархан'], count: 3 }
  ];

  const middleEastCountries = [
    { name: 'ОАЭ', regions: ['Дубай', 'Абу-Даби', 'Шарджа'], count: 12 },
    { name: 'Турция', regions: ['Стамбул', 'Анкара', 'Измир'], count: 10 },
    { name: 'Иран', regions: ['Тегеран', 'Исфахан', 'Шираз'], count: 6 }
  ];

  const redZones = [
    { name: 'Пакистан', risk: 'Высокий', requirements: 'Сертификация для работы в опасных зонах' },
    { name: 'Афганистан', risk: 'Критический', requirements: 'Опыт работы в красных зонах, вооруженное сопровождение' },
    { name: 'Ирак', risk: 'Высокий', requirements: 'Специальная подготовка и страхование' }
  ];

  const procurements = [
    { title: 'Грузовой транспорт', category: 'Транспорт', deadline: '15.12.2024', budget: '2 500 000 ₽' },
    { title: 'Складское оборудование', category: 'Оборудование', deadline: '20.12.2024', budget: '1 800 000 ₽' },
    { title: 'IT системы управления', category: 'ПО', deadline: '30.12.2024', budget: '3 200 000 ₽' },
    { title: 'Упаковочные материалы', category: 'Материалы', deadline: '10.01.2025', budget: '850 000 ₽' }
  ];

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
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#C9A961] via-[#D4B574] to-[#C9A961] bg-clip-text text-transparent">
                Тендеры и закупки
              </span>
            </h1>
            <div className="w-32 h-1.5 bg-gradient-to-r from-transparent via-[#C9A961] to-transparent mx-auto mb-6"></div>
            <p className="text-white/60 text-xl">
              Участвуйте в тендерах и закупках H&C Logistics
            </p>
          </div>

          <Tabs defaultValue="russia" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4 bg-[#0A1220]/80 border border-[#C9A961]/30 p-1">
              <TabsTrigger 
                value="russia" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#C9A961] data-[state=active]:to-[#D4B574] data-[state=active]:text-[#050A14] text-white/70 data-[state=active]:shadow-lg"
              >
                Россия
              </TabsTrigger>
              <TabsTrigger 
                value="asia"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#C9A961] data-[state=active]:to-[#D4B574] data-[state=active]:text-[#050A14] text-white/70 data-[state=active]:shadow-lg"
              >
                Азия
              </TabsTrigger>
              <TabsTrigger 
                value="middleeast"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#C9A961] data-[state=active]:to-[#D4B574] data-[state=active]:text-[#050A14] text-white/70 data-[state=active]:shadow-lg"
              >
                Ближний Восток
              </TabsTrigger>
              <TabsTrigger 
                value="red"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#C9A961] data-[state=active]:to-[#D4B574] data-[state=active]:text-[#050A14] text-white/70 data-[state=active]:shadow-lg"
              >
                Красные зоны
              </TabsTrigger>
            </TabsList>

            <TabsContent value="russia" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {russianRegions.map((region, index) => (
                  <Card key={index} className="bg-gradient-to-br from-[#0A1220] to-[#050A14] border-[#C9A961]/30 hover:border-[#C9A961]/50 transition-all hover:scale-105 cursor-pointer group">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <CardTitle className="text-white group-hover:text-[#C9A961] transition-colors">{region.name}</CardTitle>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/40">
                          Активно
                        </Badge>
                      </div>
                      <CardDescription className="text-white/60">
                        Доступно тендеров: {region.count}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full bg-gradient-to-r from-[#C9A961] to-[#D4B574] text-[#050A14] hover:shadow-lg hover:shadow-[#C9A961]/20">
                        Просмотреть тендеры
                        <Icon name="ArrowRight" className="ml-2" size={16} />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="asia" className="space-y-6">
              {asiaCountries.map((country, index) => (
                <Card key={index} className="bg-gradient-to-br from-[#0A1220] to-[#050A14] border-[#C9A961]/30 hover:border-[#C9A961]/40 transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-white text-2xl mb-2">{country.name}</CardTitle>
                        <CardDescription className="text-white/60">
                          Регионы: {country.regions.join(', ')}
                        </CardDescription>
                      </div>
                      <Badge className="bg-gradient-to-r from-[#C9A961] to-[#D4B574] text-[#050A14]">
                        {country.count} тендеров
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {country.regions.map((region, idx) => (
                        <Badge key={idx} variant="outline" className="border-[#C9A961]/40 text-[#C9A961]">
                          {region}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="middleeast" className="space-y-6">
              {middleEastCountries.map((country, index) => (
                <Card key={index} className="bg-gradient-to-br from-[#0A1220] to-[#050A14] border-[#C9A961]/30 hover:border-[#C9A961]/40 transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-white text-2xl mb-2">{country.name}</CardTitle>
                        <CardDescription className="text-white/60">
                          Регионы: {country.regions.join(', ')}
                        </CardDescription>
                      </div>
                      <Badge className="bg-gradient-to-r from-[#C9A961] to-[#D4B574] text-[#050A14]">
                        {country.count} тендеров
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {country.regions.map((region, idx) => (
                        <Badge key={idx} variant="outline" className="border-[#C9A961]/40 text-[#C9A961]">
                          {region}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="red" className="space-y-6">
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 mb-8">
                <div className="flex items-start space-x-4">
                  <Icon name="AlertTriangle" size={28} className="text-red-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-red-400 font-bold text-xl mb-3">Предупреждение о повышенном риске</h3>
                    <p className="text-white/60 leading-relaxed">
                      Работа в красных зонах требует специальной подготовки, сертификации и опыта работы в условиях повышенной опасности. 
                      Все исполнители должны подтвердить свою готовность и наличие необходимого оборудования.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {redZones.map((zone, index) => (
                  <Card key={index} className="bg-gradient-to-br from-[#0A1220] to-[#050A14] border-red-500/30 hover:border-red-500/50 transition-all">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center space-x-2 mb-3">
                        <Icon name="AlertCircle" size={22} className="text-red-400" />
                        <span>{zone.name}</span>
                      </CardTitle>
                      <Badge className="bg-red-500/20 text-red-400 border-red-500/40 w-fit">
                        Риск: {zone.risk}
                      </Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-white/60 text-sm mb-4 leading-relaxed">{zone.requirements}</p>
                      <Button 
                        className="w-full bg-red-500/20 text-red-400 border border-red-500/40 hover:bg-red-500/30"
                        variant="outline"
                      >
                        Подать заявку
                        <Icon name="Shield" className="ml-2" size={16} />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <Card className="mt-16 bg-gradient-to-br from-[#0A1220] to-[#050A14] border-[#C9A961]/40">
            <CardHeader>
              <CardTitle className="text-white text-4xl text-center mb-2">
                Закупки H&C Logistics
              </CardTitle>
              <CardDescription className="text-white/60 text-center text-lg">
                Текущие закупочные процедуры компании
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {procurements.map((procurement, index) => (
                  <Card key={index} className="bg-[#050A14]/80 border-[#C9A961]/20 hover:border-[#C9A961]/40 transition-all">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <h4 className="text-white font-bold text-xl mb-3">{procurement.title}</h4>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className="border-[#C9A961]/40 text-[#C9A961]">
                              {procurement.category}
                            </Badge>
                            <Badge variant="outline" className="border-blue-500/40 text-blue-400">
                              До {procurement.deadline}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold bg-gradient-to-r from-[#C9A961] to-[#D4B574] bg-clip-text text-transparent mb-3">
                            {procurement.budget}
                          </div>
                          <Button className="bg-gradient-to-r from-[#C9A961] to-[#D4B574] text-[#050A14] hover:shadow-lg hover:shadow-[#C9A961]/20">
                            Подать заявку
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <footer className="bg-[#030609] border-t border-[#C9A961]/20 py-8 px-4">
        <div className="container mx-auto text-center text-white/40 text-sm">
          <p>© 2024 H&C Logistics. Все права защищены. Часть холдинга H&C Group.</p>
        </div>
      </footer>
    </div>
  );
};

export default Tenders;
