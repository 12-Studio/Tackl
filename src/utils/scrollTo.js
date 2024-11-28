/**
 * Smoothly scrolls the viewport to an element referenced by ID or React ref.
 * Uses the native scrollIntoView behavior for smooth scrolling animation.
 *
 * @param {string|React.RefObject} idOrRef - The ID of the element or React ref object
 * @returns {void}
 *
 * @example
 * // Using with ID
 * scrollTo('top-section')
 *
 * // Using with React ref
 * const myRef = useRef(null);
 * <div ref={myRef}>Content</div>
 * scrollTo(myRef) // Scrolls to the div element
 *
 * // In a component
 * const ContactForm = () => {
 *   const formRef = useRef(null);
 *   return (
 *     <form ref={formRef}>
 *       <button onClick={() => scrollTo(formRef)}>
 *         Scroll to form
 *       </button>
 *     </form>
 *   );
 * }
 */
export const scrollTo = idOrRef => {
    const element = typeof idOrRef === 'string' ? document.getElementById(idOrRef) : idOrRef?.current;
    if (element) element.scrollIntoView({ behavior: 'smooth' });
};
