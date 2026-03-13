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

// Helpers
// ------------
const formatDisplayValue = (value: number, useK: boolean): string =>
	useK ? `${Math.round(value)}k` : Math.round(value).toString();

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

			const useK = targetNumber >= 1000;
			const animationTarget = useK ? targetNumber / 1000 : targetNumber;

			const obj = { value: 0 };

			gsap.fromTo(
				obj,
				{ value: 0 },
				{
					value: animationTarget,
					duration: 1.2,
					ease: slow,
					onUpdate: () => {
						if (!numberRef.current) return;
						numberRef.current.textContent = formatDisplayValue(obj.value, useK);
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
				{!Number.isNaN(targetNumber)
				? formatDisplayValue(
						targetNumber >= 1000 ? targetNumber / 1000 : targetNumber,
						targetNumber >= 1000
					)
				: number}
			</S.AnimatedNumber>
		</S.Jacket>
	);
};

// Exports
// ------------
Statistic.displayName = 'Statistic';
export default Statistic;
