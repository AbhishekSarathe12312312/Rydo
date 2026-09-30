import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Navbar */}
      <nav className="border-b border-gray-800 bg-gray-950/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link to="/" className="text-2xl font-bold text-blue-500">
            Rydo
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <Link to="/" className="text-sm text-white">
              Home
            </Link>

            <Link
              to="/about"
              className="text-sm text-gray-400 transition hover:text-white"
            >
              About
            </Link>

            <Link
              to="/services"
              className="text-sm text-gray-400 transition hover:text-white"
            >
              Services
            </Link>

            <Link
              to="/contact"
              className="text-sm text-gray-400 transition hover:text-white"
            >
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="rounded-lg border border-gray-700 px-4 py-2 text-sm font-medium transition hover:border-gray-500"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold transition hover:bg-blue-700"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-400">
              🚗 Safe. Fast. Reliable.
            </div>

            <h1 className="text-5xl font-bold leading-tight sm:text-6xl">
              Your ride,
              <span className="text-blue-500"> your way.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-400">
              Book comfortable and reliable rides with Rydo. Get where you need
              to go with trusted drivers and a simple booking experience.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/login"
                className="rounded-xl bg-blue-600 px-7 py-3.5 font-semibold transition hover:bg-blue-700"
              >
                Book a Ride →
              </Link>

              <Link
                to="/services"
                className="rounded-xl border border-gray-700 px-7 py-3.5 font-semibold transition hover:border-gray-500"
              >
                Explore Services
              </Link>
            </div>

            <div className="mt-10 flex gap-10">
              <div>
                <p className="text-2xl font-bold">24/7</p>
                <p className="mt-1 text-sm text-gray-500">Available</p>
              </div>

              <div>
                <p className="text-2xl font-bold">3+</p>
                <p className="mt-1 text-sm text-gray-500">Vehicle Types</p>
              </div>

              <div>
                <p className="text-2xl font-bold">100%</p>
                <p className="mt-1 text-sm text-gray-500">Easy Booking</p>
              </div>
            </div>
          </div>

          {/* Hero Card */}
          <div className="relative">
            <div className="absolute -inset-10 rounded-full bg-blue-600/10 blur-3xl"></div>

            <div className="relative rounded-3xl border border-gray-800 bg-gray-900 p-6 shadow-2xl">
              <div className="rounded-2xl bg-gray-800 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Quick Booking</p>

                    <h2 className="mt-1 text-xl font-semibold">
                      Where are you going?
                    </h2>
                  </div>

                  <div className="rounded-xl bg-blue-600/10 px-3 py-2 text-2xl">
                    🚕
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="rounded-xl border border-gray-700 bg-gray-900 p-4">
                    <p className="text-xs text-gray-500">PICKUP</p>

                    <p className="mt-1 text-sm text-gray-200">
                      Your current location
                    </p>
                  </div>

                  <div className="rounded-xl border border-gray-700 bg-gray-900 p-4">
                    <p className="text-xs text-gray-500">DESTINATION</p>

                    <p className="mt-1 text-sm text-gray-200">
                      Where do you want to go?
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-xl border border-gray-700 bg-gray-900 p-3 text-center">
                      <div className="text-xl">🏍️</div>
                      <p className="mt-1 text-xs text-gray-400">Bike</p>
                    </div>

                    <div className="rounded-xl border border-blue-500/40 bg-blue-500/10 p-3 text-center">
                      <div className="text-xl">🛺</div>
                      <p className="mt-1 text-xs text-blue-400">Auto</p>
                    </div>

                    <div className="rounded-xl border border-gray-700 bg-gray-900 p-3 text-center">
                      <div className="text-xl">🚗</div>
                      <p className="mt-1 text-xs text-gray-400">Car</p>
                    </div>
                  </div>

                  <Link
                    to="/login"
                    className="block rounded-xl bg-blue-600 py-3 text-center font-semibold transition hover:bg-blue-700"
                  >
                    Book Your Ride
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="border-t border-gray-900 bg-gray-900/40 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-500">
              Our Services
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Everything you need for your journey
            </h2>

            <p className="mt-4 text-gray-400">
              Rydo makes everyday transportation simple, convenient and
              accessible.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: "🏍️",
                title: "Bike Rides",
                text: "Quick and affordable rides for short-distance travel.",
              },
              {
                icon: "🛺",
                title: "Auto Rides",
                text: "Comfortable everyday rides at convenient prices.",
              },
              {
                icon: "🚗",
                title: "Car Rides",
                text: "Enjoy a comfortable ride for longer journeys.",
              },
            ].map((service) => (
              <div
                key={service.title}
                className="rounded-2xl border border-gray-800 bg-gray-900 p-7 transition hover:-translate-y-1 hover:border-gray-700"
              >
                <div className="text-4xl">{service.icon}</div>

                <h3 className="mt-5 text-xl font-semibold">{service.title}</h3>

                <p className="mt-3 leading-7 text-gray-400">{service.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Rydo */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-500">
                Why Rydo?
              </p>

              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                A simpler way to move around
              </h2>

              <p className="mt-5 leading-8 text-gray-400">
                From booking your ride to reaching your destination, Rydo keeps
                the experience simple and transparent.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {[
                {
                  icon: "⚡",
                  title: "Fast Booking",
                  text: "Request your ride in just a few simple steps.",
                },
                {
                  icon: "🛡️",
                  title: "Trusted Drivers",
                  text: "Ride with registered and approved drivers.",
                },
                {
                  icon: "📍",
                  title: "Easy Tracking",
                  text: "Keep track of your ride status from booking to completion.",
                },
                {
                  icon: "💰",
                  title: "Simple Pricing",
                  text: "Clear ride details before you start your journey.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-gray-800 bg-gray-900 p-6"
                >
                  <div className="text-2xl">{item.icon}</div>

                  <h3 className="mt-4 font-semibold">{item.title}</h3>

                  <p className="mt-2 text-sm leading-6 text-gray-400">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-7xl rounded-3xl border border-blue-500/20 bg-blue-600/10 px-6 py-14 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Ready to ride with Rydo?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            Create your account and book your first ride today.
          </p>

          <Link
            to="/register"
            className="mt-7 inline-block rounded-xl bg-blue-600 px-8 py-3.5 font-semibold transition hover:bg-blue-700"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-900">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-xl font-bold text-blue-500">Rydo</h3>

            <p className="mt-1 text-sm text-gray-500">Your ride, your way.</p>
          </div>

          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Rydo. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
