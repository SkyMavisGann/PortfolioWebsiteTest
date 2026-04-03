/**
 * Tailwind CSS Demo — All slide examples in one page
 *
 * Covers:
 *   Slide 3  — Utility-first vs traditional CSS
 *   Slide 4  — Spacing system (p-*, m-*, gap-*)
 *   Slide 5  — Flexbox and grid layout
 *   Slide 6  — Typography, colors, visual utilities
 *   Slide 7  — Responsive design (resize browser to see)
 *   Slide 8  — Tailwind + React: composable components
 *   Slide 9  — Interactive states (hover, focus, disabled)
 *
 * Setup:
 *   npm create vite@latest demo-tailwind -- --template react-ts
 *   cd demo-tailwind
 *   npm install -D tailwindcss @tailwindcss/vite
 *   Replace src/App.tsx with this file
 *   Update src/index.css with: @import "tailwindcss";
 *   Update vite.config.ts to add the Tailwind plugin
 *   npm run dev
 */
import { useEffect, useRef } from 'react';

// 1. TypeScript Interfaces
interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
}

// 2. Data Payload
const projectsData: Project[] = [
  {
    id: 'mariana',
    title: 'Mariana',
    description: 'In Mariana you are dropped into an unknown trench to explore. You will find fantastical creatures and rare artifacts. Fight bosses and mini-bosses in order to dive as deep as possible and uncover the mystery of the trench.',
    tags: ['Gamemaker', 'Shaders', 'AI Behavior Trees'],
    image: '../static/Gamephotos/MarianaBanner.png',
    link: 'https://store.steampowered.com/app/3197400/Mariana/'
  },
  {
    id: 'alien-collector',
    title: 'Alien Collector',
    description: 'In alien collector you decorate a space station with 3d printed furniture and props. Aliens will come to visit your station and will offer you 3d printing scrap as an offering to trade for your cows.',
    tags: ['Economy Systems', 'Mobile', 'Unity'],
    image: '../static/Gamephotos/AlienCollectorBanner.png',
    link: 'https://play.google.com/store/apps/details?id=com.SkyMavisGann.AlienCollector&utm_source=na_Med'
  }
];

export default function Portfolio() {
  // Ref array to hold our parallax layers for direct DOM manipulation
  const parallaxRefs = useRef<(HTMLDivElement | null)[]>([]);

  // The Parallax Engine
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      parallaxRefs.current.forEach((layer, index) => {
        if (layer) {
          // Speed increases slightly for each layer (0.05, 0.10, 0.15, etc.)
          const speed = (index + 1) * 0.05;
          const yOffset = -(scrollPosition * speed);
          layer.style.transform = `translateY(${yOffset}px)`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen text-slate-100 font-sans scroll-smooth overflow-x-hidden">
      
      {/* --- PARALLAX BACKGROUND --- */}
      <div className="fixed top-0 left-0 w-full h-screen z-[-1] overflow-hidden bg-[#1a1a1a]">
        {[1, 2, 3, 4, 5].map((layerNumber, idx) => (
          <div
            key={layerNumber}
            ref={(el) => { parallaxRefs.current[idx] = el; }}
            className="absolute top-0 left-0 w-full h-[150vh] bg-repeat-x bg-[auto_100%] bg-top will-change-transform"
            style={{ 
              backgroundImage: `url('../static/FreeIndustrialZoneTileset/2Background/${layerNumber}.png')`,
              imageRendering: 'pixelated' 
            }}
          />
        ))}
      </div>

      {/* --- NAVIGATION --- */}
      {/* Using a semi-transparent dark background (bg-slate-900/90) for readability over the parallax */}
      <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md shadow-md border-b border-slate-700">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center flex-wrap gap-4">
          <h1 className="text-xl font-bold tracking-tight text-emerald-400">SMG</h1>
          <nav className="flex gap-6 text-sm font-medium">
            <a href="#about" className="hover:text-emerald-400 transition-colors">About</a>
            <a href="#projects" className="hover:text-emerald-400 transition-colors">Games</a>
            <a href="#contact" className="hover:text-emerald-400 transition-colors">Transmissions</a>
          </nav>
        </div>
      </header>

      <main>
        {/* --- HERO SECTION --- */}
        <section id="about" className="max-w-5xl mx-auto px-6 py-24 md:py-32 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6 text-center md:text-left bg-slate-900/80 p-8 md:p-12 rounded-3xl border border-slate-700 backdrop-blur-sm shadow-2xl">
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
              Sky Mavis Gann
            </h2>
            <h3 className="text-xl md:text-2xl text-emerald-400 font-semibold">
              Game Developer and Designer
            </h3>
            <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto md:mx-0">
              Bridging the gap between heavy, mechanical logic and compelling visual experiences. From crafting complex Unity shaders and pixelization effects to developing hand-tracking logic for A-Frame virtual reality environments.
            </p>
            <div className="pt-4">
              <a href="#projects" className="inline-block bg-emerald-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-emerald-500 transition-colors shadow-lg hover:shadow-emerald-500/20 transform hover:-translate-y-1">
                View Games
              </a>
            </div>
          </div>
        </section>

       {/* --- GAMES SECTION --- */}
        <section id="projects" className="py-24">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-4xl font-bold mb-12 text-center text-white drop-shadow-lg">Games</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projectsData.map((project) => (
                <a 
                  key={project.id} 
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-800/90 rounded-2xl shadow-xl border border-slate-700 hover:shadow-2xl hover:shadow-emerald-900/30 hover:-translate-y-2 transition-all duration-300 group flex flex-col overflow-hidden backdrop-blur-md cursor-pointer"
                >
                  <div className="w-full h-48 sm:h-56 overflow-hidden border-b border-slate-700 bg-black/50">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      style={{ imageRendering: 'pixelated' }}
                    />
                  </div>
                  
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-emerald-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-300 mb-6 leading-relaxed flex-grow">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-slate-700/50">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-emerald-900/50 text-emerald-300 border border-emerald-800/50 text-xs font-semibold rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    {/* Visual Launch Indicator */}
                    <div className="mt-6 flex items-center text-emerald-400 font-semibold text-sm group-hover:text-emerald-300 transition-colors">
                      Launch Game <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* --- FOOTER --- */}
      <footer id="contact" className="bg-slate-950/95 border-t border-slate-800 py-16 text-center backdrop-blur-md relative z-10">
        <div className="max-w-5xl mx-auto px-6 space-y-4">
          <h2 className="text-2xl font-bold text-white mb-4">Initialize Transmission</h2>
          <p className="max-w-md mx-auto text-slate-400">Looking to collaborate on mechanical logic or immersive visual systems? Send a ping.</p>
          <a href="mailto:contact@example.com" className="inline-block mt-4 text-emerald-400 hover:text-emerald-300 font-medium hover:underline">
            Open Comm Channel &rarr;
          </a>
          <div className="pt-12 text-sm opacity-50 text-slate-500">
            &copy; {new Date().getFullYear()} Sky Mavis Gann. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}