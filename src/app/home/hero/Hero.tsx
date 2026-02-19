'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import styles from './Hero.module.css';
import { CiDesktopMouse2 } from 'react-icons/ci';
import { useNodeGraph } from 'shared/contexts/NodeContext';

const fullName = 'MANITAS BAHRI';

export default function Hero() {
	const [typedName, setTypedName] = useState('');
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [offsetY, setOffsetY] = useState(0);

	useNodeGraph(canvasRef);

	const handleScroll = useCallback(() => {
		setOffsetY(window.scrollY);
	}, []);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [handleScroll]);

	const handleArrowClick = () => {
		window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
	};

	useEffect(() => {
		let i = 0;
		const interval = setInterval(() => {
			setTypedName(fullName.slice(0, i + 1));
			i++;
			if (i === fullName.length) clearInterval(interval);
		}, 150);
		return () => clearInterval(interval);
	}, []);

	return (
		<section className={styles.hero}>
			<canvas
				ref={canvasRef}
				className={styles.canvas}
				style={{ transform: `translateY(${offsetY * 0.2}px)` }}
			/>

			<div className={styles.centerContent}>
				<h1 className={styles.name}>{typedName}</h1>
				<p className={styles.role}>Data Scientist</p>
				<p className={styles.quote}>
					<em>“They did not know it was impossible, so they did it.”</em>
				</p>
			</div>

			<button
				className={styles.ctaContainer}
				onClick={handleArrowClick}
				type="button"
				aria-label="Scroll down"
			>
				<CiDesktopMouse2 className={styles.arrow} />
			</button>
		</section>
	);
}
