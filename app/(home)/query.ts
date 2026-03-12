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

        callToAction {
            heading
            buttonLabel
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
                    heading
                    desc: description
                    rows: row {
                        heading
                        desc: description
                        companyNames {
                            heading
                        }
                        showCompanyNames
                        showDescription
                        iconImage {
                            url
                            alt
                        }
                    }
                }

                ... on ComparisonTableRecord {
                    id
                    heading
                    desc: description
                    background: backgroundImage {
                        url
                        alt
                    }
                    table: comparisonRows {
                        id
                        onyx
                        feature
                        competitor
                    }
                }
            }

            isCtaOverridden
            overrideHeading: ctaHeading
            overrideButtonLabel: ctaButtonLabel
        }

        dataSupply {
            title
            heading
            desc: description
            usaCoverage


            pageBuilder {
                __typename

                ... on EditorialStoryCtaStatRecord {
                    id
                    heading
                    animatedText

                    inlineCallToAction {
                        description
                        buttonLabel
                        heading
                        overrideBackground
                        backgroundImage {
                            url
                            alt
                        }
                    }
                        
                    statistics {
                        symbolBeforeNumber
                        symbolAfterNumber
                        number
                        hasSymbolBefore
                        heading
                        id
                    }
                }
            }
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
