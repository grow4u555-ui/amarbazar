import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ShoppingBag,
  Store,
  Shield,
  Truck,
  Star,
  ArrowRight,
  Users,
  CreditCard,
  Smartphone,
  Globe,
} from 'lucide-react';

const features = [
  {
    icon: ShoppingBag,
    title: 'Wide Product Range',
    description: 'Discover thousands of products across multiple categories from verified sellers.',
  },
  {
    icon: Store,
    title: 'Multi-Vendor Platform',
    description: 'Empowering sellers to reach millions of customers with easy store management.',
  },
  {
    icon: Shield,
    title: 'Secure Payments',
    description: 'Multiple payment options including UPI, Cards, NetBanking, Wallets, and COD.',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Reliable shipping across India with real-time tracking and easy returns.',
  },
  {
    icon: Star,
    title: 'Verified Reviews',
    description: 'Authentic customer reviews and ratings to help you make informed decisions.',
  },
  {
    icon: Users,
    title: '24/7 Support',
    description: 'Dedicated customer support in English, Hindi, and Bengali.',
  },
];

const stats = [
  { value: '50K+', label: 'Products' },
  { value: '10K+', label: 'Sellers' },
  { value: '1M+', label: 'Happy Customers' },
  { value: '99%', label: 'Satisfaction Rate' },
];

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 via-white to-secondary-50 dark:from-primary-950 dark:via-gray-900 dark:to-secondary-950">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="container mx-auto px-4 py-20 lg:py-32 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-6 animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500" />
              </span>
              Now serving 100+ cities across India
            </div>
            <h1 className="text-display-md lg:text-display-lg font-heading font-bold text-foreground mb-6 animate-slide-in-from-bottom">
              India\'s Trusted{' '}
              <span className="text-primary">Multi-Vendor Marketplace</span>
            </h1>
            <p className="text-body-lg text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-in-from-bottom" style={{ animationDelay: '100ms' }}>
              Buy and sell with confidence. Secure payments, verified sellers, fast delivery, and
              easy returns - all in one platform built for India.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-in-from-bottom" style={{ animationDelay: '200ms' }}>
              <Button size="lg" asChild className="w-full sm:w-auto gap-2">
                <Link href="/products">Start Shopping</Link>
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
                <Link href="/seller/register">Start Selling</Link>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16 animate-fade-in" style={{ animationDelay: '300ms' }}>
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-border/50">
                <div className="text-3xl lg:text-4xl font-heading font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-display-sm font-heading font-bold text-foreground mb-4">
              Everything you need to{' '}
              <br />
              <span className="text-primary">succeed online</span>
            </h2>
            <p className="text-body-lg text-muted-foreground">
              Powerful features for buyers and sellers to make commerce simple and secure.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={feature.title} className="group hover:shadow-card-hover transition-shadow duration-300 border-border/50">
                <CardHeader>
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-heading-md">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-body-md">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works - For Buyers */}
      <section className="py-20 lg:py-32 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-display-sm font-heading font-bold text-foreground mb-6">
                For Buyers: <span className="text-primary">Shop with Confidence</span>
              </h2>
              <p className="text-body-lg text-muted-foreground mb-8">
                Discover products from thousands of verified sellers across India.
                Enjoy secure payments, fast delivery, and hassle-free returns.
              </p>
              <div className="space-y-4">
                {[
                  { icon: CreditCard, title: 'Multiple Payment Options', desc: 'UPI, Cards, NetBanking, Wallets, COD' },
                  { icon: Shield, title: 'Buyer Protection', desc: 'Secure transactions with dispute resolution' },
                  { icon: Truck, title: 'Fast Delivery', desc: 'Track your orders in real-time' },
                  { icon: Smartphone, title: 'Easy Returns', desc: '7-day return policy on most items' },
                ].map((item, index) => (
                  <div key={index} className="flex gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 border border-border/50">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 shrink-0">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 p-1">
                <div className="aspect-square rounded-xl bg-gray-50 dark:bg-gray-900 p-8 flex items-center justify-center">
                  <Globe className="h-32 w-32 text-primary-200 dark:text-primary-800" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works - For Sellers */}
      <section className="py-20 lg:py-32 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-secondary-500 to-secondary-700 p-1">
                <div className="aspect-square rounded-xl bg-gray-50 dark:bg-gray-900 p-8 flex items-center justify-center">
                  <Store className="h-32 w-32 text-secondary-200 dark:text-secondary-800" />
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-display-sm font-heading font-bold text-foreground mb-6">
                For Sellers: <span className="text-secondary">Grow Your Business</span>
              </h2>
              <p className="text-body-lg text-muted-foreground mb-8">
                Join thousands of sellers growing their business on BazaarConnect.
                Simple tools, fair commissions, and dedicated support.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Users, title: 'Easy Store Setup', desc: 'Get started in minutes with guided onboarding' },
                  { icon: Star, title: 'Fair Commission', desc: 'Transparent 5-10% flat fee per order' },
                  { icon: Shield, title: 'Seller Protection', desc: 'Fraud prevention and dispute support' },
                  { icon: CreditCard, title: 'Timely Payouts', desc: 'Weekly settlements to your bank account' },
                ].map((item, index) => (
                  <div key={index} className="flex gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-border/50">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary-100 dark:bg-secondary-900/30 text-secondary-600 dark:text-secondary-400 shrink-0">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button asChild className="mt-6 w-full sm:w-auto">
                <Link href="/seller/register">Start Selling Today</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-primary-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-display-sm font-heading font-bold text-white mb-4">
            Ready to start your journey?
          </h2>
          <p className="text-body-lg text-primary-100 mb-8 max-w-2xl mx-auto">
            Join millions of buyers and sellers on India\'s most trusted marketplace.
            Free to join, pay only when you sell.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" variant="secondary" asChild className="w-full sm:w-auto gap-2">
              <Link href="/products">Explore Products</Link>
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10" asChild>
              <Link href="/seller/register">Become a Seller</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer Teaser */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { icon: Shield, title: 'Secure & Trusted', desc: 'Bank-grade encryption and buyer protection' },
              { icon: Truck, title: 'Pan-India Delivery', desc: 'Serving 19,000+ pin codes across India' },
              { icon: Users, title: 'Local Language Support', desc: 'Available in English, Hindi, and Bengali' },
            ].map((item, index) => (
              <div key={index} className="p-6">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mx-auto mb-4">
                  <item.icon className="h-7 w-7" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}