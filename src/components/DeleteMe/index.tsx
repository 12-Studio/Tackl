// Imports
// ------------
import Features from './Features';
import GetStarted from './GetStarted';
import GridGuide from './GridGuide';
import Hero from './Hero';
import HowItWorks from './HowItWorks';
import Outro from './Outro';
import Styling from './Styling';
import Why from './Why';

// Component
// ------------
// NOTE • The Tackl landing page — what it is, why it exists and how it
// works. Everything it needs lives in this folder: delete the folder (and
// its usage in app/(site)/(home)/page.tsx) when you start building.
const DeleteMe = () => (
	<>
		<Hero />
		<Why />
		<HowItWorks />
		<GridGuide />
		<Styling />
		<Features />
		<GetStarted />
		<Outro />
	</>
);

// Exports
// ------------
DeleteMe.displayName = 'DeleteMe';
export default DeleteMe;
