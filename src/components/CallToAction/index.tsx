'use client';

// Imports
// ------------
import SideFrame from '@parts/SideFrame';
import Frame from '@parts/Frame';
import Grid from '@waffl';
import { GlobalContext } from '@parts/Contexts';
import { use, useRef } from 'react';
import Button from '@parts/Button';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';
import Link from 'next/link';

// Component
// ------------
const CallToAction = ({
	isCtaOverridden,
	overrideHeading,
	overrideButtonLabel,
	heading,
	buttonLabel,
	email,
	linkedin,
	twitter,
}: I.CallToActionProps) => {
	// Contexts
	const { setIsModalOpen, setModalActive } = use(GlobalContext);

	// Refs
	const contactTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	// Handle Contact
	const handleContact = () => {
		setIsModalOpen(false);
		setModalActive('home');

		if (contactTimeoutRef.current) clearTimeout(contactTimeoutRef.current);
		contactTimeoutRef.current = setTimeout(() => {
			setIsModalOpen(true);
			setModalActive('Contact');
			contactTimeoutRef.current = null;
		}, 1100);
	};

	// Get CTA Label
	const sharedButtonLabel = isCtaOverridden ? (overrideButtonLabel ?? buttonLabel) : buttonLabel;

	// Get CTA Heading
	const sharedHeading = isCtaOverridden ? (overrideHeading ?? heading) : heading;

	return (
		<S.Jacket>
			<SideFrame />
			<Frame className='top' />

			<S.Top $pad>
				<Grid>
					<S.Heading $l='1/12'>{sharedHeading}</S.Heading>
					<S.Button>
						<Button
							label={sharedButtonLabel}
							ariaLabel={sharedButtonLabel}
							onClick={handleContact}
							onLight
						/>
					</S.Button>
				</Grid>
			</S.Top>

			<S.Bottom>
				<S.ContactDetails>
					<Grid>
						<S.GridBlock>
							<S.GridBlockItem>
								<h3>Reach out</h3>
								<Link href={`mailto:${email}`} data-hover>
									{email}
								</Link>
							</S.GridBlockItem>

							{(linkedin || twitter) && (
								<S.GridBlockItem $isRight>
									<h3>Socials</h3>

									<ul>
										{linkedin && (
											<li data-hover>
												<Link href={linkedin}>LinkedIn</Link>
											</li>
										)}
										{twitter && (
											<li data-hover>
												<Link href={twitter}>Twitter</Link>
											</li>
										)}
									</ul>
								</S.GridBlockItem>
							)}
						</S.GridBlock>
					</Grid>
				</S.ContactDetails>

				<S.Legals>
					<Frame className='top' />

					<Grid>
						<S.GridBlock>
							<S.GridBlockItem>
								<p>All rights reserved.</p>
							</S.GridBlockItem>

							<S.GridBlockItem $isLegal $isRight>
								<ul>
									<li data-hover>
										<Link href={'/privacy-policy'}>Inventory Guide</Link>
									</li>
									<li data-hover>
										<Link href={'/terms-of-service'}>MBE Certificate</Link>
									</li>
									<li data-hover>
										<Link href={'/terms-of-service'}>Legal</Link>
									</li>
								</ul>
							</S.GridBlockItem>
						</S.GridBlock>
					</Grid>
				</S.Legals>
			</S.Bottom>

			<Frame className='bottom' />
		</S.Jacket>
	);
};

// Exports
// ------------
CallToAction.displayName = 'CallToAction';
export default CallToAction;
