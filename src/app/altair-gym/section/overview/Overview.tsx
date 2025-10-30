'use client';

import SectionHeader from 'shared/component/layout/SectionHeader';
import styles from './Overview.module.css';
import { FiSmartphone, FiCode, FiClock } from 'react-icons/fi';

export default function Overview() {
	const items = [
		{ icon: <FiClock />, label: 'Duration', value: '1 year' },
		{ icon: <FiSmartphone />, label: 'Platforms', value: 'iOS & Android' },
		{ icon: <FiCode />, label: 'Languages', value: 'Python & React' },
	];

	return (
		<section className={styles.overviewSection}>
			<SectionHeader title="Overview" />
			<p className={styles.intro}>
				A project combining design, technology, and innovation to create a functional connected
				bracelet.
			</p>

			<div className={styles.grid}>
				{items.map((item) => (
					<div key={item.label} className={styles.card}>
						<div className={styles.icon}>{item.icon}</div>
						<div className={styles.info}>
							<span className={styles.value}>{item.value}</span>
							<span className={styles.label}>{item.label}</span>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
