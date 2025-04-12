'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronDown,
    ChevronRight,
    Clock,
    DollarSign,
    Filter,
    Info,
    Check,
    X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
    SheetClose,
} from "@/components/ui/sheet";

export interface Service {
    id: string;
    title: string;
    description: string;
    price: number;
    duration: number;
    category?: string;
    available?: boolean;
    discountPrice?: number;
    image?: string;
    benefits?: string[];
    inclusions?: string[];
    tags?: string[];
}

interface TherapistServicesProps {
    services: Service[];
    therapistId: string;
    onServiceSelect?: (serviceId: string) => void;
    onBookService?: (serviceId: string) => void;
    className?: string;
}

const TherapistServices = ({
    services,
    therapistId,
    onServiceSelect,
    onBookService,
    className,
}: TherapistServicesProps) => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [showFilters, setShowFilters] = useState(false);

    // Get unique categories
    const categories = ['all', ...Array.from(new Set(services.map(service => service.category || 'other')))];

    // Filter and sort services
    const filteredServices = services
        .filter(service => activeCategory === 'all' || service.category === activeCategory)
        .sort((a, b) => {
            // Sort by availability first, then by price
            if ((a.available !== undefined && b.available !== undefined) && a.available !== b.available) {
                return a.available ? -1 : 1;
            }
            return a.price - b.price;
        });

    const handleServiceSelect = (service: Service) => {
        setSelectedService(service);
        onServiceSelect?.(service.id);
    };

    const handleBookService = (serviceId: string) => {
        onBookService?.(serviceId);
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className={cn("w-full", className)}>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <h2 className="text-2xl font-bold">Available Services</h2>

                {/* Mobile Filter Button */}
                <Sheet open={showFilters} onOpenChange={setShowFilters}>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="sm" className="lg:hidden">
                            <Filter className="h-4 w-4 mr-2" />
                            Filter
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[280px] sm:w-[350px]">
                        <SheetHeader>
                            <SheetTitle>Filter Services</SheetTitle>
                            <SheetDescription>
                                View services by category
                            </SheetDescription>
                        </SheetHeader>
                        <div className="py-6">
                            <div className="space-y-2">
                                {categories.map(category => (
                                    <Button
                                        key={category}
                                        variant={activeCategory === category ? "default" : "ghost"}
                                        className="w-full justify-start text-left font-normal"
                                        onClick={() => {
                                            setActiveCategory(category);
                                            setShowFilters(false);
                                        }}
                                    >
                                        {category === 'all' ? 'All Services' : category.charAt(0).toUpperCase() + category.slice(1)}
                                        {activeCategory === category && (
                                            <Check className="ml-auto h-4 w-4" />
                                        )}
                                    </Button>
                                ))}
                            </div>
                        </div>
                        <SheetFooter>
                            <SheetClose asChild>
                                <Button variant="outline">Close</Button>
                            </SheetClose>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>

                {/* Desktop Category Tabs */}
                <div className="hidden lg:block">
                    <Tabs
                        value={activeCategory}
                        onValueChange={setActiveCategory}
                        className="w-full"
                    >
                        <TabsList className="bg-muted/50">
                            {categories.map(category => (
                                <TabsTrigger
                                    key={category}
                                    value={category}
                                    className="text-sm"
                                >
                                    {category === 'all' ? 'All Services' : category.charAt(0).toUpperCase() + category.slice(1)}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </Tabs>
                </div>
            </div>

            {/* Services List */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeCategory}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid gap-4"
                >
                    {filteredServices.length > 0 ? (
                        filteredServices.map(service => (
                            <motion.div
                                key={service.id}
                                variants={itemVariants}
                            >
                                <Card className={cn(
                                    "overflow-hidden transition-all duration-300 hover:shadow-md",
                                    !service.available && "opacity-70"
                                )}>
                                    <CardContent className="p-0">
                                        <div className="flex flex-col md:flex-row">
                                            {/* Service Image - For desktop */}
                                            {service.image && (
                                                <div className="hidden md:block w-40 h-full">
                                                    <div className="relative h-full">
                                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/10" />
                                                        <img
                                                            src={service.image}
                                                            alt={service.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                </div>
                                            )}

                                            <div className="flex-1 p-5">
                                                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                                                    <div>
                                                        <div className="flex items-center">
                                                            <h3 className="text-xl font-semibold">{service.title}</h3>
                                                            {!service.available && (
                                                                <Badge variant="outline" className="ml-2 text-muted-foreground border-muted-foreground">
                                                                    Unavailable
                                                                </Badge>
                                                            )}
                                                        </div>

                                                        <div className="flex items-center text-sm text-muted-foreground mt-1 space-x-3">
                                                            <div className="flex items-center">
                                                                <Clock className="h-4 w-4 mr-1" />
                                                                <span>{service.duration} min</span>
                                                            </div>

                                                            {service.category && (
                                                                <Badge variant="secondary" className="text-xs font-normal">
                                                                    {service.category}
                                                                </Badge>
                                                            )}

                                                            {service.tags && service.tags.length > 0 && (
                                                                <div className="hidden sm:flex items-center space-x-1">
                                                                    {service.tags.slice(0, 2).map(tag => (
                                                                        <Badge key={tag} variant="outline" className="text-xs font-normal">
                                                                            {tag}
                                                                        </Badge>
                                                                    ))}
                                                                    {service.tags.length > 2 && (
                                                                        <span className="text-xs text-muted-foreground">+{service.tags.length - 2}</span>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="mt-3 md:mt-0 text-right">
                                                        <div className="text-xl font-bold">
                                                            ${service.price}
                                                            {service.discountPrice && (
                                                                <span className="text-sm font-normal line-through text-muted-foreground ml-2">
                                                                    ${service.discountPrice}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                                                    {service.description}
                                                </p>

                                                <div className="flex flex-wrap items-center gap-3">
                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => handleServiceSelect(service)}
                                                            >
                                                                View Details
                                                                <Info className="ml-2 h-4 w-4" />
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent className="sm:max-w-[525px]">
                                                            <DialogHeader>
                                                                <DialogTitle className="text-xl">{service.title}</DialogTitle>
                                                                <DialogDescription className="flex items-center mt-1">
                                                                    <Clock className="h-4 w-4 mr-1" />
                                                                    <span>{service.duration} minutes</span>
                                                                    <span className="mx-2">•</span>
                                                                    <DollarSign className="h-4 w-4 mr-1" />
                                                                    <span>${service.price}</span>
                                                                </DialogDescription>
                                                            </DialogHeader>

                                                            {service.image && (
                                                                <div className="relative w-full h-40 overflow-hidden rounded-md mb-4">
                                                                    <img
                                                                        src={service.image}
                                                                        alt={service.title}
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                </div>
                                                            )}

                                                            <div className="space-y-4">
                                                                <div>
                                                                    <h4 className="font-medium mb-2">Description</h4>
                                                                    <p className="text-sm text-muted-foreground">{service.description}</p>
                                                                </div>

                                                                {service.benefits && service.benefits.length > 0 && (
                                                                    <div>
                                                                        <h4 className="font-medium mb-2">Benefits</h4>
                                                                        <ul className="space-y-1">
                                                                            {service.benefits.map((benefit, index) => (
                                                                                <li key={index} className="flex items-start text-sm">
                                                                                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                                                                                    <span>{benefit}</span>
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                )}

                                                                {service.inclusions && service.inclusions.length > 0 && (
                                                                    <div>
                                                                        <h4 className="font-medium mb-2">Includes</h4>
                                                                        <ul className="space-y-1">
                                                                            {service.inclusions.map((inclusion, index) => (
                                                                                <li key={index} className="flex items-start text-sm">
                                                                                    <Check className="h-4 w-4 text-primary mr-2 mt-0.5" />
                                                                                    <span>{inclusion}</span>
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                )}
                                                            </div>

                                                            <DialogFooter className="flex flex-col sm:flex-row gap-3 sm:gap-0">
                                                                <DialogClose asChild>
                                                                    <Button variant="outline">Close</Button>
                                                                </DialogClose>
                                                                <Button
                                                                    onClick={() => {
                                                                        handleBookService(service.id);
                                                                    }}
                                                                    disabled={!service.available}
                                                                >
                                                                    Book Now
                                                                </Button>
                                                            </DialogFooter>
                                                        </DialogContent>
                                                    </Dialog>

                                                    <Button
                                                        size="sm"
                                                        onClick={() => handleBookService(service.id)}
                                                        disabled={!service.available}
                                                    >
                                                        Book Now
                                                        <ChevronRight className="ml-1 h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-muted-foreground">No services available in this category.</p>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default TherapistServices; 