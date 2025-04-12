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
    } catch (error) {
        console.error('Failed to fetch girls:', error);
        return [];
    }
} 