/**
 * Smoothly scrolls the viewport to a target element, specified by either a DOM element ID or a React ref.
 *
 * This utility uses the native `scrollIntoView` method with smooth behavior to animate scrolling.
 *
 * @param idOrRef - The target to scroll to. Can be:
 *   - A `string` representing the DOM element's `id` attribute.
 *   - A React `RefObject<HTMLElement>` pointing to the target element.
 *
 * @remarks
 * - If the element is not found, the function does nothing.
 * - Intended for use in client-side/browser environments only.
 *
 * @example
 * // Scroll to an element by ID
 * scrollTo('section-top');
 *
 * @example
 * // Scroll to an element using a React ref
 * const myRef = useRef<HTMLDivElement>(null);
 * // ...in JSX: <div ref={myRef}>Content</div>
 * scrollTo(myRef);
 *
 * @example
 * // In a React component
 * const ContactForm = () => {
 *   const formRef = useRef<HTMLFormElement>(null);
 *   return (
 *     <form ref={formRef}>
 *       <button type="button" onClick={() => scrollTo(formRef)}>
 *         Scroll to form
 *       </button>
 *     </form>
 *   );
 * }
 */
export const scrollTo = idOrRef => {
    const element = typeof idOrRef === 'string' ? document.getElementById(idOrRef) : idOrRef && idOrRef.current;
    if (element) element.scrollIntoView({ behavior: 'smooth' });
};
