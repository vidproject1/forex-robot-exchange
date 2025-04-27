
import { NavBar } from "@/components/NavBar";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-background to-muted">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              About ForexRobotX
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto mb-6 text-muted-foreground">
              Connecting forex robot creators with traders seeking automation solutions
            </p>
          </div>
        </section>
        
        {/* Mission Section */}
        <section className="py-16 px-4 md:px-6 lg:px-8">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Mission</h2>
            <div className="prose prose-lg mx-auto dark:prose-invert">
              <p>
                ForexRobotX was created with a simple mission: to build a transparent and
                efficient marketplace connecting forex robot developers with traders who want
                to automate their trading strategies.
              </p>
              <p>
                We believe that trading automation should be accessible to everyone, from
                experienced algorithmic traders to newcomers looking to leverage proven
                strategies. Our platform helps buyers find reliable, high-quality robots
                while giving talented developers a place to showcase their work.
              </p>
              <p>
                Unlike other platforms, we don't act as intermediaries for payments or robot
                delivery. Instead, we provide a secure environment where buyers and sellers
                can connect directly, communicate effectively, and build trusted relationships.
              </p>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-16 px-4 md:px-6 lg:px-8 bg-muted">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">How ForexRobotX Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card border rounded-lg p-6">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <span className="text-primary text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">For Sellers</h3>
                <p className="text-muted-foreground">
                  Create detailed listings for your forex robots, including specifications,
                  pricing, and optional demo materials. Connect directly with potential buyers
                  through our messaging system.
                </p>
              </div>
              <div className="bg-card border rounded-lg p-6">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <span className="text-primary text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">For Buyers</h3>
                <p className="text-muted-foreground">
                  Browse our extensive marketplace of forex robots, use filters to find options
                  that match your trading needs, and communicate directly with sellers to ask
                  questions before making a purchase.
                </p>
              </div>
              <div className="bg-card border rounded-lg p-6">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <span className="text-primary text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Direct Transactions</h3>
                <p className="text-muted-foreground">
                  Once you've found the right robot, arrange payment and delivery directly with
                  the seller. We provide the platform for connection, but the transaction happens
                  between you and the seller.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Trust & Safety Section */}
        <section className="py-16 px-4 md:px-6 lg:px-8">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold mb-8 text-center">Trust & Safety</h2>
            <div className="bg-card border rounded-lg p-8">
              <div className="prose prose-lg mx-auto dark:prose-invert">
                <p>
                  At ForexRobotX, we take trust and safety seriously. While we don't handle
                  the actual transactions, we've implemented several measures to create a
                  secure marketplace:
                </p>
                <ul>
                  <li>
                    <strong>Seller Verification:</strong> All sellers undergo a verification
                    process before they can list robots.
                  </li>
                  <li>
                    <strong>User Ratings:</strong> Our rating system helps identify reliable
                    sellers and quality robots.
                  </li>
                  <li>
                    <strong>Secure Messaging:</strong> Our platform provides a secure channel
                    for communication between buyers and sellers.
                  </li>
                  <li>
                    <strong>Content Moderation:</strong> All listings are reviewed to ensure
                    they meet our quality standards.
                  </li>
                  <li>
                    <strong>Dispute Resolution:</strong> Our team is available to help
                    mediate any issues that may arise.
                  </li>
                </ul>
                <p>
                  We recommend that users take standard precautions when making online
                  transactions, such as researching sellers, asking detailed questions, and
                  using secure payment methods.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 px-4 md:px-6 lg:px-8 bg-primary text-primary-foreground">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Join our community of forex robot creators and traders today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/marketplace">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Explore Marketplace
                </Button>
              </Link>
              <Link to="/register">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="py-10 px-4 md:px-6 lg:px-8 border-t">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold">ForexRobotX</h3>
              <p className="text-muted-foreground mt-2">The marketplace for forex trading robots.</p>
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              <Link to="/marketplace" className="hover:text-primary transition-colors">
                Marketplace
              </Link>
              <Link to="/about" className="hover:text-primary transition-colors">
                About Us
              </Link>
              <Link to="/login" className="hover:text-primary transition-colors">
                Log In
              </Link>
              <Link to="/register" className="hover:text-primary transition-colors">
                Sign Up
              </Link>
            </div>
          </div>
          <div className="mt-10 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} ForexRobotX. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
