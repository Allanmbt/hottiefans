// components/booking/booking-confirm-form.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Info, Clock, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// 模拟数据 - 实际项目中应该从API或状态管理获取
const mockTherapist = {
    id: "th123",
    name: "Sophie",
    age: 25,
    photo: "/images/therapist1.jpg",
    nationality: "法国",
    languages: ["英语", "法语"],
    rating: 4.9,
};

const mockService = {
    id: "sv123",
    name: "深度放松按摩",
    duration: 60,
    price: 1500,
    description: "专业的全身深度按摩，缓解身体疲劳，促进血液循环",
};

const additionalServices = [
    {
        id: "as1",
        name: "热石按摩",
        duration: 15,
        price: 300,
        description: "使用温热的火山石进行按摩，有助于肌肉放松",
    },
    {
        id: "as2",
        name: "精油芳香疗法",
        duration: 10,
        price: 200,
        description: "使用天然精油提升按摩效果，帮助身心放松",
    },
    {
        id: "as3",
        name: "面部护理",
        duration: 20,
        price: 350,
        description: "专业的面部按摩和护理，改善肤质",
    },
    {
        id: "as4",
        name: "足部反射疗法",
        duration: 15,
        price: 250,
        description: "刺激足部反射区，平衡身体能量",
    },
];

const customizationOptions = {
    outfit: [
        { id: "of1", name: "职业装", price: 100 },
        { id: "of2", name: "和服", price: 150 },
        { id: "of3", name: "运动装", price: 100 },
        { id: "of4", name: "泳装", price: 200 },
        { id: "of5", name: "礼服", price: 150 },
    ],
    stockings: [
        { id: "st1", name: "黑色丝袜", price: 50 },
        { id: "st2", name: "白色丝袜", price: 50 },
        { id: "st3", name: "网眼丝袜", price: 80 },
        { id: "st4", name: "长筒袜", price: 70 },
    ],
    accessories: [
        { id: "ac1", name: "高跟鞋", price: 50 },
        { id: "ac2", name: "项链", price: 30 },
        { id: "ac3", name: "手链", price: 20 },
        { id: "ac4", name: "眼镜", price: 40 },
    ],
};

const timeSlots = [
    { slot: "10:00 - 11:00", available: true },
    { slot: "11:30 - 12:30", available: true },
    { slot: "13:00 - 14:00", available: false },
    { slot: "14:30 - 15:30", available: true },
    { slot: "16:00 - 17:00", available: true },
    { slot: "17:30 - 18:30", available: false },
    { slot: "19:00 - 20:00", available: true },
    { slot: "20:30 - 21:30", available: true },
];

const bookingNotes = [
    "请提前15分钟到达以完成入住手续",
    "如需取消预约，请至少提前4小时通知",
    "请保持个人卫生，并在按摩前淋浴",
    "服务期间请尊重技师，不得有任何不当行为",
    "我们接受现金和信用卡支付",
];

// 定义表单验证模式
const formSchema = z.object({
    appointmentDate: z.date({
        required_error: "请选择日期",
    }),
    timeSlot: z.string({
        required_error: "请选择时间段",
    }),
    additionalServices: z.array(z.string()).optional(),
    outfit: z.string().optional(),
    stockings: z.string().optional(),
    accessories: z.array(z.string()).optional(),
    agreeToTerms: z.boolean().refine((val) => val === true, {
        message: "您必须同意预约条款",
    }),
});

export default function BookingConfirmForm() {
    const router = useRouter();
    const [totalPrice, setTotalPrice] = useState(mockService.price);
    const [totalDuration, setTotalDuration] = useState(mockService.duration);

    // 初始化表单
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            additionalServices: [],
            accessories: [],
            agreeToTerms: false,
        },
    });

    // 监听表单值变化，计算总价和时长
    const watchedValues = form.watch();

    useEffect(() => {
        let price = mockService.price;
        let duration = mockService.duration;

        // 计算附加服务
        if (watchedValues.additionalServices) {
            watchedValues.additionalServices.forEach((serviceId) => {
                const service = additionalServices.find((s) => s.id === serviceId);
                if (service) {
                    price += service.price;
                    duration += service.duration;
                }
            });
        }

        // 计算装扮选项
        if (watchedValues.outfit) {
            const outfit = customizationOptions.outfit.find(
                (o) => o.id === watchedValues.outfit
            );
            if (outfit) price += outfit.price;
        }

        if (watchedValues.stockings) {
            const stockings = customizationOptions.stockings.find(
                (s) => s.id === watchedValues.stockings
            );
            if (stockings) price += stockings.price;
        }

        if (watchedValues.accessories) {
            watchedValues.accessories.forEach((accessoryId) => {
                const accessory = customizationOptions.accessories.find(
                    (a) => a.id === accessoryId
                );
                if (accessory) price += accessory.price;
            });
        }

        setTotalPrice(price);
        setTotalDuration(duration);
    }, [watchedValues]);

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        // 这里应该有提交预约的逻辑
        // 提交成功后跳转到成功页面
        router.push("/booking/success");
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* 左侧:技师和服务信息 */}
                        <div>
                            <Card className="mb-6">
                                <CardHeader className="pb-2">
                                    <h2 className="text-xl font-semibold">技师信息</h2>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center space-x-4">
                                        <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                                            <Image
                                                src={mockTherapist.photo}
                                                alt={mockTherapist.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-lg">{mockTherapist.name}</h3>
                                            <p className="text-muted-foreground">
                                                {mockTherapist.age}岁 · {mockTherapist.nationality}
                                            </p>
                                            <div className="flex space-x-1 mt-1">
                                                {mockTherapist.languages.map((lang) => (
                                                    <Badge key={lang} variant="outline">
                                                        {lang}
                                                    </Badge>
                                                ))}
                                            </div>
                                            <div className="flex items-center mt-2">
                                                <span className="text-amber-500">★</span>
                                                <span className="ml-1">{mockTherapist.rating}</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="pb-2">
                                    <h2 className="text-xl font-semibold">基础服务</h2>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <h3 className="font-medium">{mockService.name}</h3>
                                        <p className="text-sm text-muted-foreground">
                                            {mockService.description}
                                        </p>
                                        <div className="flex justify-between items-center mt-3">
                                            <div className="flex items-center text-sm text-muted-foreground">
                                                <Clock className="h-4 w-4 mr-1" />
                                                {mockService.duration} 分钟
                                            </div>
                                            <div className="font-medium">
                                                ¥{mockService.price}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* 中间:选项 */}
                        <div className="lg:col-span-2 space-y-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Card>
                                    <CardHeader className="pb-2">
                                        <h2 className="text-xl font-semibold">附加服务</h2>
                                        <p className="text-sm text-muted-foreground">
                                            选择额外服务提升体验
                                        </p>
                                    </CardHeader>
                                    <CardContent>
                                        <FormField
                                            control={form.control}
                                            name="additionalServices"
                                            render={() => (
                                                <FormItem>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        {additionalServices.map((service) => (
                                                            <label
                                                                key={service.id}
                                                                className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-accent transition-colors cursor-pointer"
                                                            >
                                                                <FormControl>
                                                                    <Checkbox
                                                                        checked={form.watch("additionalServices")?.includes(
                                                                            service.id
                                                                        )}
                                                                        onCheckedChange={(checked) => {
                                                                            const current = form.getValues(
                                                                                "additionalServices"
                                                                            ) || [];
                                                                            const updated = checked
                                                                                ? [...current, service.id]
                                                                                : current.filter((id) => id !== service.id);
                                                                            form.setValue("additionalServices", updated, {
                                                                                shouldValidate: true,
                                                                            });
                                                                        }}
                                                                    />
                                                                </FormControl>
                                                                <div className="space-y-1 flex-1">
                                                                    <div className="font-medium">{service.name}</div>
                                                                    <div className="text-sm text-muted-foreground">
                                                                        {service.description}
                                                                    </div>
                                                                    <div className="flex justify-between items-center pt-1">
                                                                        <div className="text-sm flex items-center">
                                                                            <Clock className="h-3 w-3 mr-1" />
                                                                            +{service.duration}分钟
                                                                        </div>
                                                                        <div className="font-medium">+¥{service.price}</div>
                                                                    </div>
                                                                </div>
                                                            </label>
                                                        ))}
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                    </CardContent>
                                </Card>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.1 }}
                            >
                                <Card>
                                    <CardHeader className="pb-2">
                                        <h2 className="text-xl font-semibold">个性化定制</h2>
                                        <p className="text-sm text-muted-foreground">
                                            选择您偏好的服装和配饰
                                        </p>
                                    </CardHeader>
                                    <CardContent>
                                        <Accordion type="single" collapsible defaultValue="outfit" className="space-y-4">
                                            <AccordionItem value="outfit" className="border rounded-lg px-4">
                                                <AccordionTrigger>制服选择</AccordionTrigger>
                                                <AccordionContent>
                                                    <FormField
                                                        control={form.control}
                                                        name="outfit"
                                                        render={({ field }) => (
                                                            <FormItem className="space-y-3">
                                                                <FormControl>
                                                                    <RadioGroup
                                                                        onValueChange={field.onChange}
                                                                        defaultValue={field.value}
                                                                        className="grid grid-cols-2 gap-4"
                                                                    >
                                                                        {customizationOptions.outfit.map((item) => (
                                                                            <div key={item.id} className="flex items-center space-x-2">
                                                                                <RadioGroupItem
                                                                                    value={item.id}
                                                                                    id={`outfit-${item.id}`}
                                                                                />
                                                                                <label
                                                                                    htmlFor={`outfit-${item.id}`}
                                                                                    className="flex justify-between w-full cursor-pointer"
                                                                                >
                                                                                    <span>{item.name}</span>
                                                                                    <span className="text-muted-foreground">
                                                                                        +¥{item.price}
                                                                                    </span>
                                                                                </label>
                                                                            </div>
                                                                        ))}
                                                                    </RadioGroup>
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </AccordionContent>
                                            </AccordionItem>

                                            <AccordionItem value="stockings" className="border rounded-lg px-4">
                                                <AccordionTrigger>丝袜选择</AccordionTrigger>
                                                <AccordionContent>
                                                    <FormField
                                                        control={form.control}
                                                        name="stockings"
                                                        render={({ field }) => (
                                                            <FormItem className="space-y-3">
                                                                <FormControl>
                                                                    <RadioGroup
                                                                        onValueChange={field.onChange}
                                                                        defaultValue={field.value}
                                                                        className="grid grid-cols-2 gap-4"
                                                                    >
                                                                        {customizationOptions.stockings.map((item) => (
                                                                            <div key={item.id} className="flex items-center space-x-2">
                                                                                <RadioGroupItem
                                                                                    value={item.id}
                                                                                    id={`stockings-${item.id}`}
                                                                                />
                                                                                <label
                                                                                    htmlFor={`stockings-${item.id}`}
                                                                                    className="flex justify-between w-full cursor-pointer"
                                                                                >
                                                                                    <span>{item.name}</span>
                                                                                    <span className="text-muted-foreground">
                                                                                        +¥{item.price}
                                                                                    </span>
                                                                                </label>
                                                                            </div>
                                                                        ))}
                                                                    </RadioGroup>
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </AccordionContent>
                                            </AccordionItem>

                                            <AccordionItem value="accessories" className="border rounded-lg px-4">
                                                <AccordionTrigger>配饰选择</AccordionTrigger>
                                                <AccordionContent>
                                                    <FormField
                                                        control={form.control}
                                                        name="accessories"
                                                        render={() => (
                                                            <FormItem>
                                                                <div className="grid grid-cols-2 gap-4">
                                                                    {customizationOptions.accessories.map((item) => (
                                                                        <label
                                                                            key={item.id}
                                                                            className="flex items-center space-x-2"
                                                                        >
                                                                            <FormControl>
                                                                                <Checkbox
                                                                                    checked={form.watch("accessories")?.includes(
                                                                                        item.id
                                                                                    )}
                                                                                    onCheckedChange={(checked) => {
                                                                                        const current = form.getValues("accessories") || [];
                                                                                        const updated = checked
                                                                                            ? [...current, item.id]
                                                                                            : current.filter((id) => id !== item.id);
                                                                                        form.setValue("accessories", updated, {
                                                                                            shouldValidate: true,
                                                                                        });
                                                                                    }}
                                                                                />
                                                                            </FormControl>
                                                                            <div className="flex justify-between w-full">
                                                                                <span>{item.name}</span>
                                                                                <span className="text-muted-foreground">
                                                                                    +¥{item.price}
                                                                                </span>
                                                                            </div>
                                                                        </label>
                                                                    ))}
                                                                </div>
                                                            </FormItem>
                                                        )}
                                                    />
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.2 }}
                            >
                                <Card>
                                    <CardHeader className="pb-2">
                                        <h2 className="text-xl font-semibold">选择时间</h2>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <FormField
                                            control={form.control}
                                            name="appointmentDate"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel>预约日期</FormLabel>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant={"outline"}
                                                                    className={cn(
                                                                        "w-full pl-3 text-left font-normal",
                                                                        !field.value && "text-muted-foreground"
                                                                    )}
                                                                >
                                                                    {field.value ? (
                                                                        format(field.value, "yyyy年MM月dd日")
                                                                    ) : (
                                                                        <span>选择日期</span>
                                                                    )}
                                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto p-0" align="start">
                                                            <Calendar
                                                                mode="single"
                                                                selected={field.value}
                                                                onSelect={field.onChange}
                                                                disabled={(date) => {
                                                                    // 禁用过去的日期和 2 周以后的日期
                                                                    const today = new Date();
                                                                    today.setHours(0, 0, 0, 0);
                                                                    const twoWeeksLater = new Date();
                                                                    twoWeeksLater.setDate(today.getDate() + 14);
                                                                    return (
                                                                        date < today || date > twoWeeksLater
                                                                    );
                                                                }}
                                                                initialFocus
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="timeSlot"
                                            render={({ field }) => (
                                                <FormItem className="space-y-3">
                                                    <FormLabel>预约时间</FormLabel>
                                                    <FormControl>
                                                        <RadioGroup
                                                            onValueChange={field.onChange}
                                                            defaultValue={field.value}
                                                            className="grid grid-cols-2 md:grid-cols-4 gap-3"
                                                        >
                                                            {timeSlots.map((slot) => (
                                                                <div key={slot.slot}>
                                                                    <RadioGroupItem
                                                                        value={slot.slot}
                                                                        id={`time-${slot.slot}`}
                                                                        disabled={!slot.available}
                                                                        className="sr-only"
                                                                    />
                                                                    <label
                                                                        htmlFor={`time-${slot.slot}`}
                                                                        className={cn(
                                                                            "flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium border transition-colors",
                                                                            field.value === slot.slot
                                                                                ? "bg-primary text-primary-foreground border-primary"
                                                                                : slot.available
                                                                                    ? "hover:bg-accent cursor-pointer"
                                                                                    : "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
                                                                        )}
                                                                    >
                                                                        {slot.slot}
                                                                    </label>
                                                                </div>
                                                            ))}
                                                        </RadioGroup>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </CardContent>
                                </Card>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.3 }}
                            >
                                <Card>
                                    <CardHeader className="pb-2">
                                        <div className="flex items-center">
                                            <h2 className="text-xl font-semibold">预约须知</h2>
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Info className="ml-2 h-4 w-4 text-muted-foreground" />
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p className="w-80">请仔细阅读预约须知</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="list-disc pl-5 space-y-2">
                                            {bookingNotes.map((note, index) => (
                                                <li key={index} className="text-sm">{note}</li>
                                            ))}
                                        </ul>
                                        <FormField
                                            control={form.control}
                                            name="agreeToTerms"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-4 p-4 border rounded-md">
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                    <div className="space-y-1 leading-none">
                                                        <FormLabel>
                                                            我已阅读并同意预约条款和隐私政策
                                                        </FormLabel>
                                                    </div>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </div>
                    </div>

                    {/* 价格摘要和确认按钮 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.4 }}
                    >
                        <Card className="sticky bottom-0 z-10 backdrop-blur-sm bg-card/95 border-t">
                            <CardContent className="flex flex-col sm:flex-row justify-between items-center py-4">
                                <div className="flex-1 space-y-1 mb-4 sm:mb-0">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">服务总时长:</span>
                                        <span className="font-medium">{totalDuration} 分钟</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">总价:</span>
                                        <span className="text-xl font-bold">¥{totalPrice}</span>
                                    </div>
                                </div>
                                <Button type="submit" size="lg" className="w-full sm:w-auto">
                                    <Check className="mr-2 h-4 w-4" /> 确认预约
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                </form>
            </Form>
        </div>
    );
}