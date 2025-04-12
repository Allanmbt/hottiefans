// app/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import GirlCard from '@/components/TherapistCard';
import { ScrollToTopButton } from '@/components/ScrollToTopButton';
import { Skeleton } from '@/components/ui/skeleton';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronDown, Filter, MapPin, SlidersHorizontal } from 'lucide-react';
import { getCategories, getGirls } from '@/lib/api';
import { Category, Girl } from '@/lib/supabase';

// 默认服务分类（fallback）
const defaultServiceCategories: Category[] = [
  { id: 0, name_zh: '全部', name_en: 'All', created_at: '' },
  { id: 1, name_zh: '即时上门', name_en: 'Immediate', created_at: '' },
  { id: 2, name_zh: '高端预约', name_en: 'Premium', created_at: '' },
  { id: 3, name_zh: '越南专区', name_en: 'Vietnam', created_at: '' },
  { id: 4, name_zh: '中国专区', name_en: 'China', created_at: '' },
  { id: 5, name_zh: '日本/俄罗斯专区', name_en: 'Japan/Russia', created_at: '' },
];

// 地区分类
const locationCategories = [
  { id: 0, name: '曼谷' },
  { id: 1, name: '芭提雅' },
  { id: 2, name: '清迈' },
];

// 排序选项
const sortOptions = [
  { id: 'recommended', name: '推荐' },
  { id: 'newest', name: '最新' },
  { id: 'popular', name: '热门' },
  { id: 'price_low', name: '价格低到高' },
  { id: 'price_high', name: '价格高到低' },
];

// 每页显示的数量
const PAGE_SIZE = 8;

export default function Home() {
  const [girls, setGirls] = useState<Girl[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [serviceCategories, setServiceCategories] = useState<Category[]>([
    { id: 0, name_zh: '全部', name_en: 'All', created_at: '' }
  ]);
  const [totalCount, setTotalCount] = useState(0);

  // 筛选和排序状态
  const [serviceCategory, setServiceCategory] = useState('0');
  const [locationCategory, setLocationCategory] = useState('0');
  const [sortOption, setSortOption] = useState('recommended');

  // 用于检测是否触底
  const { ref: bottomRef, inView: bottomInView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // 初始化加载分类数据
  useEffect(() => {
    async function fetchCategories() {
      try {
        const categoriesData = await getCategories();
        if (categoriesData && categoriesData.length > 0) {
          // 添加"全部"选项
          const allCategories = [
            { id: 0, name_zh: '全部', name_en: 'All', created_at: '' },
            ...categoriesData
          ];
          setServiceCategories(allCategories);
        } else {
          // 无数据或出错时使用默认分类
          setServiceCategories(defaultServiceCategories);
        }
      } catch (error) {
        console.error('无法加载分类数据:', error);
        setServiceCategories(defaultServiceCategories);
      }
    }

    fetchCategories();
  }, []);

  // 初始加载女孩数据
  useEffect(() => {
    loadGirls(1, true);
  }, [serviceCategory, locationCategory, sortOption]);

  // 监听触底事件加载更多数据
  useEffect(() => {
    if (bottomInView && !loading && hasMore) {
      loadMoreGirls();
    }
  }, [bottomInView, loading, hasMore]);

  // 加载女孩数据
  const loadGirls = async (pageNum: number, isNewFilter = false) => {
    if (loading && !isNewFilter) return;

    try {
      setLoading(true);
      if (isNewFilter) {
        setInitialLoading(true);
        setPage(1);
      }

      const categoryId = parseInt(serviceCategory);
      const cityId = parseInt(locationCategory);

      console.log('Fetching girls with params:', {
        categoryId: categoryId === 0 ? undefined : categoryId,
        cityId,
        page: pageNum,
        limit: PAGE_SIZE,
        sortBy: sortOption
      });

      const girlsData = await getGirls({
        categoryId: categoryId === 0 ? undefined : categoryId,
        cityId: cityId,
        page: pageNum,
        limit: PAGE_SIZE,
        sortBy: sortOption,
      });

      if (isNewFilter) {
        setGirls(girlsData);
      } else {
        setGirls(prev => [...prev, ...girlsData]);
      }

      // 判断是否还有更多数据
      setHasMore(girlsData.length === PAGE_SIZE);

    } catch (error) {
      console.error('加载女孩数据失败:', error);
    } finally {
      if (isNewFilter) {
        setInitialLoading(false);
      }
      setLoading(false);
    }
  };

  // 加载更多数据
  const loadMoreGirls = () => {
    if (loading || !hasMore) return;
    const nextPage = page + 1;
    setPage(nextPage);
    loadGirls(nextPage);
  };

  // 处理技师卡片点击
  const handleGirlClick = (id: string) => {
    console.log(`Navigate to girl profile: ${id}`);
    // 这里可以添加导航逻辑
  };

  // 返回当前所选地区名称
  const getLocationName = () => {
    const location = locationCategories.find(loc => loc.id.toString() === locationCategory);
    return location ? location.name : '曼谷';
  };

  // 返回当前排序选项名称
  const getSortName = () => {
    const sort = sortOptions.find(opt => opt.id === sortOption);
    return sort ? sort.name : '推荐';
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 主要内容区域 */}
      <main className="flex-1">
        <div className="container px-4 py-6 sm:py-8 md:py-10">
          {/* 页面标题 */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5"
          >
            <h1 className="text-2xl sm:text-3xl font-bold mb-1">找到你心仪的女孩</h1>
            <p className="text-muted-foreground">探索我们精选的女孩，找到你的完美陪伴</p>
          </motion.div>

          {/* 分类筛选区域 */}
          {!initialLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-6 space-y-3"
            >
              {/* 服务分类 */}
              <div className="overflow-x-auto no-scrollbar">
                <Tabs
                  defaultValue="0"
                  value={serviceCategory}
                  onValueChange={setServiceCategory}
                  className="w-full"
                >
                  <TabsList className="bg-background border border-border/50 p-1 rounded-lg shadow-sm">
                    {serviceCategories.map((category) => (
                      <TabsTrigger
                        key={category.id}
                        value={category.id.toString()}
                        className="data-[state=active]:bg-brand data-[state=active]:text-black rounded-md px-3 py-1.5 text-sm font-medium transition"
                      >
                        {category.name_zh}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>

              {/* 城市和排序选项 - 移动端下拉菜单，桌面端Tabs */}
              <div className="flex items-center justify-between gap-2">
                {/* 大屏幕显示Tabs */}
                <div className="hidden sm:block overflow-x-auto flex-1 no-scrollbar">
                  <Tabs
                    defaultValue="0"
                    value={locationCategory}
                    onValueChange={setLocationCategory}
                    className="w-full"
                  >
                    <TabsList className="bg-background border border-border/50 p-1 rounded-lg shadow-sm">
                      {locationCategories.map((location) => (
                        <TabsTrigger
                          key={location.id}
                          value={location.id.toString()}
                          className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-md px-3 py-1 text-sm font-medium transition"
                        >
                          {location.name}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </Tabs>
                </div>

                {/* 移动端显示下拉菜单 - 左对齐 */}
                <div className="flex sm:hidden items-center space-x-2 justify-start w-full">
                  <div className="flex-initial w-auto">
                    <Select value={locationCategory} onValueChange={setLocationCategory}>
                      <SelectTrigger className="h-9 text-sm bg-background border-border rounded-md shadow-sm min-w-[100px] w-auto max-w-[120px]">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1.5 text-muted-foreground" />
                          <SelectValue placeholder="地区">{getLocationName()}</SelectValue>
                        </div>
                      </SelectTrigger>
                      <SelectContent className="bg-background border-border">
                        {locationCategories.map((location) => (
                          <SelectItem key={location.id} value={location.id.toString()}>
                            {location.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* 移动端显示排序下拉菜单 */}
                  <div className="flex-initial w-auto">
                    <Select value={sortOption} onValueChange={setSortOption}>
                      <SelectTrigger className="h-9 text-sm bg-background border-border rounded-md shadow-sm min-w-[100px] w-auto">
                        <div className="flex items-center">
                          <SlidersHorizontal className="w-4 h-4 mr-1.5 text-muted-foreground" />
                          <SelectValue placeholder="排序">{getSortName()}</SelectValue>
                        </div>
                      </SelectTrigger>
                      <SelectContent className="bg-background border-border">
                        {sortOptions.map((option) => (
                          <SelectItem key={option.id} value={option.id}>
                            {option.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* 大屏幕显示按钮组 */}
                <div className="hidden sm:flex items-center space-x-1">
                  <span className="text-sm text-muted-foreground mr-1">排序：</span>
                  {sortOptions.map((option) => (
                    <Button
                      key={option.id}
                      variant={sortOption === option.id ? "secondary" : "ghost"}
                      size="sm"
                      onClick={() => setSortOption(option.id)}
                      className={`px-3 py-1 h-auto text-sm font-medium ${sortOption === option.id
                        ? 'bg-secondary text-secondary-foreground'
                        : 'hover:bg-accent hover:text-accent-foreground'
                        }`}
                    >
                      {option.name}
                    </Button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* 骨架屏加载状态 */}
          {initialLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {Array(8).fill(null).map((_, index) => (
                <CardSkeleton key={index} />
              ))}
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {/* 技师列表 - 响应式布局 */}
              {girls.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {girls.map((girl, index) => (
                    <motion.div
                      key={girl.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{
                        duration: 0.4,
                        delay: Math.min(0.1 * (index % PAGE_SIZE), 0.5)
                      }}
                    >
                      <GirlCard
                        {...girl}
                        onClick={handleGirlClick}
                      />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-lg text-muted-foreground">暂无符合条件的女孩</p>
                </div>
              )}
            </AnimatePresence>
          )}

          {/* 底部加载更多指示器 */}
          <div className="mt-8 flex justify-center" ref={bottomRef}>
            {loading && !initialLoading && (
              <LoadingIndicator />
            )}
          </div>

          {/* 没有更多数据提示 */}
          {!hasMore && !initialLoading && girls.length > 0 && (
            <div className="mt-8 text-center text-muted-foreground">
              没有更多女孩了
            </div>
          )}
        </div>
      </main>

      {/* 滚动到顶部按钮 */}
      <ScrollToTopButton />
    </div>
  );
}

// 卡片骨架屏
function CardSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden border border-border/10 bg-card shadow-sm">
      <div className="relative aspect-[4/5]">
        <Skeleton className="absolute inset-0" />
      </div>
      <div className="p-3 space-y-3">
        <div className="flex justify-between">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-5 w-10" />
        </div>
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-14" />
        </div>
        <div className="flex justify-between pt-1">
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-3 w-12" />
        </div>
      </div>
    </div>
  );
}

// 加载指示器
function LoadingIndicator() {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="h-2 w-2 rounded-full bg-brand animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-2 w-2 rounded-full bg-brand animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-2 w-2 rounded-full bg-brand animate-bounce"></div>
    </div>
  );
}