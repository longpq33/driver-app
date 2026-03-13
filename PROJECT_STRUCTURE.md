/**
 * Driver App - Project Structure
 * Tech Stack: React Native (Bare CLI) + TypeScript + Zustand + TanStack Query
 *
 * Architecture: Clean Architecture (Data / Domain / Presentation)
 */

# Project Structure

```
DriverApp/
├── src/
│   ├── app/                          # Navigation & Screens (Entry points)
│   │   ├── (auth)/                   # Auth flow screens
│   │   │   ├── login/
│   │   │   │   ├── index.tsx
│   │   │   │   └── styles.ts
│   │   │   ├── otp/
│   │   │   │   ├── index.tsx
│   │   │   │   └── styles.ts
│   │   │   ├── register/
│   │   │   │   ├── index.tsx
│   │   │   │   └── styles.ts
│   │   │   └── forgot-password/
│   │   │       ├── index.tsx
│   │   │       └── styles.ts
│   │   ├── (tabs)/                   # Tab navigation screens
│   │   │   ├── home/
│   │   │   │   ├── index.tsx
│   │   │   │   └── styles.ts
│   │   │   ├── orders/
│   │   │   │   ├── index.tsx
│   │   │   │   ├── detail/
│   │   │   │   │   └── index.tsx
│   │   │   │   └── styles.ts
│   │   │   ├── wallet/
│   │   │   │   ├── index.tsx
│   │   │   │   └── styles.ts
│   │   │   └── profile/
│   │   │       ├── index.tsx
│   │   │       └── styles.ts
│   │   └── order/                    # Stack navigation (outside tabs)
│   │       ├── detail/
│   │       │   └── index.tsx
│   │       ├── pickup/
│   │       │   └── index.tsx
│   │       ├── delivery/
│   │       │   └── index.tsx
│   │       └── chat/
│   │           └── index.tsx
│   │
│   ├── core/                         # Core utilities & constants
│   │   ├── constants/
│   │   │   ├── api.ts                # API endpoints
│   │   │   ├── config.ts             # App configuration
│   │   │   └── index.ts
│   │   ├── theme/
│   │   │   ├── colors.ts             # Color palette
│   │   │   ├── spacing.ts            # Spacing values
│   │   │   ├── typography.ts         # Font styles
│   │   │   └── index.ts
│   │   ├── utils/
│   │   │   ├── format.ts             # Formatting utilities
│   │   │   ├── validation.ts         # Validation helpers
│   │   │   └── index.ts
│   │   ├── network/
│   │   │   ├── axiosClient.ts        # Axios instance
│   │   │   ├── interceptors.ts       # Request/response interceptors
│   │   │   └── index.ts
│   │   └── index.ts
│   │
│   ├── data/                         # Data Layer
│   │   ├── api/                      # API definitions
│   │   │   ├── authApi.ts
│   │   │   ├── orderApi.ts
│   │   │   ├── userApi.ts
│   │   │   ├── walletApi.ts
│   │   │   └── index.ts
│   │   ├── models/                   # Data Transfer Objects
│   │   │   ├── auth/
│   │   │   │   ├── login.dto.ts
│   │   │   │   └── register.dto.ts
│   │   │   ├── order/
│   │   │   │   ├── order.dto.ts
│   │   │   │   └── orderStatus.dto.ts
│   │   │   ├── user/
│   │   │   │   ├── profile.dto.ts
│   │   │   │   └── driver.dto.ts
│   │   │   └── wallet/
│   │   │       ├── transaction.dto.ts
│   │   │       └── withdrawal.dto.ts
│   │   └── repositories/             # Repository implementations
│   │       ├── authRepository.ts
│   │       ├── orderRepository.ts
│   │       ├── userRepository.ts
│   │       └── walletRepository.ts
│   │
│   ├── domain/                       # Domain Layer
│   │   ├── entities/                 # Business entities
│   │   │   ├── User.ts
│   │   │   ├── Driver.ts
│   │   │   ├── Order.ts
│   │   │   ├── OrderStatus.ts
│   │   │   ├── Transaction.ts
│   │   │   └── index.ts
│   │   ├── repositories/             # Repository interfaces
│   │   │   ├── IAuthRepository.ts
│   │   │   ├── IOrderRepository.ts
│   │   │   ├── IUserRepository.ts
│   │   │   └── IWalletRepository.ts
│   │   └── usecases/                # Business logic
│   │       ├── auth/
│   │       │   ├── loginUseCase.ts
│   │       │   ├── logoutUseCase.ts
│   │       │   └── refreshTokenUseCase.ts
│   │       ├── order/
│   │       │   ├── acceptOrderUseCase.ts
│   │       │   ├── rejectOrderUseCase.ts
│   │       │   ├── updateOrderStatusUseCase.ts
│   │       │   └── getOrderDetailUseCase.ts
│   │       └── driver/
│   │           ├── updateStatusUseCase.ts
│   │           └── updateLocationUseCase.ts
│   │
│   ├── presentation/                 # Presentation Layer
│   │   ├── components/               # Reusable UI components
│   │   │   ├── common/
│   │   │   │   ├── Button/
│   │   │   │   │   ├── index.tsx
│   │   │   │   │   └── styles.ts
│   │   │   │   ├── Input/
│   │   │   │   │   ├── index.tsx
│   │   │   │   │   └── styles.ts
│   │   │   │   ├── OTPInput/
│   │   │   │   │   ├── index.tsx
│   │   │   │   │   └── styles.ts
│   │   │   │   ├── Card/
│   │   │   │   │   ├── index.tsx
│   │   │   │   │   └── styles.ts
│   │   │   │   ├── Header/
│   │   │   │   │   ├── index.tsx
│   │   │   │   │   └── styles.ts
│   │   │   │   ├── Loading/
│   │   │   │   │   ├── index.tsx
│   │   │   │   │   └── styles.ts
│   │   │   │   ├── Modal/
│   │   │   │   │   ├── index.tsx
│   │   │   │   │   └── styles.ts
│   │   │   │   └── EmptyState/
│   │   │   │       ├── index.tsx
│   │   │   │       └── styles.ts
│   │   │   ├── order/
│   │   │   │   ├── OrderCard/
│   │   │   │   │   ├── index.tsx
│   │   │   │   │   └── styles.ts
│   │   │   │   ├── OrderStatusBadge/
│   │   │   │   │   ├── index.tsx
│   │   │   │   │   └── styles.ts
│   │   │   │   ├── OrderTimer/
│   │   │   │   │   ├── index.tsx
│   │   │   │   │   └── styles.ts
│   │   │   │   └── OrderActions/
│   │   │   │       ├── index.tsx
│   │   │   │       └── styles.ts
│   │   │   ├── map/
│   │   │   │   ├── MapView/
│   │   │   │   │   ├── index.tsx
│   │   │   │   │   └── styles.ts
│   │   │   │   ├── DriverMarker/
│   │   │   │   │   ├── index.tsx
│   │   │   │   │   └── styles.ts
│   │   │   │   ├── MerchantMarker/
│   │   │   │   │   ├── index.tsx
│   │   │   │   │   └── styles.ts
│   │   │   │   └── Route/
│   │   │   │       ├── index.tsx
│   │   │   │       └── styles.ts
│   │   │   ├── wallet/
│   │   │   │   ├── TransactionItem/
│   │   │   │   │   ├── index.tsx
│   │   │   │   │   └── styles.ts
│   │   │   │   └── BalanceCard/
│   │   │   │       ├── index.tsx
│   │   │   │       └── styles.ts
│   │   │   └── chat/
│   │   │       ├── ChatBubble/
│   │   │       │   ├── index.tsx
│   │   │       │   └── styles.ts
│   │   │       └── ChatInput/
│   │   │           ├── index.tsx
│   │   │           └── styles.ts
│   │   ├── hooks/                    # Custom hooks
│   │   │   ├── useAuth.ts
│   │   │   ├── useUser.ts
│   │   │   ├── useOrders.ts
│   │   │   ├── useOrderDetail.ts
│   │   │   ├── useWallet.ts
│   │   │   ├── useLocation.ts
│   │   │   ├── useSocket.ts
│   │   │   ├── useNotification.ts
│   │   │   └── index.ts
│   │   └── screens/                  # Screen components (backup)
│   │       └── ...
│   │
│   ├── services/                     # External services
│   │   ├── socket/
│   │   │   ├── socketService.ts
│   │   │   ├── socketEvents.ts
│   │   │   └── index.ts
│   │   ├── notification/
│   │   │   ├── notificationService.ts
│   │   │   ├── notificationHandler.ts
│   │   │   └── index.ts
│   │   ├── location/
│   │   │   ├── locationService.ts
│   │   │   ├── geolocation.ts
│   │   │   └── index.ts
│   │   ├── maps/
│   │   │   ├── mapsService.ts
│   │   │   ├── directions.ts
│   │   │   ├── distanceMatrix.ts
│   │   │   └── index.ts
│   │   └── storage/
│   │       ├── secureStorage.ts
│   │       └── asyncStorage.ts
│   │
│   ├── store/                        # Zustand stores
│   │   ├── authStore.ts
│   │   ├── userStore.ts
│   │   ├── orderStore.ts
│   │   ├── walletStore.ts
│   │   ├── locationStore.ts
│   │   └── index.ts
│   │
│   ├── types/                        # TypeScript types
│   │   ├── auth.ts
│   │   ├── order.ts
│   │   ├── user.ts
│   │   ├── wallet.ts
│   │   ├── navigation.ts
│   │   └── index.ts
│   │
│   ├── navigation/                   # Navigation configuration
│   │   ├── RootNavigator.tsx
│   │   ├── AuthNavigator.tsx
│   │   ├── MainNavigator.tsx
│   │   ├── OrderNavigator.tsx
│   │   ├── types.ts
│   │   └── index.ts
│   │
│   └── App.tsx                       # App entry point
│
├── android/                          # Android native code
├── ios/                              # iOS native code
├── index.js                          # React Native entry
├── App.tsx                           # Root component
├── package.json
├── tsconfig.json
└── babel.config.js
```

# Layer Responsibilities

## Core Layer
- Constants: API endpoints, app configuration
- Theme: Colors, typography, spacing
- Utils: Formatting, validation helpers
- Network: Axios client, interceptors

## Data Layer
- API: API endpoint definitions
- Models: DTOs for request/response
- Repositories: Repository implementations

## Domain Layer
- Entities: Business objects
- Repositories: Repository interfaces
- Usecases: Business logic

## Presentation Layer
- Components: Reusable UI components
- Hooks: Custom React hooks
- Screens: Screen components

## Services Layer
- Socket: WebSocket connection
- Notification: Push notifications
- Location: GPS & location services
- Maps: Google Maps integration
- Storage: Secure & async storage
