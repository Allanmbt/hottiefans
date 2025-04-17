'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, ChevronLeft, Clock, Info, MapPin, MessageCircle, Star } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { ScrollToTopButton } from '@/components/ScrollToTopButton';
import { GallerySlider } from '@/components/GallerySlider';
import { Girl } from '@/lib/supabase';
import { supabase } from '@/lib/supabase';
import { CustomerServiceDialog } from '@/components/CustomerServiceDialog';

interface AlbumItem {
  id: string;
  url: string;
  type: 'image' | 'video';
  thumbnail?: string;
}

// 获取女孩数据
async function getGirlById(id: string): Promise<Girl | null> {
  try {
    const { data, error } = await supabase
      .from('girls')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching girl data:', error);
      return null;
    }

    // 处理浏览量更新 - 使用本地存储防止短时间内重复计数
    await handleBrowserCountUpdate(id, data);
    
    return data;
  } catch (error) {
    console.error('Failed to fetch girl data:', error);
    return null;
  }
}

// 处理浏览量更新的函数 - 使用本地存储控制更新频率
async function handleBrowserCountUpdate(id: string, data: Girl): Promise<void> {
  // 如果在服务器端渲染，直接返回
  if (typeof window === 'undefined') return;
  
  try {
    // 从localStorage获取访问记录
    const viewsKey = 'hottiefans_viewed_girls';
    const viewsJson = localStorage.getItem(viewsKey) || '{}';
    const viewedGirls: Record<string, number> = JSON.parse(viewsJson);
    
    const now = Date.now();
    const thirtyMinutesInMs = 30 * 60 * 1000;
    
    // 检查是否在30分钟内已经查看过
    if (viewedGirls[id] && (now - viewedGirls[id] < thirtyMinutesInMs)) {
      // 30分钟内已查看过，不增加浏览量
      return;
    }
    
    // 更新最后查看时间
    viewedGirls[id] = now;
    localStorage.setItem(viewsKey, JSON.stringify(viewedGirls));
    
    // 调用数据库函数增加浏览量
    const { error } = await supabase.rpc('increment_browser_count', { girl_id: id });
    
    if (error) {
      console.error('浏览量更新失败:', error);
    } else {
      // 更新本地显示的数值，提供即时反馈
      data.browser_count = (data.browser_count || 0) + 1;
    }
  } catch (error) {
    console.error('浏览量更新过程中出错:', error);
  }
}

// 获取女孩相册
async function getGirlAlbums(girlId: string): Promise<AlbumItem[]> {
  try {
    const { data, error } = await supabase
      .from('albums')
      .select('*')
      .eq('girl_id', girlId)
      .order('index', { ascending: true });

    if (error) {
      console.error('Error fetching albums:', error);
      return [];
    }

    // 将数据转换为AlbumItem格式
    const albums: AlbumItem[] = data.map(album => {
      const type = album.url.match(/\.(mp4|mov|avi|wmv)$/i) ? 'video' : 'image';
      return {
        id: album.id,
        url: album.url,
        type,
        thumbnail: type === 'video' ? album.thumbnail : undefined
      };
    });

    return albums;
  } catch (error) {
    console.error('Failed to fetch albums:', error);
    return [];
  }
}

// 城市ID到城市名称的映射
const cityIdToName: Record<number, string> = {
  0: '曼谷',
  1: '芭提雅',
  2: '清迈',
};

export default function GirlDetailPage({ params }: { params: { id: string } }) {
  const [girl, setGirl] = useState<Girl | null>(null);
  const [albums, setAlbums] = useState<AlbumItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [isCustomerServiceOpen, setIsCustomerServiceOpen] = useState(false);
  const [selectedServiceName, setSelectedServiceName] = useState('');
  const [selectedServiceDesc, setSelectedServiceDesc] = useState('');
  const router = useRouter();

  // 当客服弹窗打开时防止body滚动
  useEffect(() => {
    if (isCustomerServiceOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isCustomerServiceOpen]);

  // 获取女孩数据
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const girlData = await getGirlById(params.id);
        const albumsData = await getGirlAlbums(params.id);
        
        setGirl(girlData);
        setAlbums(albumsData);
        
        // 默认选中第一个服务
        if (girlData?.course && girlData.course.length > 0) {
          setSelectedService(girlData.course[0].id);
          setSelectedServiceDesc(girlData.course[0].desc);
        }
      } catch (error) {
        console.error('获取女孩数据失败:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, [params.id]);

  // 处理返回按钮
  const handleBack = () => {
    // 使用浏览器原生的返回功能，保持上一页的滚动位置
    window.history.back();
  };

  // 处理选择服务
  const handleServiceChange = (serviceId: number) => {
    if (!girl?.course) return;
    
    const selected = girl.course.find(service => service.id === serviceId);
    if (selected) {
      setSelectedService(selected.id);
      setSelectedServiceDesc(selected.desc);
    }
  };

  // 打开联系表单
  const handleOpenContactForm = () => {
    if (!selectedService || !girl?.course) return;
    
    const selected = girl.course.find(service => service.id === selectedService);
    if (selected) {
      setSelectedServiceName(selected.name);
      setIsCustomerServiceOpen(true);
    }
  };

  // 如果数据还在加载中
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="h-3 w-3 rounded-full bg-brand animate-bounce [animation-delay:-0.3s]"></div>
          <div className="h-3 w-3 rounded-full bg-brand animate-bounce [animation-delay:-0.15s]"></div>
          <div className="h-3 w-3 rounded-full bg-brand animate-bounce"></div>
        </div>
      </div>
    );
  }

  // 如果女孩数据不存在
  if (!girl) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold">未找到该女孩信息</h2>
        <Button onClick={handleBack} className="mt-4">返回首页</Button>
      </div>
    );
  }

  // 格式化语言文本
  const languages = girl.language?.zh?.split(',').map(lang => lang.trim()) || [];
  
  // 获取城市名称
  const cityName = cityIdToName[girl.city_id] || '曼谷';

  return (
    <div className="min-h-screen bg-background">
      {/* 相册区域 */}
      <div className="bg-muted">
        <div className="container mx-auto px-0 md:px-6 mt-0 mb-0">
          {albums.length > 0 ? (
            <GallerySlider 
              items={albums} 
              className="md:max-w-2xl md:mx-auto" 
              onBack={handleBack} 
            />
          ) : (
            <div className="aspect-[4/5] md:max-w-2xl md:mx-auto flex items-center justify-center bg-muted/50 rounded-xl relative">
              <div className="text-muted-foreground">暂无相册</div>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 left-6 z-50 bg-black/30 backdrop-blur-md rounded-full hover:bg-black/50"
                onClick={handleBack}
              >
                <ChevronLeft className="h-5 w-5 text-white" />
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* 内容区域 - 正常显示在相册下方 */}
      <div className="container mx-auto px-0 py-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-background px-4 pt-6 pb-2"
        >
          {/* 基本信息头部 */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold">{girl.name}</h1>
              <span className="ml-2 text-2xl">{girl.nationality}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
              <span className="font-medium">4.9</span>
              <span className="ml-2 text-xs text-gray-400">浏览: {girl.browser_count || 0}</span>
            </div>
          </div>

          {/* 认证和体检标签 */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge className="bg-brand/20 text-brand rounded-full px-3 py-1 pointer-events-none">
              <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
              已认证
            </Badge>
            
            {girl.is_medical && (
              <Badge className="bg-emerald-500/20 text-emerald-600 rounded-full px-3 py-1 pointer-events-none">
                <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
                已体检
              </Badge>
            )}
          </div>
          
          {/* 基本信息表格 */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-8 p-5 mb-6 bg-muted/30 rounded-xl">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">年龄</span>
              <span className="font-medium">{girl.age} 岁</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">身高</span>
              <span className="font-medium">{girl.height} cm</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">三围</span>
              <span className="font-medium">{girl.bwh}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">语言</span>
              <span className="font-medium">{languages.join(', ')}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">可约时间</span>
              <span className="font-medium">{girl.on_time?.substring(0, 5)} - {girl.off_time?.substring(0, 5)}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">城市</span>
              <span className="font-medium">{cityName}</span>
            </div>
          </div>
          
          {/* 个人简介 */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4">个人简介</h2>
            <div className="p-6 bg-muted/30 rounded-xl whitespace-pre-line">
              {girl.profile}
            </div>
          </div>
          
          {/* 标签页切换 */}
          <Tabs defaultValue="services" className="mb-8">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="services">服务项目</TabsTrigger>
              <TabsTrigger value="faq">预订须知</TabsTrigger>
            </TabsList>
            
            {/* 服务项目内容 */}
            <TabsContent value="services">
              <div className="space-y-8">
                {/* 服务选择 - 单选框 */}
                <div className="space-y-6">
                  {girl.course?.map((service) => (
                    <div 
                      key={service.id} 
                      className={`flex justify-between items-center p-6 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedService === service.id ? 'border-brand bg-brand/5' : 'border-muted hover:bg-muted/50'
                      }`}
                      onClick={() => handleServiceChange(service.id)}
                    >
                      <span className="font-medium">{service.name}</span>
                      <div className="flex items-center">
                        <span className="text-brand font-medium mr-3">
                          {service.price} ฿
                        </span>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedService === service.id ? 'border-brand' : 'border-muted-foreground'
                        }`}>
                          {selectedService === service.id && (
                            <div className="w-2.5 h-2.5 rounded-full bg-brand"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 服务说明 */}
                <div className="p-6 bg-muted/30 rounded-lg">
                  <h3 className="font-medium mb-4">服务说明</h3>
                  <p className="text-sm text-muted-foreground">{selectedServiceDesc}</p>
                </div>
                
                {/* 预约按钮 */}
                <Button 
                  onClick={handleOpenContactForm}
                  size="lg"
                  className="w-full mt-8 py-8"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  立即预约
                </Button>
              </div>
            </TabsContent>
            
            {/* 预订须知内容 */}
            <TabsContent value="faq">
              <div className="space-y-6 p-6 bg-muted/30 rounded-xl">
                <div>
                  <h3 className="font-semibold mb-3">🔹 如何预订</h3>
                  <p className="text-muted-foreground">
                    请联系我们的客服，提供您所选女孩、服务和预定时间，客服会为您安排。
                  </p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold mb-3">🔹 服务地点</h3>
                  <p className="text-muted-foreground">
                    我们提供上门服务，可以安排在您入住的酒店或者指定地点。
                  </p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold mb-3">🔹 支付方式</h3>
                  <p className="text-muted-foreground">
                    支付定金后，待Hottie Girl抵达结清尾款即可。
                  </p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold mb-3">🔹 取消政策</h3>
                  <p className="text-muted-foreground">
                    Hottie Girl抵达后取消将扣除定金1000，剩余返还余额。
                  </p>
                </div>
                
                {/* 预约按钮 */}
                <Button 
                  onClick={handleOpenContactForm}
                  size="lg"
                  className="w-full mt-8 py-8"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  立即预约
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
      
      {/* 滚动到顶部按钮 */}
      <ScrollToTopButton />
      
      {/* 客服联系弹窗 */}
      <CustomerServiceDialog
        isOpen={isCustomerServiceOpen}
        onClose={() => setIsCustomerServiceOpen(false)}
      />
    </div>
  );
}