const IMAGE_FRAGMENT = `
    fragment ImageUrlAltBlur on FileFieldInterface {
        url
        alt
        blur: blurUpThumb
    }
`;

export const EVERYTHING = `
    ${IMAGE_FRAGMENT}
    query {
        home {
            title
            desc
            unicornId
            partnerLogos {
                id
                ...ImageUrlAltBlur
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
                ...ImageUrlAltBlur
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
                            ...ImageUrlAltBlur
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
                            ...ImageUrlAltBlur
                        }
                    }
                }

                ... on ComparisonTableRecord {
                    id
                    heading
                    desc: description
                    background: backgroundImage {
                        ...ImageUrlAltBlur
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
                            ...ImageUrlAltBlur
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
                            ...ImageUrlAltBlur
                        }
                    }
                }
            }
        }

        about {
            featuredImage {
                ...ImageUrlAltBlur
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
                            ...ImageUrlAltBlur
                        }
                    }
                }

                
                ... on FaqRecord {
                    id
                    heading
                    desc: description
                    background: backgroundImage {
                        ...ImageUrlAltBlur
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
                            ...ImageUrlAltBlur
                        }
                    }
                }
            }
        }
        
        seo {
            meta: metadata {
                image {
                    ...ImageUrlAltBlur
                }
                desc: description
                title
                twitterCard
            }
        }
    }
`;
