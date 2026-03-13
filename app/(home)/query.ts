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

                ... on HeadingDescriptionRecord {
                    id
                    heading
                    desc: description
                }

                ... on ParallaxRecord {
                    id
                    parallaxSections {
                        id
                        heading
                        desc: description
                        image: backgroundImage {
                            url
                            alt
                        }
                    }
                }
            }
        }

        about {
            featuredImage {
                url
                alt
            }
            title
            heading
            desc: description

            pageBuilder {
                __typename
                
                ... on AnimatedStoryRecord {
                    id
                    desc: description
                    animatedText {
                        value
                    }
                    buttonLabel
                }
                
                ... on BigIconTextGridRecord {
                    id
                    heading
                    desc: description
                    iconTextGrid {
                        id
                        subHeading
                        heading
                        desc: description {
                            value
                        }
                        icon {
                            url
                            alt
                        }
                    }
                }

                
                ... on FaqRecord {
                    id
                    heading
                    desc: description
                    background: backgroundImage {
                        url
                        alt
                    }
                    faqs {
                        id
                        question
                        answer
                    }
                }
                
                ... on MembersTeamRecord {
                    id
                    heading
                    desc: description
                    teamMembers {
                        id
                        name
                        role
                        linkedinUrl
                        email
                        image: profilePicture {
                            url
                            alt
                        }
                    }
                }
            }
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
