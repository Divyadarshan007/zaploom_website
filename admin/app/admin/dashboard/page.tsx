import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Package,
    Video,
    Users,
    MessageSquare,
} from 'lucide-react';

const stats = [
    { title: 'Total Products', value: '6', icon: Package, description: 'Live on portfolio' },
    { title: 'Testimonials', value: '4', icon: Video, description: 'Client video stories' },
    { title: 'Team Members', value: '2', icon: Users, description: 'Zaploom core team' },
    { title: 'New Inquiries', value: '0', icon: MessageSquare, description: 'Last 24 hours' },
];

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">
                    Welcome to your Zaploom administration panel.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.title}>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                            <stat.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground">{stat.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Recent Inquiries</CardTitle>
                        <CardDescription>You have no new inquiries at the moment.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {/* Table or list of inquiries would go here */}
                        <div className="flex h-40 items-center justify-center border-2 border-dashed rounded-md text-muted-foreground">
                            No recent activity
                        </div>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-2">
                        {/* Quick action buttons */}
                        <div className="text-sm text-muted-foreground">Coming soon...</div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
