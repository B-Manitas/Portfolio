'use client';

import SectionHeader from 'src/app/shared/component/layout/SectionHeader';
import styles from './Management.module.css';

const tasks = [
	{
		title: 'Project Structuring',
		desc: 'Altair Gym was organized around a clear roadmap and careful follow-up to turn the idea into a working prototype.',
		tech: ['Roadmap', 'Project Management'],
	},
	{
		title: 'Marketing & Communication',
		desc: 'The project gained visibility through a well-planned marketing strategy, social media management, and market research.',
		tech: ['Social Media', 'Market Research'],
	},
	{
		title: 'Business & Feasibility',
		desc: 'We assessed the project’s viability with a solid business plan and financial analyses.',
		tech: ['Business Plan', 'Feasibility'],
	},
];

export default function Management() {
	return (
		<section className={styles.section}>
			<SectionHeader title="Management & Business Development" />
			<p className={styles.intro}>
				Planning, strategy, and key decisions enabled Altair Gym to take shape and become a reality.
			</p>

			<div className={styles.grid}>
				{tasks.map((task) => (
					<div key={task.title} className={styles.card}>
						<div className={styles.content}>
							<h3 className={styles.title}>{task.title}</h3>
							<p className={styles.desc}>{task.desc}</p>
							<div className={styles.badges}>
								{task.tech.map((t) => (
									<span key={t} className={styles.badge}>
										{t}
									</span>
								))}
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
