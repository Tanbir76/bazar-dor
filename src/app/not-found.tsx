import Link from "next/link";


const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 px-4 text-center">

      <h1 className="text-9xl font-extrabold text-green-700">
        404
      </h1>

      <h2 className="text-3xl font-bold text-green-950 mt-4">
        Page Not Found!
      </h2>

      <p className="text-gray-500 mt-3 max-w-md">
        Sorry, the page you are looking for doesnt exist
        or has been moved.
      </p>

      <Link
        href="/"
        className="mt-8 px-6 py-3 bg-green-700 text-white rounded-lg font-semibold hover:bg-green-800 transition duration-300"
      >
        Back to Home
      </Link>

    </div>
  );
};

export default NotFoundPage;
