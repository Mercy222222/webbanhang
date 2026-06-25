const fs = require('fs');
const path = 'd:/webbanhang/blog-template/index-portfolio.html';
let html = fs.readFileSync(path, 'utf8');

// 1. Font & GSAP Injection
html = html.replace(
  'family=Inter:wght@300;400;500;600;700;800;900&family=Fira+Code:wght@400;500;600;700',
  'family=Outfit:wght@300;400;500;600;700;800;900&family=Fira+Code:wght@400;500;600;700'
);

if (!html.includes('gsap.min.js')) {
  html = html.replace(
    '<!-- Tailwind CSS CDN -->',
    `<!-- GSAP & ScrollTrigger -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
  
  <!-- Tailwind CSS CDN -->`
  );
}

// Update tailwind config to use Outfit instead of Inter
html = html.replace("sans: ['Inter', 'sans-serif'],", "sans: ['Outfit', 'sans-serif'],");

// 2. CSS Updates for GSAP & 3D Hover
const extraCSS = `
    /* --- BENTO & GSAP ENHANCEMENTS --- */
    .bento-grid {
      display: grid;
      grid-template-columns: repeat(12, minmax(0, 1fr));
      grid-auto-flow: dense; /* Crucial for gapless interlocking */
      gap: 1.5rem;
    }
    
    .securify-card {
      background: rgba(15, 23, 42, 0.6) !important;
      border: 1px solid rgba(255, 255, 255, 0.05) !important;
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      transform-style: preserve-3d;
      will-change: transform;
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); /* Spring Physics */
    }
    
    .securify-card:hover {
      box-shadow: 0 20px 40px -10px rgba(6, 182, 212, 0.15);
      border-color: rgba(6, 182, 212, 0.3) !important;
    }

    /* 3D Inner Glow / Spotlight */
    .securify-card::after {
      content: ""; position: absolute; inset: 0;
      background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.06), transparent 50%);
      opacity: 0; transition: opacity 0.3s;
      pointer-events: none; border-radius: inherit;
    }
    .securify-card:hover::after { opacity: 1; }

    .scrub-text span {
      opacity: 0.1;
      display: inline;
    }

    /* Hide horizontal scrollbars */
    body { overflow-x: hidden; }
`;

if (!html.includes('.bento-grid {')) {
  html = html.replace('/* --- SECURIFY BENTO UI --- */', extraCSS + '\n    /* --- SECURIFY BENTO UI --- */');
}

// Replace About Section
const aboutRegex = /<section id="about" class="reveal-item">[\s\S]*?(?=<section id="workExp")/i;
const newAbout = `<section id="about" class="py-32 md:py-48 relative">
      <div class="max-w-5xl mx-auto px-4 md:px-8">
        <div class="flex items-center gap-4 mb-12">
          <div class="h-[1px] w-12 bg-cyan-400"></div>
          <span class="text-xs font-mono text-cyan-400 uppercase tracking-widest">About Me</span>
        </div>
        <h2 id="about-scrub" class="text-4xl md:text-6xl font-bold leading-tight text-white scrub-text">
          I am a passionate developer bridging the gap between elegant design and complex backend architecture. I build digital experiences that are secure, fast, and visually cinematic.
        </h2>
        
        <div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 bento-grid">
          <div class="securify-card col-span-1 md:col-span-2 p-8 flex flex-col justify-between gs-reveal-up">
            <h3 class="text-xl text-white font-bold mb-4">The Journey</h3>
            <p class="text-slate-400 text-lg">My path in tech started with a curiosity for how things work under the hood. Today, I architect full-stack solutions.</p>
          </div>
          <div class="securify-card col-span-1 p-8 flex items-center justify-center gs-reveal-up" style="animation-delay: 0.1s">
            <div class="text-center">
              <span class="block text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-emerald-400">100%</span>
              <span class="block text-xs uppercase text-slate-500 font-mono mt-2">Commitment</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    `;
html = html.replace(aboutRegex, newAbout);

// Replace Work Exp
const workExpRegex = /<section id="workExp" class="reveal-item">[\s\S]*?(?=<section id="skills")/i;
const newWorkExp = `<section id="workExp" class="py-32 md:py-48 relative">
      <div class="max-w-7xl mx-auto px-4 md:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <!-- Pinned Left Column -->
          <div class="lg:col-span-5 h-auto lg:h-screen sticky top-0 pt-24" id="work-pinned">
            <div class="flex items-center gap-4 mb-6">
              <div class="h-[1px] w-12 bg-emerald-400"></div>
              <span class="text-xs font-mono text-emerald-400 uppercase tracking-widest">Experience</span>
            </div>
            <h2 class="text-5xl md:text-6xl font-bold text-white mb-6">Career<br/>Chronicles.</h2>
            <p class="text-slate-400 text-lg max-w-sm">A timeline of my professional journey, focusing on building scalable systems and polished user interfaces.</p>
          </div>

          <!-- Scrolling Right Column -->
          <div class="lg:col-span-7 space-y-8 pt-24" id="work-scroll">
            
            <div class="securify-card p-8 gs-reveal-right">
              <div class="flex justify-between items-start mb-4">
                <div>
                  <h3 class="text-2xl font-bold text-white">Fullstack Developer</h3>
                  <p class="text-cyan-400 font-medium">Freelance / Remote</p>
                </div>
                <span class="pill-badge bg-slate-800/50 text-slate-300 border-none">2022 - Present</span>
              </div>
              <p class="text-slate-400 mb-6">Developed and delivered multiple full-stack applications. Specialized in Next.js, React, Node.js, and complex database architectures.</p>
              <div class="flex gap-2 flex-wrap">
                <span class="text-xs font-mono px-2 py-1 rounded bg-slate-800 text-slate-300">React</span>
                <span class="text-xs font-mono px-2 py-1 rounded bg-slate-800 text-slate-300">Node.js</span>
                <span class="text-xs font-mono px-2 py-1 rounded bg-slate-800 text-slate-300">AWS</span>
              </div>
            </div>

            <div class="securify-card p-8 gs-reveal-right">
              <div class="flex justify-between items-start mb-4">
                <div>
                  <h3 class="text-2xl font-bold text-white">Frontend Engineer Intern</h3>
                  <p class="text-emerald-400 font-medium">Tech Startup Inc.</p>
                </div>
                <span class="pill-badge bg-slate-800/50 text-slate-300 border-none">2021 - 2022</span>
              </div>
              <p class="text-slate-400 mb-6">Contributed to building responsive web applications. Focused on UI/UX enhancements and integrating RESTful APIs.</p>
              <div class="flex gap-2 flex-wrap">
                <span class="text-xs font-mono px-2 py-1 rounded bg-slate-800 text-slate-300">Vue.js</span>
                <span class="text-xs font-mono px-2 py-1 rounded bg-slate-800 text-slate-300">Tailwind</span>
              </div>
            </div>

            <div class="securify-card p-8 gs-reveal-right">
              <div class="flex justify-between items-start mb-4">
                <div>
                  <h3 class="text-2xl font-bold text-white">IT Student</h3>
                  <p class="text-violet-400 font-medium">University of Science</p>
                </div>
                <span class="pill-badge bg-slate-800/50 text-slate-300 border-none">2019 - 2023</span>
              </div>
              <p class="text-slate-400 mb-6">Studied core computer science concepts: Data Structures, Algorithms, Software Engineering methodologies, and Database Design.</p>
            </div>

          </div>
        </div>
      </div>
    </section>
    
    `;
html = html.replace(workExpRegex, newWorkExp);

// Replace Skills
const skillsRegex = /<section id="skills" class="reveal-item">[\s\S]*?(?=<section id="certificates")/i;
const newSkills = `<section id="skills" class="py-32 md:py-48 relative">
      <div class="max-w-7xl mx-auto px-4 md:px-8">
        <div class="flex flex-col items-center text-center mb-16 gs-reveal-up">
          <div class="flex items-center gap-4 mb-4">
            <div class="h-[1px] w-8 bg-cyan-400"></div>
            <span class="text-xs font-mono text-cyan-400 uppercase tracking-widest">Arsenal</span>
            <div class="h-[1px] w-8 bg-cyan-400"></div>
          </div>
          <h2 class="text-5xl md:text-6xl font-bold text-white">Technical Skills</h2>
        </div>

        <div class="bento-grid">
          
          <div class="securify-card col-span-12 md:col-span-8 p-8 flex flex-col justify-center gs-reveal-up">
            <h3 class="text-2xl font-bold text-white mb-6"><i class="fas fa-layer-group text-cyan-400 mr-2"></i> Frontend Architecture</h3>
            <div class="grid grid-cols-3 sm:grid-cols-4 gap-6">
              <div class="flex flex-col items-center gap-2 group"><i class="devicon-react-original colored text-5xl group-hover:scale-110 transition-transform"></i><span class="text-xs text-slate-400 font-mono">React</span></div>
              <div class="flex flex-col items-center gap-2 group"><i class="devicon-nextjs-original text-5xl text-white group-hover:scale-110 transition-transform"></i><span class="text-xs text-slate-400 font-mono">Next.js</span></div>
              <div class="flex flex-col items-center gap-2 group"><i class="devicon-vuejs-plain colored text-5xl group-hover:scale-110 transition-transform"></i><span class="text-xs text-slate-400 font-mono">Vue</span></div>
              <div class="flex flex-col items-center gap-2 group"><i class="devicon-tailwindcss-plain colored text-5xl group-hover:scale-110 transition-transform"></i><span class="text-xs text-slate-400 font-mono">Tailwind</span></div>
            </div>
          </div>

          <div class="securify-card col-span-12 md:col-span-4 p-8 gs-reveal-up" style="animation-delay: 0.1s">
            <h3 class="text-2xl font-bold text-white mb-6"><i class="fas fa-server text-emerald-400 mr-2"></i> Backend</h3>
            <div class="flex flex-wrap gap-4">
              <div class="flex flex-col items-center gap-2 group"><i class="devicon-nodejs-plain colored text-4xl group-hover:scale-110 transition-transform"></i></div>
              <div class="flex flex-col items-center gap-2 group"><i class="devicon-express-original text-4xl text-white group-hover:scale-110 transition-transform"></i></div>
              <div class="flex flex-col items-center gap-2 group"><i class="devicon-python-plain colored text-4xl group-hover:scale-110 transition-transform"></i></div>
            </div>
          </div>

          <div class="securify-card col-span-12 md:col-span-5 p-8 gs-reveal-up" style="animation-delay: 0.2s">
            <h3 class="text-2xl font-bold text-white mb-6"><i class="fas fa-database text-violet-400 mr-2"></i> Database & DevOps</h3>
             <div class="flex flex-wrap gap-6">
              <div class="flex flex-col items-center gap-2 group"><i class="devicon-mongodb-plain colored text-4xl group-hover:scale-110 transition-transform"></i></div>
              <div class="flex flex-col items-center gap-2 group"><i class="devicon-postgresql-plain colored text-4xl group-hover:scale-110 transition-transform"></i></div>
              <div class="flex flex-col items-center gap-2 group"><i class="devicon-docker-plain colored text-4xl group-hover:scale-110 transition-transform"></i></div>
              <div class="flex flex-col items-center gap-2 group"><i class="devicon-git-plain colored text-4xl group-hover:scale-110 transition-transform"></i></div>
            </div>
          </div>

          <div class="securify-card col-span-12 md:col-span-7 p-8 relative overflow-hidden flex items-center justify-center gs-reveal-up" style="animation-delay: 0.3s">
            <!-- Decorative Background -->
            <div class="absolute inset-0 opacity-20 pointer-events-none" style="background: repeating-linear-gradient(45deg, transparent, transparent 10px, #06b6d4 10px, #06b6d4 11px);"></div>
            <h3 class="text-3xl font-extrabold text-white text-center relative z-10 uppercase tracking-widest mix-blend-difference">Always Learning</h3>
          </div>

        </div>
      </div>
    </section>
    
    `;
html = html.replace(skillsRegex, newSkills);

// Write GSAP initialization logic at the end of body
const gsapScript = `
  <!-- --- GSAP & 3D INTERACTION SCRIPT --- -->
  <script>
    document.addEventListener("DOMContentLoaded", () => {
      // 1. Initialize GSAP ScrollTrigger
      gsap.registerPlugin(ScrollTrigger);

      // 2. Scrub Text Reveal (About Me)
      const splitText = document.getElementById('about-scrub');
      if (splitText) {
        const words = splitText.innerText.split(' ');
        splitText.innerHTML = '';
        words.forEach(word => {
          const span = document.createElement('span');
          span.innerText = word + ' ';
          splitText.appendChild(span);
        });

        gsap.to('#about-scrub span', {
          scrollTrigger: {
            trigger: '#about-scrub',
            start: 'top 80%',
            end: 'bottom 40%',
            scrub: 1, // Smooth scrub
          },
          opacity: 1,
          stagger: 0.1,
          ease: 'power1.out'
        });
      }

      // 3. Work Experience Pinned Scroll
      const workPinned = document.getElementById('work-pinned');
      const workScroll = document.getElementById('work-scroll');
      if (workPinned && workScroll && window.innerWidth >= 1024) {
        ScrollTrigger.create({
          trigger: '#workExp',
          start: 'top 20%',
          end: 'bottom bottom',
          pin: '#work-pinned',
          pinSpacing: false,
        });
      }

      // 4. Reveal Animations (Fade Up & Slide Right)
      gsap.utils.toArray('.gs-reveal-up').forEach(elem => {
        gsap.fromTo(elem, 
          { y: 50, opacity: 0 }, 
          {
            scrollTrigger: {
              trigger: elem,
              start: 'top 90%',
              toggleActions: 'play none none reverse'
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out'
          }
        );
      });

      gsap.utils.toArray('.gs-reveal-right').forEach((elem, i) => {
        gsap.fromTo(elem, 
          { x: -50, opacity: 0 }, 
          {
            scrollTrigger: {
              trigger: elem,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            },
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            delay: i * 0.1
          }
        );
      });

      // 5. 3D Hover Tilt Physics (Micro-Interactions)
      const cards = document.querySelectorAll('.securify-card');
      cards.forEach(card => {
        card.addEventListener('mousemove', e => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          // Spotlight effect
          card.style.setProperty('--mouse-x', \`\${x}px\`);
          card.style.setProperty('--mouse-y', \`\${y}px\`);
          
          // 3D Tilt calculation
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const tiltX = ((y - centerY) / centerY) * -5; // Max 5deg tilt
          const tiltY = ((x - centerX) / centerX) * 5;
          
          card.style.transform = \`perspective(1000px) rotateX(\${tiltX}deg) rotateY(\${tiltY}deg) scale3d(1.02, 1.02, 1.02)\`;
        });
        
        card.addEventListener('mouseleave', () => {
          card.style.transform = \`perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)\`;
        });
      });
    });
  </script>
</body>`;

html = html.replace('</body>', gsapScript);

fs.writeFileSync(path, html);
console.log('GSAP and Bento structural changes successfully applied.');
