'use client';

import { useEffect, type FC } from 'react';
import Image from 'next/image';
import { FiExternalLink, FiX } from 'react-icons/fi';

import styles from './ProjectModal.module.css';
import type { TProject } from 'config/types';
import ReactMarkdown from 'react-markdown';

interface ProjectModalProps {
	project: TProject | null;
	isOpen: boolean;
	onClose: () => void;
}

const ProjectModal: FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
	useEffect(() => {
		if (!isOpen) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [isOpen, onClose]);

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
										{project?.linkText ? project?.linkText : 'Voir le projet'} <FiExternalLink />
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

						<div className={styles.panelDescription}>
							{(project?.fullDescription || project.description || '')
								.split('\n\n')
								.map((paragraph, i) => (
									// biome-ignore lint/suspicious/noArrayIndexKey: i is acceptable here
									<ReactMarkdown key={i}>{paragraph}</ReactMarkdown>
								))}
						</div>

						{project.images && (
							<div className={styles.imageGallery}>
								{project.images.map((src, i) => (
									// biome-ignore lint/suspicious/noArrayIndexKey: i is acceptable here
									<div key={i} className={styles.imageWrapper}>
										<Image
											src={src}
											alt={`${project.title} image ${i + 1}`}
											width={600}
											height={300}
											style={{ objectFit: 'contain' }}
										/>
									</div>
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
