// CMS Adapter Entry
// ------------
// NOTE • This is the single line the Tackl CLI rewires at scaffold time.
// The chosen adapter (./dato or ./sanity) is kept, the other is deleted,
// and this export follows. Application code imports from '@cms' only —
// never from an adapter folder directly — so swapping CMS never touches
// component code.
export * from './dato';
