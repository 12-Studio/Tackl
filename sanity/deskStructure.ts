import { CaseIcon, HomeIcon } from '@sanity/icons';
import type { ComponentType } from 'react';
import type { StructureBuilder, StructureResolver } from 'sanity/structure';

const singleton = (S: StructureBuilder, type: string, title: string, icon?: ComponentType) => {
	let item = S.listItem().title(title).id(type);
	if (icon) {
		item = item.icon(icon);
	}
	return item.child(S.document().schemaType(type).documentId(type).title(title));
};

export const structure: StructureResolver = S =>
	S.list()
		.title('Navigation')
		.items([
			singleton(S, 'homePage', 'Home', HomeIcon),
			S.divider(),
			S.listItem()
				.title('Builds')
				.id('builds')
				.icon(CaseIcon)
				.child(S.documentTypeList('build').title('All builds')),
		]);
