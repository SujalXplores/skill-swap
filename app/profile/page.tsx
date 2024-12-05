'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSession } from 'next-auth/react';
import { ProfileSkills } from '@/components/profile/profile-skills';
import { ProfileReviews } from '@/components/profile/profile-reviews';

export default function ProfilePage() {
  const { data: session } = useSession();

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={session?.user?.image || ''} alt={session?.user?.name || ''} />
              <AvatarFallback>{session?.user?.name?.[0]}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{session?.user?.name}</CardTitle>
              <CardDescription>{session?.user?.email}</CardDescription>
            </div>
            <Button variant="outline" className="ml-auto">Edit Profile</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="skills" className="mt-6">
            <TabsList>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="availability">Availability</TabsTrigger>
            </TabsList>
            <TabsContent value="skills">
              <ProfileSkills />
            </TabsContent>
            <TabsContent value="reviews">
              <ProfileReviews />
            </TabsContent>
            <TabsContent value="availability">
              {/* Add availability component */}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}