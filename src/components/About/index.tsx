// Imports
// ------------
import Modal from '@parts/Modal';
import Hero from './Hero';
import PageBuilder from '@parts/PageBuilder';

// Styles + Interfaces
// ------------
import type * as I from './interface';

// Component
// ------------
const About = ({ title, heading, desc, featuredImage, pageBuilder }: I.AboutProps) => (
	<Modal title={title}>
		<Hero title={title} heading={heading} desc={desc} featuredImage={featuredImage} />

		{pageBuilder && <PageBuilder pageBuilder={pageBuilder} />}
	</Modal>
);

// Exports
// ------------
About.displayName = 'About';
export default About;
