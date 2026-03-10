export const EVERYTHING = `
    query {
        home {
            title
            desc
            unicornId
            partnerLogos {
                id
                url
                alt
            }
        }

        activation {
            title
            heading
            desc: description  
            logoMarquee {
                id
                url
                alt
            }
            pageBuilder {
                __typename
                
                ... on SplitFeatureGridRecord {
                    id
                    heading
                    features {
                        heading
                        desc: description
                        media: iconImage {
                            url
                            alt
                        }
                    }
                }

                ... on NumberedProcessGridRecord {
                    id
                    heading
                    processes {
                        heading
                        description
                    }
                }

                ... on StatisticsGridRecord {
                    id
                    heading
                    statistics {
                        id
                        heading
                        hasSymbolBefore
                        symbolBeforeNumber
                        symbolAfterNumber
                        number
                    }
                }

                ... on AlternatingMediaRowRecord {
                    id
                }
            }

            ctaHeading
            ctaButtonLabel
            isCtaOverridden
        }

        dataSupply {
            title
        }

        about {
            title
        }
        
        seo {
            meta: metadata {
                image {
                    url
                }
                desc: description
                title
                twitterCard
                
            }
            
        }
    }
`;
