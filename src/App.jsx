import sunconure from './assets/sun conure.jpg'
import cockatiel from './assets/Cockatiel.jpg'
import lovebirds from './assets/lovebirds.jpg'
export default function AviaryWebsite() {
  const birds = [
    {
      name: "Sun Conure",
      description:
        "Sun Conures are vibrant, affectionate parrots known for their bright yellow, orange, and green feathers.",
      image: sunconure,
    },
    {
      name: "Cockatiel",
      description: "Playful and affectionate birds perfect for families.",
      image:cockatiel,
    },
    {
      name: "Love Birds",
      description: "Lovebird are affectionate, playful parrots known for their strong bonds, vibrant colors, and cheerful personalities.",
      image:lovebirds,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-200 to-white text-gray-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-green-300 via-emerald-500 to-green-300 opacity-0"></div>

        <div className="relative max-w-6xl mx-auto px-6 py-24 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-green-900">
            Welcome to Our Aviary
          </h1>

          <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-700 mb-8">
            Healthy, beautiful, and well-cared-for exotic birds including
            African Grey Parrots, Cockatiels, Macaws, and more.
          </p>

          <a
          href="#contact"
          className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-2xl shadow-lg transition inline-block"
          >
            Contact Us
        </a>
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-4 text-green-800">
            About Our Birds
          </h2>

          <p className="text-gray-700 leading-8 text-lg">
            We are passionate bird lovers dedicated to raising healthy and
            friendly exotic birds in a safe and caring environment. Our aviary
            focuses on proper nutrition, hygiene, and social interaction to
            ensure every bird receives the best care possible.
          </p>
        </div>
      </section>

      {/* Birds Section */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-green-900 mb-4">
            Our Birds
          </h2>
          <p className="text-gray-600 text-lg">
            A few of the beautiful birds available in our aviary.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {birds.map((bird, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl overflow-hidden shadow-lg hover:scale-105 transition duration-300"
            >
              <img
                src={bird.image}
                alt={bird.name}
                className="h-24 w-24 object-cover rounded-full mx-auto mt-6 border-4 border-green-200"
              />

              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2 text-green-800">
                  {bird.name}
                </h3>

                <p className="text-gray-600 leading-7">
                  {bird.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="max-w-4xl mx-auto px-6 py-20">
        <div className="bg-green-800 text-white rounded-3xl p-10 text-center shadow-xl">
          <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>

          <p className="text-lg mb-6 text-green-100">
            Interested in our birds or want to visit the aviary? Contact us for
            more details.
          </p>

          <div className="space-y-2 text-lg">
            <p>📞 +91 9946837792</p>
            <p>📍 Kerala, India</p>
            <p>✉️ youraviary@email.com</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-950 text-green-100 py-6 text-center mt-10">
        <p>
          © 2026 Our Aviary • Built with love for birds 🦜
        </p>
      </footer>
    </div>
  );
}
