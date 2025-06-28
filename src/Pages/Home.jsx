import { useContext } from "react";
import { Helmet } from "react-helmet";
import { AuthContext } from "../Context/AuthContext";
import { Link } from "react-router-dom";
import FeatureBox from "../Components/FeatureBox/FeatureBox";
import { Inbox, Link2, Link2Off, Lock, MessageCircle, MessageSquare, User } from "lucide-react";

export default function Home() {
  const { userToken } = useContext(AuthContext);
  return (
    <>
      <Helmet>
  <title>{userToken ? "Welcome Back | Home" : "Join Us Today | Home"}</title>
</Helmet>
<div className="text-center">
  <header className="mt-20">
    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
      Express Yourself Freely!
    </h1>
    <p className="text-gray-600 dark:text-gray-300 mt-3 text-lg">
      Receive anonymous messages and share your thoughts without fear.
    </p>
    <Link
      to={userToken ? "/profile" : "/login"}
      className="inline-block mt-5 px-6 py-3 bg-blue-600 dark:bg-blue-700 text-white font-medium rounded-lg shadow-md hover:scale-105 hover:bg-blue-700 dark:hover:bg-blue-800 transition-transform"
    >
      Start Now
    </Link>
  </header>

  <section className="mt-20 px-6">
    <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
      How It Works
    </h2>
    <p className="text-gray-600 dark:text-gray-300 mt-2 text-lg">
      Follow these simple steps to get started.
    </p>
    <div className="flex flex-col sm:flex-row justify-center gap-8 mt-8">
      <FeatureBox
        icon={<User className="w-12 h-12 text-blue-500 m-auto" />}
        title="Create Your Profile"
        description="Sign up and get your personal link."
      />

      <FeatureBox
        icon={<Link2 className="w-12 h-12 text-green-500 m-auto" />}
        title="Share Your Link"
        description="Let others send you anonymous messages."
      />

      <FeatureBox
        icon={<MessageSquare className="w-12 h-12 text-purple-500 m-auto" />}
        title="Read Messages"
        description="View your messages in your inbox."
      />
    </div>
  </section>

  <section className="mt-20 px-6 text-center">
    <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
      Why Choose Us?
    </h2>
    <p className="text-gray-600 dark:text-gray-300 mt-2 text-lg">
      Here’s why thousands of users trust our platform.
    </p>
    <div className="flex flex-col sm:flex-row justify-center gap-8 mt-8 mb-8">
      <FeatureBox
        icon={<MessageCircle className="w-12 h-12 text-blue-500 m-auto" />}
        title="Anonymous Messaging"
        description="Receive honest feedback from others."
      />

      <FeatureBox
        icon={<Lock className="w-12 h-12 text-green-500 m-auto" />}
        title="100% Privacy"
        description="Your identity remains secure."
      />

      <FeatureBox
        icon={<Inbox className="w-12 h-12 text-purple-500 m-auto" />}
        title="Manage Your Inbox"
        description="Delete, pin, or reply easily."
      />
    </div>
  </section>
</div>


    </>
  );
}
