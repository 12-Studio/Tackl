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
const DataSupply = ({ title, heading, desc, usaCoverage, pageBuilder }: I.DataSupplyProps) => (
	<Modal title={title}>
		<Hero title={title} heading={heading} desc={desc} usaCoverage={usaCoverage} />

		{pageBuilder && <PageBuilder pageBuilder={pageBuilder} />}
	</Modal>
);

// Exports
// ------------
DataSupply.displayName = 'DataSupply';
export default DataSupply;
