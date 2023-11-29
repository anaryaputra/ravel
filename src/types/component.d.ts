/**
 * Required external modules
 */
/** Embla Carousel */
import { EmblaOptionsType } from 'embla-carousel';
/** Material UI */
import { SkeletonProps } from '@mui/material';
/** Next */
import { ImageProps } from 'next/image';
/** React */
import React from 'react';

/**
 * Images
 */
/** Carousel */
export interface CarouselProps extends React.PropsWithChildren {
	options: EmblaOptionsType;
}
/** Thumbnail */
export interface ThumbnailProps extends ImageProps {
	size?: ThumbnailSize | undefined;
	type?: ThumbnailType;
	wrapperProps: WrapperProps;
}
export interface WrapperProps extends React.ComponentPropsWithRef<'figure'> {
	wrapperClassName?: string | undefined;
}
export type ThumbnailType = 'rectangle' | 'square';
export type ThumbnailSize = 'large' | 'small';

/**
 * Layouts
 */
/** Overview */
export interface OverviewProps<T = any> extends React.ComponentPropsWithRef<'section'> {
	data: T | null;
	index?: number | undefined;
	isLoading: boolean;
	sectionTitle?: SectionTitle;
	showPrice?: boolean;
	thumbnailSize?: ThumbnailSize;
}
export type SectionTitle = string | React.ReactElement | undefined;

/**
 * Skeletons
 */
/** TextSkeleton */
export interface TextSkeletonProps extends SkeletonProps {
	lines?: number;
	textSize?: string;
	type: TextSkeletonType;
	wrapped?: boolean | undefined;
}
export type TextSkeletonType = 'single' | 'grouped';
/** Thumbnail Skeleton */
export interface ThumbnailSkeleton extends SkeletonProps {
	fill?: boolean | undefined;
	type: ThumbnailType;
}

/**
 * Typography
 */
/** Title */
export interface TitleProps extends React.ComponentPropsWithoutRef<'h1'> {
	as: TitleAs;
	size?: TitleSize | undefined;
}
export type TitleAs = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type TitleSize = '2xl' | 'xl' | 'lg' | 'md' | 'base' | 'sm' | 'xs';
