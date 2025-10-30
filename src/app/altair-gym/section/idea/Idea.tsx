'use client';

import SectionHeader from 'src/app/shared/component/layout/SectionHeader';
import styles from './Idea.module.css';

export default function Idea() {
	const keyConcepts = [
		{
			title: 'Real problem',
			text: 'The project was born from a concrete need observed among athletes: to track and analyze their movements in a simple and reliable way.',
		},
		{
			title: 'Exploring solutions',
			text: 'Different approaches were tested to design a complete and functional bracelet.',
		},
		{
			title: 'Overall vision',
			text: 'The project was conceived as a whole, from hardware to software, to provide a coherent and useful experience for users.',
		},
	];

	return (
		<section className={styles.section}>
			<div className={styles.content}>
				<SectionHeader title="The Origin of the Project" />
				<p className={styles.intro}>
					Noticing a problem during our workouts, we designed Altair Gym, a practical and innovative
					connected bracelet.
				</p>

				<div className={styles.points}>
					{keyConcepts.map((p, i) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: i is fine here
						<div key={i} className={styles.point}>
							<h3 className={styles.pointTitle}>{p.title}</h3>
							<p className={styles.pointText}>{p.text}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
