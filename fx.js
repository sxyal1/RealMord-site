(function () {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!document.querySelector('.particles')) {
        const wrap = document.createElement('div');
        wrap.className = 'particles';
        for (let i = 0; i < 34; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            const s = Math.random() * 2.4 + 1;
            p.style.cssText = 'width:' + s + 'px;height:' + s + 'px;left:' + (Math.random() * 100) + '%;animation-duration:' + (Math.random() * 10 + 9) + 's;animation-delay:' + (Math.random() * 16) + 's';
            p.style.background = Math.random() > 0.55 ? '#ff6b6b' : '#c52b3a';
            p.style.boxShadow = '0 0 ' + (s * 3) + 'px ' + p.style.background;
            wrap.appendChild(p);
        }
        document.body.prepend(wrap);
    }

    const revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length) {
        const io = new IntersectionObserver(function (entries) {
            entries.forEach(function (en) {
                if (en.isIntersecting) {
                    en.target.classList.add('in');
                    io.unobserve(en.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        revealEls.forEach(function (el) { io.observe(el); });
    }

    document.querySelectorAll('[data-go-back]').forEach(function (btn) {
        btn.addEventListener('click', function () {
            let sameOrigin = false;
            try {
                sameOrigin = document.referrer && new URL(document.referrer).origin === location.origin;
            } catch (e) { sameOrigin = false; }
            if (sameOrigin && history.length > 1) {
                history.back();
            } else {
                location.href = 'index.html';
            }
        });
    });

    if (reduce || !matchMedia('(pointer:fine)').matches) return;

    document.querySelectorAll('.hcard, .home-about').forEach(function (card) {
        card.addEventListener('mousemove', function (e) {
            const r = card.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width;
            const py = (e.clientY - r.top) / r.height;
            card.style.setProperty('--gx', (px * 100) + '%');
            card.style.setProperty('--gy', (py * 100) + '%');
            card.style.transform = 'perspective(900px) rotateX(' + ((0.5 - py) * 6).toFixed(2) + 'deg) rotateY(' + ((px - 0.5) * 6).toFixed(2) + 'deg) translateY(-4px)';
        });
        card.addEventListener('mouseleave', function () {
            card.style.transform = '';
        });
    });

    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    const ring = document.createElement('div');
    ring.className = 'cursor-ring';
    document.body.appendChild(ring);
    document.body.appendChild(dot);
    document.documentElement.classList.add('fx-cursor');

    let tx = -100, ty = -100, rx = -100, ry = -100;
    document.addEventListener('mousemove', function (e) {
        tx = e.clientX;
        ty = e.clientY;
        dot.style.transform = 'translate(' + tx + 'px,' + ty + 'px)';
    });
    (function loop() {
        rx += (tx - rx) * 0.16;
        ry += (ty - ry) * 0.16;
        ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px)';
        requestAnimationFrame(loop);
    })();

    const HOT = 'a, button, .exp-option, .role-option, .pstep, input, textarea, select, .hcard, .rule-item';
    document.addEventListener('mouseover', function (e) {
        if (e.target.closest(HOT)) ring.classList.add('hot');
    });
    document.addEventListener('mouseout', function (e) {
        if (e.target.closest(HOT)) ring.classList.remove('hot');
    });
})();
