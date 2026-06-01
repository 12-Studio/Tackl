import type { StructureBuilder, StructureResolver } from 'sanity/structure';

const singleton = (S: StructureBuilder, type: string, title: string) =>
	S.listItem().title(title).id(type).child(S.document().schemaType(type).documentId(type).title(title));

export const structure: StructureResolver = S =>
	S.list()
		.title('Navigation')
		.items([
			singleton(S, 'homePage', 'Home'),
			S.divider(),
			S.listItem().title('Builds').id('builds').child(S.documentTypeList('build').title('All builds')),
		]);
