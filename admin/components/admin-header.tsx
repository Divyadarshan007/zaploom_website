'use client';

import { useAuth } from '@/lib/auth-context';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Bell, Search, User } from 'lucide-react';

export function AdminHeader() {
    const { admin, logout } = useAuth();

    return (
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <SidebarTrigger className="-ml-1" />
            <div className="relative ml-auto flex-1 md:grow-0">
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <input
                        type="search"
                        placeholder="Search..."
                        className="w-full rounded-lg bg-background pl-8 text-sm focus:outline-none focus:ring-1 focus:ring-ring md:w-[200px] lg:w-[320px] h-9 border"
                    />
                </div>
            </div>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                <Bell className="h-4 w-4" />
                <span className="sr-only">Toggle notifications</span>
            </Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src="" alt={admin?.name} />
                            <AvatarFallback className="bg-primary/10 text-primary uppercase">
                                {admin?.name?.charAt(0) || <User className="h-4 w-4" />}
                            </AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="flex flex-col items-start gap-1">
                        <span className="font-medium">{admin?.name}</span>
                        <span className="text-xs text-muted-foreground">{admin?.email}</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive">
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    );
}
