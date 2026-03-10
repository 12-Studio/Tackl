'use client';

// Imports
// ------------
import gsap from 'gsap';
import { use, useRef } from 'react';
import { useAnimation } from '@utils/useAnimation';
import Subheading from '@parts/Subheading';
import { NestedLenisContext } from '@parts/NestedLenis';
import { slow } from '@parts/AnimationPlugins/Curves';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const Statistic = ({
	heading,
	hasSymbolBefore,
	symbolBeforeNumber,
	symbolAfterNumber,
	number,
}: I.StatisticProps) => {
	const { scrollWrapper, lenisReady } = use(NestedLenisContext);

	const numberRef = useRef<HTMLParagraphElement>(null);
	const targetNumber = parseFloat(number);

	useAnimation(
		() => {
			if (
				!numberRef.current ||
				!scrollWrapper.current ||
				!lenisReady ||
				Number.isNaN(targetNumber)
			)
				return;

			const obj = { value: 0 };

			gsap.fromTo(
				obj,
				{ value: 0 },
				{
					value: targetNumber,
					duration: 1.2,
					ease: slow,
					onUpdate: () => {
						if (!numberRef.current) return;
						numberRef.current.textContent = Math.round(obj.value).toString();
					},
					scrollTrigger: {
						trigger: numberRef.current,
						scroller: scrollWrapper.current,
						start: 'top 90%',
						toggleActions: 'play none none none',
					},
				}
			);
		},
		{ scope: numberRef, dependencies: [lenisReady] }
	);

	return (
		<S.Jacket>
			<Subheading>
				<h3>{heading}</h3>
			</Subheading>

			<S.AnimatedNumber
				ref={numberRef}
				$hasBeforeSymbol={hasSymbolBefore}
				data-symbol-before={hasSymbolBefore ? symbolBeforeNumber : null}
				data-symbol-after={symbolAfterNumber ?? null}
			>
				{number}
			</S.AnimatedNumber>
		</S.Jacket>
	);
};

// Exports
// ------------
Statistic.displayName = 'Statistic';
export default Statistic;
