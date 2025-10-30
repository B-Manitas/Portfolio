import Header from 'shared/section/header/Header';
import Hero from 'home/hero/Hero';
import About from 'home/about/About';
import Background from 'home/background/Background';
import Projects from 'home/projects/Projects';
import Footer from 'shared/section/footer/Footer';

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
