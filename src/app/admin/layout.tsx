'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useAdminStore } from '@/store/useAdminStore';
import { Button } from '@/components/ui/Button';
import {
  LayoutDashboard,
  Package,
  Layers,
  ShoppingBag,
  Users,
  Star,
  Tag,
  Mail,
  Settings,
  Flame,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  ExternalLink,
  LogOut,
  ShieldAlert,
  Bell,
  Search,
} from 'lucide-react';
import { toast } from 'sonner';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout, isAdmin } = useAuthStore();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const messages = useAdminStore((s) => s.messages);
  const unreadCount = messages.filter((m) => m.status === 'Unread').length;

  const navItems: NavItem[] = [
    {
      label: 'Dashboard',
      href: '/admin',
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      label: 'Products',
      href: '/admin/products',
      icon: <Package className="h-4 w-4" />,
    },
    {
      label: 'Categories',
      href: '/admin/categories',
      icon: <Layers className="h-4 w-4" />,
    },
    {
      label: 'Orders',
      href: '/admin/orders',
      icon: <ShoppingBag className="h-4 w-4" />,
    },
    {
      label: 'Users',
      href: '/admin/users',
      icon: <Users className="h-4 w-4" />,
    },
    {
      label: 'Reviews',
      href: '/admin/reviews',
      icon: <Star className="h-4 w-4" />,
    },
    {
      label: 'Coupons',
      href: '/admin/coupons',
      icon: <Tag className="h-4 w-4" />,
    },
    {
      label: 'Contacts',
      href: '/admin/contacts',
      icon: <Mail className="h-4 w-4" />,
      badge: unreadCount > 0 ? unreadCount : undefined,
    },
    {
      label: 'Settings',
      href: '/admin/settings',
      icon: <Settings className="h-4 w-4" />,
    },
  ];

  // Role Gate: Only admin can access
  if (isClient && (!isAuthenticated || !isAdmin())) {
    return (
      <div className="min-h-screen bg-[#0F0D0B] text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#1A1715] p-8 rounded-3xl border border-[#C8922A]/30 text-center shadow-card">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-950/60 text-red-400 border border-red-500/30">
            <ShieldAlert className="h-8 w-8" />
          </div>
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#DFB15B] block mb-1">
            Access Restricted
          </span>
          <h2 className="font-serif text-3xl font-bold text-white mb-2">
            Admin Sanctuary Only
          </h2>
          <p className="text-xs text-[#AFA8A2] leading-relaxed mb-6">
            Only users with the <strong className="text-white">role=admin</strong> privilege are authorized to enter the FOXAL Management Suite.
          </p>

          <div className="space-y-3">
            <Button
              variant="primary"
              size="md"
              fullWidth
              onClick={() => {
                // Enable demo admin session for testing
                useAuthStore.setState({
                  user: {
                    id: 1,
                    name: 'Harsh Vora (Admin)',
                    email: 'harshvora2003@gmail.com',
                    role: 'admin',
                    phone: '+91 98765 43210',
                  },
                  isAuthenticated: true,
                });
                if (typeof document !== 'undefined') {
                  document.cookie = 'foxal_role=admin; path=/; max-age=86400';
                }
                toast.success('Admin privileges verified.');
              }}
            >
              Authorize as Master Admin
            </Button>

            <Link href="/login?redirect=/admin" className="block">
              <Button variant="outline" size="md" fullWidth className="text-xs text-white border-white/20">
                Sign In with Credentials
              </Button>
            </Link>

            <Link href="/" className="block text-xs text-[#DFB15B] hover:underline pt-2">
              ← Return to Sacred Storefront
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6EFE4] text-[#0F0D0B] flex font-sans">
      {/* ── DESKTOP SIDEBAR ── */}
      <aside
        className={`hidden lg:flex flex-col border-r border-[#C8922A]/20 bg-[#0F0D0B] text-white transition-all duration-300 z-30 shrink-0 ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-[#272320]">
          {!isCollapsed && (
            <Link href="/admin" className="flex items-center gap-2.5">
              <div className="relative h-9 w-9 rounded-xl overflow-hidden bg-white p-0.5 border border-[#C8922A]/40 shadow-sm shrink-0 flex items-center justify-center">
                <Image
                  src="/images/logo.png"
                  alt="FOXAL"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-serif text-lg font-bold tracking-wider text-white block leading-none">
                  FOXAL
                </span>
                <span className="text-[8px] uppercase tracking-[0.25em] font-semibold text-[#DFB15B]">
                  Admin Portal
                </span>
              </div>
            </Link>
          )}

          {isCollapsed && (
            <Link href="/admin" className="mx-auto">
              <div className="relative h-9 w-9 rounded-xl overflow-hidden bg-white p-0.5 border border-[#C8922A]/40 flex items-center justify-center">
                <Image
                  src="/images/logo.png"
                  alt="FOXAL"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
            </Link>
          )}

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg text-[#AFA8A2] hover:text-white hover:bg-[#1A1715] transition-colors focus:outline-none"
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive =
              item.href === '/admin'
                ? pathname === '/admin'
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                  isActive
                    ? 'bg-[#C8922A] text-white shadow-sm'
                    : 'text-[#CFCAC6] hover:bg-[#1A1715] hover:text-[#DFB15B]'
                }`}
                title={isCollapsed ? item.label : undefined}
              >
                <span className={isActive ? 'text-white' : 'text-[#DFB15B] group-hover:scale-110 transition-transform'}>
                  {item.icon}
                </span>
                {!isCollapsed && <span>{item.label}</span>}
                {!isCollapsed && item.badge !== undefined && (
                  <span
                    className={`ml-auto px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive
                        ? 'bg-white text-[#0F0D0B]'
                        : 'bg-[#C8922A] text-white'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom User Area */}
        <div className="p-3 border-t border-[#272320]">
          {!isCollapsed ? (
            <div className="flex items-center justify-between bg-[#1A1715] p-2.5 rounded-2xl border border-[#272320]">
              <div className="overflow-hidden">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#DFB15B] block">
                  Admin Active
                </span>
                <p className="text-xs font-semibold text-white truncate max-w-[120px]">
                  {user?.name || 'Administrator'}
                </p>
              </div>
              <button
                onClick={async () => {
                  await logout();
                  router.push('/login');
                }}
                className="p-1.5 text-[#AFA8A2] hover:text-red-400 transition-colors"
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={async () => {
                await logout();
                router.push('/login');
              }}
              className="w-full flex justify-center p-2 text-[#AFA8A2] hover:text-red-400"
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
            </button>
          )}
        </div>
      </aside>

      {/* ── MOBILE DRAWER SIDEBAR ── */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-72 bg-[#0F0D0B] text-white flex flex-col z-50 p-4 border-r border-[#C8922A]/20">
            <div className="flex items-center justify-between pb-4 border-b border-[#272320]">
              <div className="flex items-center gap-2.5">
                <div className="relative h-9 w-9 rounded-xl overflow-hidden bg-white p-0.5 border border-[#C8922A]/40 shrink-0 flex items-center justify-center">
                  <Image
                    src="/images/logo.png"
                    alt="FOXAL"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <div>
                  <span className="font-serif text-lg font-bold text-white block leading-none">
                    FOXAL
                  </span>
                  <span className="text-[8px] uppercase tracking-[0.25em] text-[#DFB15B]">
                    Admin Portal
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="p-2 text-[#AFA8A2] hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex-1 py-4 space-y-1 overflow-y-auto">
              {navItems.map((item) => {
                const isActive =
                  item.href === '/admin'
                    ? pathname === '/admin'
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-[#C8922A] text-white'
                        : 'text-[#CFCAC6] hover:bg-[#1A1715] hover:text-[#DFB15B]'
                    }`}
                  >
                    <span className={isActive ? 'text-white' : 'text-[#DFB15B]'}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                    {item.badge !== undefined && (
                      <span
                        className={`ml-auto px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          isActive
                            ? 'bg-white text-[#0F0D0B]'
                            : 'bg-[#C8922A] text-white'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-[#272320]">
              <Link
                href="/"
                target="_blank"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#1A1715] text-xs font-semibold text-[#DFB15B] border border-[#C8922A]/30 mb-2"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                <span>View Live Storefront</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ── MAIN CONTENT AREA ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="h-16 bg-white border-b border-[#E3D4BD] flex items-center justify-between px-4 sm:px-6 z-20 shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden p-2 rounded-xl text-[#0F0D0B] hover:bg-[#F6EFE4]"
              aria-label="Open Mobile Menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            <span className="text-xs font-bold uppercase tracking-wider text-[#7A5230] hidden sm:inline">
              Management Suite
            </span>
          </div>

          {/* Right Header CTAs */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F0D0B] bg-[#F6EFE4] hover:bg-[#EADECB] px-3.5 py-2 rounded-xl border border-[#E3D4BD] transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5 text-[#C8922A]" />
              <span className="hidden sm:inline">Live Storefront</span>
            </Link>

            <div className="h-4 w-px bg-[#E3D4BD]" />

            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-[#0F0D0B] text-[#DFB15B] flex items-center justify-center font-bold text-xs">
                {user?.name ? user.name[0].toUpperCase() : 'A'}
              </div>
              <div className="hidden sm:block text-left">
                <span className="text-xs font-bold text-[#0F0D0B] block leading-none">
                  {user?.name || 'Administrator'}
                </span>
                <span className="text-[10px] text-[#7A5230]">Super Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
