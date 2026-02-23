# Motion: Using AnimatePresence for Animations

Motion (formerly Framer Motion) is a popular React animation library that makes it easy to implement animations with modern and declarative code. This documentation explains how to use AnimatePresence for animating components when they are added or removed from the DOM.

## What is AnimatePresence?

AnimatePresence is a utility from Motion that enables animations for components entering and leaving the DOM. It is particularly useful for conditional rendering where you want to apply transitions when elements are shown or hidden.

### Basic Setup

Import the necessary components:

```jsx
import { motion, AnimatePresence } from 'motion';
```

Example: Animating a Modal
Here's a simple example of using AnimatePresence to animate a modal appearing and disappearing:

```jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion';

const ModalExample = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => setIsModalOpen(prev => !prev);

    return (
        <div>
            <button onClick={toggleModal}>{isModalOpen ? 'Close Modal' : 'Open Modal'}</button>

            {/* AnimatePresence Wrapper */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        key="modal"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* HTML Content */}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ModalExample;
```

### Key Concepts in the Example

1. Initial, Animate, and Exit Props
   These props define the animation's lifecycle:

-   initial: Defines the starting state when the component enters.
-   animate: Defines the state when the animation completes.
-   exit: Defines the state when the component leaves the DOM.

2. Wrapping with AnimatePresence
   AnimatePresence must wrap the conditional rendering logic to animate the component's removal.

3. Key Prop
   Use a key for each animating component to ensure Framer Motion tracks their identity during transitions.

Example: Animating a List
You can also animate list items when they are added or removed.

```jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion';

const ListExample = () => {
    const [items, setItems] = useState([1, 2, 3]);

    const addItem = () => {
        setItems(prev => [...prev, prev.length + 1]);
    };

    const removeItem = id => {
        setItems(prev => prev.filter(item => item !== id));
    };

    return (
        <div>
            <button onClick={addItem}>Add Item</button>
            <ul>
                <AnimatePresence>
                    {items.map(item => (
                        <motion.li
                            key={item}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => removeItem(item)}
                        >
                            Item {item}
                        </motion.li>
                    ))}
                </AnimatePresence>
            </ul>
        </div>
    );
};

export default ListExample;
```

### Common Pitfalls

Ensure Components are Conditioned Properly AnimatePresence requires the child component to unmount correctly. If it doesn’t unmount, exit animations will not run.

Use Keys for Unique Identity Always assign a unique key to elements to ensure Framer Motion identifies the right component to animate.

AnimatePresence Must Wrap Animating Components If AnimatePresence does not wrap the conditional rendering block, animations for removed components won’t work.

### Advanced Customizations

1. Stagger Children Animation
   To create a staggered effect for child animations, use variants and transition:

```jsx
const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

<motion.ul variants={container} initial="hidden" animate="show">
    {items.map(item => (
        <motion.li key={item} variants={item}>
            {item}
        </motion.li>
    ))}
</motion.ul>;
```

2. Custom Exit Before Enter
   By default, AnimatePresence doesn’t wait for exit animations to finish before starting initial. Use mode="wait" to change this behavior:

```jsx
<AnimatePresence mode="wait">{/* Components */}</AnimatePresence>
```

### Conclusion

AnimatePresence is a powerful tool for managing enter and exit animations in React. By leveraging Framer Motion’s declarative API, you can create polished UI transitions with minimal effort. Use these examples and tips as a foundation for implementing animations in your projects.

Read more about Framer Motion [here](https://motion.dev/).
