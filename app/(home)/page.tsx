import { generatePageComponent } from '@/lib/datocms/realtime/generatePageComponent';
import { GET_HOME } from '../queries/getHome';
import HomePageContent from './HomePageContent';
import HomePageRealtime from './HomePageRealtime';

export default generatePageComponent<Record<string, never>, unknown, Record<string, unknown>>({
	query: GET_HOME,
	contentComponent: HomePageContent,
	realtimeComponent: HomePageRealtime,
});
