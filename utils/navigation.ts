import { canGoBack, type Href, type Router } from "expo-router";

export function goBackOrFallback(router: Router, fallbackHref: Href) {
  if (canGoBack()) {
    router.back();
    return;
  }

  router.replace(fallbackHref);
}
