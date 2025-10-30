import Header from 'src/app/shared/section/header/Header';
import Hero from './section/hero/Hero';
import Stats from './section/overview/Overview';
import Idea from './section/idea/Idea';
import Prototyping from './section/prototyping/Prototyping';
import Management from './section/management/Management';
import Footer from 'src/app/shared/section/footer/Footer';

export default function AltairGym() {
	return (
		<>
			<Header />
			<Hero />
			<Stats />
			<Idea />
			<Prototyping />
			<Management />
			<Footer />
		</>
	);
}
