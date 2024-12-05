'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { StarIcon } from 'lucide-react';

export function ProfileReviews() {
  // Mock data - replace with real data fetching
  const reviews = [
    {
      id: 1,
      reviewer: {
        name: 'Alice Johnson',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&crop=face',
      },
      rating: 5,
      comment: 'Great teacher! Very patient and knowledgeable.',
      date: '2024-03-15',
    },
    // Add more reviews
  ];

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <Card key={review.id}>
          <CardHeader>
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={review.reviewer.image} alt={review.reviewer.name} />
                <AvatarFallback>{review.reviewer.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{review.reviewer.name}</div>
                <div className="flex items-center mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="ml-auto text-sm text-muted-foreground">
                {new Date(review.date).toLocaleDateString()}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{review.comment}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}