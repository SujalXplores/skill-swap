import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SkillList } from '@/components/skills/skill-list';
import { SkillFilters } from '@/components/skills/skill-filters';

export default function SkillsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Browse Skills</h1>
        <Button asChild>
          <a href="/skills/add">Add Skill</a>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <SkillFilters />
        </aside>
        
        <main className="lg:col-span-3">
          <div className="mb-6">
            <Input type="search" placeholder="Search skills..." className="max-w-md" />
          </div>
          <SkillList />
        </main>
      </div>
    </div>
  );
}