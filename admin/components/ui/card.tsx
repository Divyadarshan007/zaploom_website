import * as React from 'react';
import { cn } from '@/lib/utils';

function Card({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            className={cn(
                'bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm',
                className
            )}
            {...props}
        />
    );
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
    return <div className={cn('flex flex-col gap-1.5 px-6', className)} {...props} />;
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
    return <div className={cn('text-lg font-semibold', className)} {...props} />;
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
    return <p className={cn('text-muted-foreground text-sm', className)} {...props} />;
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
    return <div className={cn('px-6', className)} {...props} />;
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
    return <div className={cn('ml-auto', className)} {...props} />;
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
    return <div className={cn('flex items-center px-6 pb-6 pt-0', className)} {...props} />;
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardAction, CardFooter };
