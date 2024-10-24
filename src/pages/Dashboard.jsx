import { useState } from 'react'
import { useAuthContext } from '../context/AuthContext' // Add the AuthContext import for handling logout
import { Link } from 'react-router-dom'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
} from '@headlessui/react'
import {
  Bars3CenterLeftIcon,
  BellIcon,
  ClockIcon,
  CogIcon,
  CreditCardIcon,
  DocumentChartBarIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  ScaleIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/20/solid'
const initialNavigation = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'Transactions', href: '/', icon: ClockIcon },
  { name: 'Balances', href: '/', icon: ScaleIcon },
  { name: 'Developers', href: '/', icon: CreditCardIcon },
  { name: 'Clients', href: '/', icon: UserGroupIcon },
  { name: 'Contracts', href: '/invoicelist', icon: DocumentChartBarIcon },
];
const secondaryNavigation = [
  { name: 'Settings', href: '/', icon: CogIcon },
  { name: 'Help', href: '/', icon: QuestionMarkCircleIcon },
  { name: 'Privacy', href: '/', icon: ShieldCheckIcon },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const {userData, Logout } = useAuthContext() 
  const [currentNav, setCurrentNav] = useState(initialNavigation[0].name); // Initialize to the first item
  
    const handleNavClick = (name) => {
    setCurrentNav(name); // Update the current navigation item
  };
  return (
    <>
      <div className="min-h-full">
        <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-40 lg:hidden">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative flex w-full max-w-xs flex-1 transform flex-col bg-cyan-700 pb-4 pt-5 transition duration-300 ease-in-out data-[closed]:-translate-x-full"
            >
              <TransitionChild>
                <div className="absolute right-0 top-0 -mr-12 pt-2 duration-300 ease-in-out data-[closed]:opacity-0">
                  <button
                    type="button"
                    onClick={() => setSidebarOpen(false)}
                    className="relative ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon aria-hidden="true" className="h-6 w-6 text-white" />
                  </button>
                </div>
              </TransitionChild>
              <div className="flex flex-shrink-0 items-center px-4">
                <img
                  alt="Easywire logo"
                  src="https://tailwindui.com/plus/img/logos/mark.svg?color=cyan&shade=300"
                  className="h-8 w-auto"
                />
              </div>
              <nav aria-label="Sidebar" className="mt-5 h-full flex-shrink-0 divide-y divide-cyan-800 overflow-y-auto">
                <div className="space-y-1 px-2">
                {initialNavigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => handleNavClick(item.name)} // Set current item on click
                      aria-current={currentNav === item.name ? 'page' : undefined}
                      className={classNames(
                        currentNav === item.name ? 'bg-cyan-800 text-white' : 'text-cyan-100 hover:bg-cyan-600 hover:text-white',
                        'group flex items-center rounded-md px-2 py-2 text-base font-medium',
                      )}
                    >
                      <item.icon aria-hidden="true" className="mr-4 h-6 w-6 flex-shrink-0 text-cyan-200" />
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="mt-6 pt-6">
                  <div className="space-y-1 px-2">
                    {secondaryNavigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="group flex items-center rounded-md px-2 py-2 text-base font-medium text-cyan-100 hover:bg-cyan-600 hover:text-white"
                      >
                        <item.icon aria-hidden="true" className="mr-4 h-6 w-6 text-cyan-200" />
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </nav>
            </DialogPanel>
            <div aria-hidden="true" className="w-14 flex-shrink-0">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>

        {/* Static sidebar for desktop */}
        <div className="hidden z-40 lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-grow flex-col overflow-y-auto bg-cyan-700 pb-4 pt-5">
            <div className="flex flex-shrink-0 items-center px-4">
              <img
                alt="Easywire logo"
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=cyan&shade=300"
                className="h-8 w-auto"
              />
            </div>
            <nav aria-label="Sidebar" className="mt-5 flex flex-1 flex-col divide-y divide-cyan-800 overflow-y-auto">
              <div className="space-y-1 px-2 ">
              {initialNavigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => handleNavClick(item.name)} // Set current item on click
                    aria-current={currentNav === item.name ? 'page' : undefined}
                    className={classNames(
                      currentNav === item.name ? 'bg-cyan-800 text-white' : 'text-cyan-100 hover:bg-cyan-600 hover:text-white',
                      'group flex items-center rounded-md px-2 py-2 text-sm font-medium leading-6',
                    )}
                  >
                    <item.icon aria-hidden="true" className="mr-4 h-6 w-6 flex-shrink-0 text-cyan-200" />
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="mt-6 pt-6 ">
                <div className="space-y-1 px-2">
                  {secondaryNavigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="group flex items-center rounded-md px-2 py-2 text-sm font-medium leading-6 text-cyan-100 hover:bg-cyan-600 hover:text-white"
                    >
                      <item.icon aria-hidden="true" className="mr-4 h-6 w-6 text-cyan-200" />
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        </div>
        {/* Navbar */}
        <div className="lg:pl-64 flex h-16 flex-shrink-0 border-b border-gray-200 bg-white lg:border-l lg:border-yellow-600">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="border-r border-gray-200 px-4 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 lg:hidden"
            >
              <span className="sr-only ">Open sidebar</span>
              <Bars3CenterLeftIcon aria-hidden="true" className="h-6 w-6" />
            </button>
            {/* Search bar */}
            <div className="flex flex-1 justify-between px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
              <div className="flex flex-1">
                <form action="/" method="GET" className="flex w-full md:ml-0">
                  <label htmlFor="search-field" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                    <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                      <MagnifyingGlassIcon aria-hidden="true" className="h-5 w-5" />
                    </div>
                    <input
                      id="search-field"
                      name="search-field"
                      type="search"
                      placeholder="Search transactions"
                      className="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                    />
                  </div>
                </form>
              </div>
              <div className="ml-4 flex items-center md:ml-6">
                <button
                  type="button"
                  className="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon aria-hidden="true" className="h-6 w-6" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="relative flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 lg:rounded-md lg:p-2 lg:hover:bg-gray-50">
                      <span className="absolute -inset-1.5 lg:hidden" />
                      <img
                        alt=""
                        src={userData.photoURL || "https://via.placeholder.com/150"}
                        className="h-8 w-8 rounded-full"
                      />
                      <span className="ml-3 hidden text-sm font-medium text-gray-700 lg:block">
                        <span className="sr-only">Open user menu for </span>{userData.displayName}
                      </span>
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="ml-1 hidden h-5 w-5 flex-shrink-0 text-gray-400 lg:block"
                      />
                    </MenuButton>
                  </div>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    <MenuItem>
                      <Link to="/" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                        Your Profile
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link to="/" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                        Settings
                      </Link>
                    </MenuItem>
                    <MenuItem>
                     <Link  className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                        <button onClick={Logout}>
                          Logout
                        </button>
                        </Link>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </div>
            </div>
        </div>
      </div>
    </>
  )
}
