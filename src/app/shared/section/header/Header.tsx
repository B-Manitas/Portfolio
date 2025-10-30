'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
import { usePathname, useRouter } from 'next/navigation';

export default function Header() {
	const [scrolled, setScrolled] = useState(false);
	const router = useRouter();
	const pathname = usePathname();

	const handleScroll = useCallback(() => {
		setScrolled(window.scrollY > 50);
	}, []);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [handleScroll]);

	const handleSmoothScroll = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();

		if (pathname !== '/' && id !== 'contact') {
			router.push(`/#${id}`);
			return;
		}

		const section = document.getElementById(id);
		if (section) section.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
			<div className={styles.container}>
				<nav className={styles.nav}>
					<Link href="#about" onClick={handleSmoothScroll('about')}>
						About
					</Link>
					<Link href="#journey" onClick={handleSmoothScroll('journey')}>
						Education & Career
					</Link>
					<Link href="#projects" onClick={handleSmoothScroll('projects')}>
						Portfolio
					</Link>
					<Link href="#contact" onClick={handleSmoothScroll('contact')}>
						Contact
					</Link>
				</nav>
			</div>
		</header>
	);
}
