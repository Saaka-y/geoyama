// import { useSession } from "next-auth/react";

export default function FavoritePage() {
//   const { data: session, status } = useSession();

//   if (status === "loading") {
//     return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
//   }

//   if (!session) {
//     return (
//       <div className="flex flex-col justify-center items-center min-h-screen">
//         <h2 className="text-2xl font-bold mb-4">Sign in required</h2>
//         <p className="text-gray-600">Please sign in to view your favorite mountains.</p>
//       </div>
//     );
//   }

  // TODO: お気に入り山の取得ロジックを実装
  // 仮データ
  const favoriteMountains = [
    { id: 1, title: "Mt. Nabewari", routeKey: "nabewari" },
    { id: 2, title: "Mt. Kinpu", routeKey: "kinpu" },
    { id: 3, title: "Mt. Kintoki", routeKey: "kintoki" },
    { id: 4, title: "Mt. Nantai", routeKey: "nantai" },
    { id: 5, title: "Mt. Ono", routeKey: "ono" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* 背景画像 */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(/background.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.5,
        }}
      />
      <div
          className="w-full max-w-md relative z-10"
          style={{
            background: 'var(--card-bg)',
            borderRadius: 'var(--card-radius)',
            padding: '2rem',
            boxShadow: 'var(--card-shadow)',
          }}
        >
        <h1 className="text-3xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
          Your Favorite Mountains
        </h1>
        {favoriteMountains.length === 0 ? (
          <p className="text-gray-600">No favorites yet.</p>
        ) : (
          <ul className="space-y-4">
            {favoriteMountains.map((mtn) => (
              <li key={mtn.id} className="p-4 bg-white/80 rounded-lg shadow flex items-center justify-between">
                <span className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>{mtn.title ?? 'No Title'}</span>
                <span className="text-sm text-gray-400">{mtn.routeKey ?? 'No Key'}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
