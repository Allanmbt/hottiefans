import { supabase, Category, Girl } from './supabase';

/**
 * 获取所有分类
 */
export async function getCategories(): Promise<Category[]> {
    try {
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .order('id', { ascending: true });

        if (error) {
            console.error('Error fetching categories:', error);
            return [];
        }

        return data || [];
    } catch (error) {
        console.error('Failed to fetch categories:', error);
        return [];
    }
}

/**
 * 获取所有女孩数据
 */
export async function getGirls(options: {
    categoryId?: number;
    page?: number;
    limit?: number;
    sortBy?: string;
    cityId?: number;
    isShow?: boolean;
} = {}): Promise<Girl[]> {
    try {
        const {
            categoryId,
            page = 1,
            limit = 10,
            sortBy = 'created_at',
            cityId,
            isShow = true
        } = options;

        let query = supabase
            .from('girls')
            .select('*');

        // 添加过滤条件
        if (categoryId && categoryId !== 0) {
            query = query.eq('category_id', categoryId);
        }

        if (cityId !== undefined) {
            query = query.eq('city_id', cityId);
        }

        // 默认只显示is_show=true的数据
        query = query.eq('is_show', isShow);

        // 分页
        const startIndex = (page - 1) * limit;
        query = query.range(startIndex, startIndex + limit - 1);

        // 排序
        switch (sortBy) {
            case 'recommended':
                // 获取当前日期作为种子
                const today = new Date();
                const dateSeed = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
                
                // 使用数据库内置的随机排序功能，但使用日期作为种子
                // 注意: 这里使用PostgreSQL的random()函数，但加上了种子参数
                // 这样同一天内的种子相同，排序结果相同
                query = query.order('id', { ascending: true });  // 先按ID排序确保一致性
                
                // 在客户端对结果进行基于日期种子的排序
                const { data, error } = await query;
                
                if (error) {
                    throw error;
                }
                
                // 使用日期作为随机种子，确保同一天获取相同顺序
                const shuffled = shuffleArray(data, dateSeed);
                return shuffled;
            case 'newest':
                query = query.order('created_at', { ascending: false });
                break;
            case 'popular':
                query = query.order('browser_count', { ascending: false });
                break;
            case 'price_low':
                query = query.order('min_price', { ascending: true });
                break;
            case 'price_high':
                query = query.order('min_price', { ascending: false });
                break;
            default:
                query = query.order('created_at', { ascending: false });
                break;
        }

        // 如果不是推荐模式，正常执行查询
        if (sortBy !== 'recommended') {
            const { data, error } = await query;

            if (error) {
                console.error('Error fetching girls:', error.message);
                console.error('Error details:', error);
                console.error('Query params:', { categoryId, page, limit, sortBy, cityId, isShow });
                return [];
            }

            // 验证返回的数据格式
            if (data && Array.isArray(data)) {
                // 对数据进行基本验证，确保关键字段存在
                const validData = data.filter(item => {
                    if (!item.id || !item.name) {
                        console.warn('Invalid girl data found:', item);
                        return false;
                    }
                    return true;
                });

                console.log(`Successfully fetched ${validData.length} girls`);
                return validData;
            }

            console.warn('Invalid data format returned from Supabase:', data);
            return [];
        }
        
        // 这里处理推荐模式的返回，前面已经直接返回了
        return [];
    } catch (error) {
        console.error('Failed to fetch girls:', error);
        return [];
    }
}

/**
 * 使用特定种子进行数组随机排序的函数
 * 这样确保每天使用相同种子时获得相同排序
 */
function shuffleArray<T>(array: T[], seed: string): T[] {
    const result = [...array];
    const seedNumber = hashString(seed);
    
    // 使用种子值创建伪随机数生成器
    const random = seedRandom(seedNumber);
    
    // Fisher-Yates 洗牌算法
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    
    return result;
}

/**
 * 将字符串转换为数字作为种子
 */
function hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

/**
 * 简单的伪随机数生成器
 */
function seedRandom(seed: number): () => number {
    return function() {
        seed = (seed * 9301 + 49297) % 233280;
        return seed / 233280;
    };
} 