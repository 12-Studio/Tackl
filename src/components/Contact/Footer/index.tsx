'use client';

// Imports
// ------------
import Grid from '@waffl';
import Link from 'next/link';
import Frame from '@parts/Frame';
import SideFrame from '@parts/SideFrame';
import { use } from 'react';
import { GlobalContext } from '@parts/Contexts';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const Footer = ({ email, linkedin, twitter, legalTitle }: I.FooterProps) => {
	// Get the current year
	const year = new Date().getFullYear();

	// Contexts
	const { setModalActive } = use(GlobalContext);

	// Handle Legal
	const handleLegal = () => {
		setModalActive(legalTitle);
	};

	return (
		<S.Jacket>
			<SideFrame />
			<Frame className='bottom' />

			<S.ContactDetails>
				<Grid>
					<S.GridBlock>
						<S.GridBlockItem>
							<h3>Reach out</h3>
							<Link
								href={`mailto:${email}`}
								data-hover
								aria-label={`Email us at ${email}`}
							>
								{email}
							</Link>
						</S.GridBlockItem>

						{(linkedin || twitter) && (
							<S.GridBlockItem $isRight>
								<h3>Socials</h3>

								<ul>
									{linkedin && (
										<li data-hover>
											<Link
												href={linkedin}
												aria-label='Visit our LinkedIn profile'
												target='_blank'
												rel='noopener noreferrer'
											>
												LinkedIn
											</Link>
										</li>
									)}
									{twitter && (
										<li data-hover>
											<Link
												href={twitter}
												aria-label='Visit our Twitter profile'
												target='_blank'
												rel='noopener noreferrer'
											>
												Twitter
											</Link>
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
					<S.GridBlock $isLegal>
						<S.GridBlockItem>
							<p>
								<span>ONYX &copy; {year} • </span> All rights reserved
							</p>
						</S.GridBlockItem>

						<S.GridBlockItem $isLegal $isRight>
							<ul>
								<li data-hover>
									<button
										type='button'
										onClick={handleLegal}
										aria-label={`View ${legalTitle}`}
									>
										{legalTitle}
									</button>
								</li>
							</ul>
						</S.GridBlockItem>
					</S.GridBlock>
				</Grid>
			</S.Legals>
		</S.Jacket>
	);
};

// Exports
// ------------
Footer.displayName = 'Footer';
export default Footer;
