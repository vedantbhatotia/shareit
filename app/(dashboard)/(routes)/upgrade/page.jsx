export default function Upgrade() {
    return (
      <div className="bg-black text-white min-h-screen py-8">
        <div className="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16 mx-auto">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-stretch md:grid-cols-3 md:gap-8">
            
            <PlanCard
              planName="Starter"
              price="20"
              features={[
                "10 users",
                "2GB of storage",
                "Email support",
                "Help center access",
                "Phone support",
                "Community access",
              ]}
            />
  
            <PlanCard
              planName="Pro"
              price="30"
              features={[
                "20 users",
                "5GB of storage",
                "Email support",
                "Help center access",
                "Phone support",
                "Community access",
              ]}
            />
  
            <PlanCard
              planName="Enterprise"
              price="100"
              features={[
                "50 users",
                "20GB of storage",
                "Email support",
                "Help center access",
                "Phone support",
                "Community access",
              ]}
            />
          </div>
        </div>
      </div>
    );
  }
  
  function PlanCard({ planName, price, features }) {
    return (
      <div className="divide-y divide-gray-800 rounded-2xl border border-gray-800 shadow-lg">
        <div className="p-6 sm:px-8">
          <h2 className="text-lg font-medium text-white">
            {planName}
            <span className="sr-only">Plan</span>
          </h2>
          <p className="mt-2 text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          <p className="mt-2 sm:mt-4">
            <strong className="text-3xl font-bold text-white sm:text-4xl"> ${price} </strong>
            <span className="text-sm font-medium text-gray-400">/month</span>
          </p>
          <a
            className="mt-4 block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-center text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500 sm:mt-6 transition duration-300"
            href="#"
          >
            Get Started
          </a>
        </div>
        <div className="p-6 sm:px-8">
          <p className="text-lg font-medium text-white sm:text-xl">What's included:</p>
          <ul className="mt-2 space-y-2 sm:mt-4">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className={`w-5 h-5 ${feature.includes("access") ? "text-red-700" : "text-indigo-700"}`}
                >
                  {feature.includes("access") ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  )}
                </svg>
                <span className="text-gray-400">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
  