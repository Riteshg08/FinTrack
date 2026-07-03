import {
  Wallet,
  PiggyBank,
  BarChart3,
  Bell,
  Target,
  ShieldCheck,
} from "lucide-react";

// List of features shown on the landing page
const features = [
  {
    title: "Track Expenses",
    description: "Record and organize your daily expenses effortlessly.",
    icon: Wallet,
  },
  {
    title: "Manage Budgets",
    description: "Set category budgets and monitor spending limits.",
    icon: PiggyBank,
  },
  {
    title: "Analytics",
    description: "Visualize your finances with interactive charts.",
    icon: BarChart3,
  },
  {
    title: "Alerts",
    description: "Get notified when you exceed your budget.",
    icon: Bell,
  },
  {
    title: "Savings Goals",
    description: "Set financial goals and track your progress.",
    icon: Target,
  },
  {
    title: "Secure Authentication",
    description: "Your data is protected with secure login and encrypted sessions.",
    icon: ShieldCheck,
  },
];

// Renders one feature card in the grid
function FeatureCard({ feature }) {
  const Icon = feature.icon;

  return (
    <div className="card p-6 sm:p-8 group hover:border-primary/20">
      <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:shadow-md group-hover:shadow-primary/25 transition-all duration-300">
        <Icon
          className="text-primary group-hover:text-white transition-colors duration-300"
          size={24}
        />
      </div>

      <h3 className="mt-5 text-lg font-bold text-slate-900">
        {feature.title}
      </h3>

      <p className="mt-2 text-slate-500 leading-relaxed text-sm">
        {feature.description}
      </p>
    </div>
  );
}

// Features section on the landing page
function Featuress() {
  const featureCards = [];

  for (let i = 0; i < features.length; i = i + 1) {
    const feature = features[i];
    featureCards.push(
      <FeatureCard key={feature.title} feature={feature} />
    );
  }

  return (
    <section className="relative py-20 sm:py-28 bg-gradient-to-b from-indigo-100/20 via-primary-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">
            Features
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-3">
            Everything You Need
          </h2>
          <p className="text-slate-500 mt-4 text-base sm:text-lg">
            Smart tools to manage your money and build better financial habits.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mt-12 sm:mt-16">
          {featureCards}
        </div>
      </div>
    </section>
  );
}

export default Featuress;
