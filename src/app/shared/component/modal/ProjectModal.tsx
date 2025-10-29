'use client';

import type { FC } from 'react';
import Image from 'next/image';
import { FiExternalLink, FiX } from 'react-icons/fi';

import styles from './ProjectModal.module.css';
import type { TProject } from 'config/types';

interface ProjectModalProps {
	project: TProject | null;
	isOpen: boolean;
	onClose: () => void;
}

const ProjectModal: FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
	return (
		<>
			<button
				type="button"
				className={`${styles.overlay} ${isOpen ? styles.showOverlay : ''}`}
				onClick={onClose}
			/>

			<div className={`${styles.sidePanel} ${isOpen ? styles.open : ''}`} aria-hidden={!isOpen}>
				{project && (
					<>
						<div className={styles.panelHeader}>
							<div className={styles.titleContainer}>
								<h3 className={styles.panelTitle}>{project.title}</h3>
								{project.link && (
									<a
										href={project.link}
										target="_blank"
										rel="noopener noreferrer"
										className={styles.panelLinkTop}
									>
										Voir le projet <FiExternalLink />
									</a>
								)}
							</div>

							<button type="button" className={styles.closeBtn} onClick={onClose}>
								<FiX />
							</button>
						</div>

						{project.date && <p className={styles.panelDate}>{project.date}</p>}

						{project.technologies && (
							<div className={styles.techListLarge}>
								{project.technologies.map((tech) => (
									<span key={tech} className={styles.techBadgeLarge}>
										{tech}
									</span>
								))}
							</div>
						)}

						<p className={styles.panelDescription}>
							{project.fullDescription || project.description}
						</p>

						{project.images && (
							<div className={styles.imageGallery}>
								{project.images.map((src, i) => (
									<Image
										key={src}
										src={src}
										alt={`${project.title} image ${i + 1}`}
										className={styles.image}
										width={600}
										height={300}
									/>
								))}
							</div>
						)}
					</>
				)}
			</div>
		</>
	);
};

export default ProjectModal;
