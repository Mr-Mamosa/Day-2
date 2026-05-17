"use client";

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import { projects, socials, skills } from '@/lib/data';

const InteractiveTerminal = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [output, setOutput] = useState<React.ReactNode[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    focusInput();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const command = input.trim();
      if (command) {
        setHistory([...history, command]);
        processCommand(command);
      }
      setInput('');
    }
  };

  const processCommand = (command: string) => {
    const newOutput = [...output, renderPrompt(command)];

    const commandArgs = command.split(' ');
    const commandName = commandArgs[0];

    let commandOutput: React.ReactNode;

    switch (commandName) {
      case 'help':
        commandOutput = (
          <TypeAnimation
            sequence={[
              `Available commands:
- help: Show this help message
- whoami: Display user information
- ls projects: List projects
- cat contact.txt: Show contact information
- neovim: Display my Neovim/LazyVim configuration
- socials: Show social media links
- skills: List my skills
- date: Show the current date
- echo [text]: Print text to the terminal
- clear: Clear the terminal`,
            ]}
            wrapper="div"
            cursor={false}
            speed={80}
          />
        );
        break;
      case 'whoami':
        commandOutput = (
          <TypeAnimation
            sequence={[
              `Adnan: AI/ML Specialist & Deep Learning Enthusiast.
I'm exploring the architectural synergy between Indian Law and Cognitive Technology.
I am passionate about building intelligent systems that can solve real-world problems.`,
            ]}
            wrapper="div"
            cursor={false}
            speed={80}
          />
        );
        break;
      case 'ls':
        if (commandArgs[1] === 'projects') {
          const projectList = projects.map(p => `- ${p.title}: ${p.description}`).join('\n');
          commandOutput = (
            <TypeAnimation
              sequence={[projectList]}
              wrapper="div"
              cursor={false}
              speed={90}
              style={{ whiteSpace: 'pre-line' }}
            />
          );
        } else {
          commandOutput = (
            <TypeAnimation
              sequence={[`Usage: ls [projects]`]}
              wrapper="div"
              cursor={false}
              speed={80}
            />
          );
        }
        break;
      case 'cat':
        if (commandArgs[1] === 'contact.txt') {
          commandOutput = (
            <TypeAnimation
              sequence={[`adnanrev@gmail.com`]}
              wrapper="div"
              cursor={false}
              speed={80}
            />
          );
        } else {
          commandOutput = (
            <TypeAnimation
              sequence={[`File not found: ${commandArgs[1]}`]}
              wrapper="div"
              cursor={false}
              speed={80}
            />
          );
        }
        break;
      case 'neovim':
        commandOutput = (
          <TypeAnimation
            sequence={[
              `-- A snippet of my Neovim/LazyVim configuration
vim.g.mapleader = ' '
vim.g.maplocalleader = ' '

-- My Favorite Plugins
local plugins = {
  {
    'LazyVim/LazyVim',
    opts = {
      colorscheme = 'catppuccin',
    },
  },
  { 'nvim-telescope/telescope.nvim', tag = '0.1.5' },
  { 'nvim-treesitter/nvim-treesitter', build = ':TSUpdate' },
  { 'ThePrimeagen/harpoon' },
  { 'mbbill/undotree' },
  { 'tpope/vim-fugitive' },
  {
    'VonHeikemen/lsp-zero.nvim',
    branch = 'v3.x',
    dependencies = {
      -- LSP Support
      { 'neovim/nvim-lspconfig' },
      { 'williamboman/mason.nvim' },
      { 'williamboman/mason-lspconfig.nvim' },

      -- Autocompletion
      { 'hrsh7th/nvim-cmp' },
      { 'hrsh7th/cmp-buffer' },
      { 'hrsh7th/cmp-path' },
      { 'saadparwaiz1/cmp_luasnip' },
      { 'hrsh7th/cmp-nvim-lsp' },
      { 'hrsh7th/cmp-nvim-lua' },
    },
  },
}`,
            ]}
            wrapper="div"
            cursor={false}
            speed={90}
            style={{ whiteSpace: 'pre-line' }}
          />
        );
        break;
      case 'socials':
        const socialLinks = socials.map(s => `- ${s.name}: ${s.url}`).join('\n');
        commandOutput = (
          <TypeAnimation
            sequence={[socialLinks]}
            wrapper="div"
            cursor={false}
            speed={80}
            style={{ whiteSpace: 'pre-line' }}
          />
        );
        break;
      case 'skills':
        commandOutput = (
          <TypeAnimation
            sequence={[skills.join(', ')]}
            wrapper="div"
            cursor={false}
            speed={80}
          />
        );
        break;
      case 'date':
        commandOutput = (
          <TypeAnimation
            sequence={[new Date().toString()]}
            wrapper="div"
            cursor={false}
            speed={80}
          />
        );
        break;
      case 'echo':
        const echoText = commandArgs.slice(1).join(' ');
        commandOutput = (
          <TypeAnimation
            sequence={[echoText]}
            wrapper="div"
            cursor={false}
            speed={80}
          />
        );
        break;
      case 'clear':
        setOutput([]);
        return;
      default:
        commandOutput = (
          <TypeAnimation
            sequence={[`Command not found: ${commandName}`]}
            wrapper="div"
            cursor={false}
            speed={80}
          />
        );
        break;
    }

    setOutput([...newOutput, commandOutput]);
  };

  const renderPrompt = (command: string) => (
    <div key={history.length} className="flex items-center gap-2">
      <span className="text-[#98c379]">➜</span>
      <span className="text-[#61afef]">~</span>
      <span className="text-zinc-100">{command}</span>
    </div>
  );

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.05}
      dragTransition={{ power: 0.1, timeConstant: 200 }}
      whileDrag={{ scale: 1.02, rotate: 0.5 }}
      dragConstraints={{ left: -400, right: 400, top: -200, bottom: 200 }}
      className="w-full max-w-2xl mx-auto bg-[#0a0a0a] border border-zinc-800 rounded-lg shadow-2xl overflow-hidden"
      onClick={focusInput}
    >
      {/* Title Bar */}
      <div className="flex items-center justify-between p-3 bg-zinc-900/50 border-b border-zinc-800 cursor-grab active:cursor-grabbing">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-[#ff5f56] rounded-full shadow-inner" />
          <div className="w-3 h-3 bg-[#ffbd2e] rounded-full shadow-inner" />
          <div className="w-3 h-3 bg-[#27c93f] rounded-full shadow-inner" />
        </div>
        <div className="flex items-center text-zinc-400 font-mono text-xs tracking-widest uppercase">
          <Terminal size={14} className="mr-2 opacity-50" />
          zsh — interactive
        </div>
        <div className="w-12" />
      </div>

      {/* Body */}
      <div className="p-6 font-mono text-xs sm:text-sm text-left min-h-[340px] overflow-y-auto">
        <TypeAnimation
          sequence={[
            'Welcome to my interactive portfolio terminal!',
            1000,
            'Type `help` to see the available commands.',
            1000,
          ]}
          wrapper="div"
          cursor={true}
          repeat={0}
          speed={50}
          style={{ whiteSpace: 'pre-line' }}
        />
        <div className="mt-4 space-y-2">
          {output}
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-[#98c379]">➜</span>
          <span className="text-[#61afef]">~</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            className="bg-transparent border-none text-zinc-100 w-full focus:outline-none"
            autoFocus
          />
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="w-2 h-4 bg-zinc-400"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default InteractiveTerminal;
