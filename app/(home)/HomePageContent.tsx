import DeleteMe from '@parts/DeleteMe';

type HomePageContentProps = {
	data: unknown;
};

const HomePageContent = ({ data }: HomePageContentProps) => {
	void data;

	return (
		<>
			<DeleteMe />
			<div style={{ height: '1000px' }}></div>
		</>
	);
};

HomePageContent.displayName = 'HomePageContent';

export default HomePageContent;
