export const HOME = `
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
    }
`;
