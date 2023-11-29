/**
 * Required external modules
 */
/** Clsx */
import clsx from 'clsx';
/** Lodash */
import upperFirst from 'lodash/upperFirst';
/** Material UI */
import { AccountCircle } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Divider, IconButton, ListItemIcon, Menu, MenuItem, Skeleton, Toolbar } from '@mui/material';
/** Next */
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
/** Nookies */
import { destroyCookie } from 'nookies';
/** React */
import React from 'react';
/** React Hot Toast */
import toast, { Toaster } from 'react-hot-toast';
/** Hooks */
import { useCookies, useToast, useUserAuthentication } from '@/hooks';
/** Images */
import RavelLogoSrc from 'public/assets/images/ravel-logo-square.png';
/** Types */
import { Cookies } from '@/types';

/**
 * Navigation bar component.
 * @returns { JSX.Element } JSX.Element - Navigation bar component
 */
const NavBar = (): JSX.Element => {
	const [anchorEl, setAnchorEl] = React.useState<(EventTarget & HTMLButtonElement) | null>(null);
	const { user }: Cookies = useCookies();
	const isUserAuthenticated = useUserAuthentication();
	const router = useRouter();

	const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
		setAnchorEl(event.currentTarget);

	const handleCloseMenu = () => setAnchorEl(null);

	/**
	 * Log user out.
	 */
	const handleLogout = () => {
		try {
			toast.loading('Logging Out...');

			/**
			 * Destroy cookies
			 */
			destroyCookie(null, 'accessToken');
			/** Destroy user cookie if user opted to remember me when login. */
			!user?.rememberMe && destroyCookie(null, 'user');

			toast.dismiss();
			useToast('Berhasil! Mengarahakan keluar...', 'success');

			setTimeout(() => {
				router.push('/');
			}, 2000);
		} catch (error) {
			toast.dismiss();

			useToast('Gagal!', 'error');
		}
	};

	/**
	 * Validate user is logged in
	 */
	React.useEffect(() => {
		if (isUserAuthenticated !== null && isUserAuthenticated === false) {
			router.push('/');
		}
	}, [isUserAuthenticated]);

	return (
		<React.Fragment>
			<div className='flex grow'>
				<AppBar className='border-b border-[#E3E3E3] shadow-none' position='static'>
					<Toolbar className='flex justify-between bg-white px-7 py-3 lg:relative lg:h-[88px] lg:justify-center lg:py-6'>
						<Link
							id='h-logo'
							className='flex gap-x-3 lg:absolute lg:left-14'
							href='/landing-page'
							data-cy='h-logo'
						>
							<Image className='aspect-square' src={RavelLogoSrc} height={40} alt='Ravel Logo' />
							<div className='justify-center lg:flex lg:flex-col' hidden>
								<span className='text-xs font-bold'>Ravel</span>
								<span className='text-[10px] font-light'>Travel Solution by Randy</span>
							</div>
						</Link>
						<div className='hidden gap-4 lg:flex'>
							<Link
								id='h-nav-home'
								className={clsx(
									router.pathname === '/landing-page' && 'text-[#4BFF72]',
									'text-xs font-semibold'
								)}
								href='/landing-page'
								data-cy='h-nav-home'
							>
								Home
							</Link>
							<Link
								id='h-nav-other-place'
								className={clsx(
									router.pathname === '/other-places' && 'text-[#4BFF72]',
									'text-xs font-semibold'
								)}
								href='/other-places'
								data-cy='h-nav-other-place'
							>
								Tempat Lain
							</Link>
							<Link
								id='h-nav-testimoni'
								className={clsx(
									router.pathname === '/testimony' && 'text-[#4BFF72]',
									'text-xs font-semibold'
								)}
								href='/testimony'
								data-cy='h-nav-testimoni'
							>
								Testimoni
							</Link>
						</div>
						<IconButton
							id='h-profile'
							className='hidden items-center gap-x-2 lg:absolute lg:right-14 lg:flex'
							aria-label='desktop-menu'
							aria-controls='desktop-menu'
							aria-haspopup='true'
							onClick={handleClickMenu}
							data-cy='h-profile'
						>
							{user?.name ? (
								<React.Fragment>
									<span className='text-sm font-thin capitalize'>{`Halo, ${user.name}`}</span>
									<AccountCircle />
								</React.Fragment>
							) : (
								<React.Fragment>
									<Skeleton className='w-12 text-sm' variant='text' />
									<Skeleton height={24} width={24} variant='circular' />
								</React.Fragment>
							)}
						</IconButton>
						<Menu
							id='desktop-menu'
							anchorEl={anchorEl}
							anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorEl)}
							onClose={handleCloseMenu}
						>
							<MenuItem onClick={handleLogout}>Log Out</MenuItem>
						</Menu>

						<IconButton className='lg:hidden' aria-label='menu' aria-haspopup onClick={handleClickMenu}>
							<MenuIcon />
						</IconButton>
						<Menu
							id='menu-appbar'
							anchorEl={anchorEl}
							anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorEl)}
							onClose={handleCloseMenu}
						>
							<MenuItem className='flex items-center gap-x-2'>
								{user?.name ? (
									<React.Fragment>
										<ListItemIcon>
											<AccountCircle />
										</ListItemIcon>
										{`Halo, ${upperFirst(user.name)}`}
									</React.Fragment>
								) : (
									<React.Fragment>
										<Skeleton className='w-12 text-sm' variant='text' />
										<Skeleton height={24} width={24} variant='circular' />
									</React.Fragment>
								)}
							</MenuItem>
							<Divider />
							<MenuItem onClick={handleCloseMenu}>
								<Link href='/landing-page' data-cy='h-nav-home'>
									Home
								</Link>
							</MenuItem>
							<MenuItem onClick={handleCloseMenu}>
								<Link href='/other-places' data-cy='h-nav-other-place'>
									Tempat Lain
								</Link>
							</MenuItem>
							<MenuItem onClick={handleCloseMenu}>
								<Link href='/testimony' data-cy='h-nav-testimoni'>
									Testimoni
								</Link>
							</MenuItem>
							<Divider />
							<MenuItem onClick={handleLogout}>Log Out</MenuItem>
						</Menu>
					</Toolbar>
				</AppBar>
			</div>
			<Toaster />
		</React.Fragment>
	);
};

export default NavBar;
