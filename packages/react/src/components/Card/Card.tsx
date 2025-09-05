/**
 * Card component family built with ras-UI design principles
 * Uses React Aria Components for accessibility and vanilla-extract for styling
 */

import React from 'react';

import type { ComponentSize } from '../../types';
import { cn } from '../../utils/cn';

import { 
  card, 
  cardHeader, 
  cardTitle, 
  cardDescription, 
  cardContent, 
  cardFooter 
} from './Card.css';

// Base card component props
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Visual elevation of the card
   * @default 'low'
   */
  elevation?: 'flat' | 'low' | 'medium' | 'high';
  
  /**
   * Whether the card responds to user interaction
   * @default false
   */
  interactive?: boolean;
  
  /**
   * Internal padding of the card
   * @default 'md'
   */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  
  /**
   * Card content
   */
  children?: React.ReactNode;
  
  /**
   * Additional CSS class
   */
  className?: string;
}

// Card header component props
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

// Card title component props  
export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /**
   * Title size variant
   * @default 'md'
   */
  size?: ComponentSize;
  
  /**
   * Semantic heading level
   * @default 'h3'
   */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  
  children?: React.ReactNode;
  className?: string;
}

// Card description component props
export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children?: React.ReactNode;
  className?: string;
}

// Card content component props
export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

// Card footer component props
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

/**
 * Card - Primary container component with elevation and interaction support
 * 
 * @example
 * ```tsx
 * <Card elevation="medium" interactive>
 *   <CardHeader>
 *     <CardTitle>Card Title</CardTitle>
 *     <CardDescription>Optional description</CardDescription>
 *   </CardHeader>
 *   <CardContent>
 *     Main card content goes here
 *   </CardContent>
 *   <CardFooter>
 *     <Button>Action</Button>
 *   </CardFooter>
 * </Card>
 * ```
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    { 
      elevation = 'low',
      interactive = false,
      padding = 'md',
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          card({
            elevation,
            interactive,
            padding,
          }),
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

/**
 * CardHeader - Header section with title and description area
 */
export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardHeader, className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

/**
 * CardTitle - Semantic heading for card title with size variants
 */
export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ size = 'md', as: Component = 'h3', className, children, ...props }, ref) => {
    return (
      <Component
        ref={ref as React.ForwardedRef<HTMLHeadingElement>}
        className={cn(cardTitle({ size }), className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

CardTitle.displayName = 'CardTitle';

/**
 * CardDescription - Secondary text for card descriptions
 */
export const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(cardDescription, className)}
        {...props}
      >
        {children}
      </p>
    );
  }
);

CardDescription.displayName = 'CardDescription';

/**
 * CardContent - Main content area of the card
 */
export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardContent, className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardContent.displayName = 'CardContent';

/**
 * CardFooter - Footer section for actions and secondary content
 */
export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardFooter, className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';

export default Card;