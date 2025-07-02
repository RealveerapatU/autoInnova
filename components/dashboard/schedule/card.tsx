"use client";
import { Card, CardHeader, CardBody } from "@heroui/react";
import { Badge, Avatar } from "@heroui/react";
export default function App() {
  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-white">
      <div className="w-full md:w-64 bg-white shadow-xl p-4">
        <div className="mb-4">
          <h5 className="text-xl font-semibold text-blue-gray-900">Sidebar</h5>
        </div>
        <nav className="flex flex-col gap-1 text-base text-blue-gray-700">
          <div
            role="button"
            className="flex items-center w-full p-3 rounded-lg transition-all hover:bg-blue-gray-50 hover:text-blue-gray-900"
          >
            <div className="grid mr-4 place-items-center">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.25 2.25a.75.75 0 000 1.5H3v10.5a3 3 0 003 3h1.21l-1.172 3.513a.75.75 0 001.424.474l.329-.987h8.418l.33.987a.75.75 0 001.422-.474l-1.17-3.513H18a3 3 0 003-3V3.75h.75a.75.75 0 000-1.5H2.25zm6.04 16.5l.5-1.5h6.42l.5 1.5H8.29zm7.46-12a.75.75 0 00-1.5 0v6a.75.75 0 001.5 0v-6zm-3 2.25a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0V9zm-3 2.25a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z"
                />
              </svg>
            </div>
            Dashboard
          </div>
          <div
            role="button"
            className="flex items-center w-full p-3 rounded-lg transition-all hover:bg-blue-gray-50 hover:text-blue-gray-900"
          >
            <div className="grid mr-4 place-items-center">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z"
                />
              </svg>
            </div>
            Shop
          </div>
          {/* <div
            role="button"
            className="flex items-center w-full p-3 rounded-lg transition-all hover:bg-blue-gray-50 hover:text-blue-gray-900"
          >
            <div className="grid mr-4 place-items-center">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.912 3a3 3 0 00-2.868 2.118l-2.411 7.838a3 3 0 00-.133.882V18a3 3 0 003 3h15a3 3 0 003-3v-4.162c0-.299-.045-.596-.133-.882l-2.412-7.838A3 3 0 0017.088 3H6.912zm13.823 9.75l-2.213-7.191A1.5 1.5 0 0017.088 4.5H6.912a1.5 1.5 0 00-1.434 1.059L3.265 12.75H6.11a3 3 0 012.684 1.658l.256.513a1.5 1.5 0 001.342.829h3.218a1.5 1.5 0 001.342-.83l.256-.512a3 3 0 012.684-1.658h2.844z"
                />
              </svg>
            </div>
            Inbox
            <div className="grid ml-auto place-items-center">
              <div className="px-2 py-1 text-xs font-bold uppercase rounded-full bg-blue-gray-500/20 text-blue-gray-900">
                14
              </div>
            </div>
          </div> */}
          <div
            role="button"
            className="flex items-center w-full p-3 rounded-lg transition-all hover:bg-blue-gray-50 hover:text-blue-gray-900"
          >
            <div className="grid mr-4 place-items-center">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                />
              </svg>
            </div>
            Profile
          </div>
          <div
            role="button"
            className="flex items-center w-full p-3 rounded-lg transition-all hover:bg-blue-gray-50 hover:text-blue-gray-900"
          >
            <div className="grid mr-4 place-items-center">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.917 0 1.699-.663 1.85-1.567l.178-1.071c.02-.122.115-.262.297-.35.344-.165.673-.356.985-.57.167-.113.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.818l.922-1.597a1.875 1.875 0 00-.43-2.385l-.842-.692c-.094-.078-.168-.23-.153-.43a7.598 7.598 0 000-1.139c-.016-.201.059-.352.153-.43l.842-.692a1.875 1.875 0 00.43-2.385l-.922-1.597a1.875 1.875 0 00-2.28-.819l-1.02.382c-.115.043-.283.032-.45-.083a7.49 7.49 0 00-.985-.57c-.182-.087-.277-.227-.297-.348l-.178-1.072a1.875 1.875 0 00-1.85-1.566h-1.844zM12 15a3 3 0 100-6 3 3 0 000 6z"
                />
              </svg>
            </div>
            Settings
          </div>
        </nav>
      </div>
      <div className="flex flex-col md:flex-row gap-4 p-4 flex-auto">
        <div className="flex-1">
          <Card>
            <CardHeader>
              <p className="flex items-center gap-2">
                Active
                <span className="w-2 h-2 bg-green-500 rounded-full inline-block" />
              </p>
            </CardHeader>
            <CardBody>
              <h1>1</h1>
            </CardBody>
          </Card>
        </div>

        <div className="flex-1">
          <Card>
            <CardHeader>
              <p className="flex items-center gap-2">
                Inactive
                <span className="w-2 h-2 bg-red-500 rounded-full inline-block" />
              </p>
            </CardHeader>
            <CardBody>
              <h1>0</h1>
            </CardBody>
          </Card>
        </div>
        <div className="flex-1">
          <Card>
            <CardHeader>
              <p className="flex items-center gap-2">
                Total Devices
                <span className="w-2 h-2 bg-gray-500 rounded-full inline-block" />
              </p>
            </CardHeader>
            <CardBody>
              <h1>0</h1>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
