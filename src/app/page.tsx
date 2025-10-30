import Header from 'section/header/Header';
import Hero from 'section/hero/Hero';
import Background from 'section/background/Background';
import Projects from 'section/projects/Projects';
import Footer from 'section/footer/Footer';
import About from './shared/section/about/About';

export default function Home() {
	return (
		<>
			<Header />
			<Hero />
			<About />
			<Background />
			<Projects />
			<Footer />
		</>
	);
}
