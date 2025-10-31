import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Career = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    passport: '',
    driverLicense: '',
    militaryId: '',
    education: '',
    experience: '',
    position: ''
  });

  const vacancies = [
    {
      title: 'Помощник логиста',
      count: 20,
      description: 'Помощь в оформлении документов, контроль отгрузок, взаимодействие с водителями',
      requirements: ['Опыт не требуется', 'Внимательность', 'Ответственность']
    },
    {
      title: 'Менеджер-логист',
      count: 15,
      description: 'Организация грузоперевозок, работа с клиентами, оптимизация маршрутов',
      requirements: ['Опыт от 1 года', 'Знание 1С', 'Коммуникабельность']
    }
  ];

  const benefits = [
    { icon: 'Heart', text: 'Социальный пакет с возможностью расширения' },
    { icon: 'UserCheck', text: 'Корпоративный психолог' },
    { icon: 'Home', text: 'Корпоративная ипотека' },
    { icon: 'GraduationCap', text: 'Обучение и развитие' },
    { icon: 'TrendingUp', text: 'Карьерный рост' },
    { icon: 'Award', text: 'Премии и бонусы' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Резюме отправлено!",
      description: "Мы свяжемся с вами в ближайшее время",
    });
    setFormData({
      fullName: '',
      passport: '',
      driverLicense: '',
      militaryId: '',
      education: '',
      experience: '',
      position: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
                <p className="text-xs text-[#C9A961]/60">Part of H&C Group</p>
              </div>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="outline" className="border-[#C9A961]/40 text-[#C9A961] hover:bg-[#C9A961]/10 hover:border-[#C9A961]">
                  <Icon name="Home" size={16} className="mr-2" />
                  Главная
                </Button>
              </Link>
              <Link to="/tenders">
                <Button className="bg-gradient-to-r from-[#C9A961] via-[#D4B574] to-[#C9A961] text-[#050A14] hover:shadow-lg hover:shadow-[#C9A961]/20">
                  Тендеры
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#C9A961] via-[#D4B574] to-[#C9A961] bg-clip-text text-transparent">
                Карьера в H&C Logistics
              </span>
            </h1>
            <div className="w-32 h-1.5 bg-gradient-to-r from-transparent via-[#C9A961] to-transparent mx-auto mb-6"></div>
            <p className="text-white/60 text-xl">
              Присоединяйтесь к команде профессионалов
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {vacancies.map((vacancy, index) => (
              <Card key={index} className="bg-gradient-to-br from-[#0A1220] to-[#050A14] border-[#C9A961]/30 hover:border-[#C9A961]/50 transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-white text-2xl">{vacancy.title}</CardTitle>
                    <Badge className="bg-gradient-to-r from-[#C9A961] via-[#D4B574] to-[#C9A961] text-[#050A14]">
                      {vacancy.count} вакансий
                    </Badge>
                  </div>
                  <CardDescription className="text-white/60 text-base">
                    {vacancy.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <h4 className="text-[#C9A961] font-semibold mb-3">Требования:</h4>
                  <ul className="space-y-2">
                    {vacancy.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-white/60">
                        <Icon name="CheckCircle" size={16} className="text-[#C9A961]" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-gradient-to-br from-[#0A1220] to-[#050A14] border-[#C9A961]/30 mb-12">
            <CardHeader>
              <CardTitle className="text-white text-3xl text-center">
                Корпоративные преимущества
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3 bg-[#050A14]/80 border border-[#C9A961]/20 p-5 rounded-xl hover:border-[#C9A961]/40 transition-all">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#C9A961]/20 to-[#D4B574]/20 border border-[#C9A961]/30 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon name={benefit.icon as any} size={22} className="text-[#C9A961]" />
                    </div>
                    <span className="text-white/70">{benefit.text}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#0A1220] to-[#050A14] border-[#C9A961]/40">
            <CardHeader>
              <CardTitle className="text-white text-3xl text-center mb-2">
                Отправить резюме
              </CardTitle>
              <CardDescription className="text-white/60 text-center text-base">
                Заполните форму, и мы свяжемся с вами в ближайшее время
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-[#C9A961]">
                      ФИО <span className="text-red-400">*</span>
                    </Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="bg-[#050A14] border-[#C9A961]/30 text-white focus:border-[#C9A961]"
                      placeholder="Иванов Иван Иванович"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="position" className="text-[#C9A961]">
                      Желаемая должность <span className="text-red-400">*</span>
                    </Label>
                    <Input
                      id="position"
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      required
                      className="bg-[#050A14] border-[#C9A961]/30 text-white focus:border-[#C9A961]"
                      placeholder="Менеджер-логист"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="passport" className="text-[#C9A961]">
                      Паспортные данные <span className="text-red-400">*</span>
                    </Label>
                    <Input
                      id="passport"
                      name="passport"
                      value={formData.passport}
                      onChange={handleChange}
                      required
                      className="bg-[#050A14] border-[#C9A961]/30 text-white focus:border-[#C9A961]"
                      placeholder="Серия и номер"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="driverLicense" className="text-[#C9A961]">
                      Водительское удостоверение
                    </Label>
                    <Input
                      id="driverLicense"
                      name="driverLicense"
                      value={formData.driverLicense}
                      onChange={handleChange}
                      className="bg-[#050A14] border-[#C9A961]/30 text-white focus:border-[#C9A961]"
                      placeholder="Если есть"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="militaryId" className="text-[#C9A961]">
                      Номер военного билета
                    </Label>
                    <Input
                      id="militaryId"
                      name="militaryId"
                      value={formData.militaryId}
                      onChange={handleChange}
                      className="bg-[#050A14] border-[#C9A961]/30 text-white focus:border-[#C9A961]"
                      placeholder="Если есть"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="education" className="text-[#C9A961]">
                      Образование
                    </Label>
                    <Input
                      id="education"
                      name="education"
                      value={formData.education}
                      onChange={handleChange}
                      className="bg-[#050A14] border-[#C9A961]/30 text-white focus:border-[#C9A961]"
                      placeholder="Если есть"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience" className="text-[#C9A961]">
                    Опыт работы и почему вы лучший кандидат <span className="text-red-400">*</span>
                  </Label>
                  <Textarea
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="bg-[#050A14] border-[#C9A961]/30 text-white resize-none focus:border-[#C9A961]"
                    placeholder="Опишите ваш опыт работы, стаж и почему именно вы должны получить эту должность..."
                  />
                </div>

                <div className="bg-[#C9A961]/10 border border-[#C9A961]/30 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <Icon name="Info" size={20} className="text-[#C9A961] flex-shrink-0 mt-1" />
                    <p className="text-white/60 text-sm">
                      После отправки формы вам потребуется загрузить фото паспортного образца. 
                      Все данные конфиденциальны и используются только для рассмотрения вашей кандидатуры.
                    </p>
                  </div>
                </div>

                <Button 
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-[#C9A961] via-[#D4B574] to-[#C9A961] text-[#050A14] hover:shadow-xl hover:shadow-[#C9A961]/30 text-lg"
                >
                  Отправить резюме
                  <Icon name="Send" className="ml-2" size={20} />
                </Button>
              </form>
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

export default Career;
