'use client';

import styles from './Prototyping.module.css';
import Image from 'next/image';
import SectionHeader from 'src/app/shared/component/layout/SectionHeader';
import landingPage from 'public/images/altair-gym/landing-page.png';
import band from 'public/images/altair-gym/prototyp.png';
import app from 'public/images/altair-gym/app.png';

const steps = [
	{
		title: 'Bracelet',
		desc: 'Design of the complete prototype, combining electronics and casing, moving from an Arduino to a custom chip while optimizing size, weight, and battery life.',
		tech: ['PCBWay', 'Fiverr'],
		image: band,
	},
	{
		title: 'Mobile app',
		desc: 'Development of an iOS and Android app to collect, visualize, and analyze data from the bracelet, with full deployment to the app stores.',
		tech: ['React Native', 'Contentful', 'Firebase', 'Supabase'],
		image: app,
	},
	{
		title: 'Landing page',
		desc: 'Creation of a showcase website to present the project and its features, with continuous deployment on Vercel.',
		tech: ['Next.js', 'Vercel'],
		image: landingPage,
	},
	{
		title: 'Algorithms',
		desc: 'Processing and analysis of sensor data: cleaning, CNN modeling, and extracting patterns from time series.',
		tech: ['Python', 'Google Cloud Computing', 'TensorFlow'],
		image: null,
		fullWidth: true,
	},
];

export default function Prototyping() {
	return (
		<section className={styles.section}>
			<SectionHeader title="Prototyping & Development" />
			<p className={styles.intro}>
				Key steps to transform the idea into a functional prototype, developing both hardware and
				software.
			</p>

			<div className={styles.grid}>
				{steps.map((step) => (
					<div
						key={step.title}
						className={`${styles.card} ${step.fullWidth ? styles.fullWidth : ''}`}
					>
						{step.image && (
							<div className={styles.imageWrapper}>
								<Image src={step.image} alt={step.title} className={styles.image} />
							</div>
						)}
						<div className={styles.content}>
							<h3 className={styles.title}>{step.title}</h3>
							<p className={styles.desc}>{step.desc}</p>
							<div className={styles.badges}>
								{step.tech.map((t) => (
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
