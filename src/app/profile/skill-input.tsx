'use client';
import React, { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

type SkillInputProps = {
  value: string[];
  onChange: (skills: string[]) => void;
};

export function SkillInput({ value, onChange }: SkillInputProps) {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const addSkill = () => {
    const newSkill = inputValue.trim();
    if (newSkill && !value.includes(newSkill)) {
      onChange([...value, newSkill]);
    }
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addSkill();
    } else if (e.key === 'Backspace' && inputValue === '' && value.length > 0) {
      // Remove the last skill on backspace if input is empty
      onChange(value.slice(0, -1));
    }
  };
  
  const removeSkill = (skillToRemove: string) => {
    onChange(value.filter((skill) => skill !== skillToRemove));
  };

  return (
    <div>
      <div className="flex gap-2">
        <Input
          ref={inputRef}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type a skill and press Enter..."
        />
        <Button type="button" onClick={addSkill}>Add</Button>
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {value.map((skill) => (
          <Badge key={skill} variant="secondary" className="flex items-center gap-1">
            {skill}
            <button
              type="button"
              onClick={() => removeSkill(skill)}
              className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
              aria-label={`Remove ${skill}`}
            >
              <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );
}
