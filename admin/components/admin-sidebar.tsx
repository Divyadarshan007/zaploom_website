'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
    LayoutDashboard,
    Package,
    Video,
    Users,
    MessageSquare,
    HelpCircle,
    Settings,
    FileText,
    LogOut,
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
} from '@/components/ui/sidebar';

const menuItems = [
    {
        group: 'Main', items: [
            { title: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
            { title: 'Products', icon: Package, href: '/admin/products' },
            { title: 'Testimonials', icon: Video, href: '/admin/testimonials' },
            { title: 'Team Members', icon: Users, href: '/admin/team' },
            { title: 'Services', icon: Package, href: '/admin/services' },
            { title: 'FAQs', icon: HelpCircle, href: '/admin/faqs' },
            { title: 'Inquiries', icon: MessageSquare, href: '/admin/inquiries' },
        ]
    },
    {
        group: 'Page Settings', items: [
            { title: 'Home Page', icon: FileText, href: '/admin/settings/home' },
            { title: 'About Page', icon: FileText, href: '/admin/settings/about' },
            { title: 'Contact Page', icon: FileText, href: '/admin/settings/contact' },
            { title: 'Global Settings', icon: Settings, href: '/admin/settings/global' },
        ]
    },
];

export function AdminSidebar() {
    const pathname = usePathname();
    const { admin, logout } = useAuth();

    return (
        <Sidebar variant="sidebar" collapsible="icon">
            <SidebarHeader className="border-b px-4 py-2">
                <Link href="/admin/dashboard" className="flex items-center gap-2 font-bold tracking-tight">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                        Z
                    </div>
                    <span className="truncate group-data-[collapsible=icon]:hidden">Zaploom Admin</span>
                </Link>
            </SidebarHeader>
            <SidebarContent>
                {menuItems.map((group) => (
                    <SidebarGroup key={group.group}>
                        <SidebarGroupLabel>{group.group}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.items.map((item) => (
                                    <SidebarMenuItem key={item.href}>
                                        <SidebarMenuButton
                                            render={<Link href={item.href} />}
                                            isActive={pathname.startsWith(item.href)}
                                            tooltip={item.title}
                                        >
                                            <item.icon className="h-4 w-4" />
                                            <span>{item.title}</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarFooter className="border-t p-2">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton onClick={logout} className="text-destructive hover:text-destructive hover:bg-destructive/10">
                            <LogOut className="h-4 w-4" />
                            <span>Logout</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
