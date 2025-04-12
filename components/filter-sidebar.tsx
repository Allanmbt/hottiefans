'use client'
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { X } from "lucide-react";
import { useState } from "react";

// 筛选选项类型定义
interface FilterOptions {
    specialties: string[];
    services: string[];
    ageRange: [number, number]; // 明确定义为元组类型
    experienceMin: number;
    languages: string[];
}

interface FilterSidebarProps {
    specialties: { id: string; name: string }[];
    services: { id: string; name: string }[];
    languages: { id: string; name: string }[];
    onFilterChange?: (filters: FilterOptions) => void;
}

export default function FilterSidebar({
    specialties,
    services,
    languages,
    onFilterChange = () => { },
}: FilterSidebarProps) {
    const [filters, setFilters] = useState<FilterOptions>({
        specialties: [],
        services: [],
        ageRange: [20, 45],
        experienceMin: 0,
        languages: [],
    });

    // 处理复选框变更
    const handleCheckboxChange = (
        category: keyof Pick<FilterOptions, "specialties" | "services" | "languages">,
        value: string
    ) => {
        setFilters((prev) => {
            const updated = prev[category].includes(value)
                ? prev[category].filter((v) => v !== value)
                : [...prev[category], value];

            const newFilters = { ...prev, [category]: updated };
            onFilterChange(newFilters);
            return newFilters;
        });
    };

    // 处理年龄滑块变更
    const handleAgeRangeChange = (value: number[]) => {
        setFilters(prev => {
            // 确保使用元组类型赋值
            const newFilters = {
                ...prev,
                ageRange: [value[0], value[1]] as [number, number]
            };
            onFilterChange(newFilters);
            return newFilters;
        });
    };

    // 处理经验滑块变更
    const handleExperienceChange = (value: number[]) => {
        setFilters((prev) => {
            const newFilters = { ...prev, experienceMin: value[0] };
            onFilterChange(newFilters);
            return newFilters;
        });
    };

    // 重置所有筛选条件
    const resetFilters = () => {
        const defaultFilters: FilterOptions = {
            specialties: [],
            services: [],
            ageRange: [20, 45],
            experienceMin: 0,
            languages: [],
        };
        setFilters(defaultFilters);
        onFilterChange(defaultFilters);
    };

    // 检查是否有活动筛选条件
    const hasActiveFilters = () => {
        return (
            filters.specialties.length > 0 ||
            filters.services.length > 0 ||
            filters.languages.length > 0 ||
            filters.experienceMin > 0 ||
            filters.ageRange[0] !== 20 ||
            filters.ageRange[1] !== 45
        );
    };

    return (
        <div className="bg-card rounded-xl border p-5 sticky top-24">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">筛选选项</h3>

                {hasActiveFilters() && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={resetFilters}
                        className="h-8 text-xs flex items-center"
                    >
                        <X className="h-3.5 w-3.5 mr-1" />
                        清除全部
                    </Button>
                )}
            </div>

            <Accordion type="multiple" defaultValue={["specialties", "age"]}>
                {/* 专长筛选 */}
                <AccordionItem value="specialties">
                    <AccordionTrigger>专长</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-2 mt-2">
                            {specialties.map((specialty) => (
                                <div key={specialty.id} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`specialty-${specialty.id}`}
                                        checked={filters.specialties.includes(specialty.id)}
                                        onCheckedChange={(checked) => {
                                            if (checked) {
                                                handleCheckboxChange("specialties", specialty.id);
                                            } else {
                                                handleCheckboxChange("specialties", specialty.id);
                                            }
                                        }}
                                    />
                                    <Label
                                        htmlFor={`specialty-${specialty.id}`}
                                        className="text-sm font-normal cursor-pointer"
                                    >
                                        {specialty.name}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* 服务筛选 */}
                <AccordionItem value="services">
                    <AccordionTrigger>服务项目</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-2 mt-2">
                            {services.map((service) => (
                                <div key={service.id} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`service-${service.id}`}
                                        checked={filters.services.includes(service.id)}
                                        onCheckedChange={(checked) => {
                                            if (checked) {
                                                handleCheckboxChange("services", service.id);
                                            } else {
                                                handleCheckboxChange("services", service.id);
                                            }
                                        }}
                                    />
                                    <Label
                                        htmlFor={`service-${service.id}`}
                                        className="text-sm font-normal cursor-pointer"
                                    >
                                        {service.name}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* 年龄筛选 */}
                <AccordionItem value="age">
                    <AccordionTrigger>年龄范围</AccordionTrigger>
                    <AccordionContent>
                        <div className="px-2 pt-4 pb-2">
                            <Slider
                                defaultValue={[20, 45]}
                                value={[filters.ageRange[0], filters.ageRange[1]]}
                                min={18}
                                max={60}
                                step={1}
                                onValueChange={handleAgeRangeChange}
                                className="mb-6"
                            />
                            <div className="flex justify-between text-sm text-muted-foreground">
                                <span>{filters.ageRange[0]} 岁</span>
                                <span>{filters.ageRange[1]} 岁</span>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* 经验筛选 */}
                <AccordionItem value="experience">
                    <AccordionTrigger>最低经验年限</AccordionTrigger>
                    <AccordionContent>
                        <div className="px-2 pt-4 pb-2">
                            <Slider
                                defaultValue={[0]}
                                value={[filters.experienceMin]}
                                min={0}
                                max={15}
                                step={1}
                                onValueChange={handleExperienceChange}
                                className="mb-6"
                            />
                            <div className="flex justify-between text-sm text-muted-foreground">
                                <span>至少 {filters.experienceMin} 年经验</span>
                                <span>{filters.experienceMin === 15 ? "15+" : filters.experienceMin} 年</span>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* 语言筛选 */}
                <AccordionItem value="languages">
                    <AccordionTrigger>语言</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-2 mt-2">
                            {languages.map((language) => (
                                <div key={language.id} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`language-${language.id}`}
                                        checked={filters.languages.includes(language.id)}
                                        onCheckedChange={(checked) => {
                                            if (checked) {
                                                handleCheckboxChange("languages", language.id);
                                            } else {
                                                handleCheckboxChange("languages", language.id);
                                            }
                                        }}
                                    />
                                    <Label
                                        htmlFor={`language-${language.id}`}
                                        className="text-sm font-normal cursor-pointer"
                                    >
                                        {language.name}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            {hasActiveFilters() && (
                <Button
                    className="w-full mt-4"
                    variant="outline"
                    onClick={resetFilters}
                >
                    重置筛选条件
                </Button>
            )}
        </div>
    );
}