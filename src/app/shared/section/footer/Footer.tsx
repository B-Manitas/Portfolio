import SectionHeader from 'component/layout/SectionHeader';
import styles from './Footer.module.css';
import { FiMail, FiGithub, FiLinkedin } from 'react-icons/fi';
import { LINKS } from 'config/app';

export default function Footer() {
	return (
		<footer className={styles.section} id="contact">
			<SectionHeader title="Contact" className={styles.sectionHeader} />

			<div className={styles.content}>
				<p className={styles.text}>
					Interested in collaborating, discussing a project, or learning more about my work?
				</p>

				<a href={`mailto:${LINKS.EMAIL}`} className={styles.mail}>
					<FiMail /> {LINKS.EMAIL}
				</a>

				<div className={styles.socials}>
					<a href={LINKS.GITHUB} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
						<FiGithub />
					</a>
					<a href={LINKS.LINKEDIN} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
						<FiLinkedin />
					</a>
				</div>
			</div>

			<div className={styles.bottom}>
				<p>© {new Date().getFullYear()} B-Manitas. All rights reserved.</p>
			</div>
		</footer>
	);
}
