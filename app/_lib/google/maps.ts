import Script from 'next/script';
import { createElement } from 'react';

// TODO: Enable new places api
export function GoogleMapsBootstrapScript() {
  return createElement(
    Script,
    null,
    /*js*/ `
    ((g) => {
      var h,
        a,
        k,
        p = "The Google Maps JavaScript API",
        c = "google",
        l = "importLibrary",
        q = "__ib__",
        m = document,
        b = window;
      b = b[c] || (b[c] = {});
      var d = b.maps || (b.maps = {}),
        r = new Set(),
        e = new URLSearchParams(),
        u = () =>
          h ||
          (h = new Promise(async (f, n) => {
            await (a = m.createElement("script"));
            e.set("libraries", [...r] + "");
            for (k in g)
              e.set(
                k.replace(/[A-Z]/g, (t) => "_" + t[0].toLowerCase()),
                g[k]
              );
            e.set("callback", c + ".maps." + q);
            a.src = "https://maps." + c + "apis.com/maps/api/js?" + e;
            d[q] = f;
            a.onerror = () => (h = n(Error(p + " could not load.")));
            a.nonce = m.querySelector("script[nonce]")?.nonce || "";
            m.head.append(a);
          }));
      d[l]
        ? console.warn(p + " only loads once. Ignoring:", g)
        : (d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n)));
    })({
      key: "${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}",
      v: "weekly",
    });
  `,
  );
}

// export function GoogleMapsBootstrapScript() {
//   return createElement(
//     Fragment,
//     null,
//     createElement(
//       Script,
//       null,
//       /*js*/ `
//       window.isGoogleMapsLodaded = new Promise((resolve) => {
//         console.log("Init Google Maps")
//         window.initGoogleMaps = resolve
//       })
//     `,
//     ),
//     createElement(Script, {
//       src: `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&loading=async&libraries=places&callback=initGoogleMaps`,
//     }),
//   );
// }
