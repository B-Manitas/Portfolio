import { useEffect, useRef } from 'react';

interface Node {
	x: number;
	y: number;
	ox: number;
	oy: number;
	vx: number;
	vy: number;
	angle: number;
	speed: number;
	exploding?: boolean;
	explosionTime?: number;
}

interface Particle {
	x: number;
	y: number;
	vx: number;
	vy: number;
	alpha: number;
}

interface Options {
	nodeCount?: number;
	explosionChance?: number;
}

export const useNodeGraph = (
	canvasRef: React.RefObject<HTMLCanvasElement | null>,
	options: Options = {},
) => {
	const lastExplosion = useRef<number>(0);
	const mouse = useRef({ x: -1000, y: -1000 });
	const visible = useRef<boolean>(true);
	const animationId = useRef<number | null>(null);

	const nodeCount = options.nodeCount || 50;
	const explosionChance = options.explosionChance || 0.9;

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		let width = canvas.width;
		let height = canvas.height;

		const nodes: Node[] = Array.from({ length: nodeCount }, () => {
			const x = Math.random() * width;
			const y = Math.random() * height;
			return {
				x,
				y,
				ox: x,
				oy: y,
				vx: 0,
				vy: 0,
				angle: Math.random() * Math.PI * 2,
				speed: 0.005 + Math.random() * 0.01,
			};
		});

		const particles: Particle[] = [];

		const createExplosion = (n: Node) => {
			n.exploding = true;
			n.explosionTime = 0;
			for (let i = 0; i < 10; i++) {
				const angle = Math.random() * Math.PI * 2;
				const speed = 2 + Math.random() * 2;
				particles.push({
					x: n.x,
					y: n.y,
					vx: Math.cos(angle) * speed,
					vy: Math.sin(angle) * speed,
					alpha: 1,
				});
			}
		};

		const animate = () => {
			if (!visible.current) return; // stop drawing if off-screen

			const gradient = ctx.createLinearGradient(0, 0, 0, height);
			gradient.addColorStop(0, '#f0f0f0');
			gradient.addColorStop(1, '#ffffff');
			ctx.fillStyle = gradient;
			ctx.fillRect(0, 0, width, height);

			const now = Date.now();
			if (now - lastExplosion.current > 3000 && Math.random() < explosionChance) {
				const idx = Math.floor(Math.random() * nodes.length);
				createExplosion(nodes[idx]);
				lastExplosion.current = now;
			}

			nodes.forEach((n) => {
				n.angle += n.speed;
				n.vx += Math.cos(n.angle) * 0.02;
				n.vy += Math.sin(n.angle) * 0.02;

				const dx = n.x - mouse.current.x;
				const dy = n.y - mouse.current.y;
				const dist = Math.sqrt(dx * dx + dy * dy);
				if (dist < 100) {
					const force = (100 - dist) * 0.05;
					n.vx += (dx / dist) * force;
					n.vy += (dy / dist) * force;
				}

				n.x += n.vx;
				n.y += n.vy;
				n.vx *= 0.9;
				n.vy *= 0.9;

				if (n.x < 0 || n.x > width) n.vx *= -1;
				if (n.y < 0 || n.y > height) n.vy *= -1;

				n.x = Math.max(0, Math.min(width, n.x));
				n.y = Math.max(0, Math.min(height, n.y));

				if (n.exploding) {
					n.explosionTime = (n.explosionTime || 0) + 1;
					if (n.explosionTime > 30) {
						n.exploding = false;
						n.explosionTime = 0;
						n.x = n.ox;
						n.y = n.oy;
					}
				}
			});

			ctx.strokeStyle = 'rgba(128,128,128,0.2)';
			ctx.lineWidth = 1;
			for (let i = 0; i < nodes.length; i++) {
				for (let j = i + 1; j < nodes.length; j++) {
					const dx = nodes[i].x - nodes[j].x;
					const dy = nodes[i].y - nodes[j].y;
					const dist = Math.sqrt(dx * dx + dy * dy);
					if (dist < 150) {
						ctx.beginPath();
						ctx.moveTo(nodes[i].x, nodes[i].y);
						ctx.lineTo(nodes[j].x, nodes[j].y);
						ctx.stroke();
					}
				}
			}

			nodes.forEach((n) => {
				ctx.beginPath();
				ctx.arc(n.x, n.y, 3, 0, Math.PI * 2);
				ctx.fillStyle = n.exploding ? '#5b8def' : 'rgba(128,128,128,0.8)';
				ctx.fill();
			});

			for (let i = particles.length - 1; i >= 0; i--) {
				const p = particles[i];
				p.x += p.vx;
				p.y += p.vy;
				p.vx *= 0.95;
				p.vy *= 0.95;
				p.alpha *= 0.96;

				ctx.beginPath();
				ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(91,141,239,${p.alpha})`;
				ctx.fill();

				if (p.alpha < 0.01) particles.splice(i, 1);
			}

			animationId.current = requestAnimationFrame(animate);
		};

		const start = () => {
			if (!animationId.current) {
				animationId.current = requestAnimationFrame(animate);
			}
		};

		const stop = () => {
			if (animationId.current) {
				cancelAnimationFrame(animationId.current);
				animationId.current = null;
			}
		};

		const observer = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];
				visible.current = entry.isIntersecting;
				if (visible.current) start();
				else stop();
			},
			{ threshold: 0.1 },
		);

		observer.observe(canvas);

		const handleResize = () => {
			width = canvas.width = window.innerWidth;
			height = canvas.height = window.innerHeight;
		};

		const handleMouse = (e: MouseEvent) => {
			mouse.current.x = e.clientX;
			mouse.current.y = e.clientY;
		};

		window.addEventListener('resize', handleResize);
		window.addEventListener('mousemove', handleMouse);

		start();

		return () => {
			stop();
			observer.disconnect();
			window.removeEventListener('resize', handleResize);
			window.removeEventListener('mousemove', handleMouse);
		};
	}, [canvasRef, nodeCount, explosionChance]);
};
