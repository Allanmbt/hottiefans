'use client';

import { useState } from 'react';
import { Star, ThumbsUp, MessageSquare, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export interface Review {
    id: string;
    user: string;
    avatar?: string;
    date: string;
    rating: number;
    comment: string;
    therapistResponse?: string;
    helpful?: number;
    serviceType?: string;
    verified?: boolean;
}

interface RatingBreakdown {
    rating: number;
    count: number;
    percentage?: number;
}

interface TherapistReviewsProps {
    reviews: Review[];
    overallRating: number;
    reviewCount: number;
    ratingBreakdown?: RatingBreakdown[];
    className?: string;
}

const TherapistReviews = ({
    reviews,
    overallRating,
    reviewCount,
    ratingBreakdown = [],
    className,
}: TherapistReviewsProps) => {
    const [filter, setFilter] = useState<number | null>(null);
    const [visibleReviews, setVisibleReviews] = useState(4);
    const [helpfulReviews, setHelpfulReviews] = useState<Record<string, boolean>>({});

    // Sort reviews by date (most recent first)
    const sortedReviews = [...reviews].sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    // Filter reviews by rating if a filter is selected
    const filteredReviews = filter
        ? sortedReviews.filter(review => review.rating === filter)
        : sortedReviews;

    const visibleItems = filteredReviews.slice(0, visibleReviews);
    const hasMoreItems = filteredReviews.length > visibleReviews;

    // Calculate rating percentages if ratingBreakdown not provided
    const calculatedRatingBreakdown = ratingBreakdown.length
        ? ratingBreakdown
        : Array.from({ length: 5 }, (_, i) => {
            const rating = 5 - i;
            const count = reviews.filter(review => review.rating === rating).length;
            const percentage = reviewCount > 0 ? (count / reviewCount) * 100 : 0;
            return { rating, count, percentage };
        });

    // Mark a review as helpful
    const handleMarkHelpful = (reviewId: string) => {
        setHelpfulReviews(prev => ({
            ...prev,
            [reviewId]: !prev[reviewId]
        }));
    };

    // Load more reviews
    const handleLoadMore = () => {
        setVisibleReviews(prev => prev + 4);
    };

    // Render stars for a rating
    const renderStars = (rating: number) => {
        return (
            <div className="flex">
                {[1, 2, 3, 4, 5].map(star => (
                    <Star
                        key={star}
                        className={cn(
                            "h-4 w-4",
                            star <= rating
                                ? "text-yellow-500 fill-yellow-500"
                                : "text-gray-300 dark:text-gray-600"
                        )}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className={cn("w-full", className)}>
            <h2 className="text-2xl font-bold mb-6">Client Reviews</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Overall Rating Summary */}
                <div className="lg:col-span-1">
                    <Card>
                        <CardContent className="p-6">
                            <div className="text-center mb-4">
                                <div className="text-5xl font-bold mb-2">{overallRating.toFixed(1)}</div>
                                <div className="flex justify-center mb-1">
                                    {renderStars(Math.round(overallRating))}
                                </div>
                                <p className="text-sm text-muted-foreground">Based on {reviewCount} reviews</p>
                            </div>

                            <div className="space-y-2">
                                {calculatedRatingBreakdown.map(({ rating, count, percentage = (count / reviewCount) * 100 }) => (
                                    <div key={rating} className="grid grid-cols-12 items-center gap-2">
                                        <div className="col-span-2 text-sm font-medium">{rating} star</div>
                                        <div className="col-span-8">
                                            <Progress value={percentage} className="h-2" />
                                        </div>
                                        <div className="col-span-2 text-sm text-right text-muted-foreground">
                                            {count}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6">
                                <Button variant="outline" className="w-full flex items-center justify-center">
                                    <MessageSquare className="mr-2 h-4 w-4" />
                                    Write a Review
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Reviews List */}
                <div className="lg:col-span-2">
                    {/* Filter Tabs */}
                    <Tabs
                        defaultValue="all"
                        className="mb-6"
                        onValueChange={(value) => {
                            setFilter(value === 'all' ? null : parseInt(value));
                            setVisibleReviews(4);
                        }}
                    >
                        <TabsList className="bg-muted/50">
                            <TabsTrigger value="all">All Reviews</TabsTrigger>
                            <TabsTrigger value="5">5 Stars</TabsTrigger>
                            <TabsTrigger value="4">4 Stars</TabsTrigger>
                            <TabsTrigger value="3">3 Stars</TabsTrigger>
                            <TabsTrigger value="2">2 Stars</TabsTrigger>
                            <TabsTrigger value="1">1 Star</TabsTrigger>
                        </TabsList>
                    </Tabs>

                    {filteredReviews.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-muted-foreground">No reviews found with this rating.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <AnimatePresence>
                                {visibleItems.map((review, index) => (
                                    <motion.div
                                        key={review.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.2, delay: index * 0.05 }}
                                    >
                                        <Card className="overflow-hidden">
                                            <CardContent className="p-6">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div className="flex items-center">
                                                        {review.avatar ? (
                                                            <img
                                                                src={review.avatar}
                                                                alt={review.user}
                                                                className="w-10 h-10 rounded-full mr-3 object-cover"
                                                            />
                                                        ) : (
                                                            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3">
                                                                {review.user.charAt(0).toUpperCase()}
                                                            </div>
                                                        )}
                                                        <div>
                                                            <div className="font-medium flex items-center">
                                                                {review.user}
                                                                {review.verified && (
                                                                    <span className="ml-2 text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full dark:bg-green-800/30 dark:text-green-500">
                                                                        Verified
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <div className="text-xs text-muted-foreground">
                                                                {review.date}
                                                                {review.serviceType && (
                                                                    <>
                                                                        <span className="mx-1.5">•</span>
                                                                        <span>{review.serviceType}</span>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        {renderStars(review.rating)}
                                                    </div>
                                                </div>

                                                <div>
                                                    <p className="text-sm mb-4">{review.comment}</p>

                                                    {review.therapistResponse && (
                                                        <div className="bg-muted p-3 rounded-md mb-3 mt-4">
                                                            <p className="text-xs font-medium mb-1">Therapist Response:</p>
                                                            <p className="text-sm">{review.therapistResponse}</p>
                                                        </div>
                                                    )}

                                                    <div className="flex items-center mt-4">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className={cn(
                                                                "h-8 px-2 text-muted-foreground text-xs",
                                                                helpfulReviews[review.id] && "text-primary"
                                                            )}
                                                            onClick={() => handleMarkHelpful(review.id)}
                                                        >
                                                            <ThumbsUp className={cn(
                                                                "h-3.5 w-3.5 mr-1.5",
                                                                helpfulReviews[review.id] && "fill-primary text-primary"
                                                            )} />
                                                            <span>Helpful{' '}
                                                                {(review.helpful && helpfulReviews[review.id])
                                                                    ? `(${review.helpful + 1})`
                                                                    : review.helpful ? `(${review.helpful})` : ''}
                                                            </span>
                                                        </Button>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {/* Load More Button */}
                            {hasMoreItems && (
                                <div className="text-center py-4">
                                    <Button
                                        variant="ghost"
                                        onClick={handleLoadMore}
                                        className="text-primary font-normal"
                                    >
                                        Load More Reviews
                                        <ChevronDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TherapistReviews; 