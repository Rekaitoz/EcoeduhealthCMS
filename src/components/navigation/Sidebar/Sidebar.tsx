import { UnstyledButton } from '@mantine/core';
import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useAuth } from '@/features/auth';
import { SidebarNavigation } from '@/types/navigation';

import { SidebarLink } from './SidebarLink';
import { SidebarLinkGroup } from './SidebarLinkGroup';

type Props = {
  navigations: SidebarNavigation;
};

export const Sidebar: React.FC<Props> = ({ navigations }) => {
  const trigger = useRef<HTMLButtonElement>(null);
  const sidebar = useRef<HTMLDivElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const { isPermitted } = useAuth();

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: any) => {
      const isExpanded = document.querySelector('body')?.classList.contains('sidebar-expanded');
      if (!isExpanded || keyCode !== 27) return;
      toggleSidebar();
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    const isExpanded = document.querySelector('body')?.classList.contains('sidebar-expanded');
    if (document.body.clientWidth < 1536 && isExpanded) {
      return document.body.classList.remove('sidebar-expanded');
    }
  }, [pathname]);

  function toggleSidebar() {
    const isExpanded = document.querySelector('body')?.classList.contains('sidebar-expanded');
    if (isExpanded) {
      return document.body.classList.remove('sidebar-expanded');
    }

    document.body.classList.add('sidebar-expanded');
  }

  return (
    <div className="relative">
      <div
        className="fixed inset-0 bg-gray-900 lg:bg-opacity-0 bg-opacity-40 z-40 lg:z-auto transition-opacity duration-200 hidden sidebar-expanded:block !lg:hidden"
        aria-hidden="true"
        ref={overlay}
        onClick={toggleSidebar}
      ></div>

      <div
        id="sidebar"
        ref={sidebar}
        className="flex flex-col no-scrollbar absolute shadow-sm z-50 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-white p-4 transition-all duration-200 ease-in-out -translate-x-64 sidebar-expanded:translate-x-0"
      >
        <div className="flex justify-between mb-2 pr-3 sm:px-2">
          <UnstyledButton
            ref={trigger}
            onClick={toggleSidebar}
            className="lg:hidden text-gray-600 hover:text-gray-700 transition-colors"
            aria-controls="sidebar"
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </UnstyledButton>

          <Link to="/" className="block">
            <img src="/images/abude-logo.png" className="w-12 h-auto" alt="" />
          </Link>
        </div>

        <div className="space-y-8">
          {navigations.map(({ title, routes }, i) => (
            <div key={`section_${i}`}>
              {title && (
                <h3 className="text-xs uppercase text-gray-600 flex items-center leading-none mb-6">
                  <span
                    className="static sidebar-expanded:absolute 2xl:absolute left-0 text-center mx-auto w-4 h-px bg-gray-300"
                    aria-hidden="true"
                  ></span>
                  <span className="lg:hidden lg:sidebar-expanded:block 2xl:block pl-3 font-semibold h-0 -mt-2.5 whitespace-nowrap">
                    {title}
                  </span>
                </h3>
              )}

              <div className="mt-3 space-y-1">
                {routes
                  .filter(({ role }) => (role ? isPermitted(role) : true))
                  .map((route, index) => {
                    if (route.routes) {
                      return <SidebarLinkGroup key={`${route.title}_${index}`} {...route} />;
                    }

                    return <SidebarLink key={`${route.title}_${index}`} {...route} />;
                  })}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="px-3 py-2">
            <UnstyledButton onClick={toggleSidebar}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg className="w-5 h-5 fill-current sidebar-expanded:rotate-180" viewBox="0 0 24 24">
                <path
                  className="text-gray-700"
                  d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
                />
                <path className="text-gray-700" d="M3 23H1V1h2z" />
              </svg>
            </UnstyledButton>
          </div>
        </div>
      </div>
    </div>
  );
};
