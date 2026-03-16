const IMAGE_FRAGMENT = `
    fragment ReusableImage on FileFieldInterface {
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
                ...ReusableImage
            }
        }

        contactDetails: detailsContact {
            email
            linkedin: linkedinUrl
            twitter: twitterXUrl
        }

        contact {
            heading
            title
            desc: description
        }

        cta: callToAction {
            heading
            buttonLabel
        }

        activation {
            title
            heading
            desc: description  
            logoMarquee {
                id
                ...ReusableImage
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
                            ...ReusableImage
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
                            ...ReusableImage
                        }
                    }
                }

                ... on ComparisonTableRecord {
                    id
                    heading
                    desc: description
                    background: backgroundImage {
                        ...ReusableImage
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

            isCtaOverridden
            overrideHeading: ctaHeading
            overrideButtonLabel: ctaButtonLabel

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
                            ...ReusableImage
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
                            ...ReusableImage
                        }
                    }
                }
            }
        }

        about {
            featuredImage {
                ...ReusableImage
            }
            title
            heading
            desc: description

            isCtaOverridden
            overrideHeading: ctaHeading
            overrideButtonLabel: ctaButtonLabel

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
                    sections: iconTextGrid {
                        id
                        subHeading
                        heading
                        desc: description {
                            value
                        }
                        icon {
                            ...ReusableImage
                        }
                    }
                }

                
                ... on FaqRecord {
                    id
                    heading
                    desc: description
                    background: backgroundImage {
                        ...ReusableImage
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
                            ...ReusableImage
                        }
                    }
                }
            }
        }
        
        seo {
            meta: metadata {
                image {
                    ...ReusableImage
                }
                desc: description
                title
                twitterCard
            }
        }
    }
`;
