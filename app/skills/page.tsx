'use client';

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SkillList } from '@/components/skills/skill-list';
import { SkillFilters } from '@/components/skills/skill-filters';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function SkillsPage() {
  const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    type: 'all',
    level: [] as string[],
    categories: [] as string[],
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Browse Skills</h1>
        {session && (
          <Button asChild>
            <Link href="/skills/add">
              <Plus className="mr-2 h-4 w-4" /> Add Skill
            </Link>
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <SkillFilters filters={filters} onFiltersChange={setFilters} />
        </aside>
        
        <main className="lg:col-span-3">
          <div className="mb-6">
            <Input 
              type="search" 
              placeholder="Search skills..." 
              className="max-w-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <SkillList searchQuery={searchQuery} filters={filters} />
        </main>
      </div>
    </div>
  );
}