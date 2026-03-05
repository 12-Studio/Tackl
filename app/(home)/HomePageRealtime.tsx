'use client';

import { generateRealtimeComponent } from '@/lib/datocms/realtime/generateRealtimeComponent';
import HomePageContent from './HomePageContent';

const HomePageRealtime = generateRealtimeComponent<Record<string, never>, unknown, Record<string, unknown>>({
	contentComponent: HomePageContent,
});

export default HomePageRealtime;
