'use client';

// Imports
// ------------
import Grid from '@waffl';
import Link from 'next/link';
import Frame from '@parts/Frame';
import SideFrame from '@parts/SideFrame';

// Styles + Interfaces
// ------------
import type * as I from './interface';
import * as S from './styles';

// Component
// ------------
const Footer = ({ email, linkedin, twitter }: I.FooterProps) => {
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
							<p>All rights reserved</p>
						</S.GridBlockItem>

						<S.GridBlockItem $isLegal $isRight>
							<ul>
								<li data-hover>
									<Link
										href={'/privacy-policy'}
										aria-label='View Inventory Guide'
									>
										Inventory Guide
									</Link>
								</li>
								<li data-hover>
									<Link
										href={'/terms-of-service'}
										aria-label='View MBE Certificate'
									>
										MBE Certificate
									</Link>
								</li>
								<li data-hover>
									<Link
										href={'/terms-of-service'}
										aria-label='View Legal information'
									>
										Legal
									</Link>
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
