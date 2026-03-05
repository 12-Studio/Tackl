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
