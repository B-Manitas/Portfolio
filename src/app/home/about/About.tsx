'use client';

import { useMemo } from 'react';
import SectionHeader from 'component/layout/SectionHeader';
import styles from './About.module.css';

export default function About() {
	const birthDate = new Date(2002, 5, 27); // Juin = 5

	const age = useMemo(() => {
		const today = new Date();
		let calculatedAge = today.getFullYear() - birthDate.getFullYear();
		if (
			today.getMonth() < birthDate.getMonth() ||
			(today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
		) {
			calculatedAge--;
		}
		return calculatedAge;
	}, [birthDate]);

	const stats = [
		{ label: 'Projects', value: '12+' },
		{ label: 'Python', value: '8 ans' },
		{ label: 'React', value: '3 ans' },
	];

	return (
		<section className={styles.section} id="about">
			<SectionHeader title="Overview" className={styles.sectionHeader} />

			<div className={styles.container}>
				<p className={styles.text}>
					Aged {age}, I engage in diverse projects, combining data, analysis, and strategy, to
					understand every aspect and contribute actively to their execution. Curious and versatile,
					I enjoy exploring different approaches to transform ideas and data into tangible
					solutions.
				</p>

				<div className={styles.stats}>
					{stats.map((s) => (
						<div key={s.label} className={styles.stat}>
							<span className={styles.value}>{s.value}</span>
							<span className={styles.label}>{s.label}</span>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
