'use client';

import { useState, useEffect, useMemo } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import ProjectModal from 'component/modal/ProjectModal';
import projectsJSON from 'data/projects.json';
import SectionHeader from 'component/layout/SectionHeader';
import styles from './Projects.module.css';
import type { TProject, TProjectGroup } from 'config/types';

const projectsData = projectsJSON as TProjectGroup[];
const ALL = 'All';

export default function Projects() {
	const [activeCategory, setActiveCategory] = useState(ALL);
	const [selectedProject, setSelectedProject] = useState<TProject | null>(null);
	const [isPanelOpen, setIsPanelOpen] = useState(false);

	const categories = useMemo(() => [ALL, ...projectsData.map((g) => g.category)], []);

	const filteredData = useMemo(
		() =>
			activeCategory === ALL
				? projectsData
				: projectsData.filter((group) => group.category === activeCategory),
		[activeCategory],
	);

	useEffect(() => {
		setIsPanelOpen(!!selectedProject);
	}, [selectedProject]);

	const handleClose = () => setSelectedProject(null);

	return (
		<section className={styles.section} id="projects">
			<SectionHeader title="Portfolio" className={styles.sectionHeader} />

			<div className={styles.filters}>
				{categories.map((cat) => (
					<button
						key={cat}
						type="button"
						onClick={() => setActiveCategory(cat)}
						className={`${styles.filterBtn} ${activeCategory === cat ? styles.active : ''}`}
					>
						{cat}
					</button>
				))}
			</div>

			{filteredData.map((group) => (
				<div key={group.category} className={styles.categoryBlock}>
					<h3 className={styles.categoryTitle}>{group.category}</h3>
					<div className={styles.grid}>
						{group.projects.map((project) => (
							<button
								key={project.id}
								type="button"
								className={styles.card}
								onClick={() => setSelectedProject(project)}
							>
								<div className={styles.cardHeader}>
									<span className={styles.date}>{project.date}</span>
									<FiChevronRight className={styles.iconLink} />
								</div>

								<h4 className={styles.projectTitle}>{project.title}</h4>
								<p className={styles.description}>{project.description}</p>

								{project.technologies?.length && (
									<div className={styles.techList}>
										{project.technologies.map((tech) => (
											<span key={tech} className={styles.techBadge}>
												{tech}
											</span>
										))}
									</div>
								)}
							</button>
						))}
					</div>
				</div>
			))}

			<ProjectModal project={selectedProject} isOpen={isPanelOpen} onClose={handleClose} />
		</section>
	);
}
