/**
 * Required external modules
 */
/** Embla Carousel */
import { EmblaOptionsType } from 'embla-carousel';
/** Formik */
import { FieldProps as FormikFieldProps, FormikErrors, FormikTouched } from 'formik';
/** Material UI */
import { ButtonProps as MuiButtonProps, SkeletonProps } from '@mui/material';
/** Next */
import { ImageProps } from 'next/image';
/** Prisma */
import { Testimony } from '@prisma/client';
/** React */
import React from 'react';

/**
 * Card
 */
/** Testimony Card */
export interface TestimonyCardProps {
	data: Testimony;
}

/**
 * Form
 */
/** Button */
export interface ButtonProps extends MuiButtonProps {
	asLink?: boolean | undefined;
	colorScheme: 'light' | 'dark';
}
/** Checkbox */
export interface CheckboxProps extends FormikFieldProps {
	className?: string | undefined;
	label: string;
}
/** Field */
export interface FieldProps extends FormikFieldProps {
	className?: string | undefined;
	endAdornment?: React.ReactNode | undefined;
	label?: string | undefined;
}

/**
 * Images
 */
/** Carousel */
export interface CarouselProps extends React.PropsWithChildren {
	options: EmblaOptionsType;
}
/** Jumbotron */
export interface JumbotronProps {
	alt: string;
	src: string;
	withText?: boolean;
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
export interface OverviewProps<Data = any> extends React.ComponentPropsWithRef<'section'> {
	data: Data | undefined;
	index?: number | undefined;
	isLoading: boolean;
	sectionTitle?: SectionTitle;
	showPrice?: boolean;
	thumbnailSize?: ThumbnailSize;
}
export interface Top5TourProps<Data = any> extends React.ComponentPropsWithRef<'section'> {
	data: Data | undefined;
	isLoading: boolean;
}
export type SectionTitle = string | React.ReactElement | undefined;

/**
 * Skeletons
 */
/** TextSkeleton */
export interface TextSkeletonProps extends SkeletonProps {
	as: TypographyType;
	lines?: number;
	type: TextSkeletonType;
	wrapped?: boolean | undefined;
}
export type TextSkeletonType = 'single' | 'grouped';
/** Thumbnail Skeleton */
export interface ThumbnailSkeletonProps extends SkeletonProps {
	fill?: boolean | undefined;
	type: ThumbnailType;
}

/**
 * Typography
 */
/** Title */
export interface TitleProps extends React.ComponentPropsWithoutRef<'h1'> {
	as: TitleType;
}
export type TypographyType = TitleType | DescriptionType | CaptionType;
export type TitleType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type DescriptionType = 'description';
export type CaptionType = 'caption';
