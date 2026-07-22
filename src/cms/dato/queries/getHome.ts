export const GET_HOME = `
    query {
        seo: homePage {
            seoMeta {
                title
                desc: description
            }
        }

        page: homePage {
            pageTitle
            subtext

            ethosText

            strategyTitle
            insightsTitle
            evaluateTitle
            strategyText {
                value
                blocks
                links
                __typename
            }
            insightsText {
                value
                blocks
                links
                __typename
            }
            evaluateText {
                value
                blocks
                links
                __typename
            }

            caseStudiesTitle

            teamTitle
            teamImage {
                alt
                responsiveImage(imgixParams: { fit: fill, w: 720, h: 900, dpr: 2 }) {
                    alt
                    src
                    srcSet
                    width
                    height
                    aspectRatio
                    sizes
                }
                blurUpThumb
            }
        }
    }
`;
