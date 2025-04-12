import { createClient } from '@supabase/supabase-js';

// 环境变量
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// 创建Supabase客户端
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 类型定义
export type Category = {
    id: number;
    name_zh: string;
    name_en: string;
    created_at: string;
    auth_users_id?: string | null;
};

// 女孩数据类型定义
export type Course = {
    id: number;
    desc: string;
    name: string;
    price: number;
    desc_en: string;
    name_en: string;
    cost_price: string;
}

export type Position = {
    lat: number;
    lon: number;
}

export type Avatar = {
    url: string;
    width: number;
    height: number;
}

export type LocalizedText = {
    zh: string;
    en: string;
    type?: number;
}

export type Girl = {
    id: string;
    name: string;
    name_en: string;
    age: number;
    city_id: number;
    gender: number;
    height: number;
    bwh: string;
    zhaobei: string;
    boobs: string | number;
    complexion: string | number;
    language: LocalizedText;
    badge: string;
    profile: string;
    profile_en: string;
    experience: number;
    nationality: string;
    course: Course[];
    position: Position;
    on_time: string;
    off_time: string;
    min_price: number;
    browser_count: number;
    sale_count: number;
    is_medical: boolean;
    status: number;
    created_at: string;
    category_id: number;
    avatar: Avatar;
    auth_user_id: string | null;
    is_show: boolean;
    tags: LocalizedText;
}; 