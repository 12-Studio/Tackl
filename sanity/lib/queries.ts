const imageOrVideoFields = `
  mediaType,
  image,
  "videoUrl": video.asset->url
`;

const buildCardFields = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  coverImage
`;

export const homePageQuery = `*[_id == "homePage"][0]{
  "loadingVideoUrl": loadingVideo.asset->url,
  "heroVideoUrl": heroVideo.asset->url,
  heroTitle,
  heroText,
  introductionHeading,
  introductionImages,
  approachHeading,
  approachDescription,
  usps[]{
    heading,
    description,
    image
  },
  servicesHeading,
  servicesDescription,
  serviceList[]{
    heading,
    description,
    media{ ${imageOrVideoFields} }
  },
  buildsHeading,
  buildsDescription,
  featuredBuilds[]->{ ${buildCardFields} },
  seo
}`;

export const buildsIndexQuery = `*[_type == "build"] | order(publishedAt desc) {
  ${buildCardFields}
}`;

export const buildBySlugQuery = `*[_type == "build" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  coverImage,
  body,
  seo
}`;

export const buildSlugsQuery = `*[_type == "build" && defined(slug.current)]{ "slug": slug.current }`;
