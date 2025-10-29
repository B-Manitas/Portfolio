'use client';

import { useState, useRef, useEffect } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import styles from './Timeline.module.css';
import parcours from 'data/parcours.json';
import ProjectModal from 'component/modal/ProjectModal';
import SectionHeader from 'component/layout/SectionHeader';
import type { TProject, TYearBlock } from 'config/types';

const timelineData = parcours as TYearBlock[];

export default function Background() {
	const [selectedProject, setSelectedProject] = useState<TProject | null>(null);
	const timelineRef = useRef<HTMLDivElement | null>(null);
	const sectionRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!sectionRef.current || !timelineRef.current) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && timelineRef.current) {
						timelineRef.current.scrollLeft = timelineRef.current.scrollWidth;
						observer.disconnect();
					}
				});
			},
			{ threshold: 0.1 },
		);

		observer.observe(sectionRef.current);
		return () => observer.disconnect();
	}, []);

	return (
		<section className={styles.timelineSection} ref={sectionRef} id="about">
			<SectionHeader title="Parcours & Expériences" className={styles.sectionHeader} />

			<div className={styles.timelineContainer} ref={timelineRef}>
				<div className={styles.timeline}>
					{timelineData.map((block) => (
						<div key={block.year} className={styles.yearGroup}>
							<div className={styles.year}>{block.year}</div>
							<div className={styles.items}>
								{block.items.map((item) => (
									<button
										key={item.title}
										type="button"
										className={`${styles.card} ${styles[item.type]} ${
											item.clickable ? styles.clickable : ''
										}`}
										onClick={() => {
											if (item.clickable) {
												setSelectedProject({
													id: item.title,
													title: item.title,
													description: item.description,
													fullDescription: item.fullText,
													link: item.link,
												});
											}
										}}
									>
										<div className={styles.cardHeader}>
											<h3>{item.title}</h3>
											{item.clickable && (
												<span className={styles.infoIconButton}>
													<FaChevronRight className={styles.infoIcon} />
												</span>
											)}
										</div>

										<div className={styles.cardMeta}>
											{item.subtitle && <p className={styles.subtitle}>{item.subtitle}</p>}
											{item.location && <p className={styles.location}>{item.location}</p>}
										</div>

										{item.description && <p className={styles.description}>{item.description}</p>}
									</button>
								))}
							</div>
						</div>
					))}
				</div>
			</div>

			<ProjectModal
				isOpen={!!selectedProject}
				onClose={() => setSelectedProject(null)}
				project={selectedProject}
			/>
		</section>
	);
}
