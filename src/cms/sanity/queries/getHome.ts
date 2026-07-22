// GROQ
// ------------
// NOTE • Example home-page query — shape it to your schema
export const GET_HOME = `
	*[_type == "homePage"][0]{
		pageTitle,
		subtext,
		"seo": {
			"title": seoMeta.title,
			"desc": seoMeta.description
		}
	}
`;
