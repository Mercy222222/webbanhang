document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. Live Clock & System Stats Simulation
    // ==========================================
    const clockElement = document.getElementById('live-clock');
    const cpuElement = document.getElementById('cpu-stat');
    const ramElement = document.getElementById('ram-stat');

    setInterval(() => {
        const now = new Date();
        clockElement.textContent = now.toLocaleTimeString('en-GB'); 
        
        const cpu = Math.floor(Math.random() * 20) + 5;
        const ram = (Math.random() * 2 + 4).toFixed(1);
        cpuElement.textContent = `CPU: ${cpu}%`;
        ramElement.textContent = `RAM: ${ram}G`;
    }, 1000);

    // ==========================================
    // 2. Custom Cursor & Trail (Global)
    // ==========================================
    const cursor = document.querySelector('.custom-cursor');
    const cursorTrail = document.querySelector('.custom-cursor-trail');
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let trailX = mouseX;
    let trailY = mouseY;

    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(cursorTrail, { xPercent: -50, yPercent: -50 });

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        gsap.to(cursor, {
            x: mouseX,
            y: mouseY,
            duration: 0.1,
            ease: "power2.out"
        });
    });

    gsap.ticker.add(() => {
        trailX += (mouseX - trailX) * 0.15;
        trailY += (mouseY - trailY) * 0.15;
        gsap.set(cursorTrail, { x: trailX, y: trailY });
    });

    const hoverElements = document.querySelectorAll('a, .ws-item, .music-controls span, .magnetic-btn, .sys-stats span');
    hoverElements.forEach(elem => {
        elem.addEventListener('mouseenter', () => cursor.classList.add('active'));
        elem.addEventListener('mouseleave', () => cursor.classList.remove('active'));
    });

    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: "power2.out" });
        });
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
        });
    });

    // ==========================================
    // 3. Three.js WebGL Setup (Enhanced Starfield)
    // ==========================================
    const canvas = document.querySelector('#webgl-canvas');
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.x = 0;
    camera.position.y = 5;
    camera.position.z = 20;

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Milky Way Galaxy Effect (Premium Cinematic)
    const parameters = {
        count: 80000,
        size: 0.01,
        radius: 25,
        branches: 4,
        spin: 1.2,
        randomness: 0.3,
        randomnessPower: 4,
        insideColor: '#00ffcc', // Neon Cyan
        outsideColor: '#ff00ff' // Neon Magenta
    };

    let galaxyGeometry = null;
    let galaxyMaterial = null;
    let galaxyPoints = null;
    let galaxyGroup = new THREE.Group();
    scene.add(galaxyGroup);

    const generateGalaxy = () => {
        if(galaxyPoints !== null) {
            galaxyGeometry.dispose();
            galaxyMaterial.dispose();
            galaxyGroup.remove(galaxyPoints);
        }

        galaxyGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(parameters.count * 3);
        const colors = new Float32Array(parameters.count * 3);

        const colorInside = new THREE.Color(parameters.insideColor);
        const colorOutside = new THREE.Color(parameters.outsideColor);

        for(let i = 0; i < parameters.count; i++) {
            const i3 = i * 3;
            const radius = Math.random() * parameters.radius;
            const spinAngle = radius * parameters.spin;
            const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2;

            const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * parameters.randomness * radius;
            const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * parameters.randomness * radius;
            const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * parameters.randomness * radius;

            positions[i3    ] = Math.cos(branchAngle + spinAngle) * radius + randomX;
            positions[i3 + 1] = randomY;
            positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

            const mixedColor = colorInside.clone();
            mixedColor.lerp(colorOutside, radius / parameters.radius);

            colors[i3    ] = mixedColor.r;
            colors[i3 + 1] = mixedColor.g;
            colors[i3 + 2] = mixedColor.b;
        }

        galaxyGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        galaxyGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        galaxyMaterial = new THREE.PointsMaterial({
            size: parameters.size,
            sizeAttenuation: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true,
            transparent: true,
            opacity: 0.8
        });

        galaxyPoints = new THREE.Points(galaxyGeometry, galaxyMaterial);
        galaxyGroup.add(galaxyPoints);
    }
    generateGalaxy();

    // Floating stardust in background
    const stardustCount = 3000;
    const stardustGeo = new THREE.BufferGeometry();
    const stardustPos = new Float32Array(stardustCount * 3);
    for(let i=0; i<stardustCount; i++) {
        stardustPos[i*3] = (Math.random()-0.5)*40;
        stardustPos[i*3+1] = (Math.random()-0.5)*40;
        stardustPos[i*3+2] = (Math.random()-0.5)*40;
    }
    stardustGeo.setAttribute('position', new THREE.BufferAttribute(stardustPos, 3));
    const stardustMat = new THREE.PointsMaterial({
        color: 0xffffff, size: 0.015, transparent: true, opacity: 0.4, depthWrite: false, blending: THREE.AdditiveBlending
    });
    const stardust = new THREE.Points(stardustGeo, stardustMat);
    scene.add(stardust);

    // ==========================================
    // NEW: Hologram 3D Canvas (Simulating fal-3d render)
    // ==========================================
    const holoCanvas = document.getElementById('hologram-canvas');
    let holoRenderer, holoScene, holoCamera, holoMesh;
    
    if (holoCanvas) {
        holoScene = new THREE.Scene();
        holoCamera = new THREE.PerspectiveCamera(50, holoCanvas.clientWidth / holoCanvas.clientHeight, 0.1, 100);
        holoCamera.position.z = 5;

        holoRenderer = new THREE.WebGLRenderer({ canvas: holoCanvas, alpha: true, antialias: true });
        holoRenderer.setSize(holoCanvas.clientWidth, holoCanvas.clientHeight);
        holoRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Premium Hologram Core
        const coreGeo = new THREE.IcosahedronGeometry(1.5, 1);
        const coreMat = new THREE.MeshBasicMaterial({ color: 0x00ffcc, wireframe: true, transparent: true, opacity: 0.3 });
        const coreMesh = new THREE.Mesh(coreGeo, coreMat);
        
        const shellGeo = new THREE.IcosahedronGeometry(1.8, 2);
        const shellMat = new THREE.MeshBasicMaterial({ color: 0xff00ff, wireframe: true, transparent: true, opacity: 0.1 });
        const shellMesh = new THREE.Mesh(shellGeo, shellMat);
        
        holoMesh = new THREE.Group();
        holoMesh.add(coreMesh);
        holoMesh.add(shellMesh);
        holoScene.add(holoMesh);
    }

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);

        if (holoCanvas && holoRenderer) {
            holoCamera.aspect = holoCanvas.clientWidth / holoCanvas.clientHeight;
            holoCamera.updateProjectionMatrix();
            holoRenderer.setSize(holoCanvas.clientWidth, holoCanvas.clientHeight);
        }
    });

    const clock = new THREE.Clock();

    function raf() {
        const elapsedTime = clock.getElapsedTime();

        // Rotate galaxy slowly
        galaxyGroup.rotation.y = elapsedTime * 0.05;
        stardust.rotation.y = elapsedTime * 0.02;

        // Camera parallax based on mouse
        let camXOffset = (mouseX - window.innerWidth / 2) * 0.01;
        let camYOffset = (mouseY - window.innerHeight / 2) * 0.01;
        
        // Smoothly interpolate to base position (0, 10, 40) + mouse offset
        camera.position.x += (camXOffset + 0 - camera.position.x) * 0.05;
        camera.position.y += (-camYOffset + 10 - camera.position.y) * 0.05;
        camera.position.z += (40 - camera.position.z) * 0.05;
        
        camera.lookAt(new THREE.Vector3(0, 0, 0));

        renderer.render(scene, camera);

        // Render Hologram
        if (holoMesh && holoRenderer) {
            holoMesh.rotation.x += 0.01;
            holoMesh.rotation.y += 0.015;
            holoRenderer.render(holoScene, holoCamera);
        }

        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // ==========================================
    // 4. GSAP 3D Tilt Effect on Glass Widgets
    // ==========================================
    const widgets = document.querySelectorAll('.widget');
    widgets.forEach(widget => {
        widget.addEventListener('mousemove', (e) => {
            const rect = widget.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;  
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -5; 
            const rotateY = ((x - centerX) / centerX) * 5;  

            gsap.to(widget, {
                rotateX: rotateX,
                rotateY: rotateY,
                transformPerspective: 1000,
                duration: 0.5,
                ease: "power2.out"
            });
        });

        widget.addEventListener('mouseleave', () => {
            gsap.to(widget, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.7,
                ease: "elastic.out(1, 0.3)"
            });
        });
    });

    // ==========================================
    // 5. Functional Upgrades
    // ==========================================

    // A. Music Player Logic
    const musicBtn = document.querySelector('.play-btn');
    const audio = new Audio("https://cdn.pixabay.com/download/audio/2022/05/16/audio_b295a0a38d.mp3?filename=cyberpunk-2099-10701.mp3");
    audio.loop = true;
    let isPlaying = false;
    const eqBars = document.querySelectorAll('.audio-equalizer .bar');

    eqBars.forEach(bar => bar.style.animationPlayState = 'paused');

    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            musicBtn.textContent = '⏯';
            eqBars.forEach(bar => bar.style.animationPlayState = 'paused');
        } else {
            audio.play().catch(e => console.log("Audio play blocked:", e));
            musicBtn.textContent = '⏸';
            eqBars.forEach(bar => bar.style.animationPlayState = 'running');
        }
        isPlaying = !isPlaying;
    });

    const progressFill = document.querySelector('.progress-fill');
    audio.addEventListener('timeupdate', () => {
        if(audio.duration) {
            const percentage = (audio.currentTime / audio.duration) * 100;
            progressFill.style.width = percentage + '%';
        }
    });

    // B. Workspace Switching
    const wsItems = document.querySelectorAll('.ws-item');
    wsItems.forEach((ws, index) => {
        ws.addEventListener('click', () => {
            wsItems.forEach(w => w.classList.remove('active'));
            ws.classList.add('active');
            
            const hueShift = index * 70;
            gsap.to(document.documentElement, {
                '--accent-color': `hsl(${160 + hueShift}, 100%, 50%)`,
                '--accent-secondary': `hsl(${300 + hueShift}, 100%, 50%)`,
                duration: 1.5,
                ease: "power2.out"
            });
            
            gsap.to(galaxyGroup.rotation, {
                y: galaxyGroup.rotation.y + Math.PI,
                duration: 1.5,
                ease: "back.out(1.5)"
            });
            gsap.to(stardust.rotation, {
                y: stardust.rotation.y - Math.PI,
                duration: 1.5,
                ease: "back.out(1.5)"
            });

            // Update hologram mesh color randomly
            if (holoMesh) {
                gsap.to(holoMesh.material.color, {
                    r: Math.random(), g: Math.random(), b: Math.random(),
                    duration: 1.5
                });
            }

            gsap.from(".widget", {
                scale: 0.9,
                opacity: 0,
                duration: 0.5,
                stagger: 0.05,
                ease: "power2.out"
            });
        });
    });

    // C. Drag to Scroll for Projects
    const slider = document.querySelector('.projects-container');
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('mouseleave', () => isDown = false);
    slider.addEventListener('mouseup', () => isDown = false);
    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });

    // D. Click Sys Stats for Glitch Effect
    const stats = document.querySelector('.sys-stats');
    stats.style.cursor = 'pointer';
    stats.addEventListener('click', () => {
        const els = document.querySelectorAll('.widget');
        gsap.to(els, {
            x: () => (Math.random() - 0.5) * 30,
            y: () => (Math.random() - 0.5) * 30,
            duration: 0.05,
            yoyo: true,
            repeat: 7,
            onComplete: () => gsap.set(els, {x: 0, y: 0})
        });
    });

    // ==========================================
    // NEW: Terminal Logic
    // ==========================================
    const termOut = document.getElementById('terminal-output');
    if (termOut) {
        const commands = [
            "Initializing Hyprland OS kernel...",
            "Loading modules: [OK]",
            "Mounting file systems... [OK]",
            "Starting network manager...",
            "Establishing neural link with VHT-Node...",
            "[SUCCESS] Connection stable. Latency: 12ms",
            "Executing startup sequence...",
            "fetching repository: https://github.com/vohuurtri",
            "parsing dependencies...",
            "Deploying WebGL shaders... Done.",
            "Awaiting user input..."
        ];
        
        let cmdIdx = 0;
        const typeTerminal = () => {
            if (cmdIdx < commands.length) {
                termOut.innerHTML += `\n> ${commands[cmdIdx]}`;
                termOut.scrollTop = termOut.scrollHeight;
                cmdIdx++;
                setTimeout(typeTerminal, 400 + Math.random() * 800);
            } else {
                setInterval(() => {
                    termOut.innerHTML += `\n> PING 127.0.0.1: bytes=32 time=${Math.floor(Math.random()*10+5)}ms`;
                    termOut.scrollTop = termOut.scrollHeight;
                }, 3000);
            }
        };
        setTimeout(typeTerminal, 2000);
    }

    // ==========================================
    // NEW: Hardware Stats Rings Logic
    // ==========================================
    const cpuRing = document.querySelector('.cpu-ring');
    const gpuRing = document.querySelector('.gpu-ring');
    if (cpuRing && gpuRing) {
        setInterval(() => {
            const cpuVal = Math.floor(Math.random() * 40) + 10;
            const gpuVal = Math.floor(Math.random() * 50) + 20;
            cpuRing.style.strokeDasharray = `${cpuVal}, 100`;
            gpuRing.style.strokeDasharray = `${gpuVal}, 100`;
        }, 2000);
    }

    // ==========================================
    // 6. Entrance Animations
    // ==========================================
    gsap.set(".top-bar", { y: -50, opacity: 0 });
    gsap.set(".widget", { y: 50, opacity: 0, scale: 0.95 });

    const tl = gsap.timeline();
    
    tl.to(".top-bar", {
        y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2
    })
    .to(".widget", {
        y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: "back.out(1.5)"
    }, "-=0.5")
    .add(() => {
        const nameEl = document.getElementById('typewriter-name');
        if(nameEl) {
            const text = nameEl.getAttribute('data-text');
            nameEl.textContent = '';
            let i = 0;
            const typeInterval = setInterval(() => {
                if(i < text.length) {
                    nameEl.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typeInterval);
                    nameEl.style.borderRight = "none"; 
                }
            }, 80);
        }
    });

});
