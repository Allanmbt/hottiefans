# HottieFans - 泰国技师预约平台

HottieFans是一个基于Next.js开发的泰国技师预约平台，使用Supabase作为后端数据库。该平台提供了技师列表、详细信息、预约功能等服务。

## 项目特点

- 响应式设计，适配移动端和桌面端
- 多语言支持（中文、英文）
- 实时数据更新
- 技师筛选和搜索功能
- 安全的用户认证和支付系统

## 技术栈

- **前端框架**: Next.js 14 (App Router)
- **UI组件**: Tailwind CSS + Shadcn UI
- **状态管理**: React Hooks
- **后端服务**: Supabase
- **动画效果**: Framer Motion
- **部署平台**: Vercel

## 项目结构

```
hottiefans/
├── app/                   # Next.js应用目录
│   ├── page.tsx           # 首页
│   ├── blog/              # 博客页面
│   └── globals.css        # 全局样式
├── components/            # 组件目录
│   ├── TherapistCard.tsx  # 技师卡片组件
│   ├── ui/                # UI组件
│   └── ...                # 其他组件
├── lib/                   # 工具库
│   ├── api.ts             # API服务
│   ├── supabase.ts        # Supabase配置和类型
│   └── utils.ts           # 工具函数
├── public/                # 静态资源
└── ...                    # 其他配置文件
```

## 数据结构

### 女孩 (Girl)

```typescript
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
  boobs: string;
  complexion: number;
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
```

### 分类 (Category)

```typescript
export type Category = {
  id: number;
  name_zh: string;
  name_en: string;
  created_at: string;
  auth_users_id?: string | null;
};
```

### 课程 (Course)

```typescript
export type Course = {
  id: number;
  desc: string;
  name: string;
  price: number;
  desc_en: string;
  name_en: string;
  cost_price: string;
}
```

## 安装和运行

1. 克隆仓库

```bash
git clone https://github.com/yourusername/hottiefans.git
cd hottiefans
```

2. 安装依赖

```bash
npm install
# 或
yarn install
```

3. 创建环境变量文件 `.env.local`

```
NEXT_PUBLIC_SUPABASE_URL=你的Supabase项目URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的Supabase匿名密钥
```

4. 运行开发服务器

```bash
npm run dev
# 或
yarn dev
```

5. 在浏览器中打开 [http://localhost:3000](http://localhost:3000)

## Supabase集成说明

项目使用Supabase作为后端服务，主要包含以下表结构：

1. **categories**: 服务分类表
2. **girls**: 技师信息表
3. **albums**: 相册表

数据获取使用了Supabase的JavaScript客户端，具体实现请参考 `lib/api.ts`。

## 部署

项目可以轻松部署到Vercel平台：

1. 在[Vercel](https://vercel.com)创建一个新项目
2. 链接你的GitHub仓库
3. 添加环境变量
4. 点击部署

## 贡献指南

1. Fork项目
2. 创建分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建Pull Request

## 许可证

[MIT](LICENSE)
