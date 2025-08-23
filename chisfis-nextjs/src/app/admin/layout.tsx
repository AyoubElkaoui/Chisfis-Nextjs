import { ReactNode } from 'react';
import AdminNavigation from './components/AdminNavigation';
import AdminHeader from './components/AdminHeader';

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
            {/* Admin Header */}
            <AdminHeader />

            <div className="flex">
                {/* Sidebar */}
                <AdminNavigation />

                {/* Main Content */}
                <main className="flex-1 p-6 lg:p-8 overflow-x-hidden">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}