'use client';

import styles from './Hero.module.css';
import { FiLinkedin, FiInstagram, FiGlobe, FiTwitter } from 'react-icons/fi';
import heroImage from 'public/images/altair-gym/landing-page.png';
import Image from 'next/image';

export default function Hero() {
	return (
		<section className={styles.hero}>
			<div className={styles.left}>
				<h1 className={styles.title}>Altair Gym</h1>
				<p className={styles.catchline}>
					Connected sports tracking project, from concept to functional prototype in 1 year.
				</p>

				<span className={styles.badge}>
					<a
						href="https://www.linkedin.com/in/julien-maille-paez/"
						target="_blank"
						rel="noreferrer"
					>
						In collaboration with Julien Maille-Paez
					</a>
				</span>

				<div className={styles.socials}>
					<a href="https://www.linkedin.com/company/altair-gym">
						<FiLinkedin />
					</a>
					<a href="https://www.instagram.com/altair.gym/">
						<FiInstagram />
					</a>
					<a href="https://www.tiktok.com/@altair.gym">
						<FiTwitter />
					</a>
					<a href="https://get-altair.com">
						<FiGlobe />
					</a>
				</div>
			</div>

			<div className={styles.right}>
				<Image
					src={heroImage}
					alt="Altair Gym"
					className={styles.image}
					style={{ width: '100%', height: 'auto' }}
				/>
			</div>
		</section>
	);
}
