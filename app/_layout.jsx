import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider, useDispatch } from "react-redux";
import { setInitialReviews } from "../store/slices/reviewslice";
import { setInitialState } from "../store/slices/watchlistslice";
import { store } from "../store/store";
import { loadReviews } from "../utils/loggedreviews";
import { loadWatchlist } from "../utils/loggedwatchlist";

function InitLoader({ children }) {
  const dispatch = useDispatch();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      const data = await loadWatchlist();
      const reviewsData = await loadReviews(); // add this

      dispatch(setInitialState(data));
      dispatch(setInitialReviews(reviewsData)); // add this

      setReady(true);
    };

    init();
  }, []);

  if (!ready) return null;

  return children;
}
const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <InitLoader>
            <Stack
              screenOptions={{
                headerShown: false,
              }}
            />
          </InitLoader>
        </QueryClientProvider>
      </Provider>
    </SafeAreaProvider>
  );
}
