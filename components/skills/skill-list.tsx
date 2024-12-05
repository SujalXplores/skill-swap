'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

export function SkillList() {
  // Mock data - replace with real data fetching
  const skills = [
    {
      id: 1,
      title: 'Guitar Lessons',
      category: 'Music',
      level: 'Intermediate',
      type: 'offered',
      user: {
        name: 'John Doe',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
      }
    },
    // Add more mock skills here
  ];

  return (
    <div className="grid gap-4">
      {skills.map((skill) => (
        <Link href={`/skills/${skill.id}`} key={skill.id}>
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar>
                <AvatarImage src={skill.user.image} alt={skill.user.name} />
                <AvatarFallback>{skill.user.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">{skill.title}</CardTitle>
                <div className="flex gap-2 mt-2">
                  <Badge>{skill.category}</Badge>
                  <Badge variant="outline">{skill.level}</Badge>
                  <Badge variant="secondary">{skill.type}</Badge>
                </div>
              </div>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
}