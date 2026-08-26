// CMS Draft-Mode Entry
// ------------
// NOTE • Like ./index.ts, this line is rewired by the Tackl CLI at scaffold
// time to point at the chosen adapter. The draft-mode routes import from
// '@cms/draft' only, so swapping CMS never touches route code.
export { GET } from './dato/draft';
