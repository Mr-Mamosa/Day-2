"use client";
import { Command } from 'cmdk';
import React from 'react';
import { useWindowManager } from '@/context/WindowManagerContext';
import HomeContent from './content/Home';
import AboutContent from './content/About';
import WorkContent from './content/Work';
import WPMTest from './content/WPMTest';
import { Home, Briefcase, User, Github, Sun, Moon, TestTube } from 'lucide-react';

const CommandPalette = () => {
    const [open, setOpen] = React.useState(false)
    const { openWindow, toggleTheme, theme } = useWindowManager();

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
          if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
            e.preventDefault()
            setOpen((open) => !open)
          }
        }
        document.addEventListener('keydown', down)
        return () => document.removeEventListener('keydown', down)
      }, [])

  return (
    <Command.Dialog open={open} onOpenChange={setOpen} label="Command Menu">
      <Command.Input />
      <Command.List>
        <Command.Empty>No results found.</Command.Empty>

        <Command.Group heading="Navigation">
          <Command.Item onSelect={() => openWindow('home', '~/home', <HomeContent />)}>
            <Home className="mr-2" />
            Navigate to Home
          </Command.Item>
          <Command.Item onSelect={() => openWindow('work', '~/work', <WorkContent />)}>
            <Briefcase className="mr-2" />
            Navigate to Work
          </Command.Item>
          <Command.Item onSelect={() => openWindow('about', '~/about', <AboutContent />)}>
            <User className="mr-2" />
            Navigate to About
          </Command.Item>
        </Command.Group>

        <Command.Group heading="Actions">
            <Command.Item onSelect={() => window.open('https://github.com/Mr-Mamosa', '_blank')}>
              <Github className="mr-2" />
              View GitHub Profile
            </Command.Item>
            <Command.Item onSelect={toggleTheme}>
              {theme === 'dark' ? <Sun className="mr-2" /> : <Moon className="mr-2" />}
              Toggle Theme
            </Command.Item>
            <Command.Item onSelect={() => openWindow('wpm-test', '~/wpm-test', <WPMTest />)}>
              <TestTube className="mr-2" />
              Run WPM Typing Test
            </Command.Item>
        </Command.Group>

      </Command.List>
    </Command.Dialog>
  );
};

export default CommandPalette;
