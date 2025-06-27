import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  FingerPrintIcon,
  LockClosedIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import { CiCloudOn } from "react-icons/ci";
import { FaServer } from "react-icons/fa";
const features = [
  {
    name: "High Perfotmance Server",
    description:
      "Provide data process for an IOT devices faster and increase accuracy.",
    icon: FaServer,
  },
  {
    name: "Cloud Infrasturcture",
    description:
      "No worry of data losts Cloud Infrasturcture provide backup and fast recovery within seconds",
    icon: CiCloudOn,
  },
  {
    name: "Fast and secure connection",
    description:
      "Fast internet connection server provide data process faster and increase efficency  provide better user experiences.",
    icon: GlobeAltIcon,
  },
  {
    name: "Privacy",
    description:
      "We are not required your personal information and  required only just line application inorder to signin . ",
    icon: LockClosedIcon,
  },
];

export default function App() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          {/* <h2 className="text-base/7 font-semibold text-indigo-600">
            Deploy faster
          </h2> */}
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance">
            Manage IOT devices from your phone
          </p>
          <p className="mt-6 text-lg/8 text-gray-600">
            Autoinnova provide an interface make you able to control every IOT
            devices from everywhere just required only internet.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base/7 font-semibold text-gray-900">
                  <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon
                      aria-hidden="true"
                      className="size-6 text-white"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base/7 text-gray-600">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
