
## auth
- POST   /api/auth/signup
- POST   /api/auth/[...nextauth]

signoutはNextAuthのサインアウト機能を使用するため、APIエンドポイントは存在しない。

## user
- GET    /api/user/me
- PUT    /api/user/me
- GET    /api/user/favorites

## mountain
- GET    /api/mountains
- GET    /api/mountains/:id
- GET    /api/mountains/:id/geojson

## favorite
- GET    /api/favorites/check?userId=...&mountainId=...
- POST   /api/favorites/toggle:userId=...&mountainId=...

