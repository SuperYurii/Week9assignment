import { currentUser } from "@clerk/nextjs/server";
import db from "@/app/utils/db";
console.log(currentUser);

export default async function UserProfile() {
  const user = await currentUser();

  if (!user) {
    return (
      <p className="text-center text-red-500">
        User not found. Please sign in.
      </p>
    );
  }

  // ✅ Fetch user details from PostgreSQL using Clerk ID
  const result = await db.query("SELECT * FROM users WHERE clerk_id = $1", [
    user.id,
  ]);

  const userData = result.rows[0];

  if (!userData) {
    return (
      <p className="text-center text-gray-600">
        No profile found. Please complete your profile.
      </p>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          User Profile
        </h2>
        <div className="space-y-4">
          <p>
            <strong className="text-gray-700">First Name:</strong>{" "}
            {userData.first_name}
          </p>
          <p>
            <strong className="text-gray-700">Last Name:</strong>{" "}
            {userData.last_name}
          </p>
          <p>
            <strong className="text-gray-700">Username:</strong>{" "}
            {userData.username}
          </p>
          <p>
            <strong className="text-gray-700">Bio:</strong> {userData.bio}
          </p>
        </div>
      </div>
    </div>
  );
}
