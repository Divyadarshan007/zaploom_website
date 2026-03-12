'use client';

import { useAuth } from '../../lib/auth-context';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { AdminSidebar } from '../../components/admin-sidebar';
import { AdminHeader } from '../../components/admin-header';
import { SidebarProvider, SidebarInset } from '../../components/ui/sidebar';
import { Loader2 } from 'lucide-react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { admin, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!loading && !admin && pathname !== '/admin/login') {
            router.push('/admin/login');
        }
    }, [admin, loading, router, pathname]);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    // Login page has its own layout (no sidebar/header)
    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    if (!admin) return null;

    return (
        <SidebarProvider>
            <AdminSidebar />
            <SidebarInset>
                <div className="flex flex-col min-h-screen">
                    <AdminHeader />
                    <main className="flex-1 p-4 md:p-6 lg:p-8">
                        {children}
                    </main>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
