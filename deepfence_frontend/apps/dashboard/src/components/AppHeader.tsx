import classNames from 'classnames';
import { IconContext } from 'react-icons';
import {
  HiChevronLeft,
  HiLogout,
  HiMenu,
  HiOutlineBell,
  HiOutlineDesktopComputer,
  HiOutlineMoon,
  HiOutlineSun,
} from 'react-icons/hi';
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownSeparator,
  DropdownSubMenu,
  IconButton,
} from 'ui-components';

import { useTheme } from '@/theme/ThemeContext';
import storage from '@/utils/storage';
import { usePageNavigation } from '@/utils/usePageNavigation';

export interface DashboardHeaderProps {
  sideNavExpanded: boolean;
  onSideNavExpandedChange: (expanded: boolean) => void;
}

const themeSelectedDropdownClassname = 'text-blue-500 dark:text-blue-300';
const themeDropdownClassname = 'text-gray-700 dark:text-gray-400';

export function AppHeader({
  sideNavExpanded,
  onSideNavExpandedChange,
}: DashboardHeaderProps) {
  const { setMode, userSelectedMode } = useTheme();

  const { navigate } = usePageNavigation();
  return (
    <header
      className={classNames(
        'fixed z-10 top-0 px-2 bg-white dark:bg-gray-800 h-[64px] w-full border-b border-gray-200 dark:border-gray-700',
      )}
    >
      <div className="h-full flex items-center">
        <div
          className={classNames('mr-auto pl-2 flex gap-4 transition-[margin-left]', {
            ['ml-[64px]']: !sideNavExpanded,
            ['ml-[240px]']: sideNavExpanded,
          })}
        >
          <IconButton
            className="rounded-md p-1 bg-transparent"
            onClick={() => {
              onSideNavExpandedChange(!sideNavExpanded);
            }}
            icon={
              <IconContext.Provider
                value={{
                  className: 'w-8 h-8 text-gray-500 dark:text-gray-400',
                }}
              >
                <HiMenu />
              </IconContext.Provider>
            }
            size="xs"
          />
        </div>
        <div className="flex items-center gap-4">
          <IconContext.Provider
            value={{
              className: 'w-6 h-6 p-1 text-blue-600 dark:text-white',
            }}
          >
            <HiOutlineBell />
          </IconContext.Provider>
          <Dropdown
            triggerAsChild
            align="end"
            content={
              <>
                <DropdownSubMenu
                  triggerAsChild
                  content={
                    <>
                      <DropdownItem
                        onClick={() => {
                          setMode('light');
                        }}
                        className={
                          userSelectedMode === 'light'
                            ? themeSelectedDropdownClassname
                            : themeDropdownClassname
                        }
                      >
                        <HiOutlineSun />
                        Light
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => {
                          setMode('dark');
                        }}
                        className={
                          userSelectedMode === 'dark'
                            ? themeSelectedDropdownClassname
                            : themeDropdownClassname
                        }
                      >
                        <HiOutlineMoon />
                        Dark
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => {
                          setMode(undefined);
                        }}
                        className={
                          !userSelectedMode
                            ? themeSelectedDropdownClassname
                            : themeDropdownClassname
                        }
                      >
                        <HiOutlineDesktopComputer />
                        Device Theme
                      </DropdownItem>
                    </>
                  }
                >
                  <DropdownItem onClick={(e) => e.preventDefault()}>
                    <IconContext.Provider
                      value={{
                        className: 'w-4 h-4',
                      }}
                    >
                      <HiChevronLeft />
                    </IconContext.Provider>
                    <span className="text-gray-700 dark:text-gray-400">Theme</span>
                  </DropdownItem>
                </DropdownSubMenu>

                <DropdownSeparator />
                <DropdownItem
                  onClick={() => {
                    storage.clearAuth();
                    navigate('/auth/login');
                  }}
                  className="text-red-700 dark:text-red-500"
                >
                  <HiLogout />
                  Logout
                </DropdownItem>
              </>
            }
          >
            <div>
              <Avatar />
            </div>
          </Dropdown>
        </div>
      </div>
    </header>
  );
}
