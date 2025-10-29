'use client';

import type { FC } from 'react';
import styles from './SectionHeader.module.css';

interface SectionHeaderProps {
	title: string;
	className?: string;
}

const SectionHeader: FC<SectionHeaderProps> = ({ title, className = '' }) => (
	<div className={`${styles.header} ${className}`}>
		<div className={styles.line}></div>
		<h2 className={styles.title}>{title}</h2>
	</div>
);

export default SectionHeader;
