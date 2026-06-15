const fs = require('fs');
let html = fs.readFileSync('d:/webbanhang/blog-template/index-portfolio.html', 'utf8');

// 1. Inject CSS for Omniverse Tier (Glitch & Liquid)
const omniCSS = `
    /* OMNIVERSE TIER CSS */
    .omniverse-liquid {
      transition: all 0.5s ease;
    }
    .omniverse-liquid:hover {
      filter: url('#liquid-filter');
      transform: scale(1.1) rotateZ(2deg);
    }

    .omniverse-glitch {
      position: relative;
      display: inline-block;
    }
    .omniverse-glitch:hover::before, .omniverse-glitch:hover::after {
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #0b1121;
    }
    .omniverse-glitch:hover::before {
      left: 3px;
      text-shadow: -2px 0 red;
      clip: rect(44px, 450px, 56px, 0);
      animation: glitch-anim 5s infinite linear alternate-reverse;
    }
    .omniverse-glitch:hover::after {
      left: -3px;
      text-shadow: -2px 0 blue;
      clip: rect(44px, 450px, 56px, 0);
      animation: glitch-anim2 5s infinite linear alternate-reverse;
    }
    @keyframes glitch-anim {
      0% { clip: rect(61px, 9999px, 52px, 0); }
      20% { clip: rect(33px, 9999px, 14px, 0); }
      40% { clip: rect(96px, 9999px, 73px, 0); }
      60% { clip: rect(22px, 9999px, 86px, 0); }
      80% { clip: rect(4px, 9999px, 53px, 0); }
      100% { clip: rect(41px, 9999px, 90px, 0); }
    }
    @keyframes glitch-anim2 {
      0% { clip: rect(29px, 9999px, 83px, 0); }
      20% { clip: rect(65px, 9999px, 54px, 0); }
      40% { clip: rect(12px, 9999px, 42px, 0); }
      60% { clip: rect(78px, 9999px, 9px, 0); }
      80% { clip: rect(43px, 9999px, 21px, 0); }
      100% { clip: rect(93px, 9999px, 35px, 0); }
    }
`;

if (!html.includes('OMNIVERSE TIER CSS')) {
  html = html.replace('</style>', omniCSS + '\n  </style>');
}

// Inject Liquid SVG Filter to body
const svgFilter = `
  <!-- OMNIVERSE LIQUID FILTER -->
  <svg style="visibility: hidden; position: absolute;" width="0" height="0" xmlns="http://www.w3.org/2000/svg" version="1.1">
    <defs>
      <filter id="liquid-filter">
        <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="15" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>
  </svg>
`;
if (!html.includes('OMNIVERSE LIQUID FILTER')) {
  html = html.replace('<body class="bg-[#0b1121]', svgFilter + '\n<body class="bg-[#0b1121]');
}

// 2. Add classes to images and headings
// Avatar
html = html.replace('alt="Võ Hữu Trí" class="w-full h-full object-cover', 'alt="Võ Hữu Trí" class="omniverse-liquid w-full h-full object-cover');
// Project Images
html = html.replace(/<img src="assets\/images\/projects/g, '<img class="omniverse-liquid object-cover w-full h-full" src="assets/images/projects');

// Headings
html = html.replace(/<h2 id="(label-work-title|label-skills-title|label-projects-title|label-contact-title)"(.*?)>(.*?)<\/h2>/g, 
  '<h2 id="$1" data-text="$3" class="omniverse-glitch omni-split $2">$3</h2>');

// 3. Inject Omniverse JS logic into GOD TIER ENGINE
const omniverseScript = `
      // --- OMNIVERSE VELOCITY SKEW ---
      let proxy = { skew: 0 },
          skewSetter = gsap.quickSetter(".securify-card, .skill-card, .project-card", "skewY", "deg"), 
          clamp = gsap.utils.clamp(-15, 15); 
      
      ScrollTrigger.create({
        onUpdate: (self) => {
          let skew = clamp(self.getVelocity() / -200);
          if (Math.abs(skew) > Math.abs(proxy.skew)) {
            proxy.skew = skew;
            gsap.to(proxy, {skew: 0, duration: 1.2, ease: "elastic.out(1, 0.4)", overwrite: true, onUpdate: () => skewSetter(proxy.skew)});
          }
        }
      });

      // --- OMNIVERSE GLOBAL 3D SPLIT TEXT ---
      const omniTitles = document.querySelectorAll('.omni-split');
      omniTitles.forEach(title => {
        const text = title.innerText;
        title.innerHTML = '';
        title.setAttribute('data-text', text); // For glitch
        const words = text.split(' ');
        words.forEach(word => {
          const span = document.createElement('span');
          span.innerHTML = word + '&nbsp;';
          span.style.display = 'inline-block';
          title.appendChild(span);
        });

        gsap.fromTo(title.querySelectorAll('span'), 
          { opacity: 0, rotationX: 90, rotationY: 45, z: 200, scale: 2, filter: 'blur(15px)' },
          {
            scrollTrigger: {
              trigger: title,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            },
            opacity: 1, rotationX: 0, rotationY: 0, z: 0, scale: 1, filter: 'blur(0px)',
            stagger: 0.1, duration: 1.5, ease: "expo.out"
          }
        );
      });
`;

if (!html.includes('OMNIVERSE VELOCITY SKEW')) {
  // Inject right after // Sync GSAP with Lenis
  html = html.replace('gsap.ticker.lagSmoothing(0);\n      }', 'gsap.ticker.lagSmoothing(0);\n      }\n\n' + omniverseScript);
}

fs.writeFileSync('d:/webbanhang/blog-template/index-portfolio.html', html);
console.log('Successfully injected Omniverse Tier effects.');
