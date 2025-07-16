import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Gift {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  link: string;
  reserved: boolean;
  reservedBy?: string;
}

const Index = () => {
  const [gifts, setGifts] = useState<Gift[]>([
    {
      id: '1',
      name: 'Набор для макияжа',
      description: 'Милая палетка с нежными оттенками и кисточками для создания красивых образов',
      price: '2,500 ₽',
      image: '/img/91d9ad0a-8c36-4ec3-8397-6f927be414fc.jpg',
      link: 'https://example.com/makeup',
      reserved: false,
    },
    {
      id: '2',
      name: 'Коллекция книг',
      description: 'Уютные книги с красивыми обложками для приятного чтения',
      price: '1,800 ₽',
      image: '/img/fb0d69ed-6a3f-4755-9872-3030a2abc700.jpg',
      link: 'https://example.com/books',
      reserved: true,
      reservedBy: 'anonymous',
    },
    {
      id: '3',
      name: 'Подарочный набор',
      description: 'Красивая коробочка с сюрпризами и милыми подарочками',
      price: '3,200 ₽',
      image: '/img/630a525e-0b54-441f-aa42-7747a70331b2.jpg',
      link: 'https://example.com/giftbox',
      reserved: false,
    },
  ]);

  const reserveGift = (giftId: string) => {
    setGifts(gifts.map(gift => 
      gift.id === giftId ? { ...gift, reserved: true, reservedBy: 'anonymous' } : gift
    ));
  };

  const availableGifts = gifts.filter(gift => !gift.reserved);
  const reservedGifts = gifts.filter(gift => gift.reserved);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="Gift" className="text-pink-500" size={32} />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Подарки для Елизаветы</h1>
                <p className="text-sm text-gray-600">Выберите подарок и забронируйте его</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-pink-600 border-pink-200">
                <Icon name="Calendar" size={16} className="mr-1" />
                15 лет скоро!
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-pink-100">
            <Icon name="Heart" className="text-pink-500 mx-auto mb-4" size={48} />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Привет, дорогие друзья! 💕
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Скоро мне исполнится 15 лет! Я создала этот сайт, чтобы вам было проще выбрать подарок. 
              Просто найдите что-то интересное и забронируйте — так никто не купит одно и то же!
            </p>
          </div>
        </div>

        {/* Tabs Navigation */}
        <Tabs defaultValue="available" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-white/70 backdrop-blur-sm">
            <TabsTrigger value="available" className="flex items-center space-x-2">
              <Icon name="ShoppingBag" size={16} />
              <span>Доступные подарки</span>
            </TabsTrigger>
            <TabsTrigger value="reserved" className="flex items-center space-x-2">
              <Icon name="Lock" size={16} />
              <span>Забронированные</span>
            </TabsTrigger>
            <TabsTrigger value="about" className="flex items-center space-x-2">
              <Icon name="User" size={16} />
              <span>Обо мне</span>
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center space-x-2">
              <Icon name="Mail" size={16} />
              <span>Контакты</span>
            </TabsTrigger>
          </TabsList>

          {/* Available Gifts */}
          <TabsContent value="available" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableGifts.map((gift) => (
                <Card key={gift.id} className="group hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm border-pink-100 hover:border-pink-200">
                  <CardHeader className="pb-3">
                    <div className="aspect-square rounded-lg overflow-hidden mb-3">
                      <img
                        src={gift.image}
                        alt={gift.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardTitle className="text-lg">{gift.name}</CardTitle>
                    <CardDescription>{gift.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-pink-600">{gift.price}</div>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        <Icon name="Check" size={14} className="mr-1" />
                        Доступно
                      </Badge>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => reserveGift(gift.id)}
                        className="flex-1 bg-pink-500 hover:bg-pink-600 text-white"
                      >
                        <Icon name="Heart" size={16} className="mr-2" />
                        Забронировать
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a href={gift.link} target="_blank" rel="noopener noreferrer">
                          <Icon name="ExternalLink" size={16} />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Reserved Gifts */}
          <TabsContent value="reserved" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reservedGifts.map((gift) => (
                <Card key={gift.id} className="bg-white/60 backdrop-blur-sm border-gray-200 opacity-75">
                  <CardHeader className="pb-3">
                    <div className="aspect-square rounded-lg overflow-hidden mb-3 relative">
                      <img
                        src={gift.image}
                        alt={gift.name}
                        className="w-full h-full object-cover grayscale"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <Icon name="Lock" className="text-white" size={32} />
                      </div>
                    </div>
                    <CardTitle className="text-lg text-gray-600">{gift.name}</CardTitle>
                    <CardDescription className="text-gray-500">{gift.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-gray-500">{gift.price}</div>
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        <Icon name="Lock" size={14} className="mr-1" />
                        Забронировано
                      </Badge>
                    </div>
                    <Button disabled className="w-full bg-gray-200 text-gray-500">
                      <Icon name="Check" size={16} className="mr-2" />
                      Уже забронировано
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* About Me */}
          <TabsContent value="about" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-pink-100">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <Icon name="Sparkles" className="text-pink-500 mr-3" size={28} />
                  О себе
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center space-y-4">
                  <div className="w-32 h-32 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full mx-auto flex items-center justify-center">
                    <Icon name="User" className="text-pink-600" size={48} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">Елизавета</h3>
                    <p className="text-gray-600">Скоро 15 лет!</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Icon name="Heart" className="text-pink-500" size={20} />
                    <span>Люблю читать интересные книги</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon name="Palette" className="text-pink-500" size={20} />
                    <span>Интересуюсь косметикой и красотой</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon name="Music" className="text-pink-500" size={20} />
                    <span>Слушаю музыку и изучаю новые жанры</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon name="Camera" className="text-pink-500" size={20} />
                    <span>Люблю фотографировать красивые моменты</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact */}
          <TabsContent value="contact" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-pink-100">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <Icon name="MessageCircle" className="text-pink-500 mr-3" size={28} />
                  Как связаться
                </CardTitle>
                <CardDescription>
                  Если у вас есть вопросы или хотите что-то обсудить
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-800">Прямая связь</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Icon name="Phone" className="text-pink-500" size={20} />
                        <span className="text-gray-600">+7 (999) 123-45-67</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Icon name="Mail" className="text-pink-500" size={20} />
                        <span className="text-gray-600">elizaveta@example.com</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Icon name="MessageSquare" className="text-pink-500" size={20} />
                        <span className="text-gray-600">@elizaveta_15</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-800">Важная информация</h3>
                    <div className="space-y-3 text-sm text-gray-600">
                      <div className="flex items-start space-x-2">
                        <Icon name="Info" className="text-blue-500 mt-0.5" size={16} />
                        <span>Бронирование анонимно — я не узнаю, кто что забронировал</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Icon name="Calendar" className="text-green-500 mt-0.5" size={16} />
                        <span>День рождения: 25 июля</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Icon name="MapPin" className="text-red-500 mt-0.5" size={16} />
                        <span>Адрес для доставки: уточню в личных сообщениях</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-pink-100 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <Icon name="Heart" className="text-pink-500" size={20} />
              <span className="text-gray-600">Создано с любовью для моих друзей</span>
              <Icon name="Heart" className="text-pink-500" size={20} />
            </div>
            <p className="text-sm text-gray-500">
              Спасибо, что заглянули на мой сайт! Жду встречи на дне рождения 🎉
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;